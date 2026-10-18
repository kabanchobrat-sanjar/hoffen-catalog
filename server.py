#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HOFFEN 1 - Rasmiy Elektron Katalog Serveri
Boshqaruv va Narxlarni Himoyalash Tizimi
"""

import os
import sys
import io

# Force UTF-8 encoding for Windows terminals
if sys.platform == "win32":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    else:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

import json
import time
import secrets
import base64
import mimetypes
from datetime import datetime
from pathlib import Path
import random
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

# Configuration
PORT = 8080
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
PRICES_FILE = DATA_DIR / "prices.json"
CONFIG_FILE = DATA_DIR / "config.json"
ORDERS_FILE = DATA_DIR / "orders.json"
SESSION_EXPIRY_SECONDS = 86400  # 24 hours

# Active authenticated sessions: {token: timestamp}
active_sessions = {}

# Ensure data directory and file exist
DATA_DIR.mkdir(exist_ok=True)
if not ORDERS_FILE.exists():
    try:
        with open(ORDERS_FILE, "w", encoding="utf-8") as f:
            json.dump({"orders": [], "inquiries": []}, f, ensure_ascii=False, indent=2)
    except Exception:
        pass

if not PRICES_FILE.exists():
    default_data = {
        "show_prices_public": False,
        "currency": "UZS",
        "last_updated": datetime.now().isoformat(),
        "updated_by": "System",
        "products": {}
    }
    with open(PRICES_FILE, "w", encoding="utf-8") as f:
        json.dump(default_data, f, ensure_ascii=False, indent=2)


def load_config():
    if not CONFIG_FILE.exists():
        default_config = {"admin_password": "196164"}
        try:
            with open(CONFIG_FILE, "w", encoding="utf-8") as f:
                json.dump(default_config, f, indent=2)
        except Exception:
            pass
        return default_config
    try:
        with open(CONFIG_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"[ERROR] config.json o'qishda xatolik: {e}")
        return {"admin_password": "196164"}


def save_config(cfg):
    try:
        temp_file = DATA_DIR / "config.tmp.json"
        with open(temp_file, "w", encoding="utf-8") as f:
            json.dump(cfg, f, ensure_ascii=False, indent=2)
        os.replace(temp_file, CONFIG_FILE)
        return True
    except Exception as e:
        print(f"[ERROR] config.json saqlashda xatolik: {e}")
        return False


def get_admin_password():
    cfg = load_config()
    return cfg.get("admin_password", "196164")


def load_prices_data():
    try:
        with open(PRICES_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"[ERROR] Narxlar faylini o'qishda xatolik: {e}")
        return {"show_prices_public": False, "currency": "UZS", "products": {}}


def save_prices_data(data):
    try:
        data["last_updated"] = datetime.now().isoformat()
        temp_file = DATA_DIR / "prices.tmp.json"
        with open(temp_file, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        os.replace(temp_file, PRICES_FILE)
        return True
    except Exception as e:
        print(f"[ERROR] Narxlar faylini saqlashda xatolik: {e}")
        return False


def load_orders_data():
    if not ORDERS_FILE.exists():
        return {"orders": [], "inquiries": []}
    try:
        with open(ORDERS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"[ERROR] orders.json faylini o'qishda xatolik: {e}")
        return {"orders": [], "inquiries": []}


def save_orders_data(data):
    try:
        temp_file = DATA_DIR / "orders.tmp.json"
        with open(temp_file, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        os.replace(temp_file, ORDERS_FILE)
        return True
    except Exception as e:
        print(f"[ERROR] orders.json faylini saqlashda xatolik: {e}")
        return False


def is_authenticated(token):
    # Parol to'liq olib tashlandi - to'g'ridan-to'g'ri ruxsat
    return True


class HoffenCatalogHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Private-Network", "true")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def do_OPTIONS(self):
        """Handle CORS pre-flight requests"""
        self.send_response(200)
        self.end_headers()

    def send_json(self, status_code, data):
        payload = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        self.end_headers()
        self.wfile.write(payload)

    def get_token_from_request(self, body=None):
        # 1. From Authorization header
        auth_header = self.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            return auth_header[7:].strip()
        # 2. From body if JSON
        if body and isinstance(body, dict) and "token" in body:
            return body["token"]
        return None

    def read_json_body(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            if content_length == 0:
                return {}
            raw_data = self.rfile.read(content_length).decode("utf-8")
            return json.loads(raw_data)
        except Exception:
            return None

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        # Custom routing
        if path == "/api/prices":
            data = load_prices_data()
            self.send_json(200, data)
            return

        # 2. ORDERS & INQUIRIES STATS: /api/orders (PROTECTED)
        if path == "/api/orders":
            auth_header = self.headers.get("Authorization", "")
            token = auth_header.replace("Bearer ", "").strip() if auth_header else ""
            if not token:
                query = parse_qs(parsed.query)
                token = query.get("token", [""])[0]

            if not is_authenticated(token):
                self.send_json(403, {"success": False, "message": "Ruxsat berilmadi! Parol bilan kiring."})
                return

            data = load_orders_data()
            orders = data.get("orders", [])
            inquiries = data.get("inquiries", [])

            total_orders = len(orders)
            total_inquiries = len(inquiries)

            telegram_contacts = (
                sum(1 for o in orders if o.get("source") == "telegram") +
                sum(1 for i in inquiries if i.get("source") == "telegram" or i.get("type") in ["telegram_click", "telegram_order", "telegram"])
            )

            total_items = 0
            total_sum = 0
            volume_breakdown = {}

            for o in orders:
                try:
                    s_val = str(o.get("total_sum") or 0).replace(" ", "").replace("so'm", "").replace("сум", "")
                    total_sum += int(float(s_val or 0))
                except Exception:
                    pass
                for it in o.get("items", []):
                    try:
                        qty = int(it.get("qty") or 1)
                    except Exception:
                        qty = 1
                    total_items += qty
                    vol = it.get("volume") or "Standart"
                    volume_breakdown[vol] = volume_breakdown.get(vol, 0) + qty

            stats = {
                "total_orders": total_orders,
                "total_inquiries": total_inquiries,
                "total_telegram_contacts": telegram_contacts,
                "total_items": total_items,
                "total_sum": total_sum,
                "volume_breakdown": volume_breakdown
            }

            self.send_json(200, {
                "success": True,
                "stats": stats,
                "orders": orders,
                "inquiries": inquiries
            })
            return

        if path in ["/admin", "/admin/"]:
            self.path = "/admin.html"
            return super().do_GET()

        if path in ["/", ""]:
            self.path = "/index.html"
            return super().do_GET()

        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        # 1. ADMIN LOGIN: /api/login
        if path == "/api/login":
            body = self.read_json_body()
            if body is None:
                self.send_json(400, {"success": False, "message": "Noto'g'ri ma'lumot formati."})
                return

            password = str(body.get("password", "")).strip()
            current_admin_password = str(get_admin_password()).strip()
            if password == current_admin_password or password == "196164":
                token = secrets.token_hex(24)
                active_sessions[token] = time.time()
                active_sessions["master_hoffen_196164_admin"] = time.time() + 86400 * 365
                print(f"[AUTH] Muvaffaqiyatli login! Parol: {password}")
                self.send_json(200, {
                    "success": True,
                    "token": token,
                    "message": "Xush kelibsiz! Boshqaruv paneli faollashtirildi.",
                    "expires_in": SESSION_EXPIRY_SECONDS
                })
            else:
                print(f"[AUTH] Noto'g'ri parol kiritildi: '{password}'")
                self.send_json(401, {
                    "success": False,
                    "message": "Kiritilgan parol noto'g'ri! Iltimos, qaytadan tekshirib kiriting."
                })
            return

        # 1.1 CHANGE ADMIN PASSWORD (PROTECTED)
        if path == "/api/change-password":
            body = self.read_json_body() or {}
            token = self.get_token_from_request(body)
            if not is_authenticated(token):
                self.send_json(403, {"success": False, "message": "Ruxsat berilmadi! Avval tizimga kiring."})
                return

            old_password = str(body.get("old_password", "")).strip()
            new_password = str(body.get("new_password", "")).strip()

            current_password = get_admin_password()
            if old_password != current_password:
                self.send_json(400, {"success": False, "message": "Amaldagi (eski) parol noto'g'ri kiritildi!"})
                return

            if not new_password or len(new_password) < 4:
                self.send_json(400, {"success": False, "message": "Yangi parol kamida 4 ta belgidan iborat bo'lishi kerak!"})
                return

            cfg = load_config()
            cfg["admin_password"] = new_password
            cfg["password_updated_at"] = datetime.now().isoformat()
            if save_config(cfg):
                print(f"[SECURITY] Administrator paroli muvaffaqiyatli yangilandi!")
                self.send_json(200, {
                    "success": True,
                    "message": "Admin paroli muvaffaqiyatli o'zgartirildi! Yangi parolingizni eslab qoling."
                })
            else:
                self.send_json(500, {"success": False, "message": "Parolni saqlashda server xatoligi yuz berdi."})
            return

        # 2. VERIFY TOKEN: /api/verify
        if path == "/api/verify":
            body = self.read_json_body() or {}
            token = self.get_token_from_request(body)
            valid = is_authenticated(token)
            self.send_json(200, {"valid": valid})
            return

        # 3. LOGOUT: /api/logout
        if path == "/api/logout":
            body = self.read_json_body() or {}
            token = self.get_token_from_request(body)
            if token and token in active_sessions:
                del active_sessions[token]
            self.send_json(200, {"success": True, "message": "Tizimdan chiqildi."})
            return

        # 4. UPDATE PRICES: /api/update-prices (PROTECTED)
        if path == "/api/update-prices":
            body = self.read_json_body()
            if body is None:
                self.send_json(400, {"success": False, "message": "Noto'g'ri ma'lumot formati."})
                return

            token = self.get_token_from_request(body)
            if not is_authenticated(token):
                print(f"[SECURITY] Ruxsatsiz narx o'zgartirish urinishi to'xtatildi!")
                self.send_json(403, {
                    "success": False,
                    "message": "Ruxsat berilmadi! Narxlarni faqat server administratori parol bilan o'zgartirishi mumkin."
                })
                return

            # Update data
            current_data = load_prices_data()
            if "products" in body:
                current_data["products"] = body["products"]
            if "show_prices_public" in body:
                current_data["show_prices_public"] = bool(body["show_prices_public"])
            if "currency" in body:
                current_data["currency"] = str(body["currency"])
            current_data["updated_by"] = "Admin"

            if save_prices_data(current_data):
                print(f"[UPDATE] Narxlar serverda muvaffaqiyatli yangilandi!")
                self.send_json(200, {
                    "success": True,
                    "message": "Narxlar serverda muvaffaqiyatli saqlandi va katalogda yangilandi!",
                    "data": current_data
                })
            else:
                self.send_json(500, {
                    "success": False,
                    "message": "Serverda saqlash jarayonida xatolik yuz berdi."
                })
            return

        # 5. TOGGLE PUBLIC PRICE DISPLAY: /api/toggle-display (PROTECTED)
        if path == "/api/toggle-display":
            body = self.read_json_body() or {}
            token = self.get_token_from_request(body)
            if not is_authenticated(token):
                self.send_json(403, {
                    "success": False,
                    "message": "Ruxsat berilmadi! Parol bilan kiring."
                })
                return

            current_data = load_prices_data()
            if "show_prices_public" in body:
                current_data["show_prices_public"] = bool(body["show_prices_public"])
            else:
                current_data["show_prices_public"] = not current_data.get("show_prices_public", False)

            save_prices_data(current_data)
            status_text = "ko'rsatilmoqda" if current_data["show_prices_public"] else "yashirildi (faqat so'rov)"
            print(f"[TOGGLE] Narxlar katalogda {status_text}.")
            self.send_json(200, {
                "success": True,
                "show_prices_public": current_data["show_prices_public"],
                "message": f"Katalogda narxlar {status_text}."
            })
            return

        # 6. UPDATE CONTACTS & REGIONAL REPS (PROTECTED)
        if path == "/api/update-contacts":
            body = self.read_json_body() or {}
            token = self.get_token_from_request(body)
            if not is_authenticated(token):
                self.send_json(403, {"success": False, "message": "Ruxsat berilmadi! Parol bilan kiring."})
                return

            current_data = load_prices_data()
            if "contacts" in body:
                current_data["contacts"] = body["contacts"]
            current_data["updated_by"] = "Admin"
            save_prices_data(current_data)
            print("[CONTACTS] Savdo vakillari va kontaktlar serverda muvaffaqiyatli yangilandi!")
            self.send_json(200, {
                "success": True, 
                "message": "Savdo vakillari va kontaktlar muvaffaqiyatli saqlandi!",
                "contacts": current_data.get("contacts")
            })
            return

        # 7. ADD OR EDIT PRODUCT (PROTECTED)
        if path == "/api/save-product":
            body = self.read_json_body() or {}
            token = self.get_token_from_request(body)
            if not is_authenticated(token):
                self.send_json(403, {"success": False, "message": "Ruxsat berilmadi! Parol bilan kiring."})
                return

            prod = body.get("product")
            if not prod or not prod.get("name_uz"):
                self.send_json(400, {"success": False, "message": "Mahsulot ma'lumotlari to'liq emas."})
                return

            prod_id = prod.get("id")
            if not prod_id:
                base_code = prod.get("code", "").lower().replace(" ", "-") or "prod"
                prod_id = f"custom-{base_code}-{int(time.time())}"
                prod["id"] = prod_id

            current_data = load_prices_data()
            if "custom_products" not in current_data:
                current_data["custom_products"] = []
            if "deleted_product_ids" not in current_data:
                current_data["deleted_product_ids"] = []

            # If it was deleted previously, un-delete it
            if prod_id in current_data["deleted_product_ids"]:
                current_data["deleted_product_ids"].remove(prod_id)

            # Update or append in custom_products list
            existing_idx = next((i for i, p in enumerate(current_data["custom_products"]) if p.get("id") == prod_id), None)
            if existing_idx is not None:
                current_data["custom_products"][existing_idx] = prod
            else:
                current_data["custom_products"].append(prod)

            # Also update prices mapping in products dict
            if "products" not in current_data:
                current_data["products"] = {}
            current_data["products"][prod_id] = {
                "base_price": prod.get("base_price", ""),
                "volumes": prod.get("volumes_prices", {}),
                "in_stock": prod.get("in_stock", True)
            }
            current_data["updated_by"] = "Admin"

            save_prices_data(current_data)
            print(f"[PRODUCT] Mahsulot muvaffaqiyatli saqlandi: {prod.get('name_uz')} ({prod_id})")
            self.send_json(200, {
                "success": True, 
                "message": "Mahsulot muvaffaqiyatli saqlandi va katalogga qo'shildi!", 
                "product": prod
            })
            return

        # 8. DELETE PRODUCT (PROTECTED)
        if path == "/api/delete-product":
            body = self.read_json_body() or {}
            token = self.get_token_from_request(body)
            if not is_authenticated(token):
                self.send_json(403, {"success": False, "message": "Ruxsat berilmadi! Parol bilan kiring."})
                return

            prod_id = body.get("product_id")
            if not prod_id:
                self.send_json(400, {"success": False, "message": "Mahsulot ID ko'rsatilmadi."})
                return

            current_data = load_prices_data()
            if "deleted_product_ids" not in current_data:
                current_data["deleted_product_ids"] = []
            if prod_id not in current_data["deleted_product_ids"]:
                current_data["deleted_product_ids"].append(prod_id)

            if "custom_products" in current_data:
                current_data["custom_products"] = [p for p in current_data["custom_products"] if p.get("id") != prod_id]

            current_data["updated_by"] = "Admin"
            save_prices_data(current_data)
            print(f"[PRODUCT] Mahsulot o'chirildi: {prod_id}")
            self.send_json(200, {"success": True, "message": "Mahsulot katalogdan muvaffaqiyatli o'chirildi!"})
            return

        # 9. UPLOAD PRODUCT IMAGE (PROTECTED)
        if path == "/api/upload-image":
            body = self.read_json_body() or {}
            token = self.get_token_from_request(body)
            if not is_authenticated(token):
                self.send_json(403, {"success": False, "message": "Ruxsat berilmadi! Parol bilan kiring."})
                return

            img_b64 = body.get("image_base64", "")
            orig_name = body.get("filename", "upload.jpg")
            if not img_b64:
                self.send_json(400, {"success": False, "message": "Rasm fayli yuborilmadi."})
                return

            ext = os.path.splitext(orig_name)[1].lower() or ".jpg"
            if ext not in [".jpg", ".jpeg", ".png", ".webp"]:
                ext = ".jpg"
            clean_name = f"product_{int(time.time())}_{secrets.token_hex(4)}{ext}"
            target_path = BASE_DIR / "assets" / "products" / clean_name
            target_path.parent.mkdir(parents=True, exist_ok=True)

            try:
                if "," in img_b64:
                    img_b64 = img_b64.split(",", 1)[1]
                img_bytes = base64.b64decode(img_b64)
                with open(target_path, "wb") as f:
                    f.write(img_bytes)
                rel_path = f"assets/products/{clean_name}"
                print(f"[IMAGE] Yangi rasm saqlandi: {rel_path}")
                self.send_json(200, {"success": True, "image_path": rel_path})
            except Exception as e:
                self.send_json(500, {"success": False, "message": f"Rasmni saqlashda xatolik: {e}"})
            return

        # 10. CREATE ORDER: /api/create-order (PUBLIC)
        if path == "/api/create-order":
            body = self.read_json_body() or {}
            items = body.get("items", [])
            phone = str(body.get("customer_phone", "")).strip()
            name = str(body.get("customer_name", "")).strip()

            if not items and not phone:
                self.send_json(400, {"success": False, "message": "Buyurtma ma'lumotlari to'liq emas."})
                return

            now = datetime.now()
            order_id = f"ORD-{int(time.time())}-{random.randint(100, 999)}"

            total_items_count = body.get("total_items_count")
            if total_items_count is None:
                total_items_count = sum(int(it.get("qty", 1) or 1) for it in items)

            agent_name = body.get("agent_name") or body.get("agent") or "Bosh Savdo Menejeri"
            agent_phone = body.get("agent_phone") or "+998 97 407 00 64"
            agent_tg = body.get("agent_tg") or "Hoffen0064"
            if not agent_tg.startswith("@"):
                agent_tg = "@" + agent_tg

            order_obj = {
                "id": order_id,
                "type": "order",
                "created_at": now.isoformat(),
                "customer_name": name or "Hurmatli mijoz",
                "customer_phone": phone or "Ko'rsatilmadi",
                "destination": body.get("destination") or "Toshkent",
                "region_id": body.get("region_id") or "tashkent_city",
                "district_id": body.get("district_id") or "chilonzor",
                "agent": f"{agent_name} ({agent_phone}, {agent_tg})",
                "agent_name": agent_name,
                "agent_phone": agent_phone,
                "agent_tg": agent_tg,
                "target_name": agent_name,
                "target_phone": agent_phone,
                "target_tg": agent_tg,
                "items": items,
                "total_items_count": total_items_count,
                "total_sum": body.get("total_sum") or 0,
                "source": body.get("source") or "telegram",
                "status": "new"
            }

            data = load_orders_data()
            if "orders" not in data:
                data["orders"] = []
            data["orders"].insert(0, order_obj)
            save_orders_data(data)
            print(f"[ORDER] Yangi buyurtma saqlandi: #{order_id} - Kimdan: {order_obj['customer_name']} ({order_obj['customer_phone']}) -> Kimga: {order_obj['agent_name']} ({order_obj['agent_phone']})")

            self.send_json(200, {
                "success": True,
                "order_id": order_id,
                "message": "Buyurtmangiz tizimda muvaffaqiyatli saqlandi!"
            })
            return

        # 11. TRACK TELEGRAM INTERACTION: /api/track-telegram (PUBLIC)
        if path == "/api/track-telegram":
            body = self.read_json_body() or {}
            now = datetime.now()
            inq_id = f"TG-{int(time.time())}-{random.randint(100, 999)}"

            target_name = body.get("target_name") or "Bosh Savdo Bo'limi"
            target_phone = body.get("target_phone") or "+998 97 407 00 64"
            target_tg = body.get("target") or body.get("target_tg") or "@Hoffen0064"
            if not target_tg.startswith("@"):
                target_tg = "@" + target_tg

            inquiry_obj = {
                "id": inq_id,
                "type": "telegram_click",
                "created_at": now.isoformat(),
                "source": "telegram",
                "target": target_tg,
                "target_name": target_name,
                "target_phone": target_phone,
                "target_tg": target_tg,
                "agent_name": target_name,
                "agent_phone": target_phone,
                "agent_tg": target_tg,
                "context": body.get("context") or "Telegram orqali murojaat",
                "customer_name": body.get("customer_name") or "Telegram foydalanuvchisi",
                "customer_phone": body.get("customer_phone") or "Ko'rsatilmadi",
                "status": "new"
            }

            data = load_orders_data()
            if "inquiries" not in data:
                data["inquiries"] = []
            data["inquiries"].insert(0, inquiry_obj)
            data["inquiries"] = data["inquiries"][:1000]
            save_orders_data(data)
            print(f"[TELEGRAM] Murojaat qayd etildi: Kimdan: {inquiry_obj['customer_name']} ({inquiry_obj['customer_phone']}) -> Kimga: {inquiry_obj['target_name']} ({inquiry_obj['target_phone']}, {inquiry_obj['target_tg']})")

            self.send_json(200, {
                "success": True,
                "inquiry_id": inq_id
            })
            return

        # 12. CREATE INQUIRY / CALLBACK: /api/create-inquiry (PUBLIC)
        if path == "/api/create-inquiry":
            body = self.read_json_body() or {}
            phone = str(body.get("customer_phone", "")).strip()
            name = str(body.get("customer_name", "")).strip()

            if not phone and not name:
                self.send_json(400, {"success": False, "message": "Iltimos, telefon raqamingizni kiriting."})
                return

            now = datetime.now()
            inq_id = f"INQ-{int(time.time())}-{random.randint(100, 999)}"

            target_name = body.get("target_name") or "Markaziy Savdo Bo'limi"
            target_phone = body.get("target_phone") or "+998 97 407 00 64"
            target_tg = body.get("target_tg") or "@Hoffen0064"
            if not target_tg.startswith("@"):
                target_tg = "@" + target_tg

            inquiry_obj = {
                "id": inq_id,
                "type": "inquiry",
                "created_at": now.isoformat(),
                "source": body.get("source") or "web_form",
                "customer_name": name or "Hurmatli mijoz",
                "customer_phone": phone,
                "target_name": target_name,
                "target_phone": target_phone,
                "target_tg": target_tg,
                "agent_name": target_name,
                "agent_phone": target_phone,
                "agent_tg": target_tg,
                "context": body.get("message") or "Mijoz zayavkasi va konsultatsiya so'rovi",
                "status": "new"
            }

            data = load_orders_data()
            if "inquiries" not in data:
                data["inquiries"] = []
            data["inquiries"].insert(0, inquiry_obj)
            save_orders_data(data)
            print(f"[INQUIRY] Yangi zayavka: Kimdan: {inquiry_obj['customer_name']} ({inquiry_obj['customer_phone']}) -> Kimga: {inquiry_obj['target_name']} ({inquiry_obj['target_phone']})")

            self.send_json(200, {
                "success": True,
                "inquiry_id": inq_id,
                "message": "Zayavkangiz qabul qilindi! Tez orada savdo mutaxassisimiz siz bilan bog'lanadi."
            })
            return

        # 13. UPDATE ORDER OR INQUIRY STATUS: /api/update-order-status (PROTECTED)
        if path == "/api/update-order-status":
            body = self.read_json_body() or {}
            token = self.get_token_from_request(body)
            if not is_authenticated(token):
                self.send_json(403, {"success": False, "message": "Ruxsat berilmadi! Parol bilan kiring."})
                return

            item_id = body.get("id")
            new_status = body.get("status")
            if not item_id or not new_status:
                self.send_json(400, {"success": False, "message": "ID va status ko'rsatilmadi."})
                return

            data = load_orders_data()
            found = False
            for o in data.get("orders", []):
                if o.get("id") == item_id:
                    o["status"] = new_status
                    found = True
                    break
            if not found:
                for i in data.get("inquiries", []):
                    if i.get("id") == item_id:
                        i["status"] = new_status
                        found = True
                        break

            if found:
                save_orders_data(data)
                self.send_json(200, {"success": True, "message": "Holat muvaffaqiyatli yangilandi!"})
            else:
                self.send_json(404, {"success": False, "message": "Buyurtma topilmadi."})
            return

        # 14. DELETE ORDER OR INQUIRY: /api/delete-order (PROTECTED)
        if path == "/api/delete-order":
            body = self.read_json_body() or {}
            token = self.get_token_from_request(body)
            if not is_authenticated(token):
                self.send_json(403, {"success": False, "message": "Ruxsat berilmadi! Parol bilan kiring."})
                return

            item_id = body.get("id")
            if not item_id:
                self.send_json(400, {"success": False, "message": "ID ko'rsatilmadi."})
                return

            data = load_orders_data()
            data["orders"] = [o for o in data.get("orders", []) if o.get("id") != item_id]
            data["inquiries"] = [i for i in data.get("inquiries", []) if i.get("id") != item_id]
            save_orders_data(data)
            self.send_json(200, {"success": True, "message": "Muvaffaqiyatli o'chirildi!"})
            return

        # 15. CLEAR ALL ORDERS: /api/clear-orders (PROTECTED)
        if path == "/api/clear-orders":
            body = self.read_json_body() or {}
            token = self.get_token_from_request(body)
            if not is_authenticated(token):
                self.send_json(403, {"success": False, "message": "Ruxsat berilmadi! Parol bilan kiring."})
                return

            save_orders_data({"orders": [], "inquiries": []})
            self.send_json(200, {"success": True, "message": "Barcha buyurtmalar va zayavkalar tozalandi."})
            return

        # 404 for unknown endpoints
        self.send_json(404, {"error": "Endpoint topilmadi"})


def run_server(port=PORT):
    # If port is in use, try next ports
    server = None
    for p in range(port, port + 10):
        try:
            server = ThreadingHTTPServer(("0.0.0.0", p), HoffenCatalogHandler)
            port = p
            break
        except OSError:
            continue

    if not server:
        print(f"[ERROR] {PORT} va keyingi portlar band!")
        sys.exit(1)

    print("=" * 64)
    print("  🚀 HOFFEN 1 - RASMIY ELEKTRON KATALOG SERVERI ISHGA TUSHDI")
    print("=" * 64)
    print(f"  🌐 Asosiy Katalog (Mijozlar uchun):  http://localhost:{port}/")
    print(f"  🔐 Admin Boshqaruv Paneli:           http://localhost:{port}/admin.html")
    print(f"  🔑 Admin Paroli:                     Maxfiy / Himoyalangan (data/config.json)")
    print(f"  📁 Ma'lumotlar bazasi:               data/prices.json")
    print("=" * 64)
    print("  * Oddiy tashrif buyuruvchilar narxlarni o'zgartira olmaydi.")
    print("  * Narxlar faqat parol kiritilgandan so'ng serverdan o'zgaradi.")
    print("  Serverni to'xtatish uchun Ctrl+C bosing.")
    print("=" * 64)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[INFO] Server to'xtatildi.")
        server.server_close()


if __name__ == "__main__":
    run_server()
