// HOFFEN 1 - Electronic Interactive Catalog Application
// Pure Modern JavaScript (ES6+)

document.addEventListener('DOMContentLoaded', () => {
  // Intelligent API Helper: Supports afaq.uz (PHP), port 8080 (Python), GitHub Pages, and Localhost
  function apiUrl(endpoint) {
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isGitHub = window.location.hostname.includes('github.io');
    const isPhpHosting = !isLocalhost && !isGitHub;
    
    if (isPhpHosting) {
      const clean = endpoint.replace(/^\/?api\/?/, '');
      const parts = clean.split('?');
      const r = parts[0];
      const query = parts[1] ? '&' + parts[1] : '';
      return `api.php?route=${r}${query}`;
    }
    
    const base = (window.location.port === '8080') ? '' : (isLocalhost ? 'http://localhost:8080' : '');
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${base}${cleanEndpoint}`;
  }

  // State
  let currentLang = localStorage.getItem('hoffen_lang') || 'uz';
  let currentTheme = localStorage.getItem('hoffen_theme') || 'light';
  let currentCategory = 'all';
  let searchQuery = '';
  let activeFlipbookPage = 1;
  let cart = JSON.parse(localStorage.getItem('hoffen_cart') || '[]');
  let currentDeliveryRegion = 'tashkent_city';
  let currentSelectedDistrict = 'chilonzor';
  let currentSelectedCity = '';
  let serverPrices = {
    show_prices_public: true,
    currency: 'UZS',
    products: {}
  };

  // Apply initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Translations
  const I18N = {
    uz: {
      site_title: "HOFFEN 1 | Rasmiy Elektron Katalog",
      brand_sub: "Professional Avtoximiya",
      nav_catalog: "Katalog",
      nav_brands: "Brendlar",
      nav_delivery: "Yetkazib Berish",
      nav_flipbook: "Elektron Jurnal",
      nav_company: "Kompaniya Haqida",
      nav_contact: "Aloqa",
      delivery_section_tag: "Bepul Yetkazib Berish Xizmati",
      delivery_section_title: "Toshkent Shahri va Toshkent Viloyati (Tashovul)",
      delivery_section_desc: "O'z hududingizni tanlang — Toshkent shahri tumanlari yoki Toshkent viloyati (Tashovul) hududlari bo'yicha mas'ul savdo vakili bilan to'g'ridan-to'g'ri bog'laning va bepul yetkazib berishga buyurtma bering.",
      hero_tag: "Avtoximiya & Avtokosmetika",
      hero_title_1: "Superior Chemistry.",
      hero_title_2: "Superior Performance.",
      hero_desc: "Har qanday turdagi avtotransport uchun mo'ljallangan professional, yuqori konsentrlangan kontaktsiz yuvish vositasi. Murakkablik darajasi yuqori bo'lgan iflosliklarni — yo'l changi va reagentlar, yog'li dog'lar, hasharot izlarini tez va samarali olib tashlaydi. Suv bilan osongina yuviladi. Avtomobil yuzasiga dog' va chiziqlar qoldirmagan holda yaltiroq ko'rinish beradi. Har qanday lak-bo'yoq qatlami, xrom, rezina va plastik yuzalar uchun xavfsiz. Tarkibida korroziyaga qarshi qo'shimchalar mavjud.",
      stat_1_num: "22+",
      stat_1_label: "Professional Mahsulotlar",
      stat_2_num: "100%",
      stat_2_label: "Sifat & Bo'yoq Xavfsizligi",
      stat_3_num: "Toshkent",
      stat_3_label: "Bepul Yetkazib Berish",
      btn_explore: "Katalogni Ko'rish",
      btn_flipbook: "Jurnal Shaklida Ochish",
      stage_title: "HOFFEN 06 Active Foam FMX",
      stage_sub: "Superior Chemistry • Loy va kirlarni mutlaq erituvchi quvvat",
      section_catalog_tag: "To'liq Mahsulotlar Qatori",
      section_catalog_title: "Elektron Mahsulotlar Katalogi",
      section_catalog_desc: "Avtomoykalar, detailing studiyalar, servislar va avto ixlosmandlari uchun maxsus tayyorlangan professional vositalar.",
      search_placeholder: "Nomi, kodi yoki ifori bo'yicha qidirish...",
      btn_inquiry: "Xarid savati",
      btn_inquired: "Xarid savatida ✓",
      btn_detail: "Batafsil / Zoom",
      no_results: "Kechirasiz, siz qidirgan so'rov bo'yicha mahsulot topilmadi.",
      cart_title: "Xarid Savati / Buyurtma",
      cart_empty: "Siz hali birorta ham mahsulot tanlamadingiz. Katalogdan kerakli vositalarni tanlab 'Xarid savati' tugmasini bosing.",
      cart_name_ph: "Ismingiz yoki Kompaniya nomi*",
      cart_phone_ph: "Telefon raqamingiz (+998...)*",
      cart_city_ph: "Shahar / Tuman (Masalan: Toshkent sh.)",
      btn_send_tg: "Telegram orqali Xarid va Buyurtma Yuborish",
      company_tag: "Ishlab Chiqaruvchi Haqida",
      company_title: "«KNYAZOV» MChJ va HOFFEN Brendi",
      company_lead: "HOFFEN 1 - zamonaviy avtotexnologiyalar, yuqori sifatli kimyoviy sintez va O'zbekiston iqlim sharoitiga moslashtirilgan avtoximiya brendidir. Bizning maqsadimiz - avtomobil egalari va professional avtomoyka biznesi uchun eng samarali, lak-bo'yoqqa mutlaqo zararsiz va hamyonbop mahsulotlarni taqdim etish.",
      contact_tag: "Tezkor Aloqa va Yetkazish",
      contact_title: "Buyurtma va Hamkorlik Bo'limi",
      contact_desc: "Ulgurji (optom) xaridlar, viloyatlardagi dilerlik shartnomalari yoki avtomoykangiz uchun mahsulot sinovlari bo'yicha biz bilan to'g'ridan-to'g'ri bog'laning.",
      phone_tag: "Savdo bo'limi menejeri (Qo'ng'iroq qilish)",
      delivery_title: "Toshkent Bo'ylab Bepul Yetkazib Berish",
      delivery_desc: "Toshkent shahri bo'ylab har qanday hajmda bepul va tezkor yetkazib beramiz. Viloyatlarga logistika kelishilgan holda amalga oshiriladi.",
      footer_copy: "© 2026 HOFFEN 1 - «KNYAZOV» MChJ. Barcha huquqlar himoyalangan.",
      flipbook_header: "HOFFEN 1 Rasmiy Katalogi - Elektron Jurnal Rejimi",
      page_label: "Sahifa"
    },
    ru: {
      site_title: "HOFFEN 1 | Официальный Электронный Каталог",
      brand_sub: "Профессиональная Автохимия",
      nav_catalog: "Каталог",
      nav_brands: "Бренды",
      nav_delivery: "Доставка",
      nav_flipbook: "Электронный Журнал",
      nav_company: "О Компании",
      nav_contact: "Контакты",
      delivery_section_tag: "Служба Бесплатной Доставки",
      delivery_section_title: "г. Ташкент и Ташкентская область (Ташовул)",
      delivery_section_desc: "Выберите ваш район — свяжитесь напрямую с торговым представителем по г. Ташкент или Ташкентской области для бесплатной доставки.",
      hero_tag: "Автохимия и Автокосметика",
      hero_title_1: "Superior Chemistry.",
      hero_title_2: "Superior Performance.",
      hero_desc: "Профессиональное, высококонцентрированное средство для бесконтактной мойки любого вида автотранспорта. Быстро и эффективно удаляет сложные загрязнения — дорожную пыль, реагенты, масляные пятна, следы насекомых. Легко смывается водой. Придает блеск без пятен и разводов. Безопасно для любого ЛКП, хрома, резины и пластика. Содержит антикоррозионные присадки.",
      stat_1_num: "22+",
      stat_1_label: "Профессиональных Продуктов",
      stat_2_num: "100%",
      stat_2_label: "Безопасность для ЛКП",
      stat_3_num: "Ташкент",
      stat_3_label: "Бесплатная Доставка",
      btn_explore: "Смотреть Каталог",
      btn_flipbook: "Открыть в виде Журнала",
      stage_title: "HOFFEN 06 Active Foam FMX",
      stage_sub: "Superior Chemistry • Бескомпромиссная сила против грязи и глины",
      section_catalog_tag: "Полная Линейка Продукции",
      section_catalog_title: "Электронный Каталог Продукции",
      section_catalog_desc: "Профессиональные средства для автомоечных комплексов, детейлинг-центров и автолюбителей.",
      search_placeholder: "Поиск по названию, коду или аромату...",
      btn_inquiry: "В корзину",
      btn_inquired: "В корзине ✓",
      btn_detail: "Подробнее / Зум",
      no_results: "К сожалению, по вашему запросу ничего не найдено.",
      cart_title: "Корзина Покупок / Заказ",
      cart_empty: "Вы пока не выбрали ни одного товара. Выберите позиции из каталога и нажмите 'В корзину'.",
      cart_name_ph: "Ваше имя или Название компании*",
      cart_phone_ph: "Номер телефона (+998...)*",
      cart_city_ph: "Город / Район (например: г. Ташкент)",
      btn_send_tg: "Отправить Заказ в Telegram",
      company_tag: "О Производителе",
      company_title: "ООО «KNYAZOV» и Бренд HOFFEN",
      company_lead: "HOFFEN 1 — это синтез современных химических технологий и практического опыта в сфере детейлинга. Мы предлагаем высокоэффективные, экологически сбалансированные составы для автомоек и ухода за автомобилем.",
      contact_tag: "Прямая Связь и Доставка",
      contact_title: "Отдел Продаж и Дистрибьюции",
      contact_desc: "Свяжитесь с нами для оптовых поставок, дилерского сотрудничества в регионах или получения тестовых образцов для вашей автомойки.",
      phone_tag: "Менеджер по продажам (Нажмите для звонка)",
      delivery_title: "Бесплатная Доставка по Ташкенту",
      delivery_desc: "Оперативная доставка заказов по городу Ташкент бесплатно. Доставка по регионам Узбекистана — по договоренности.",
      footer_copy: "© 2026 HOFFEN 1 — ООО «KNYAZOV». Все права защищены.",
      flipbook_header: "Официальный Каталог HOFFEN 1 - Электронный Журнал",
      page_label: "Страница"
    }
  };

  // DOM Elements
  const productsGrid = document.getElementById('productsGrid');
  const categoriesWrap = document.getElementById('categoriesWrap');
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');
  const langToggleBtn = document.getElementById('langToggleBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const cartBadge = document.getElementById('cartBadge');
  const openCartBtn = document.getElementById('openCartBtn');
  const floatCartBtn = document.getElementById('floatCartBtn');
  const cartModal = document.getElementById('cartModal');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartItemsWrap = document.getElementById('cartItemsWrap');
  const sendTelegramOrderBtn = document.getElementById('sendTelegramOrderBtn');
  const flipbookModal = document.getElementById('flipbookModal');
  const openFlipbookHeroBtn = document.getElementById('openFlipbookHeroBtn');
  const openFlipbookNavBtn = document.getElementById('openFlipbookNavBtn');
  const closeFlipbookBtn = document.getElementById('closeFlipbookBtn');
  const flipbookPageImg = document.getElementById('flipbookPageImg');
  const flipbookPrev = document.getElementById('flipbookPrev');
  const flipbookNext = document.getElementById('flipbookNext');
  const flipbookPageIndicator = document.getElementById('flipbookPageIndicator');
  const flipbookThumbStrip = document.getElementById('flipbookThumbStrip');
  const detailModal = document.getElementById('detailModal');
  const detailCloseBtn = document.getElementById('detailCloseBtn');
  const detailContent = document.getElementById('detailContent');
  const brandsGrid = document.getElementById('brandsGrid');
  const adminModal = document.getElementById('adminModal');
  const openAdminModalBtn = document.getElementById('openAdminModalBtn');
  const closeAdminModalBtn = document.getElementById('closeAdminModalBtn');

  // Initialize
  initApp();

  async function initApp() {
    updateLanguageTexts();
    renderBrands();
    renderCategoryPills();
    loadCachedServerPrices();
    renderProducts();
    updateCartUI();
    syncCatalogPagesFromProducts();
    renderFlipbookThumbs();
    initDeliveryLocationSelector();
    initCartLocationSelector();
    bindEvents();
    await loadServerPrices();
  }

  // Load cached prices immediately from localStorage
  function loadCachedServerPrices() {
    try {
      const cached = localStorage.getItem('hoffen_server_prices_cache');
      if (cached) {
        const data = JSON.parse(cached);
        if (data && data.products) {
          serverPrices = data;
          applyServerPricesToData(data);
        }
      }
    } catch(e) {}
  }

  function applyServerPricesToData(pricesObj) {
    if (!pricesObj) return;

    // 1. Synchronize custom & deleted products
    if (pricesObj.deleted_product_ids && Array.isArray(pricesObj.deleted_product_ids)) {
      HOFFEN_DATA.products = HOFFEN_DATA.products.filter(p => !pricesObj.deleted_product_ids.includes(p.id));
    }

    if (pricesObj.custom_products && Array.isArray(pricesObj.custom_products)) {
      pricesObj.custom_products.forEach(cp => {
        const idx = HOFFEN_DATA.products.findIndex(p => p.id === cp.id);
        if (idx >= 0) {
          HOFFEN_DATA.products[idx] = cp;
        } else {
          HOFFEN_DATA.products.push(cp);
        }
      });
    }

    // 2. Synchronize dynamic volumes from server prices
    if (pricesObj.products) {
      HOFFEN_DATA.products.forEach(p => {
        const pInfo = pricesObj.products[p.id];
        if (pInfo && pInfo.volumes && Object.keys(pInfo.volumes).length > 0) {
          p.volumes = Object.keys(pInfo.volumes);
        }
      });
    }

    // 3. Synchronize contacts & regional reps
    if (pricesObj.contacts) {
      syncContactsUI(pricesObj.contacts);
    }
  }

  // Load prices dynamically from Python Server or static data/prices.json on GitHub Pages
  async function loadServerPrices() {
    try {
      const res = await fetch(apiUrl('/api/prices?_t=' + Date.now()), { cache: 'no-store' });
      if (res.ok) {
        serverPrices = await res.json();
        applyServerPricesToData(serverPrices);
        try {
          localStorage.setItem('hoffen_server_prices_cache', JSON.stringify(serverPrices));
        } catch(e) {}

        renderProducts();
        updateCartUI();
        syncCatalogPagesFromProducts();
        renderFlipbookThumbs();
        return;
      }
    } catch (err) {
      // Server API mavjud bo'lmasa (masalan, GitHub Pages'da), statik fayldan o'qiymiz
    }

    // Static fallback for GitHub Pages
    try {
      const staticRes = await fetch(`data/prices.json?_t=${Date.now()}`);
      if (staticRes.ok) {
        serverPrices = await staticRes.json();
        applyServerPricesToData(serverPrices);
        try {
          localStorage.setItem('hoffen_server_prices_cache', JSON.stringify(serverPrices));
        } catch(e) {}

        renderProducts();
        updateCartUI();
        syncCatalogPagesFromProducts();
        renderFlipbookThumbs();
        return;
      }
    } catch (e) {
      console.log('Static data/prices.json yuklanmadi:', e);
    }

    loadCachedServerPrices();
  }

  // Live Real-Time Synchronization between Admin Panel and Catalog tabs
  window.addEventListener('storage', (e) => {
    if (e.key === 'hoffen_prices_sync' || e.key === 'hoffen_server_prices_cache') {
      loadCachedServerPrices();
      renderProducts();
      updateCartUI();
      syncCatalogPagesFromProducts();
      renderFlipbookThumbs();
      loadServerPrices();
    }
  });

  window.addEventListener('focus', () => {
    loadServerPrices();
  });

  // Dynamic Contacts & Regional Representatives Synchronization
  function syncContactsUI(contacts) {
    if (!contacts) return;

    const primaryPhone = contacts.primary_phone || '+998 97 407 00 64';
    const primaryTg = (contacts.primary_tg || 'Hoffen0064').replace('@', '');
    const hrPhone = contacts.hr_phone || '+998 77 488 00 64';
    const hrTg = (contacts.hr_tg || 'Hoffen1_HR').replace('@', '');

    // 1. Header quick call & TG
    const headerTgLink = document.getElementById('headerTgLink');
    if (headerTgLink) {
      headerTgLink.href = `https://t.me/${primaryTg}`;
      headerTgLink.title = `Telegram: @${primaryTg}`;
    }
    const headerPhoneLink = document.getElementById('headerPhoneLink');
    if (headerPhoneLink) {
      headerPhoneLink.href = `tel:${primaryPhone.replace(/\s+/g, '')}`;
      const span = headerPhoneLink.querySelector('span');
      if (span) span.textContent = primaryPhone;
    }

    // 2. Head Office contact buttons & numbers
    const headSalesTgBtn = document.getElementById('headSalesTgBtn');
    if (headSalesTgBtn) {
      headSalesTgBtn.href = `https://t.me/${primaryTg}`;
      const txt = document.getElementById('headSalesTgText');
      if (txt) txt.textContent = `Savdo: @${primaryTg}`;
    }

    const hrTgBtn = document.getElementById('hrTgBtn');
    if (hrTgBtn) {
      hrTgBtn.href = `https://t.me/${hrTg}`;
      const txt = document.getElementById('hrTgText');
      if (txt) txt.textContent = `HR: @${hrTg}`;
    }

    const headPhoneLink = document.getElementById('headPhoneLink');
    if (headPhoneLink) {
      headPhoneLink.href = `tel:${primaryPhone.replace(/\s+/g, '')}`;
      const val = document.getElementById('headPhoneVal');
      if (val) val.textContent = primaryPhone;
      const tag = document.getElementById('headPhoneTag');
      if (tag) tag.textContent = `Asosiy savdo bo'limi (Telegram: @${primaryTg})`;
    }

    const hrPhoneLink = document.getElementById('hrPhoneLink');
    if (hrPhoneLink) {
      hrPhoneLink.href = `tel:${hrPhone.replace(/\s+/g, '')}`;
      const val = document.getElementById('hrPhoneVal');
      if (val) val.textContent = hrPhone;
      const tag = document.getElementById('hrPhoneTag');
      if (tag) tag.textContent = `HR & Boshqaruv bo'limi (Telegram: @${hrTg})`;
    }

    // 3. Dynamic Representatives & Districts Synchronization
    if (contacts.representatives && Array.isArray(contacts.representatives) && contacts.districts && Array.isArray(contacts.districts)) {
      const repsMap = {};
      contacts.representatives.forEach(r => {
        repsMap[r.id] = r;
      });

      // Synchronize each district into HOFFEN_DATA.company.deliveryLocations
      contacts.districts.forEach(d => {
        const cat = d.category || 'other_regions';
        const targetLoc = HOFFEN_DATA.company.deliveryLocations[cat];
        if (!targetLoc) return;

        const boundRep = repsMap[d.rep_id] || contacts.representatives[0];
        const cleanPhone = boundRep ? (boundRep.phone || '') : '';
        const rawPhone = cleanPhone.replace(/\s+/g, '');
        const cleanTg = boundRep ? (boundRep.tg || '').replace('@', '') : 'Hoffen0064';
        const repName = boundRep ? boundRep.name : "Savdo vakili";

        if (!targetLoc.districts) targetLoc.districts = [];
        let existingDist = targetLoc.districts.find(item => item.id === d.id);
        if (existingDist) {
          existingDist.name_uz = d.name_uz || existingDist.name_uz;
          existingDist.rep = repName;
          existingDist.phone = cleanPhone;
          existingDist.raw = rawPhone;
          existingDist.tg = cleanTg;
          if (d.zone) existingDist.coverage_uz = d.zone;
        } else {
          // Brand new district added by admin!
          targetLoc.districts.push({
            id: d.id,
            name_uz: d.name_uz,
            name_ru: d.name_ru || d.name_uz,
            rep: repName,
            phone: cleanPhone,
            raw: rawPhone,
            tg: cleanTg,
            coverage_uz: d.zone || d.name_uz
          });
        }

        // If Tashkent region zones exist, update corresponding zone
        if (cat === 'tashkent_region' && targetLoc.zones) {
          targetLoc.zones.forEach(z => {
            if (z.districts && z.districts.includes(d.id)) {
              z.rep = repName;
              z.phone = cleanPhone;
              z.raw = rawPhone;
              z.tg = cleanTg;
            }
          });
        }
      });

      // City default rep sync
      const cityRep = contacts.representatives.find(r => r.id === 'rep_tashkent_city') || contacts.representatives[0];
      if (cityRep && HOFFEN_DATA.company.deliveryLocations.tashkent_city) {
        HOFFEN_DATA.company.deliveryLocations.tashkent_city.defaultRep = {
          rep: cityRep.name,
          phone: cityRep.phone,
          raw: (cityRep.phone || '').replace(/\s+/g, ''),
          tg: (cityRep.tg || '').replace('@', '')
        };
      }

      populateCartDistricts();
      renderDeliveryChips();
      renderDistrictResult();
      updateCartAgentBadge();
    } else if (contacts.regionalReps && Array.isArray(contacts.regionalReps)) {
      // Legacy fallback
      contacts.regionalReps.forEach(rep => {
        const rName = (rep.rep || '').toLowerCase();
        const rReg = (rep.region_uz || rep.region || '').toLowerCase();
        
        if (HOFFEN_DATA.company.deliveryLocations && HOFFEN_DATA.company.deliveryLocations.tashkent_region) {
          const tReg = HOFFEN_DATA.company.deliveryLocations.tashkent_region;
          if (tReg.districts) {
            tReg.districts.forEach(d => {
              const dRep = (d.rep || '').toLowerCase();
              const dId = (d.id || '').toLowerCase();
              const dName = (d.name_uz || '').toLowerCase();
              
              if (
                (rName && dRep.includes(rName)) ||
                (rReg && (rReg.includes(dId) || rReg.includes(dName)))
              ) {
                if (rep.phone) {
                  d.phone = rep.phone;
                  d.raw = rep.phone.replace(/\s+/g, '');
                }
                if (rep.tg) {
                  d.tg = rep.tg.replace('@', '');
                }
                if (rep.rep) {
                  d.rep = rep.rep;
                }
              }
            });
          }

          if (tReg.zones) {
            tReg.zones.forEach(z => {
              const zRep = (z.rep || '').toLowerCase();
              if (rName && zRep.includes(rName)) {
                if (rep.phone) {
                  z.phone = rep.phone;
                  z.raw = rep.phone.replace(/\s+/g, '');
                }
                if (rep.tg) {
                  z.tg = rep.tg.replace('@', '');
                }
                if (rep.rep) {
                  z.rep = rep.rep;
                }
              }
            });
          }
        }
      });

      populateCartDistricts();
      renderDeliveryChips();
      renderDistrictResult();
      updateCartAgentBadge();
    }
  }

  function getPrimaryTg() {
    return (serverPrices.contacts && serverPrices.contacts.primary_tg ? serverPrices.contacts.primary_tg.replace('@', '') : 'Hoffen0064');
  }

  function getPrimaryPhone() {
    return (serverPrices.contacts && serverPrices.contacts.primary_phone ? serverPrices.contacts.primary_phone : '+998 97 407 00 64');
  }

  // ===================================================================
  // INTERACTIVE DELIVERY LOCATION & AGENT SELECTOR (TOSHKENT & TASHOVUL)
  // ===================================================================

  function initDeliveryLocationSelector() {
    const deliveryTabs = document.getElementById('deliveryTabs');
    if (!deliveryTabs) return;

    deliveryTabs.querySelectorAll('.delivery-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        deliveryTabs.querySelectorAll('.delivery-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentDeliveryRegion = btn.getAttribute('data-region');
        
        const regionData = HOFFEN_DATA.company.deliveryLocations[currentDeliveryRegion];
        if (regionData && regionData.districts && regionData.districts.length > 0) {
          currentSelectedDistrict = regionData.districts[0].id;
          if (currentDeliveryRegion === 'other_regions') {
            currentSelectedDistrict = 'samarqand';
            currentSelectedCity = 'Samarqand shahri';
          } else {
            currentSelectedCity = '';
          }
        }
        renderDeliveryChips();
        renderDistrictResult();
        updateCartAgentBadge();
      });
    });

    renderDeliveryChips();
    renderDistrictResult();
  }

  function renderDeliveryChips() {
    const chipsGrid = document.getElementById('districtChipsGrid');
    const stepTitle = document.getElementById('districtStepTitle');
    if (!chipsGrid) return;

    const regionData = HOFFEN_DATA.company.deliveryLocations[currentDeliveryRegion];
    if (!regionData) return;

    if (stepTitle) {
      if (currentDeliveryRegion === 'tashkent_city') {
        stepTitle.textContent = currentLang === 'uz' ? "2-Qadam: Toshkent shahri tumanini tanlang (100% Bepul va Tezkor Yetkazish):" : "Шаг 2: Выберите район г. Ташкента (100% Бесплатная Доставка):";
      } else if (currentDeliveryRegion === 'tashkent_region') {
        stepTitle.textContent = currentLang === 'uz' ? "2-Qadam: Toshkent viloyati (Tashovul) — 5 ta Savdo Yo'nalishi (100% Bepul Yetkazish):" : "Шаг 2: Ташкентская область (Ташовул) — 5 Торговых Направлений (100% Бесплатная Доставка):";
      } else {
        stepTitle.textContent = currentLang === 'uz' ? "2-Qadam: Bosh Ofis Murojaati & Viloyat va Shaharni tanlang (100% Bepul Logistika):" : "Шаг 2: Головной Офис & Выберите область и город (100% Бесплатная Доставка):";
      }
    }

    // A. TASHKENT REGION (TASHOVUL) - 5 SEPARATE STRUCTURED ZONAL CARDS
    if (currentDeliveryRegion === 'tashkent_region' && regionData.zones) {
      chipsGrid.innerHTML = `
        <div class="delivery-hint-banner" style="width: 100%;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(5, 150, 105, 0.12); color: #059669; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0;">
            <i class="fa-solid fa-truck-fast"></i>
          </div>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px;">
              <span class="free-delivery-pill">
                <i class="fa-solid fa-gift"></i> 100% BEPUL YETKAZIB BERISH
              </span>
              <strong style="color: #0f1e36; font-size: 15px;">
                ${currentLang === 'uz' ? "Toshkent viloyati (Tashovul) bo'ylab yetkazib berish mutlaqo bepul!" : "Бесплатная доставка по всей Ташкентской области!"}
              </strong>
            </div>
            <div style="font-size: 13px; color: #475569; line-height: 1.5;">
              ${currentLang === 'uz' 
                ? "Viloyat 5 ta asosiy savdo yo'nalishiga ajratilgan. O'z tumaningiz yoki hududingiz ustiga bosing — unga mas'ul savdo agenti mahsulotlarni <strong>bepul</strong> yetkazib beradi:" 
                : "Область разделена на 5 торговых направлений. Выберите ваш район — ответственный торговый агент доставит заказ <strong>бесплатно</strong>:"}
            </div>
          </div>
          <div class="zero-cost-badge">
            <i class="fa-solid fa-circle-check"></i>
            <span>Yetkazish: <strong>0 so'm (BEPUL)</strong></span>
          </div>
        </div>
        <div class="tashkent-zones-grid" style="width: 100%;">
          ${regionData.zones.map((zone, idx) => {
            const isZoneActive = zone.districts.includes(currentSelectedDistrict);
            const zoneName = currentLang === 'uz' ? zone.name_uz : zone.name_ru;
            const cleanTg = (zone.tg || 'Hoffen0064').replace('@', '');
            const cleanPhone = (zone.raw || zone.phone || '').replace(/\s+/g, '');
            return `
              <div class="tashkent-zone-card ${isZoneActive ? 'active' : ''}" data-zone-id="${zone.id}">
                <!-- 1. Top Header -->
                <div class="zone-card-top">
                  <div class="zone-card-title-group">
                    <div class="zone-icon-box">
                      <i class="fa-solid ${zone.icon || 'fa-map-pin'}"></i>
                    </div>
                    <div>
                      <div class="zone-name">${idx + 1}. ${zoneName}</div>
                      <div class="zone-agent-info">
                        <i class="fa-solid fa-user-tie"></i>
                        <span>Mas'ul savdo vakili: <strong>${zone.rep}</strong></span>
                      </div>
                    </div>
                  </div>

                  <!-- 100% Bepul Yetkazish Yorlig'i -->
                  <div class="zone-free-badge">
                    <i class="fa-solid fa-truck-fast"></i>
                    <span>100% BEPUL YETKAZISH</span>
                  </div>
                </div>

                <!-- 2. Katta Telegram va Telefon Raqami Bloklari -->
                <div class="zone-contact-actions-row">
                  <a href="https://t.me/${cleanTg}" target="_blank" class="zone-big-tg-btn" title="Telegramda ochish: @${cleanTg}">
                    <i class="fa-brands fa-telegram"></i>
                    <div class="zone-btn-text-wrap">
                      <span class="zone-btn-label">Telegram orqali bog'lanish:</span>
                      <span class="zone-btn-val">@${cleanTg}</span>
                    </div>
                    <i class="fa-solid fa-arrow-up-right-from-square zone-btn-arrow"></i>
                  </a>

                  <a href="tel:${cleanPhone}" class="zone-big-call-btn" title="Qo'ng'iroq qilish: ${zone.phone}">
                    <i class="fa-solid fa-phone-volume"></i>
                    <div class="zone-btn-text-wrap">
                      <span class="zone-btn-label">Telefon orqali bog'lanish:</span>
                      <span class="zone-btn-val">${zone.phone}</span>
                    </div>
                    <i class="fa-solid fa-phone zone-btn-arrow"></i>
                  </a>
                </div>

                <!-- 3. Tumanlar Tanlash Chipslari -->
                <div class="zone-chips-section">
                  <div class="zone-chips-label">
                    <i class="fa-solid fa-location-dot" style="color: #2563eb;"></i>
                    <span>Ushbu yo'nalish tumanlari (birini tanlang):</span>
                  </div>
                  <div class="zone-chips-container">
                    ${zone.districts.map(dId => {
                      const dObj = regionData.districts.find(d => d.id === dId);
                      if (!dObj) return '';
                      const dName = currentLang === 'uz' ? dObj.name_uz : dObj.name_ru;
                      const isChipActive = dObj.id === currentSelectedDistrict;
                      return `
                        <button type="button" class="zone-chip-item ${isChipActive ? 'active' : ''}" data-district="${dObj.id}">
                          <i class="fa-solid fa-location-dot" style="font-size: 11px;"></i>
                          <span>${dName}</span>
                        </button>
                      `;
                    }).join('')}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      chipsGrid.querySelectorAll('.zone-chip-item').forEach(chip => {
        chip.addEventListener('click', (e) => {
          e.stopPropagation();
          currentSelectedDistrict = chip.getAttribute('data-district');
          renderDeliveryChips();
          renderDistrictResult();
        });
      });

      chipsGrid.querySelectorAll('.tashkent-zone-card').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('a') || e.target.closest('.zone-chip-item')) return;
          const zoneId = card.getAttribute('data-zone-id');
          const zoneObj = regionData.zones.find(z => z.id === zoneId);
          if (zoneObj && zoneObj.districts.length > 0) {
            currentSelectedDistrict = zoneObj.districts[0];
            renderDeliveryChips();
            renderDistrictResult();
          }
        });
      });
      return;
    }

    // B. TASHKENT CITY (TOSHKENT SHAHRI) - DIRECT CONTACT TO +998 77 488 00 64 (@Hoffen1_HR)
    if (currentDeliveryRegion === 'tashkent_city') {
      chipsGrid.innerHTML = `
        <div class="delivery-hint-banner" style="width: 100%;">
          <i class="fa-solid fa-bolt-lightning" style="color: var(--accent-yellow);"></i>
          <span>${currentLang === 'uz' 
            ? '<strong>Toshkent shahri (12 ta tuman) — 100% BEPUL va TEZKOR (2-4 soat) yetkazib berish.</strong> Boshqaruv & Aloqa: <strong>+998 77 488 00 64</strong> (Telegram: <strong>@Hoffen1_HR</strong>). O\'z tumaningizni tanlang:' 
            : '<strong>г. Ташкент (12 районов) — 100% БЕСПЛАТНАЯ и ЭКСПРЕСС-доставка (2-4 часа).</strong> Отдел продаж: <strong>+998 77 488 00 64</strong> (Telegram: <strong>@Hoffen1_HR</strong>). Выберите ваш район:'}
          </span>
        </div>

        <!-- Big Telegram and Phone Action Buttons -->
        <div class="zone-contact-actions-row" style="margin-bottom: 20px;">
          <a href="https://t.me/Hoffen1_HR" target="_blank" class="zone-big-tg-btn" title="Telegramda ochish: @Hoffen1_HR">
            <i class="fa-brands fa-telegram"></i>
            <div class="zone-btn-text-wrap">
              <span class="zone-btn-label">Toshkent Shahri Savdo Telegrami:</span>
              <span class="zone-btn-val">@Hoffen1_HR</span>
            </div>
            <i class="fa-solid fa-arrow-up-right-from-square zone-btn-arrow"></i>
          </a>

          <a href="tel:+998774880064" class="zone-big-call-btn" title="Qo'ng'iroq qilish: +998 77 488 00 64">
            <i class="fa-solid fa-phone-volume"></i>
            <div class="zone-btn-text-wrap">
              <span class="zone-btn-label">Toshkent Shahri Savdo Telefoni:</span>
              <span class="zone-btn-val">+998 77 488 00 64</span>
            </div>
            <i class="fa-solid fa-phone zone-btn-arrow"></i>
          </a>
        </div>

        <div class="district-chips-grid" style="width: 100%;">
          ${regionData.districts.map(d => {
            const name = currentLang === 'uz' ? d.name_uz : d.name_ru;
            const isActive = d.id === currentSelectedDistrict;
            return `
              <button type="button" class="district-chip ${isActive ? 'active' : ''}" data-district="${d.id}">
                <i class="fa-solid fa-location-dot" style="font-size: 11px;"></i>
                <span>${name}</span>
              </button>
            `;
          }).join('')}
        </div>
      `;

      chipsGrid.querySelectorAll('.district-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          chipsGrid.querySelectorAll('.district-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          currentSelectedDistrict = chip.getAttribute('data-district');
          renderDistrictResult();
        });
      });
      return;
    }

    // C. OTHER REGIONS (BOSHQA VILOYATLAR) - HEAD OFFICE APPLICATION & ALL PROVINCES/CITIES
    const primaryPhone = getPrimaryPhone();
    const primaryTg = getPrimaryTg();
    const officeData = regionData.office || {
      title_uz: "HOFFEN 1 Bosh Ofisi va Markaziy Logistika Markazi",
      company_uz: "«KNYAZOV» MChJ • Rasmiy Ishlab Chiqaruvchi",
      address_uz: "Toshkent shahri, Bektemir tumani, HOFFEN 1 Ishlab Chiqarish va Markaziy Ombor Majmuasi",
      work_hours_uz: "Dushanba — Shanba: 08:30 — 18:30",
      delivery_note_uz: "Viloyatlarga 100% BEPUL va xavfsiz logistika (Viloyatlararo maxsus marshrutlar orqali 24-48 soatda)"
    };

    const officeTitle = currentLang === 'uz' ? officeData.title_uz : officeData.title_ru;
    const officeCompany = currentLang === 'uz' ? officeData.company_uz : officeData.company_ru;
    const officeAddress = currentLang === 'uz' ? officeData.address_uz : officeData.address_ru;
    const officeHours = currentLang === 'uz' ? officeData.work_hours_uz : officeData.work_hours_ru;
    const officeDelivery = currentLang === 'uz' ? officeData.delivery_note_uz : officeData.delivery_note_ru;

    chipsGrid.innerHTML = `
      <!-- 1. BOSH OFIS MUROJAATI VA JOYLANUVI (QAYERDALIGI) KATTA KARTOCHKASI -->
      <div class="head-office-card">
        <div class="head-office-top">
          <div class="head-office-title-wrap">
            <div class="head-office-icon-box">
              <i class="fa-solid fa-building-flag"></i>
            </div>
            <div>
              <div class="head-office-name">${officeTitle}</div>
              <div class="head-office-company">${officeCompany}</div>
            </div>
          </div>
          <div class="zone-free-badge">
            <i class="fa-solid fa-truck-moving"></i>
            <span>100% BEPUL LOGISTIKA</span>
          </div>
        </div>

        <!-- Ofis Tafsilotlari & Qayerdaligi (Manzil, Ish tartibi, Kafolat) -->
        <div class="office-info-grid">
          <div class="office-info-item">
            <i class="fa-solid fa-location-dot"></i>
            <div>
              <strong>${currentLang === 'uz' ? 'Ofis Manzili (Joylashuvi):' : 'Адрес Головного Офиса:'}</strong>
              <div>${officeAddress}</div>
            </div>
          </div>

          <div class="office-info-item">
            <i class="fa-solid fa-clock"></i>
            <div>
              <strong>${currentLang === 'uz' ? 'Ish vaqti / Qabul:' : 'Режим работы / Прием:'}</strong>
              <div>${officeHours}</div>
            </div>
          </div>

          <div class="office-info-item">
            <i class="fa-solid fa-shield-halved"></i>
            <div>
              <strong>${currentLang === 'uz' ? 'Yetkazib berish kafolati:' : 'Гарантия логистики:'}</strong>
              <div>${officeDelivery}</div>
            </div>
          </div>
        </div>

        <!-- Katta Murojaat Tugmalari (Telegram va Qo'ng'iroq) -->
        <div class="zone-contact-actions-row">
          <a href="https://t.me/${primaryTg}" target="_blank" class="zone-big-tg-btn" title="Telegramda ochish: @${primaryTg}">
            <i class="fa-brands fa-telegram"></i>
            <div class="zone-btn-text-wrap">
              <span class="zone-btn-label">${currentLang === 'uz' ? 'Bosh Ofis Savdo Bo\'limi (Telegram):' : 'Отдел продаж головного офиса (Telegram):'}</span>
              <span class="zone-btn-val">@${primaryTg}</span>
            </div>
            <i class="fa-solid fa-arrow-up-right-from-square zone-btn-arrow"></i>
          </a>

          <a href="tel:${primaryPhone.replace(/\s+/g, '')}" class="zone-big-call-btn" title="Qo'ng'iroq qilish: ${primaryPhone}">
            <i class="fa-solid fa-phone-volume"></i>
            <div class="zone-btn-text-wrap">
              <span class="zone-btn-label">${currentLang === 'uz' ? 'Bosh Ofis Savdo Telefoni:' : 'Телефон продаж головного офиса:'}</span>
              <span class="zone-btn-val">${primaryPhone}</span>
            </div>
            <i class="fa-solid fa-phone zone-btn-arrow"></i>
          </a>
        </div>

        <!-- Qo'shimcha HR / Boshqaruv Aloqasi -->
        <div class="office-admin-secondary-row">
          <div>
            <i class="fa-solid fa-user-shield" style="margin-right: 6px;"></i>
            <strong>${currentLang === 'uz' ? 'Boshqaruv & HR Ma\'muriyati:' : 'Управление & HR:'}</strong>
            <span> +998 77 488 00 64</span>
          </div>
          <a href="https://t.me/Hoffen1_HR" target="_blank" title="Telegramda ochish">
            <i class="fa-brands fa-telegram"></i> @Hoffen1_HR orqali murojaat
          </a>
        </div>
      </div>

      <!-- 2. SHAHAR VA VILOYATLARNI TANLASH YO'RIQNOMA BANNERI -->
      <div class="delivery-hint-banner" style="width: 100%; margin-bottom: 20px;">
        <i class="fa-solid fa-map-location-dot" style="color: var(--accent-blue);"></i>
        <span>
          ${currentLang === 'uz'
            ? "<strong>O'z viloyatingiz hamda shahringizni tanlang:</strong> Bosh ofis logistika bo'limi mahsulotlarni to'g'ridan-to'g'ri Toshkent omboridan shahringizga 100% BEPUL yetkazib beradi:"
            : "<strong>Выберите вашу область и город:</strong> Служба логистики доставит продукцию прямо со склада в Ташкенте в ваш город 100% БЕСПЛАТНО:"}
        </span>
      </div>

      <!-- 3. 12 TA VILOYAT VA ULARNING SHAHAR/TUMANLARI RO'YXATI -->
      <div class="provinces-explorer-grid" style="width: 100%;">
        ${regionData.districts.map((prov, pIdx) => {
          const provName = currentLang === 'uz' ? prov.name_uz : prov.name_ru;
          const isProvActive = prov.id === currentSelectedDistrict;
          const citiesList = currentLang === 'uz' ? (prov.cities_uz || []) : (prov.cities_ru || prov.cities_uz || []);
          return `
            <div class="province-card ${isProvActive ? 'active' : ''}" data-province-id="${prov.id}">
              <div class="province-card-top">
                <div class="province-title-group">
                  <div class="province-icon">
                    <i class="fa-solid fa-map-pin"></i>
                  </div>
                  <div class="province-name">${pIdx + 1}. ${provName}</div>
                </div>
                <span class="zone-free-badge" style="font-size: 10px; padding: 4px 10px;">
                  100% BEPUL
                </span>
              </div>

              <div class="province-cities-section">
                <div class="province-cities-label">
                  <i class="fa-solid fa-city" style="color: #2563eb;"></i>
                  <span>${currentLang === 'uz' ? 'Shahar va tumanlar (birini tanlang):' : 'Города и районы:'}</span>
                </div>
                <div class="province-cities-wrap">
                  ${citiesList.map(cityName => {
                    const isCitySelected = (prov.id === currentSelectedDistrict && (currentSelectedCity === cityName || (!currentSelectedCity && cityName.includes('shahri'))));
                    return `
                      <button type="button" class="province-city-chip ${isCitySelected ? 'active' : ''}" data-province="${prov.id}" data-city="${cityName}">
                        <i class="fa-solid fa-location-dot" style="font-size: 9px;"></i>
                        <span>${cityName}</span>
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    chipsGrid.querySelectorAll('.province-city-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        currentSelectedDistrict = chip.getAttribute('data-province');
        currentSelectedCity = chip.getAttribute('data-city');
        renderDeliveryChips();
        renderDistrictResult();
        updateCartAgentBadge();
      });
    });

    chipsGrid.querySelectorAll('.province-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.province-city-chip')) return;
        const pId = card.getAttribute('data-province-id');
        const pObj = regionData.districts.find(d => d.id === pId);
        currentSelectedDistrict = pId;
        if (pObj && pObj.cities_uz && pObj.cities_uz.length > 0) {
          currentSelectedCity = pObj.cities_uz[0];
        }
        renderDeliveryChips();
        renderDistrictResult();
        updateCartAgentBadge();
      });
    });
    return;
  }

  function getAgentForDistrict(regionId, districtId) {
    const regionData = HOFFEN_DATA.company.deliveryLocations[regionId];
    if (!regionData) return null;

    if (regionId === 'tashkent_city') {
      const dist = regionData.districts.find(d => d.id === districtId);
      const defaultRep = regionData.defaultRep || {};
      const cityPhone = (dist && dist.phone) ? dist.phone : (defaultRep.phone || '+998 77 488 00 64');
      const cityRaw = cityPhone.replace(/\s+/g, '');
      const cityTg = (dist && dist.tg) ? dist.tg.replace('@', '') : (defaultRep.tg || 'Hoffen1_HR');
      const repName = (dist && dist.rep) ? dist.rep : (defaultRep.rep || (currentLang === 'uz' ? "Toshkent Shahri Savdo & Boshqaruv Bo'limi" : "Отдел продаж и управления по г. Ташкент"));
      return {
        name: repName,
        district_name: dist ? (currentLang === 'uz' ? dist.name_uz : dist.name_ru) : "Toshkent shahri",
        phone: cityPhone,
        raw_phone: cityRaw,
        tg: cityTg,
        coverage: currentLang === 'uz' ? "Toshkent shahri bo'ylab bepul tezkor logistika (2-4 soat)" : "Бесплатная экспресс-доставка по г. Ташкент (2-4 часа)",
        tag: currentLang === 'uz' ? `⚡ 100% Bepul va Tezkor Yetkazib Berish (${cityPhone})` : `⚡ 100% Бесплатная и Экспресс-доставка (${cityPhone})`,
        badge_icon: "fa-bolt-lightning"
      };
    }

    if (regionId === 'tashkent_region') {
      const dist = regionData.districts.find(d => d.id === districtId) || regionData.districts[0];
      const repName = dist && dist.rep ? dist.rep : "Hududiy savdo vakili";
      const repPhone = dist && dist.phone ? dist.phone : "+998 95 520 00 64";
      const repRaw = (dist && dist.raw ? dist.raw : repPhone).replace(/\s+/g, '');
      const repTg = (dist && dist.tg ? dist.tg : 'Hoffen0064').replace('@', '');
      return {
        name: repName,
        district_name: dist ? (currentLang === 'uz' ? dist.name_uz : dist.name_ru) : "Toshkent viloyati",
        phone: repPhone,
        raw_phone: repRaw,
        tg: repTg,
        coverage: dist && dist.coverage_uz ? (currentLang === 'uz' ? `Qamrov: ${dist.coverage_uz}` : `Зона: ${dist.coverage_uz}`) : (dist ? dist.name_uz : "Toshkent viloyati"),
        tag: currentLang === 'uz' ? "🚚 100% BEPUL YETKAZISH • Mintaqaviy Savdo Agenti" : "🚚 100% БЕСПЛАТНАЯ ДОСТАВКА • Региональный Агент",
        badge_icon: "fa-truck-fast"
      };
    }

    // other_regions
    const dist = regionData.districts.find(d => d.id === districtId) || regionData.districts[0];
    const distName = dist ? (currentLang === 'uz' ? dist.name_uz : dist.name_ru) : "Viloyat markazi";
    const selectedCity = currentSelectedCity || (dist && dist.cities_uz ? dist.cities_uz[0] : distName);
    const repName = (dist && dist.rep) ? dist.rep : (currentLang === 'uz' ? "Bosh Ofis Savdo Bo'limi (Menejer)" : "Главный отдел продаж (Менеджер)");
    const repPhone = (dist && dist.phone) ? dist.phone : getPrimaryPhone();
    const repRaw = (dist && dist.raw ? dist.raw : repPhone).replace(/\s+/g, '');
    const repTg = (dist && dist.tg ? dist.tg : getPrimaryTg()).replace('@', '');
    return {
      name: repName,
      district_name: `${distName} (${selectedCity})`,
      pure_city: selectedCity,
      province_name: distName,
      phone: repPhone,
      raw_phone: repRaw,
      tg: repTg,
      coverage: currentLang === 'uz' 
        ? `Toshkent Bosh Ofis omboridan ${selectedCity} va butun viloyat bo'ylab 100% BEPUL tezkor logistika (24-48 soat)` 
        : `100% бесплатная доставка из головного склада в г. ${selectedCity} и по всей области (24-48 часов)`,
      tag: currentLang === 'uz' ? "🚛 100% BEPUL LOGISTIKA • Bosh Ofis Murojaat Markazi" : "🚛 100% БЕСПЛАТНАЯ ЛОГИСТИКА • Головной Офис",
      badge_icon: "fa-truck-moving"
    };
  }

  function renderDistrictResult() {
    const resultPanel = document.getElementById('districtResultPanel');
    if (!resultPanel) return;

    const agent = getAgentForDistrict(currentDeliveryRegion, currentSelectedDistrict);
    if (!agent) return;

    const tgMessage = `Salom! HOFFEN 1 katalogi orqali bog'lanmoqdaman.\nHudud: ${agent.district_name}\nMahsulotlarga bepul yetkazib berish bilan buyurtma bermoqchiman.`;

    resultPanel.innerHTML = `
      <div class="result-agent-card">
        <div class="result-agent-badge">
          <i class="fa-solid ${agent.badge_icon}"></i>
          <span>${agent.tag}</span>
        </div>

        <div class="result-agent-header">
          <div class="agent-avatar-box">
            <i class="fa-solid fa-user-tie"></i>
          </div>
          <div class="agent-meta">
            <div class="agent-location-tag">
              <i class="fa-solid fa-map-pin"></i>
              <span>${agent.district_name}</span>
            </div>
            <div class="agent-name">${agent.name}</div>
            <div class="agent-service-note">
              <i class="fa-solid fa-circle-check" style="color: var(--accent-green); font-size: 13px;"></i>
              <span>${agent.coverage}</span>
            </div>
          </div>
        </div>

        <div class="agent-quick-actions">
          <a href="https://t.me/${agent.tg}?text=${encodeURIComponent(tgMessage)}" target="_blank" class="agent-btn-tg">
            <i class="fa-brands fa-telegram"></i>
            <span>Telegram: @${agent.tg} bilan bog'lanish</span>
          </a>
          <a href="tel:${agent.raw_phone}" class="agent-btn-call">
            <i class="fa-solid fa-phone"></i>
            <span>${agent.phone}</span>
          </a>
          <button type="button" class="agent-btn-catalog" onclick="document.getElementById('catalog').scrollIntoView({behavior: 'smooth'})">
            <i class="fa-solid fa-cart-plus"></i>
            <span>Mahsulot tanlash</span>
          </button>
        </div>
      </div>
    `;
  }

  // ===================================================================
  // CART DRAWER LOCATION & AGENT ROUTING
  // ===================================================================
  function populateCartDistricts() {
    const regionSelect = document.getElementById('cartRegionSelect');
    const districtSelect = document.getElementById('cartDistrictSelect');
    if (!regionSelect || !districtSelect) return;

    const regionId = regionSelect.value;
    const regionData = HOFFEN_DATA.company.deliveryLocations[regionId];
    if (!regionData) return;

    districtSelect.innerHTML = regionData.districts.map(d => {
      const name = currentLang === 'uz' ? d.name_uz : d.name_ru;
      const citiesHint = (regionId === 'other_regions' && d.cities_uz) ? ` (${d.cities_uz.slice(0, 3).join(', ')}...)` : '';
      return `<option value="${d.id}">${name}${citiesHint}</option>`;
    }).join('');

    updateCartAgentBadge();
  }

  function updateCartAgentBadge() {
    const regionSelect = document.getElementById('cartRegionSelect');
    const districtSelect = document.getElementById('cartDistrictSelect');
    const badgeText = document.getElementById('cartAssignedAgentText');
    if (!regionSelect || !districtSelect || !badgeText) return;

    const regionId = regionSelect.value;
    const districtId = districtSelect.value;
    const agent = getAgentForDistrict(regionId, districtId);
    if (agent) {
      badgeText.innerHTML = `Mas'ul savdo vakili: <strong>${agent.name} (${agent.phone}, @${agent.tg})</strong>`;
    }
  }

  function initCartLocationSelector() {
    const regionSelect = document.getElementById('cartRegionSelect');
    const districtSelect = document.getElementById('cartDistrictSelect');
    if (!regionSelect || !districtSelect) return;

    regionSelect.addEventListener('change', populateCartDistricts);
    districtSelect.addEventListener('change', updateCartAgentBadge);

    populateCartDistricts();
  }

  function getPrimaryTg() {
    return (serverPrices.contacts && serverPrices.contacts.primary_tg ? serverPrices.contacts.primary_tg.replace('@', '') : 'Hoffen0064');
  }

  function getPrimaryPhone() {
    return (serverPrices.contacts && serverPrices.contacts.primary_phone ? serverPrices.contacts.primary_phone : '+998 97 407 00 64');
  }

  // Update dynamic texts
  function updateLanguageTexts() {
    const t = I18N[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    if (searchInput) {
      searchInput.placeholder = t.search_placeholder;
    }
    if (langToggleBtn) {
      langToggleBtn.textContent = currentLang === 'uz' ? "O'ZB | RU" : "RU | O'ZB";
    }
  }

  // Render Brands section
  function renderBrands() {
    if (!brandsGrid) return;
    brandsGrid.innerHTML = HOFFEN_DATA.company.subBrands.map((b, idx) => {
      const isHoffen = b.name === 'HOFFEN 1' || idx === 0;
      let targetCat = 'all';
      if (b.name === 'GRAFF') targetCat = 'antifreeze';
      else if (b.name === 'NANO FOGGER') targetCat = 'fogger';
      else if (b.name === 'HOFFEN HOME') targetCat = 'home';
      else if (b.name === 'HOFFEN 1') targetCat = 'shampoo';

      return `
        <div class="brand-card ${isHoffen ? 'brand-card-flagship' : ''}" 
             data-cat="${targetCat}" 
             onclick="selectBrandCategory('${targetCat}')" 
             style="--brand-accent: ${isHoffen ? '#1e40af' : b.color};"
             title="${b.name} mahsulotlariga o'tish">
          <div class="brand-card-top">
            ${isHoffen 
              ? `<img src="assets/images/hoffen_pure_badge.png" alt="HOFFEN 1" class="brand-card-badge-img">`
              : `<span class="brand-card-name" style="color: ${b.color};"><i class="fa-solid fa-certificate"></i> ${b.name}</span>`
            }
            ${isHoffen ? `<span class="flagship-tag"><i class="fa-solid fa-crown"></i> Flagman</span>` : ''}
          </div>
          <div class="brand-card-desc">
            ${currentLang === 'uz' ? b.desc_uz : b.desc_ru}
          </div>
          <div class="brand-card-nav-link">
            <span>${currentLang === 'uz' ? 'Mahsulotlarni ko\'rish' : 'Смотреть продукцию'}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      `;
    }).join('');
  }

  window.selectBrandCategory = function(catId) {
    currentCategory = catId;
    renderCategoryPills();
    renderProducts();
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Render Categories
  function renderCategoryPills() {
    if (!categoriesWrap) return;
    categoriesWrap.innerHTML = HOFFEN_DATA.categories.map(cat => `
      <button class="cat-pill ${cat.id === currentCategory ? 'active' : ''}" data-cat="${cat.id}">
        <i class="fa-solid ${cat.icon}"></i>
        ${currentLang === 'uz' ? cat.name_uz : cat.name_ru}
      </button>
    `).join('');
  }

  // Render Product Cards
  function renderProducts() {
    if (!productsGrid) return;

    let filtered = HOFFEN_DATA.products.filter(p => {
      const matchCategory = currentCategory === 'all' || p.category === currentCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        p.code.toLowerCase().includes(q) ||
        p.name_uz.toLowerCase().includes(q) ||
        p.name_ru.toLowerCase().includes(q) ||
        p.desc_uz.toLowerCase().includes(q) ||
        p.desc_ru.toLowerCase().includes(q) ||
        (p.scents && p.scents.some(s => s.toLowerCase().includes(q)));
      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="no-results">
          <i class="fa-solid fa-box-open"></i>
          <h3>${I18N[currentLang].no_results}</h3>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filtered.map(p => {
      const inCart = cart.some(item => item.id === p.id);
      const name = currentLang === 'uz' ? p.name_uz : p.name_ru;
      const tagline = currentLang === 'uz' ? p.tagline_uz : p.tagline_ru;

      return `
        <div class="product-card" data-id="${p.id}" onclick="handleProductCardClick(event, '${p.id}')">
          <div class="card-top">
            <span class="card-badge">${p.brand}</span>
            <button class="card-zoom-btn" onclick="event.stopPropagation(); openDetailModal('${p.id}')" title="${I18N[currentLang].btn_detail}">
              <i class="fa-solid fa-expand"></i>
            </button>
            <img src="${p.image}" alt="${name}" class="product-thumb" loading="lazy">
            <span class="card-view-chip">
              <i class="fa-solid fa-circle-info"></i> ${currentLang === 'uz' ? 'Batafsil ko\'rish' : 'Подробнее'}
            </span>
          </div>
          <div class="card-body">
            <span class="card-code">${p.code}</span>
            <h3 class="card-name">${name}</h3>
            <p class="card-tagline">${tagline}</p>
            
            <!-- Volume & Price Sequence (Ketma-ketlik: 1L, 5kg, 20kg va narxlari) -->
            <div class="card-vol-prices-seq">
              <div class="vol-seq-header">
                <i class="fa-solid fa-layer-group"></i>
                <span>${currentLang === 'uz' ? 'Hajmlar va Narxlar:' : 'Объемы и Цены:'}</span>
              </div>
              <div class="vol-seq-list">
                ${p.volumes.map(v => {
                  const prodPrice = serverPrices.products && serverPrices.products[p.id];
                  const volPrice = (prodPrice && prodPrice.volumes && prodPrice.volumes[v] !== undefined && prodPrice.volumes[v] !== '') ? prodPrice.volumes[v] : ((p.default_prices && p.default_prices[v]) || '');
                  const hasPrice = serverPrices.show_prices_public && volPrice !== '' && volPrice !== undefined;
                  const iconCls = v.includes('kg') ? 'fa-weight-hanging' : ((v.includes('L') || v.includes('l') || v.includes('ml')) ? 'fa-flask' : 'fa-box');
                  return `
                    <div class="vol-seq-item ${hasPrice ? 'has-price' : ''}" onclick="event.stopPropagation(); openVolumeSelector('${p.id}', '${v}')" title="${currentLang === 'uz' ? 'Xarid savatiga qo\'shish' : 'Добавить в корзину'}">
                      <span class="vol-seq-badge">
                        <i class="fa-solid ${iconCls}"></i> ${v}
                      </span>
                      <span class="vol-seq-price">
                        ${hasPrice ? `${volPrice} <small>so'm</small>` : (currentLang === 'uz' ? 'Kelishilgan' : 'По запросу')}
                      </span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="card-footer" onclick="event.stopPropagation()">
              <button class="btn-card-inquiry ${inCart ? 'inquired' : ''}" onclick="openVolumeSelector('${p.id}')">
                <i class="fa-solid fa-cart-shopping"></i>
                <span>${inCart ? I18N[currentLang].btn_inquired : I18N[currentLang].btn_inquiry}</span>
              </button>
              <a href="https://t.me/${getPrimaryTg()}?text=${encodeURIComponent(`Salom! HOFFEN katalogidan shu vosita bo'yicha ma'lumot va narx olmoqchiman:\nKodi: ${p.code}\nMahsulot: ${name}\nHajmlar: ${p.volumes ? p.volumes.join(', ') : ''}`)}" target="_blank" class="btn-card-tg" title="Telegram orqali to'g'ridan-to'g'ri bog'lanish va buyurtma (@${getPrimaryTg()})">
                <i class="fa-brands fa-telegram"></i>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Handle clicking on product card to open details modal
  window.handleProductCardClick = function(event, prodId) {
    if (event.target.closest('.card-footer') || event.target.closest('button') || event.target.closest('a')) {
      return;
    }
    openDetailModal(prodId);
  };

  // Helper functions for pricing
  function parseNumericPrice(priceStr) {
    if (!priceStr || typeof priceStr !== 'string') return 0;
    const digits = priceStr.replace(/\D/g, '');
    return digits ? parseInt(digits, 10) : 0;
  }

  function formatPrice(num) {
    if (!num || isNaN(num)) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  // Volume & Quantity Selector State & Handlers
  let activeVolSelectorProdId = null;
  let activeVolSelectorSelectedVol = '';
  let activeVolSelectorQty = 1;

  window.openVolumeSelector = function(prodId, preselectedVol = null) {
    const prod = HOFFEN_DATA.products.find(p => p.id === prodId);
    if (!prod) return;

    activeVolSelectorProdId = prodId;
    const volumes = prod.volumes && prod.volumes.length > 0 ? prod.volumes : ['1 dona'];
    activeVolSelectorSelectedVol = (preselectedVol && volumes.includes(preselectedVol)) ? preselectedVol : volumes[0];
    activeVolSelectorQty = 1;

    const modal = document.getElementById('volSelectModal');
    const img = document.getElementById('volModalImg');
    const code = document.getElementById('volModalCode');
    const title = document.getElementById('volModalTitle');
    const qtyInp = document.getElementById('volQtyInput');

    if (img) img.src = prod.image;
    if (code) code.textContent = `${prod.brand} • ${prod.code}`;
    if (title) title.textContent = currentLang === 'uz' ? prod.name_uz : prod.name_ru;
    if (qtyInp) qtyInp.value = 1;

    renderVolModalOptions(prod, volumes);
    setVolSelectorQty(1);

    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  function renderVolModalOptions(prod, volumes) {
    const grid = document.getElementById('volOptionsGrid');
    if (!grid) return;

    grid.innerHTML = volumes.map(v => {
      const prodPrice = serverPrices.products && serverPrices.products[prod.id];
      const volPrice = (prodPrice && prodPrice.volumes && prodPrice.volumes[v] !== undefined && prodPrice.volumes[v] !== '') ? prodPrice.volumes[v] : ((prod.default_prices && prod.default_prices[v]) || '');
      const hasPrice = serverPrices.show_prices_public && volPrice !== '' && volPrice !== undefined;
      const isSelected = v === activeVolSelectorSelectedVol;
      const iconCls = v.includes('kg') ? 'fa-weight-hanging' : ((v.includes('L') || v.includes('l') || v.includes('ml')) ? 'fa-flask' : 'fa-box');

      return `
        <div class="vol-option-card ${isSelected ? 'active' : ''}" onclick="selectVolOption('${v}')">
          <div class="vol-opt-left">
            <div class="vol-opt-icon">
              <i class="fa-solid ${iconCls}"></i>
            </div>
            <div>
              <span class="vol-opt-name">${v}</span>
              <span class="vol-opt-price">${hasPrice ? `${volPrice} so'm` : (currentLang === 'uz' ? 'Kelishilgan' : 'По запросу')}</span>
            </div>
          </div>
          <div class="vol-opt-check">
            <i class="fa-solid fa-check"></i>
          </div>
        </div>
      `;
    }).join('');
  }

  window.selectVolOption = function(vol) {
    activeVolSelectorSelectedVol = vol;
    const prod = HOFFEN_DATA.products.find(p => p.id === activeVolSelectorProdId);
    if (prod) {
      const volumes = prod.volumes && prod.volumes.length > 0 ? prod.volumes : ['1 dona'];
      renderVolModalOptions(prod, volumes);
    }
    updateVolModalCalculation();
  };

  window.setVolSelectorQty = function(qty) {
    activeVolSelectorQty = Math.max(1, parseInt(qty, 10) || 1);
    const qtyInp = document.getElementById('volQtyInput');
    if (qtyInp) qtyInp.value = activeVolSelectorQty;

    // Highlight active preset chip (1, 2, 5, 12, 24 dona)
    document.querySelectorAll('.vol-preset-btn').forEach(btn => {
      const match = btn.textContent.match(/\d+/);
      const val = match ? parseInt(match[0], 10) : 0;
      if (val === activeVolSelectorQty) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    updateVolModalCalculation();
  };

  window.changeVolSelectorQty = function(delta) {
    setVolSelectorQty(activeVolSelectorQty + delta);
  };

  function updateVolModalCalculation() {
    const prod = HOFFEN_DATA.products.find(p => p.id === activeVolSelectorProdId);
    if (!prod) return;

    const prodPrice = serverPrices.products && serverPrices.products[prod.id];
    const volPrice = (prodPrice && prodPrice.volumes && prodPrice.volumes[activeVolSelectorSelectedVol] !== undefined && prodPrice.volumes[activeVolSelectorSelectedVol] !== '') ? prodPrice.volumes[activeVolSelectorSelectedVol] : ((prod.default_prices && prod.default_prices[activeVolSelectorSelectedVol]) || '');
    const hasPrice = serverPrices.show_prices_public && volPrice !== '' && volPrice !== undefined;
    const numPrice = parseNumericPrice(volPrice);

    const calcVol = document.getElementById('volCalcSelectedVol');
    const calcUnit = document.getElementById('volCalcUnitPrice');
    const calcTotal = document.getElementById('volCalcTotalPrice');

    if (calcVol) calcVol.textContent = activeVolSelectorSelectedVol || '-';
    if (calcUnit) {
      calcUnit.textContent = hasPrice ? `${volPrice} so'm` : (currentLang === 'uz' ? 'Kelishilgan' : 'По запросу');
    }
    if (calcTotal) {
      if (hasPrice && numPrice > 0) {
        calcTotal.textContent = `${formatPrice(numPrice * activeVolSelectorQty)} so'm`;
      } else if (hasPrice && numPrice === 0) {
        calcTotal.textContent = `0 so'm`;
      } else {
        calcTotal.textContent = currentLang === 'uz' ? 'Kelishilgan' : 'По запросу';
      }
    }
  }

  window.closeVolumeSelector = function() {
    const modal = document.getElementById('volSelectModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  window.openCartDrawerDirectly = function() {
    closeVolumeSelector();
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
      const regionSelect = document.getElementById('cartRegionSelect');
      const districtSelect = document.getElementById('cartDistrictSelect');
      if (regionSelect) {
        regionSelect.value = currentDeliveryRegion;
        populateCartDistricts();
        if (districtSelect && currentSelectedDistrict) {
          districtSelect.value = currentSelectedDistrict;
          updateCartAgentBadge();
        }
      }
      cartModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.confirmAddToCart = function(openDrawer = true) {
    if (!activeVolSelectorProdId || !activeVolSelectorSelectedVol) return;
    addVolumeToCart(activeVolSelectorProdId, activeVolSelectorSelectedVol, activeVolSelectorQty);
    closeVolumeSelector();

    if (openDrawer) {
      setTimeout(() => {
        openCartDrawerDirectly();
      }, 120);
    }
  };

  // Cart Functions
  window.addVolumeToCart = function(prodId, volume, qty = 1) {
    const prod = HOFFEN_DATA.products.find(p => p.id === prodId);
    if (!prod) return;

    const cartKey = `${prodId}___${volume}`;
    const prodPrice = serverPrices.products && serverPrices.products[prod.id];
    const volPrice = (prodPrice && prodPrice.volumes && prodPrice.volumes[volume] !== undefined && prodPrice.volumes[volume] !== '') ? prodPrice.volumes[volume] : ((prod.default_prices && prod.default_prices[volume]) || '');
    const numPrice = parseNumericPrice(volPrice);

    const existingIndex = cart.findIndex(item => item.cartKey === cartKey || (item.id === prodId && item.volume === volume));
    if (existingIndex >= 0) {
      cart[existingIndex].qty += qty;
      if (volPrice) cart[existingIndex].price = volPrice;
      if (numPrice) cart[existingIndex].numericPrice = numPrice;
      cart[existingIndex].cartKey = cartKey;
    } else {
      cart.push({
        id: prod.id,
        cartKey: cartKey,
        code: prod.code,
        name_uz: prod.name_uz,
        name_ru: prod.name_ru,
        image: prod.image,
        volume: volume,
        price: volPrice,
        numericPrice: numPrice,
        qty: qty
      });
    }

    saveCart();
    renderProducts();
    updateCartUI();
  };

  window.toggleCartItem = function(prodId) {
    // Forward directly to openVolumeSelector for precise volume & quantity selection
    openVolumeSelector(prodId);
  };

  window.changeCartQty = function(itemKey, delta) {
    const item = cart.find(i => i.cartKey === itemKey || i.id === itemKey);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => (i.cartKey !== itemKey && i.id !== itemKey));
    }
    saveCart();
    renderProducts();
    updateCartUI();
  };

  window.removeCartItem = function(itemKey) {
    cart = cart.filter(i => (i.cartKey !== itemKey && i.id !== itemKey));
    saveCart();
    renderProducts();
    updateCartUI();
  };

  function saveCart() {
    localStorage.setItem('hoffen_cart', JSON.stringify(cart));
  }

  function updateCartUI() {
    const totalCount = cart.reduce((acc, i) => acc + i.qty, 0);
    const totalSum = cart.reduce((acc, i) => acc + ((i.numericPrice || 0) * i.qty), 0);

    if (cartBadge) {
      cartBadge.textContent = totalCount;
      cartBadge.style.display = totalCount > 0 ? 'flex' : 'none';
    }
    if (floatCartBtn) {
      floatCartBtn.style.display = totalCount > 0 ? 'flex' : 'none';
      const floatCount = floatCartBtn.querySelector('.float-count');
      if (floatCount) floatCount.textContent = totalCount;
    }

    if (!cartItemsWrap) return;
    if (cart.length === 0) {
      cartItemsWrap.innerHTML = `
        <div class="cart-empty">
          <i class="fa-solid fa-cart-arrow-down" style="font-size: 40px; margin-bottom: 12px; opacity: 0.4;"></i>
          <p>${I18N[currentLang].cart_empty}</p>
        </div>
      `;
      return;
    }

    let itemsHtml = cart.map(item => {
      const name = currentLang === 'uz' ? item.name_uz : item.name_ru;
      const key = item.cartKey || item.id;
      const hasPrice = serverPrices.show_prices_public && item.price;
      const itemSubtotal = (item.numericPrice && item.numericPrice > 0) ? (item.numericPrice * item.qty) : 0;

      return `
        <div class="cart-item">
          <img src="${item.image}" alt="${name}" class="cart-item-img">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.code} - ${name}</div>
            <span class="cart-item-vol-tag"><i class="fa-solid fa-flask"></i> ${item.volume}</span>
            <div class="cart-item-price-meta">
              <span>${hasPrice ? `${item.price} so'm` : (currentLang === 'uz' ? 'Kelishilgan' : 'По запросу')}</span>
              ${(hasPrice && itemSubtotal > 0) ? `<span>• Jami: <strong>${formatPrice(itemSubtotal)} so'm</strong></span>` : ''}
            </div>
          </div>
          <div class="cart-item-actions">
            <button class="qty-btn" onclick="changeCartQty('${key}', -1)">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="changeCartQty('${key}', 1)">+</button>
            <button class="cart-item-remove" onclick="removeCartItem('${key}')" title="O'chirish">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    const summaryHtml = `
      <div class="cart-summary-total-box">
        <div class="cart-summary-total-row">
          <span>${currentLang === 'uz' ? 'Jami buyurtma summasi:' : 'Итоговая сумма заказа:'}</span>
          <span class="cart-summary-total-price">${(serverPrices.show_prices_public && totalSum > 0) ? `${formatPrice(totalSum)} so'm` : (currentLang === 'uz' ? 'Kelishilgan' : 'По запросу')}</span>
        </div>
        <div class="cart-free-delivery-badge">
          <i class="fa-solid fa-truck-fast"></i>
          <span>${currentLang === 'uz' ? 'Yetkazib berish: 100% BEPUL (Barcha hududlarga)' : 'Доставка: 100% БЕСПЛАТНО (Во все регионы)'}</span>
        </div>
      </div>
    `;

    cartItemsWrap.innerHTML = itemsHtml + summaryHtml;
  }

  // Send Order to Telegram (Smart Regional Routing)
  if (sendTelegramOrderBtn) {
    sendTelegramOrderBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert(I18N[currentLang].cart_empty);
        return;
      }
      const nameVal = document.getElementById('orderNameInput')?.value || 'Hurmatli mijoz';
      const phoneVal = document.getElementById('orderPhoneInput')?.value || 'Ko\'rsatilmadi';
      const regionSelect = document.getElementById('cartRegionSelect');
      const districtSelect = document.getElementById('cartDistrictSelect');
      const regionId = regionSelect ? regionSelect.value : 'tashkent_city';
      const districtId = districtSelect ? districtSelect.value : 'chilonzor';
      const agent = getAgentForDistrict(regionId, districtId);

      const regionTitle = regionSelect && regionSelect.selectedIndex >= 0 ? regionSelect.options[regionSelect.selectedIndex].text : 'Toshkent';
      const districtTitle = districtSelect && districtSelect.selectedIndex >= 0 ? districtSelect.options[districtSelect.selectedIndex].text : 'Markaz';
      const destinationText = (regionId === 'other_regions' && currentSelectedCity) 
        ? `${districtTitle} (Shahar / Tuman: ${currentSelectedCity})` 
        : `${regionTitle} - ${districtTitle}`;

      let text = `📦 HOFFEN 1 - Yangi Mahsulot So'rovi / Buyurtma:\n\n`;
      text += `👤 Mijoz: ${nameVal}\n`;
      text += `📞 Telefon: ${phoneVal}\n`;
      text += `📍 Yetkazish manzili: ${destinationText}\n`;
      text += `🚚 Yetkazib berish: 100% BEPUL LOGISTIKA\n`;
      if (agent) {
        text += `👨‍💼 Mas'ul: ${agent.name} (@${agent.tg})\n`;
      }
      text += `\n📋 Tanlangan mahsulotlar (Hajmi va Miqdori):\n`;

      let totalOrderSum = 0;
      cart.forEach((item, idx) => {
        const title = currentLang === 'uz' ? item.name_uz : item.name_ru;
        const itemSubtotal = (item.numericPrice && item.numericPrice > 0) ? (item.numericPrice * item.qty) : 0;
        totalOrderSum += itemSubtotal;
        const priceInfo = item.price ? ` [${item.price} so'm]` : '';
        const subtotalInfo = itemSubtotal > 0 ? ` (Jami: ${formatPrice(itemSubtotal)} so'm)` : '';
        text += `${idx + 1}. ${item.code} - ${title}\n   👉 Hajmi: ${item.volume}\n   👉 Miqdori: ${item.qty} dona${priceInfo}${subtotalInfo}\n`;
      });

      if (totalOrderSum > 0) {
        text += `\n💰 JAMI BUYURTMA SUMMASI: ${formatPrice(totalOrderSum)} so'm\n`;
      }
      text += `🚚 YETKAZIB BERISH: 100% BEPUL\n`;
      text += `\nIltimos, ushbu buyurtmani tasdiqlang va bepul yetkazib berishni amalga oshiring!`;

      // 1. Save order in the database for admin access and statistics
      const agentName = agent ? agent.name : "Bosh Savdo Menejeri";
      const agentPhone = agent ? agent.phone : getPrimaryPhone();
      const agentTg = agent ? agent.tg : getPrimaryTg();

      localStorage.setItem('hoffen_client_phone', phoneVal);
      localStorage.setItem('hoffen_client_name', nameVal);

      const orderPayload = {
        customer_name: nameVal,
        customer_phone: phoneVal,
        destination: destinationText,
        region_id: regionId,
        district_id: districtId,
        agent: `${agentName} (${agentPhone}, @${agentTg})`,
        agent_name: agentName,
        agent_phone: agentPhone,
        agent_tg: agentTg,
        target_name: agentName,
        target_phone: agentPhone,
        target_tg: agentTg,
        items: cart.map(item => ({
          id: item.id,
          code: item.code || '',
          name: currentLang === 'uz' ? item.name_uz : item.name_ru,
          volume: item.volume || 'Standart',
          qty: item.qty || 1,
          price: item.price || '',
          subtotal: (item.numericPrice && item.numericPrice > 0) ? (item.numericPrice * item.qty) : 0
        })),
        total_items_count: cart.reduce((acc, it) => acc + (it.qty || 1), 0),
        total_sum: totalOrderSum,
        source: 'telegram'
      };

      try {
        fetch(apiUrl('/api/create-order'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload)
        }).catch(() => {});
      } catch (err) {}

      // Cache locally for offline & GitHub Pages Admin
      try {
        const cached = JSON.parse(localStorage.getItem('hoffen_orders_cache') || '[]');
        cached.unshift(orderPayload);
        localStorage.setItem('hoffen_orders_cache', JSON.stringify(cached));
      } catch(e) {}

      // 2. Auto-copy to clipboard for maximum reliability
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(() => {});
      }

      // 3. Direct route to the assigned agent's telegram!
      const targetTg = agent && agent.tg ? agent.tg.replace('@', '') : getPrimaryTg();
      const url = `https://t.me/${targetTg}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }

  // Telegram Quick Contact Prompt State
  let pendingTgData = null;

  window.closeTgPromptModal = function() {
    const modal = document.getElementById('tgPromptModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  window.bypassTgPromptModal = function() {
    if (!pendingTgData) return;
    const { target, targetName, targetPhone, context, url } = pendingTgData;
    
    try {
      fetch(apiUrl('/api/track-telegram'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'telegram_click',
          target: target,
          target_name: targetName,
          target_phone: targetPhone,
          target_tg: target,
          agent_name: targetName,
          agent_phone: targetPhone,
          agent_tg: target,
          customer_name: "Telegram murojaatchi",
          customer_phone: "Ko'rsatilmadi",
          context: context
        })
      }).catch(() => {});
    } catch (e) {}

    closeTgPromptModal();
    window.open(url, '_blank');
  };

  window.submitTgPromptModal = function() {
    if (!pendingTgData) return;
    const phoneInp = document.getElementById('tgPromptPhoneInput');
    const nameInp = document.getElementById('tgPromptNameInput');

    const phone = phoneInp ? phoneInp.value.trim() : '';
    const name = nameInp ? nameInp.value.trim() : '';

    if (!phone || phone.length < 7) {
      alert("Iltimos, telefon raqamingizni to'liq kiriting!");
      if (phoneInp) phoneInp.focus();
      return;
    }

    localStorage.setItem('hoffen_client_phone', phone);
    if (name) localStorage.setItem('hoffen_client_name', name);

    const { target, targetName, targetPhone, context, url } = pendingTgData;

    try {
      fetch(apiUrl('/api/track-telegram'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'telegram_click',
          target: target,
          target_name: targetName,
          target_phone: targetPhone,
          target_tg: target,
          agent_name: targetName,
          agent_phone: targetPhone,
          agent_tg: target,
          customer_name: name || "Mijoz (Saytdan)",
          customer_phone: phone,
          context: context
        })
      }).catch(() => {});
    } catch (e) {}

    closeTgPromptModal();
    window.open(url, '_blank');
  };

  // Global Telegram Click Tracking with Client Phone Capture
  document.addEventListener('click', (e) => {
    const tgLink = e.target.closest('a[href*="t.me"]');
    if (!tgLink) return;

    if (tgLink.closest('#tgPromptModal') || tgLink.closest('#sendTelegramOrderBtn')) return;

    const href = tgLink.getAttribute('href') || '';
    let target = '@Hoffen0064';
    const match = href.match(/t\.me\/([a-zA-Z0-9_+]+)/);
    if (match && match[1]) target = '@' + match[1];

    let targetName = "Bosh Savdo Menejeri";
    let targetPhone = getPrimaryPhone();
    const cleanTarget = target.replace('@', '').toLowerCase();

    const reps = (serverPrices.contacts && serverPrices.contacts.representatives) || (HOFFEN_DATA.company && HOFFEN_DATA.company.contacts && HOFFEN_DATA.company.contacts.representatives) || [];
    const foundRep = reps.find(r => (r.tg || '').replace('@', '').toLowerCase() === cleanTarget);
    if (foundRep) {
      targetName = foundRep.name || targetName;
      targetPhone = foundRep.phone || targetPhone;
    } else if (cleanTarget.includes('hr')) {
      targetName = "HR & Boshqaruv Bo'limi";
      targetPhone = (serverPrices.contacts && serverPrices.contacts.hr_phone) || '+998 77 488 00 64';
    }

    let context = tgLink.getAttribute('title') || tgLink.textContent.trim() || 'Telegram murojaat';
    if (tgLink.closest('#contact')) context = 'Aloqa va Hamkorlik bo\'limi';
    if (tgLink.closest('#headerTgLink') || tgLink.closest('.nav-admin-link')) context = 'Header Tezkor Telegram';
    if (tgLink.closest('.result-agent-card') || tgLink.closest('.agent-card')) context = 'Hududiy savdo agenti bilan aloqa';
    if (tgLink.closest('#detailModal') || tgLink.closest('.product-card')) context = 'Katalog mahsulot sahifasidan so\'rov';

    const savedPhone = localStorage.getItem('hoffen_client_phone') || document.getElementById('orderPhoneInput')?.value || '';
    const savedName = localStorage.getItem('hoffen_client_name') || document.getElementById('orderNameInput')?.value || '';

    if (savedPhone && savedPhone.length >= 7) {
      try {
        fetch(apiUrl('/api/track-telegram'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'telegram_click',
            target: target,
            target_name: targetName,
            target_phone: targetPhone,
            target_tg: target,
            agent_name: targetName,
            agent_phone: targetPhone,
            agent_tg: target,
            customer_name: savedName || "Mijoz (Saytdan)",
            customer_phone: savedPhone,
            context: context
          })
        }).catch(() => {});
      } catch (err) {}
      return;
    }

    e.preventDefault();
    pendingTgData = {
      target: target,
      targetName: targetName,
      targetPhone: targetPhone,
      context: context,
      url: href
    };

    const subText = document.getElementById('tgPromptAgentSub');
    if (subText) subText.textContent = `Mas'ul: ${targetName} (${targetPhone}, ${target})`;

    const phoneInp = document.getElementById('tgPromptPhoneInput');
    const nameInp = document.getElementById('tgPromptNameInput');
    if (phoneInp && !phoneInp.value) phoneInp.value = '+998 ';
    if (nameInp && savedName) nameInp.value = savedName;

    const modal = document.getElementById('tgPromptModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (phoneInp) phoneInp.focus();
    }
  });

  // Quick Inquiry Form Submission Handler
  window.handleQuickInquirySubmit = async function(e) {
    if (e) e.preventDefault();
    const nameInp = document.getElementById('inquiryNameInput');
    const phoneInp = document.getElementById('inquiryPhoneInput');
    const msgInp = document.getElementById('inquiryMsgInput');
    const btn = document.getElementById('inquirySubmitBtn');
    const successMsg = document.getElementById('inquirySuccessMsg');

    const name = nameInp ? nameInp.value.trim() : '';
    const phone = phoneInp ? phoneInp.value.trim() : '';
    const msg = msgInp ? msgInp.value.trim() : '';

    if (!phone || phone.length < 7) {
      alert("Iltimos, telefon raqamingizni kiriting!");
      if (phoneInp) phoneInp.focus();
      return;
    }

    localStorage.setItem('hoffen_client_phone', phone);
    if (name) localStorage.setItem('hoffen_client_name', name);

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Yuborilmoqda...';
    }

    try {
      const res = await fetch(apiUrl('/api/create-inquiry'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: name || 'Hurmatli mijoz',
          customer_phone: phone,
          message: msg || 'Tezkor konsultatsiya so\'rovi',
          source: 'web_form',
          target_name: "Markaziy Savdo Bo'limi",
          target_phone: getPrimaryPhone(),
          target_tg: getPrimaryTg()
        })
      });

      const data = await res.json();
      // Cache locally for offline & GitHub Pages Admin
      try {
        const cachedInq = JSON.parse(localStorage.getItem('hoffen_inquiries_cache') || '[]');
        cachedInq.unshift({
          id: 'INQ-' + Date.now(),
          type: 'inquiry',
          created_at: new Date().toISOString(),
          customer_name: name || "Hurmatli mijoz",
          customer_phone: phone,
          context: msg || "Tezkor konsultatsiya so'rovi",
          source: 'web_form'
        });
        localStorage.setItem('hoffen_inquiries_cache', JSON.stringify(cachedInq));
      } catch(e) {}

      if (successMsg) successMsg.style.display = 'block';
      if (nameInp) nameInp.value = '';
      if (phoneInp) phoneInp.value = '';
      if (msgInp) msgInp.value = '';
      setTimeout(() => {
        if (successMsg) successMsg.style.display = 'none';
      }, 6000);
    } catch (err) {
      // Cache locally for offline & GitHub Pages Admin
      try {
        const cachedInq = JSON.parse(localStorage.getItem('hoffen_inquiries_cache') || '[]');
        cachedInq.unshift({
          id: 'INQ-' + Date.now(),
          type: 'inquiry',
          created_at: new Date().toISOString(),
          customer_name: name || "Hurmatli mijoz",
          customer_phone: phone,
          context: msg || "Tezkor konsultatsiya so'rovi",
          source: 'web_form'
        });
        localStorage.setItem('hoffen_inquiries_cache', JSON.stringify(cachedInq));
      } catch(e) {}
      alert("Zayavka qabul qilindi! Mutaxassisimiz tez orada siz bilan bog'lanadi.");
      if (successMsg) successMsg.style.display = 'block';
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span>Zayavka Yuborish</span>';
      }
    }
  };

  // Flipbook Functions
  function syncCatalogPagesFromProducts() {
    if (HOFFEN_DATA.products && HOFFEN_DATA.products.length > 0) {
      HOFFEN_DATA.catalogPages = HOFFEN_DATA.products.map((p, idx) => ({
        page: idx + 1,
        id: p.id,
        code: p.code || '',
        title_uz: p.name_uz || '',
        title_ru: p.name_ru || '',
        image: p.image
      }));
    }
  }

  function renderFlipbookThumbs() {
    if (!flipbookThumbStrip) return;
    if (!HOFFEN_DATA.catalogPages || HOFFEN_DATA.catalogPages.length === 0) {
      syncCatalogPagesFromProducts();
    }
    flipbookThumbStrip.innerHTML = HOFFEN_DATA.catalogPages.map(cp => `
      <img src="${cp.image}" alt="P${cp.page}" title="${currentLang === 'uz' ? (cp.title_uz || cp.code) : (cp.title_ru || cp.code)}" class="thumb-mini ${cp.page === activeFlipbookPage ? 'active' : ''}" onclick="setFlipbookPage(${cp.page})">
    `).join('');
  }

  window.setFlipbookPage = function(pageNum) {
    if (!HOFFEN_DATA.catalogPages || HOFFEN_DATA.catalogPages.length === 0) {
      syncCatalogPagesFromProducts();
    }
    if (pageNum < 1 || pageNum > HOFFEN_DATA.catalogPages.length) return;
    activeFlipbookPage = pageNum;
    const pageData = HOFFEN_DATA.catalogPages.find(p => p.page === pageNum);
    if (pageData && flipbookPageImg) {
      flipbookPageImg.src = pageData.image;
    }
    if (flipbookPageIndicator) {
      const pageTitle = pageData ? (currentLang === 'uz' ? (pageData.title_uz || '') : (pageData.title_ru || '')) : '';
      flipbookPageIndicator.innerHTML = `<span>${I18N[currentLang].page_label} ${activeFlipbookPage} / ${HOFFEN_DATA.catalogPages.length}</span>${pageTitle ? ` <span style="color: #fff; font-weight: 600; margin-left: 8px; font-size: 13px;">• ${pageTitle}</span>` : ''}`;
    }
    const flipbookAddToCartBtn = document.getElementById('flipbookAddToCartBtn');
    const flipbookCartBtnText = document.getElementById('flipbookCartBtnText');
    if (flipbookCartBtnText) {
      flipbookCartBtnText.textContent = currentLang === 'uz' ? "Xarid Savatiga Qo'shish" : "Добавить в Корзину";
    }
    if (flipbookAddToCartBtn && pageData) {
      flipbookAddToCartBtn.onclick = () => {
        closeFlipbook();
        if (typeof window.openVolumeSelector === 'function') {
          window.openVolumeSelector(pageData.id);
        }
      };
    }
    renderFlipbookThumbs();

    // Auto-scroll active thumb in thumbnail strip
    setTimeout(() => {
      const activeThumb = flipbookThumbStrip ? flipbookThumbStrip.querySelector('.thumb-mini.active') : null;
      if (activeThumb && typeof activeThumb.scrollIntoView === 'function') {
        activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }, 50);
  };

  function openFlipbook(page = 1) {
    syncCatalogPagesFromProducts();
    activeFlipbookPage = page;
    window.setFlipbookPage(page);
    flipbookModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeFlipbook() {
    flipbookModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Image Lightbox Viewer (for certificates, posters, etc.)
  window.openImageLightbox = function(imageSrc, imageTitle) {
    if (!detailContent || !detailModal) return;
    detailContent.innerHTML = `
      <div style="text-align: center; padding: 6px;">
        <h3 style="font-size: 17px; font-weight: 800; margin-bottom: 14px; color: var(--text-primary);">${imageTitle || ''}</h3>
        <div style="max-height: 72vh; overflow: auto; display: flex; align-items: center; justify-content: center; background: #0b1120; border-radius: 12px; padding: 10px; border: 1px solid var(--border-color);">
          <img src="${imageSrc}" alt="${imageTitle || ''}" style="max-width: 100%; max-height: 68vh; object-fit: contain; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        </div>
        <div style="margin-top: 14px; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
          <a href="${imageSrc}" target="_blank" class="btn-primary" style="font-size: 13px; padding: 8px 18px; border-radius: 8px; text-decoration: none;">
            <i class="fa-solid fa-up-right-from-square"></i> Asl hajmda ochish
          </a>
          <button type="button" class="btn-secondary" onclick="closeDetailModal()" style="font-size: 13px; padding: 8px 18px; border-radius: 8px;">
            Yopish
          </button>
        </div>
      </div>
    `;
    detailModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Product Detail Modal
  window.openDetailModal = function(prodId) {
    const prod = HOFFEN_DATA.products.find(p => p.id === prodId);
    if (!prod || !detailContent) return;

    const name = currentLang === 'uz' ? prod.name_uz : prod.name_ru;
    const desc = currentLang === 'uz' ? prod.desc_uz : prod.desc_ru;
    const inCart = cart.some(item => item.id === prod.id);

    detailContent.innerHTML = `
      <div class="detail-grid">
        <div class="detail-img-wrap">
          <img src="${prod.image}" alt="${name}" class="detail-img">
        </div>
        <div class="detail-info">
          <span class="detail-badge">${prod.brand} • ${prod.code}</span>
          <h2 class="detail-title">${name}</h2>
          <p class="detail-desc">${desc}</p>

          <table class="detail-specs-table">
            <tbody>
              <tr>
                <td>${currentLang === 'uz' ? 'Hajmlar va Narxlar' : 'Объемы и Цены'}</td>
                <td>
                  <div style="display: flex; flex-direction: column; gap: 6px;">
                    ${(() => {
                      const prodPrice = serverPrices.products && serverPrices.products[prod.id];
                      return prod.volumes.map(v => {
                        const volPrice = (prodPrice && prodPrice.volumes && prodPrice.volumes[v] !== undefined && prodPrice.volumes[v] !== '') ? prodPrice.volumes[v] : ((prod.default_prices && prod.default_prices[v]) || '');
                        const show = serverPrices.show_prices_public && volPrice !== '' && volPrice !== undefined;
                        return `
                          <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; cursor: pointer;" onclick="openVolumeSelector('${prod.id}', '${v}')" title="${currentLang === 'uz' ? 'Ushbu hajmni savatga qo\'shish' : 'Добавить этот объем в корзину'}">
                            <span><i class="fa-solid fa-flask" style="color: var(--accent-blue); margin-right: 6px;"></i><strong>${v}</strong></span>
                            <div style="display: flex; align-items: center; gap: 8px;">
                              <span style="color: var(--accent-green); font-weight: 800;">${show ? `${volPrice} so'm` : (currentLang === 'uz' ? 'Kelishilgan' : 'По запросу')}</span>
                              <span style="font-size: 11px; background: #e0f2fe; color: #0284c7; padding: 2px 6px; border-radius: 4px; font-weight: 700;"><i class="fa-solid fa-cart-plus"></i> Tanlash</span>
                            </div>
                          </div>
                        `;
                      }).join('');
                    })()}
                  </div>
                </td>
              </tr>
              ${prod.specs ? prod.specs.map(s => `
                <tr>
                  <td>${currentLang === 'uz' ? s.label_uz : s.label_ru}</td>
                  <td>${s.val}</td>
                </tr>
              `).join('') : ''}
              ${prod.scents ? `
                <tr>
                  <td>${currentLang === 'uz' ? 'Iforlar (Aromat)' : 'Ароматы'}</td>
                  <td>${prod.scents.join(', ')}</td>
                </tr>
              ` : ''}
              <tr>
                <td>${currentLang === 'uz' ? 'Yetkazib berish' : 'Доставка'}</td>
                <td>${currentLang === 'uz' ? HOFFEN_DATA.company.delivery_uz : HOFFEN_DATA.company.delivery_ru}</td>
              </tr>
            </tbody>
          </table>

          <div style="display: flex; gap: 10px; margin-top: auto; flex-wrap: wrap;">
            <button class="btn-primary" style="flex: 1;" onclick="openVolumeSelector('${prod.id}')">
              <i class="fa-solid fa-cart-shopping"></i>
              <span id="detailCartBtnText">${inCart ? I18N[currentLang].btn_inquired : (currentLang === 'uz' ? 'Hajm & Miqdor Tanlab Savatga Qo\'shish' : 'Выбрать объем и кол-во в корзину')}</span>
            </button>
            <a href="https://t.me/${getPrimaryTg()}?text=${encodeURIComponent(`Salom! HOFFEN katalogidan shu vosita bo'yicha ma'lumot va narx olmoqchiman:\nKodi: ${prod.code}\nNomi: ${name}`)}" target="_blank" class="btn-secondary" style="width: auto; background: rgba(56, 189, 248, 0.15); border-color: rgba(56, 189, 248, 0.4); color: #38bdf8;" title="Telegram orqali to'g'ridan-to'g'ri so'rash (@${getPrimaryTg()})">
              <i class="fa-brands fa-telegram"></i> <span>Telegram</span>
            </a>
            <a href="tel:${getPrimaryPhone().replace(/\s+/g, '')}" class="btn-secondary" style="width: auto;" title="Qo'ng'iroq qilish">
              <i class="fa-solid fa-phone"></i>
            </a>
          </div>
        </div>
      </div>
    `;

    detailModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.updateDetailButton = function(prodId) {
    const inCart = cart.some(item => item.id === prodId);
    const txt = document.getElementById('detailCartBtnText');
    if (txt) {
      txt.textContent = inCart ? I18N[currentLang].btn_inquired : (currentLang === 'uz' ? 'Hajm & Miqdor Tanlab Savatga Qo\'shish' : 'Выбрать объем и кол-во в корзину');
      const btn = txt.closest('button');
      if (btn) {
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = 'fa-solid fa-cart-shopping';
        }
      }
    }
  };

  function closeDetailModal() {
    detailModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Bind Event Listeners
  function bindEvents() {
    // Categories click
    if (categoriesWrap) {
      categoriesWrap.addEventListener('click', e => {
        const btn = e.target.closest('.cat-pill');
        if (!btn) return;
        currentCategory = btn.getAttribute('data-cat');
        renderCategoryPills();
        renderProducts();

        // Smoothly ensure products section is in view
        const catalogEl = document.getElementById('catalog');
        if (catalogEl) {
          const rect = catalogEl.getBoundingClientRect();
          if (rect.top < -50 || rect.top > 250) {
            catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    }

    // Products Grid click delegation (Opens Detail Modal)
    if (productsGrid) {
      productsGrid.addEventListener('click', e => {
        if (e.target.closest('.card-footer') || e.target.closest('button') || e.target.closest('a')) {
          return;
        }
        const card = e.target.closest('.product-card');
        if (card) {
          const prodId = card.getAttribute('data-id');
          if (prodId) {
            openDetailModal(prodId);
          }
        }
      });
    }

    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        searchQuery = e.target.value;
        if (searchClear) searchClear.style.display = searchQuery ? 'block' : 'none';
        renderProducts();
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        searchClear.style.display = 'none';
        renderProducts();
      });
    }

    // Language Toggle
    if (langToggleBtn) {
      langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'uz' ? 'ru' : 'uz';
        localStorage.setItem('hoffen_lang', currentLang);
        updateLanguageTexts();
        renderBrands();
        renderCategoryPills();
        renderProducts();
        updateCartUI();
        renderDeliveryChips();
        renderDistrictResult();
        populateCartDistricts();
        if (typeof window.setFlipbookPage === 'function') {
          window.setFlipbookPage(activeFlipbookPage);
        }
      });
    }

    // Theme Toggle
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('hoffen_theme', currentTheme);
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
          icon.className = currentTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
      });
    }

    // Cart Modal toggles
    const openCart = () => { 
      const regionSelect = document.getElementById('cartRegionSelect');
      const districtSelect = document.getElementById('cartDistrictSelect');
      if (regionSelect) {
        regionSelect.value = currentDeliveryRegion;
        populateCartDistricts();
        if (districtSelect && currentSelectedDistrict) {
          districtSelect.value = currentSelectedDistrict;
          updateCartAgentBadge();
        }
      }
      cartModal.classList.add('active'); 
      document.body.style.overflow = 'hidden'; 
    };
    const closeCart = () => { cartModal.classList.remove('active'); document.body.style.overflow = ''; };
    if (openCartBtn) openCartBtn.addEventListener('click', openCart);
    if (floatCartBtn) floatCartBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (cartModal) {
      cartModal.addEventListener('click', e => {
        if (e.target === cartModal) closeCart();
      });
    }

    // Flipbook buttons
    if (openFlipbookHeroBtn) openFlipbookHeroBtn.addEventListener('click', () => openFlipbook(1));
    if (openFlipbookNavBtn) openFlipbookNavBtn.addEventListener('click', () => openFlipbook(1));
    if (closeFlipbookBtn) closeFlipbookBtn.addEventListener('click', closeFlipbook);
    if (flipbookPrev) flipbookPrev.addEventListener('click', () => window.setFlipbookPage(activeFlipbookPage - 1));
    if (flipbookNext) flipbookNext.addEventListener('click', () => window.setFlipbookPage(activeFlipbookPage + 1));
    if (flipbookModal) {
      flipbookModal.addEventListener('click', e => {
        if (e.target === flipbookModal) closeFlipbook();
      });
    }

    // Detail Modal
    if (detailCloseBtn) detailCloseBtn.addEventListener('click', closeDetailModal);
    if (detailModal) {
      detailModal.addEventListener('click', e => {
        if (e.target === detailModal) closeDetailModal();
      });
    }

    // Volume & Quantity Selector Modal
    const closeVolSelectBtn = document.getElementById('closeVolSelectBtn');
    const volSelectModal = document.getElementById('volSelectModal');
    const volQtyMinusBtn = document.getElementById('volQtyMinusBtn');
    const volQtyPlusBtn = document.getElementById('volQtyPlusBtn');
    const volQtyInput = document.getElementById('volQtyInput');
    const confirmAddToCartBtn = document.getElementById('confirmAddToCartBtn');
    const confirmAndOpenCartBtn = document.getElementById('confirmAndOpenCartBtn');

    if (closeVolSelectBtn) closeVolSelectBtn.addEventListener('click', closeVolumeSelector);
    if (volSelectModal) {
      volSelectModal.addEventListener('click', e => {
        if (e.target === volSelectModal) closeVolumeSelector();
      });
    }
    if (volQtyMinusBtn) volQtyMinusBtn.addEventListener('click', () => changeVolSelectorQty(-1));
    if (volQtyPlusBtn) volQtyPlusBtn.addEventListener('click', () => changeVolSelectorQty(1));
    if (volQtyInput) {
      volQtyInput.addEventListener('input', e => setVolSelectorQty(e.target.value));
      volQtyInput.addEventListener('change', e => setVolSelectorQty(e.target.value));
    }
    if (confirmAddToCartBtn) confirmAddToCartBtn.addEventListener('click', () => confirmAddToCart(false));
    if (confirmAndOpenCartBtn) confirmAndOpenCartBtn.addEventListener('click', () => confirmAddToCart(true));

    // Admin Quick Login Modal
    const openAdminModal = () => {
      if (adminModal) {
        adminModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const passInp = document.getElementById('quickAdminPassInput');
        if (passInp) {
          passInp.value = '';
          passInp.focus();
        }
        const errBox = document.getElementById('quickAdminError');
        if (errBox) errBox.style.display = 'none';
      }
    };
    const closeAdminModal = () => {
      if (adminModal) {
        adminModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    };
    if (openAdminModalBtn) openAdminModalBtn.addEventListener('click', openAdminModal);
    if (closeAdminModalBtn) closeAdminModalBtn.addEventListener('click', closeAdminModal);
    if (adminModal) {
      adminModal.addEventListener('click', e => {
        if (e.target === adminModal) closeAdminModal();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeCart();
        closeFlipbook();
        closeDetailModal();
        closeVolumeSelector();
      }
      if (flipbookModal && flipbookModal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') window.setFlipbookPage(activeFlipbookPage - 1);
        if (e.key === 'ArrowRight') window.setFlipbookPage(activeFlipbookPage + 1);
      }
    });
  }
});

