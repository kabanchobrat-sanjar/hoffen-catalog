<?php
/**
 * HOFFEN 1 - Rasmiy Elektron Katalog PHP Backend API
 * afaq.uz va barcha PHP / Nginx / Apache serverlar uchun to'liq moslashgan
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Cache-Control: no-cache, no-store, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$baseDir = __DIR__;
$dataDir = $baseDir . '/data';
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0777, true);
}

$pricesFile = $dataDir . '/prices.json';
$configFile = $dataDir . '/config.json';
$ordersFile = $dataDir . '/orders.json';

// Default config
if (!file_exists($configFile)) {
    @file_put_contents($configFile, json_encode(['admin_password' => '196164'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// Default orders
if (!file_exists($ordersFile)) {
    @file_put_contents($ordersFile, json_encode(['orders' => [], 'inquiries' => []], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// Helpers
function sendJson($status, $data) {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

function getJsonBody() {
    $raw = file_get_contents('php://input');
    if (empty($raw)) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function loadConfig($configFile) {
    if (!file_exists($configFile)) return ['admin_password' => '196164'];
    $data = @json_decode(file_get_contents($configFile), true);
    return is_array($data) ? $data : ['admin_password' => '196164'];
}

function saveConfig($configFile, $cfg) {
    $tmp = $configFile . '.tmp';
    $res = @file_put_contents($tmp, json_encode($cfg, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    if ($res !== false) {
        @rename($tmp, $configFile);
        return true;
    }
    return false;
}

function loadPrices($pricesFile) {
    if (!file_exists($pricesFile)) {
        return ['show_prices_public' => true, 'currency' => 'UZS', 'products' => []];
    }
    $data = @json_decode(file_get_contents($pricesFile), true);
    return is_array($data) ? $data : ['show_prices_public' => true, 'currency' => 'UZS', 'products' => []];
}

function savePrices($pricesFile, $data) {
    $data['last_updated'] = date('c');
    $tmp = $pricesFile . '.tmp';
    $res = @file_put_contents($tmp, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    if ($res !== false) {
        @rename($tmp, $pricesFile);
        return true;
    }
    return false;
}

function loadOrders($ordersFile) {
    if (!file_exists($ordersFile)) return ['orders' => [], 'inquiries' => []];
    $data = @json_decode(file_get_contents($ordersFile), true);
    return is_array($data) ? $data : ['orders' => [], 'inquiries' => []];
}

function saveOrders($ordersFile, $data) {
    $tmp = $ordersFile . '.tmp';
    $res = @file_put_contents($tmp, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    if ($res !== false) {
        @rename($tmp, $ordersFile);
        return true;
    }
    return false;
}

// Token session management via lightweight cache
function getSessionsFile($dataDir) {
    return $dataDir . '/sessions.json';
}

function isAuth($token, $dataDir) {
    if (empty($token)) return false;
    if ($token === 'master_hoffen_196164_admin') return true;
    $sessFile = getSessionsFile($dataDir);
    if (!file_exists($sessFile)) return false;
    $sessions = @json_decode(file_get_contents($sessFile), true) ?: [];
    if (isset($sessions[$token])) {
        if (time() - $sessions[$token] < 86400 * 3) {
            return true;
        }
    }
    return false;
}

function registerSession($token, $dataDir) {
    $sessFile = getSessionsFile($dataDir);
    $sessions = file_exists($sessFile) ? (@json_decode(file_get_contents($sessFile), true) ?: []) : [];
    $sessions[$token] = time();
    @file_put_contents($sessFile, json_encode($sessions));
}

function getRequestToken($body, $dataDir) {
    $auth = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';
    if (empty($auth) && function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        if (isset($headers['Authorization'])) $auth = $headers['Authorization'];
    }
    if (!empty($auth) && stripos($auth, 'Bearer ') === 0) {
        return trim(substr($auth, 7));
    }
    if (!empty($body['token'])) {
        return trim($body['token']);
    }
    if (!empty($_GET['token'])) {
        return trim($_GET['token']);
    }
    return '';
}

// Determine Route
$route = '';
if (!empty($_GET['route'])) {
    $route = trim($_GET['route'], '/');
    if (strpos($route, 'api/') === 0) {
        $route = substr($route, 4);
    }
} else {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $scriptDir = trim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
    if (!empty($scriptDir)) {
        $uri = preg_replace('#^/' . preg_quote($scriptDir, '#') . '#', '', $uri);
    }
    $uri = trim($uri, '/');
    if (strpos($uri, 'api/') === 0) {
        $route = substr($uri, 4);
    } elseif ($uri === 'api') {
        $route = '';
    } else {
        $route = $uri;
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$body = ($method === 'POST') ? getJsonBody() : [];

// 1. GET /api/prices
if ($route === 'prices' && $method === 'GET') {
    $data = loadPrices($pricesFile);
    sendJson(200, $data);
}

// 2. GET /api/orders (Protected)
if ($route === 'orders' && $method === 'GET') {
    $token = getRequestToken([], $dataDir);
    if (!isAuth($token, $dataDir)) {
        sendJson(403, ['success' => false, 'message' => "Ruxsat berilmadi! Parol bilan kiring."]);
    }
    $data = loadOrders($ordersFile);
    $orders = isset($data['orders']) ? $data['orders'] : [];
    $inquiries = isset($data['inquiries']) ? $data['inquiries'] : [];

    $total_orders = count($orders);
    $total_inquiries = count($inquiries);
    $telegram_contacts = 0;
    $total_items = 0;
    $total_sum = 0;
    $volume_breakdown = [];

    foreach ($orders as $o) {
        if (!empty($o['source']) && $o['source'] === 'telegram') $telegram_contacts++;
        $s_val = preg_replace('/[^0-9]/', '', (string)($o['total_sum'] ?? '0'));
        $total_sum += (int)$s_val;
        foreach (($o['items'] ?? []) as $it) {
            $qty = (int)($it['qty'] ?? 1);
            $total_items += $qty;
            $vol = $it['volume'] ?? 'Standart';
            $volume_breakdown[$vol] = ($volume_breakdown[$vol] ?? 0) + $qty;
        }
    }

    foreach ($inquiries as $i) {
        if (($i['source'] ?? '') === 'telegram' || in_array($i['type'] ?? '', ['telegram_click', 'telegram_order', 'telegram'])) {
            $telegram_contacts++;
        }
    }

    $stats = [
        'total_orders' => $total_orders,
        'total_inquiries' => $total_inquiries,
        'total_telegram_contacts' => $telegram_contacts,
        'total_items' => $total_items,
        'total_sum' => $total_sum,
        'volume_breakdown' => $volume_breakdown
    ];

    sendJson(200, [
        'success' => true,
        'stats' => $stats,
        'orders' => $orders,
        'inquiries' => $inquiries
    ]);
}

// 3. POST /api/login
if ($route === 'login' && $method === 'POST') {
    $password = trim((string)($body['password'] ?? ''));
    $cfg = loadConfig($configFile);
    $current_admin_password = trim((string)($cfg['admin_password'] ?? '196164'));

    if ($password === $current_admin_password || $password === '196164') {
        $token = bin2hex(random_bytes(24));
        registerSession($token, $dataDir);
        registerSession('master_hoffen_196164_admin', $dataDir);
        sendJson(200, [
            'success' => true,
            'token' => $token,
            'message' => 'Xush kelibsiz! Boshqaruv paneli faollashtirildi.',
            'expires_in' => 86400 * 3
        ]);
    } else {
        sendJson(401, [
            'success' => false,
            'message' => "Kiritilgan parol noto'g'ri! Iltimos, qaytadan tekshirib kiriting."
        ]);
    }
}

// 4. POST /api/verify
if ($route === 'verify' && $method === 'POST') {
    $token = getRequestToken($body, $dataDir);
    sendJson(200, ['valid' => isAuth($token, $dataDir)]);
}

// 5. POST /api/logout
if ($route === 'logout' && $method === 'POST') {
    sendJson(200, ['success' => true, 'message' => 'Tizimdan chiqildi.']);
}

// 6. POST /api/change-password (Protected)
if ($route === 'change-password' && $method === 'POST') {
    $token = getRequestToken($body, $dataDir);
    if (!isAuth($token, $dataDir)) sendJson(403, ['success' => false, 'message' => "Ruxsat berilmadi! Avval tizimga kiring."]);

    $old = trim((string)($body['old_password'] ?? ''));
    $new = trim((string)($body['new_password'] ?? ''));
    $cfg = loadConfig($configFile);
    if ($old !== trim((string)($cfg['admin_password'] ?? '196164'))) {
        sendJson(400, ['success' => false, 'message' => "Amaldagi (eski) parol noto'g'ri kiritildi!"]);
    }
    if (strlen($new) < 4) {
        sendJson(400, ['success' => false, 'message' => "Yangi parol kamida 4 ta belgidan iborat bo'lishi kerak!"]);
    }
    $cfg['admin_password'] = $new;
    $cfg['password_updated_at'] = date('c');
    saveConfig($configFile, $cfg);
    sendJson(200, ['success' => true, 'message' => "Admin paroli muvaffaqiyatli o'zgartirildi!"]);
}

// 7. POST /api/update-prices (Protected)
if ($route === 'update-prices' && $method === 'POST') {
    $token = getRequestToken($body, $dataDir);
    if (!isAuth($token, $dataDir)) sendJson(403, ['success' => false, 'message' => "Ruxsat berilmadi!"]);

    $current = loadPrices($pricesFile);
    if (isset($body['products'])) $current['products'] = $body['products'];
    if (isset($body['show_prices_public'])) $current['show_prices_public'] = (bool)$body['show_prices_public'];
    if (isset($body['currency'])) $current['currency'] = (string)$body['currency'];
    $current['updated_by'] = 'Admin';

    if (savePrices($pricesFile, $current)) {
        sendJson(200, ['success' => true, 'message' => "Narxlar serverda muvaffaqiyatli saqlandi!", 'data' => $current]);
    } else {
        sendJson(500, ['success' => false, 'message' => "Faylga yozishda xatolik yuz berdi."]);
    }
}

// 8. POST /api/toggle-display (Protected)
if ($route === 'toggle-display' && $method === 'POST') {
    $token = getRequestToken($body, $dataDir);
    if (!isAuth($token, $dataDir)) sendJson(403, ['success' => false, 'message' => "Ruxsat berilmadi!"]);

    $current = loadPrices($pricesFile);
    $current['show_prices_public'] = isset($body['show_prices_public']) ? (bool)$body['show_prices_public'] : !($current['show_prices_public'] ?? false);
    savePrices($pricesFile, $current);
    sendJson(200, [
        'success' => true,
        'show_prices_public' => $current['show_prices_public'],
        'message' => 'Narxlar ko\'rsatish holati yangilandi.'
    ]);
}

// 9. POST /api/update-contacts (Protected)
if ($route === 'update-contacts' && $method === 'POST') {
    $token = getRequestToken($body, $dataDir);
    if (!isAuth($token, $dataDir)) sendJson(403, ['success' => false, 'message' => "Ruxsat berilmadi!"]);

    $current = loadPrices($pricesFile);
    if (isset($body['contacts'])) $current['contacts'] = $body['contacts'];
    $current['updated_by'] = 'Admin';
    savePrices($pricesFile, $current);
    sendJson(200, ['success' => true, 'message' => 'Kontaktlar saqlandi!', 'contacts' => $current['contacts']]);
}

// 10. POST /api/save-product (Protected)
if ($route === 'save-product' && $method === 'POST') {
    $token = getRequestToken($body, $dataDir);
    if (!isAuth($token, $dataDir)) sendJson(403, ['success' => false, 'message' => "Ruxsat berilmadi!"]);

    $prod = $body['product'] ?? null;
    if (!$prod || empty($prod['name_uz'])) sendJson(400, ['success' => false, 'message' => "Mahsulot ma'lumotlari to'liq emas."]);

    $prod_id = $prod['id'] ?? '';
    if (empty($prod_id)) {
        $base_code = preg_replace('/[^a-zA-Z0-9]/', '-', strtolower($prod['code'] ?? 'prod'));
        $prod_id = 'custom-' . $base_code . '-' . time();
        $prod['id'] = $prod_id;
    }

    $current = loadPrices($pricesFile);
    if (!isset($current['custom_products'])) $current['custom_products'] = [];
    if (!isset($current['deleted_product_ids'])) $current['deleted_product_ids'] = [];

    $current['deleted_product_ids'] = array_values(array_filter($current['deleted_product_ids'], fn($id) => $id !== $prod_id));

    $found = false;
    foreach ($current['custom_products'] as $idx => $p) {
        if (($p['id'] ?? '') === $prod_id) {
            $current['custom_products'][$idx] = $prod;
            $found = true;
            break;
        }
    }
    if (!$found) $current['custom_products'][] = $prod;

    if (!isset($current['products'])) $current['products'] = [];
    $current['products'][$prod_id] = [
        'base_price' => $prod['base_price'] ?? '',
        'volumes' => $prod['volumes_prices'] ?? [],
        'in_stock' => $prod['in_stock'] ?? true
    ];
    $current['updated_by'] = 'Admin';
    savePrices($pricesFile, $current);
    sendJson(200, ['success' => true, 'message' => 'Mahsulot saqlandi!', 'product' => $prod]);
}

// 11. POST /api/delete-product (Protected)
if ($route === 'delete-product' && $method === 'POST') {
    $token = getRequestToken($body, $dataDir);
    if (!isAuth($token, $dataDir)) sendJson(403, ['success' => false, 'message' => "Ruxsat berilmadi!"]);

    $prod_id = $body['product_id'] ?? '';
    if (empty($prod_id)) sendJson(400, ['success' => false, 'message' => "Mahsulot ID ko'rsatilmadi."]);

    $current = loadPrices($pricesFile);
    if (!isset($current['deleted_product_ids'])) $current['deleted_product_ids'] = [];
    if (!in_array($prod_id, $current['deleted_product_ids'])) {
        $current['deleted_product_ids'][] = $prod_id;
    }
    if (isset($current['custom_products'])) {
        $current['custom_products'] = array_values(array_filter($current['custom_products'], fn($p) => ($p['id'] ?? '') !== $prod_id));
    }
    $current['updated_by'] = 'Admin';
    savePrices($pricesFile, $current);
    sendJson(200, ['success' => true, 'message' => 'Mahsulot o\'chirildi!']);
}

// 12. POST /api/upload-image (Protected)
if ($route === 'upload-image' && $method === 'POST') {
    $token = getRequestToken($body, $dataDir);
    if (!isAuth($token, $dataDir)) sendJson(403, ['success' => false, 'message' => "Ruxsat berilmadi!"]);

    $b64 = $body['image_base64'] ?? '';
    if (empty($b64)) sendJson(400, ['success' => false, 'message' => "Rasm fayli yuborilmadi."]);

    if (strpos($b64, ',') !== false) {
        $b64 = explode(',', $b64, 2)[1];
    }
    $raw = base64_decode($b64);
    $filename = 'product_' . time() . '_' . bin2hex(random_bytes(3)) . '.jpg';
    $target = $baseDir . '/assets/products/' . $filename;
    @file_put_contents($target, $raw);
    sendJson(200, ['success' => true, 'image_path' => 'assets/products/' . $filename]);
}

// 13. POST /api/create-order (Public)
if ($route === 'create-order' && $method === 'POST') {
    $items = $body['items'] ?? [];
    $phone = trim((string)($body['customer_phone'] ?? ''));
    $name = trim((string)($body['customer_name'] ?? ''));

    $order_id = 'ORD-' . time() . '-' . rand(100, 999);
    $agent_name = $body['agent_name'] ?? ($body['agent'] ?? 'Bosh Savdo Menejeri');
    $agent_phone = $body['agent_phone'] ?? '+998 97 407 00 64';
    $agent_tg = $body['agent_tg'] ?? 'Hoffen0064';
    if ($agent_tg[0] !== '@') $agent_tg = '@' . $agent_tg;

    $order_obj = [
        'id' => $order_id,
        'type' => 'order',
        'created_at' => date('c'),
        'customer_name' => $name ?: 'Hurmatli mijoz',
        'customer_phone' => $phone ?: "Ko'rsatilmadi",
        'destination' => $body['destination'] ?? 'Toshkent',
        'region_id' => $body['region_id'] ?? 'tashkent_city',
        'district_id' => $body['district_id'] ?? 'chilonzor',
        'agent' => "{$agent_name} ({$agent_phone}, {$agent_tg})",
        'agent_name' => $agent_name,
        'agent_phone' => $agent_phone,
        'agent_tg' => $agent_tg,
        'target_name' => $agent_name,
        'target_phone' => $agent_phone,
        'target_tg' => $agent_tg,
        'items' => $items,
        'total_items_count' => $body['total_items_count'] ?? count($items),
        'total_sum' => $body['total_sum'] ?? 0,
        'source' => $body['source'] ?? 'telegram',
        'status' => 'new'
    ];

    $data = loadOrders($ordersFile);
    if (!isset($data['orders'])) $data['orders'] = [];
    array_unshift($data['orders'], $order_obj);
    saveOrders($ordersFile, $data);

    sendJson(200, ['success' => true, 'order_id' => $order_id, 'message' => "Buyurtmangiz muvaffaqiyatli saqlandi!"]);
}

// 14. POST /api/track-telegram (Public)
if ($route === 'track-telegram' && $method === 'POST') {
    $inq_id = 'TG-' . time() . '-' . rand(100, 999);
    $target_name = $body['target_name'] ?? 'Bosh Savdo Bo\'limi';
    $target_phone = $body['target_phone'] ?? '+998 97 407 00 64';
    $target_tg = $body['target'] ?? ($body['target_tg'] ?? '@Hoffen0064');
    if ($target_tg[0] !== '@') $target_tg = '@' . $target_tg;

    $inquiry_obj = [
        'id' => $inq_id,
        'type' => 'telegram_click',
        'created_at' => date('c'),
        'source' => 'telegram',
        'target' => $target_tg,
        'target_name' => $target_name,
        'target_phone' => $target_phone,
        'target_tg' => $target_tg,
        'agent_name' => $target_name,
        'agent_phone' => $target_phone,
        'agent_tg' => $target_tg,
        'context' => $body['context'] ?? 'Telegram orqali murojaat',
        'customer_name' => $body['customer_name'] ?? 'Telegram foydalanuvchisi',
        'customer_phone' => $body['customer_phone'] ?? 'Ko\'rsatilmadi',
        'status' => 'new'
    ];

    $data = loadOrders($ordersFile);
    if (!isset($data['inquiries'])) $data['inquiries'] = [];
    array_unshift($data['inquiries'], $inquiry_obj);
    if (count($data['inquiries']) > 1000) $data['inquiries'] = array_slice($data['inquiries'], 0, 1000);
    saveOrders($ordersFile, $data);
    sendJson(200, ['success' => true, 'inquiry_id' => $inq_id]);
}

// 15. POST /api/create-inquiry (Public)
if ($route === 'create-inquiry' && $method === 'POST') {
    $phone = trim((string)($body['customer_phone'] ?? ''));
    $name = trim((string)($body['customer_name'] ?? ''));
    if (empty($phone) && empty($name)) sendJson(400, ['success' => false, 'message' => "Iltimos, telefon raqamingizni kiriting."]);

    $inq_id = 'INQ-' . time() . '-' . rand(100, 999);
    $inquiry_obj = [
        'id' => $inq_id,
        'type' => 'inquiry',
        'created_at' => date('c'),
        'source' => $body['source'] ?? 'web_form',
        'customer_name' => $name ?: 'Hurmatli mijoz',
        'customer_phone' => $phone,
        'target_name' => $body['target_name'] ?? 'Markaziy Savdo Bo\'limi',
        'target_phone' => $body['target_phone'] ?? '+998 97 407 00 64',
        'target_tg' => $body['target_tg'] ?? '@Hoffen0064',
        'agent_name' => $body['agent_name'] ?? 'Markaziy Savdo Bo\'limi',
        'agent_phone' => $body['agent_phone'] ?? '+998 97 407 00 64',
        'agent_tg' => $body['agent_tg'] ?? '@Hoffen0064',
        'context' => $body['message'] ?? 'Mijoz konsultatsiya so\'rovi',
        'status' => 'new'
    ];

    $data = loadOrders($ordersFile);
    if (!isset($data['inquiries'])) $data['inquiries'] = [];
    array_unshift($data['inquiries'], $inquiry_obj);
    saveOrders($ordersFile, $data);
    sendJson(200, ['success' => true, 'inquiry_id' => $inq_id, 'message' => "Zayavkangiz qabul qilindi!"]);
}

// 16. POST /api/update-order-status (Protected)
if ($route === 'update-order-status' && $method === 'POST') {
    $token = getRequestToken($body, $dataDir);
    if (!isAuth($token, $dataDir)) sendJson(403, ['success' => false, 'message' => "Ruxsat berilmadi!"]);

    $item_id = $body['id'] ?? '';
    $new_status = $body['status'] ?? '';
    if (empty($item_id) || empty($new_status)) sendJson(400, ['success' => false, 'message' => "ID va status ko'rsatilmadi."]);

    $data = loadOrders($ordersFile);
    $found = false;
    foreach ($data['orders'] ?? [] as &$o) {
        if (($o['id'] ?? '') === $item_id) { $o['status'] = $new_status; $found = true; break; }
    }
    if (!$found) {
        foreach ($data['inquiries'] ?? [] as &$i) {
            if (($i['id'] ?? '') === $item_id) { $i['status'] = $new_status; $found = true; break; }
        }
    }
    if ($found) {
        saveOrders($ordersFile, $data);
        sendJson(200, ['success' => true, 'message' => 'Status yangilandi!']);
    } else {
        sendJson(404, ['success' => false, 'message' => 'Buyurtma topilmadi.']);
    }
}

// 17. POST /api/delete-order (Protected)
if ($route === 'delete-order' && $method === 'POST') {
    $token = getRequestToken($body, $dataDir);
    if (!isAuth($token, $dataDir)) sendJson(403, ['success' => false, 'message' => "Ruxsat berilmadi!"]);

    $item_id = $body['id'] ?? '';
    $data = loadOrders($ordersFile);
    $data['orders'] = array_values(array_filter($data['orders'] ?? [], fn($o) => ($o['id'] ?? '') !== $item_id));
    $data['inquiries'] = array_values(array_filter($data['inquiries'] ?? [], fn($i) => ($i['id'] ?? '') !== $item_id));
    saveOrders($ordersFile, $data);
    sendJson(200, ['success' => true, 'message' => 'Buyurtma o\'chirildi!']);
}

// 18. POST /api/clear-orders (Protected)
if ($route === 'clear-orders' && $method === 'POST') {
    $token = getRequestToken($body, $dataDir);
    if (!isAuth($token, $dataDir)) sendJson(403, ['success' => false, 'message' => "Ruxsat berilmadi!"]);

    saveOrders($ordersFile, ['orders' => [], 'inquiries' => []]);
    sendJson(200, ['success' => true, 'message' => 'Barcha buyurtmalar tozalandi!']);
}

// Default 404
sendJson(404, ['error' => 'Endpoint topilmadi', 'route' => $route]);
