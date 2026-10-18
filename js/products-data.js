// HOFFEN 1 & GRAFF Electronic Catalog - Product Data
// Barcha ma'lumotlar rasmiy katalogdan olingan (Narxlar qo'yilmagan)

const HOFFEN_DATA = {
  company: {
    name: "«KNYAZOV» MChJ",
    brand: "HOFFEN 1",
    director: "Knyazov R.Sh.",
    slogan_uz: "Yuqori kimyo. Yuqori natija.",
    slogan_ru: "Superior Chemistry. Superior Performance",
    motto_uz: "Odamlar. Maqsadlar. Natija. Birga — yanada katta.",
    motto_ru: "Люди. Цели. Результат. Вместе — еще больше.",
    standard: "HR-SVD-001 (Van-selling va Mintaqaviy Filiallar Standarti)",
    subBrands: [
      { name: "HOFFEN 1", desc_uz: "Professional avtoximiya va avtokosmetika", desc_ru: "Профессиональная автохимия и автокосметика", color: "#e52525" },
      { name: "GRAFF", desc_uz: "Antifrizlar va qishki avtomobil suyuqliklari", desc_ru: "Антифризы и зимние автожидкости", color: "#1976d2" },
      { name: "NANO FOGGER", desc_uz: "Quruq tuman apparati va 21 xil elita iforlar", desc_ru: "Сухой туман и 21 вид элитных ароматов", color: "#ff9800" },
      { name: "HOFFEN HOME", desc_uz: "Oshxona va uy uchun tozalovchi maishiy kimyo", desc_ru: "Бытовая химия и чистящие средства для дома", color: "#4caf50" }
    ],
    telegram: "Hoffen0064",
    phones: [
      { raw: "+998974070064", display: "+998 97 407 00 64", tg: "Hoffen0064", label_uz: "Asosiy Savdo Bo'limi (Menejer)", label_ru: "Основной Отдел Продаж" },
      { raw: "+998774880064", display: "+998 77 488 00 64", tg: "Hoffen1_HR", label_uz: "HR & Ma'muriyat", label_ru: "HR и Администрация" }
    ],
    regionalReps: [
      { region_uz: "Angren, Ohangaron, Olmaliq", region_ru: "Ангрен, Ахангаран, Алмалык", rep: "Muhtorjon", phone: "+998 95 520 00 64", raw: "+998955200064", tg: "HOFFEN1_MUHTORJON" },
      { region_uz: "Parkent, To'ytepa, Pskent, Bektemir", region_ru: "Паркент, Тойтепа, Пскент, Бектемир", rep: "Shohruh", phone: "+998 99 435 00 64", raw: "+998994350064", tg: "HOFFEN1_SHOXRUX" },
      { region_uz: "Chirchiq, Qibray, G'azalkent, Bo'stonliq", region_ru: "Чирчик, Кибрай, Газалкент, Бостанлык", rep: "Dilshod", phone: "+998 77 011 00 64", raw: "+998770110064", tg: "HOFFEN1_DILSHOD" },
      { region_uz: "Yangiyo'l, Chinoz", region_ru: "Янгиюль, Чиназ", rep: "Faxriddin", phone: "+998 95 551 00 64", raw: "+998955510064", tg: "Hoffen1_Faxriddin" },
      { region_uz: "Zangiota, Keles", region_ru: "Зангиата, Келес", rep: "Savdo bo'limi", phone: "+998 95 094 00 64", raw: "+998950940064", tg: "Hoffen0064" }
    ],
    delivery_uz: "Toshkent shahri va Toshkent viloyati (Tashovul) bo'ylab bepul yetkazib berish. Respublika bo'ylab filiallar orqali yetkazish.",
    delivery_ru: "Бесплатная доставка по г. Ташкент и Ташкентской области (Ташовул). Доставка по регионам Узбекистана.",
    deliveryLocations: {
      tashkent_city: {
        id: "tashkent_city",
        name_uz: "Toshkent Shahri",
        name_ru: "г. Ташкент",
        icon: "fa-city",
        tag_uz: "100% Bepul va Tezkor Yetkazib Berish (2-4 soat ichida)",
        tag_ru: "100% Бесплатная и Экспресс-доставка (2-4 часа)",
        defaultRep: {
          rep: "Toshkent Shahri Savdo Bo'limi",
          phone: "+998 77 488 00 64",
          raw: "+998774880064",
          tg: "Hoffen1_HR"
        },
        districts: [
          { id: "chilonzor", name_uz: "Chilonzor tumani", name_ru: "Чиланзарский район" },
          { id: "yunusobod", name_uz: "Yunusobod tumani", name_ru: "Юнусабадский район" },
          { id: "mirzo_ulugbek", name_uz: "Mirzo Ulug'bek tumani", name_ru: "Мирзо-Улугбекский район" },
          { id: "mirobod", name_uz: "Mirobod tumani", name_ru: "Мирабадский район" },
          { id: "yakkasaroy", name_uz: "Yakkasaroy tumani", name_ru: "Яккасарайский район" },
          { id: "shayxontohur", name_uz: "Shayxontohur tumani", name_ru: "Шайхантахурский район" },
          { id: "olmazor", name_uz: "Olmazor tumani", name_ru: "Алмазарский район" },
          { id: "uchtepa", name_uz: "Uchtepa tumani", name_ru: "Учтепинский район" },
          { id: "sergeli", name_uz: "Sergeli tumani", name_ru: "Сергелийский район" },
          { id: "yangihayot", name_uz: "Yangihayot tumani", name_ru: "Янгихаётский район" },
          { id: "yashnobod", name_uz: "Yashnobod tumani", name_ru: "Яшнабадский район" },
          { id: "bektemir", name_uz: "Bektemir tumani", name_ru: "Бектемирский район" }
        ]
      },
      tashkent_region: {
        id: "tashkent_region",
        name_uz: "Toshkent Viloyati (Tashovul)",
        name_ru: "Ташкентская область (Ташовул)",
        icon: "fa-map-location-dot",
        tag_uz: "Mintaqaviy savdo agentlari orqali bepul yetkazib berish",
        tag_ru: "Бесплатная доставка через региональных торговых агентов",
        zones: [
          {
            id: "zone_chirchiq",
            name_uz: "Chirchiq — Bo'stonliq Yo'nalishi",
            name_ru: "Чирчикское направление",
            icon: "fa-mountain-sun",
            rep: "Dilshod",
            phone: "+998 77 011 00 64",
            raw: "+998770110064",
            tg: "HOFFEN1_DILSHOD",
            districts: ["chirchiq", "qibray", "gazalkent", "bostonliq"]
          },
          {
            id: "zone_parkent",
            name_uz: "Parkent — Pskent Yo'nalishi",
            name_ru: "Паркентское направление",
            icon: "fa-wheat-awn",
            rep: "Shohruh",
            phone: "+998 99 435 00 64",
            raw: "+998994350064",
            tg: "HOFFEN1_SHOXRUX",
            districts: ["parkent", "pskent", "toytepa", "bektemir_vil"]
          },
          {
            id: "zone_angren",
            name_uz: "Angren — Olmaliq Yo'nalishi",
            name_ru: "Ангрен-Алмалыкское направление",
            icon: "fa-industry",
            rep: "Muhtorjon",
            phone: "+998 95 520 00 64",
            raw: "+998955200064",
            tg: "HOFFEN1_MUHTORJON",
            districts: ["angren", "ohangaron", "olmaliq"]
          },
          {
            id: "zone_yangiyol",
            name_uz: "Yangiyo'l — Chinoz Yo'nalishi",
            name_ru: "Янгиюльское направление",
            icon: "fa-route",
            rep: "Faxriddin",
            phone: "+998 95 551 00 64",
            raw: "+998955510064",
            tg: "Hoffen1_Faxriddin",
            districts: ["yangiyol", "chinoz"]
          },
          {
            id: "zone_zangiota",
            name_uz: "Zangiota — Keles Yo'nalishi",
            name_ru: "Зангиатинское направление",
            icon: "fa-city",
            rep: "Savdo bo'limi",
            phone: "+998 95 094 00 64",
            raw: "+998950940064",
            tg: "Hoffen0064",
            districts: ["zangiota", "keles"]
          }
        ],
        districts: [
          { id: "parkent", name_uz: "Parkent", name_ru: "Паркент", rep: "Shohruh", phone: "+998 99 435 00 64", raw: "+998994350064", tg: "HOFFEN1_SHOXRUX", coverage_uz: "Parkent, Pskent, To'ytepa, Bektemir" },
          { id: "pskent", name_uz: "Pskent", name_ru: "Пскент", rep: "Shohruh", phone: "+998 99 435 00 64", raw: "+998994350064", tg: "HOFFEN1_SHOXRUX", coverage_uz: "Parkent, Pskent, To'ytepa, Bektemir" },
          { id: "toytepa", name_uz: "To'ytepa (Nurafshon)", name_ru: "Тойтепа (Нурафшан)", rep: "Shohruh", phone: "+998 99 435 00 64", raw: "+998994350064", tg: "HOFFEN1_SHOXRUX", coverage_uz: "Parkent, Pskent, To'ytepa, Bektemir" },
          { id: "bektemir_vil", name_uz: "Bektemir (viloyat qismi)", name_ru: "Бектемир (область)", rep: "Shohruh", phone: "+998 99 435 00 64", raw: "+998994350064", tg: "HOFFEN1_SHOXRUX", coverage_uz: "Parkent, Pskent, To'ytepa, Bektemir" },
          { id: "angren", name_uz: "Angren", name_ru: "Ангрен", rep: "Muhtorjon", phone: "+998 95 520 00 64", raw: "+998955200064", tg: "HOFFEN1_MUHTORJON", coverage_uz: "Angren, Ohangaron, Olmaliq" },
          { id: "ohangaron", name_uz: "Ohangaron", name_ru: "Ахангаран", rep: "Muhtorjon", phone: "+998 95 520 00 64", raw: "+998955200064", tg: "HOFFEN1_MUHTORJON", coverage_uz: "Angren, Ohangaron, Olmaliq" },
          { id: "olmaliq", name_uz: "Olmaliq", name_ru: "Алмалык", rep: "Muhtorjon", phone: "+998 95 520 00 64", raw: "+998955200064", tg: "HOFFEN1_MUHTORJON", coverage_uz: "Angren, Ohangaron, Olmaliq" },
          { id: "chirchiq", name_uz: "Chirchiq", name_ru: "Чирчик", rep: "Dilshod", phone: "+998 77 011 00 64", raw: "+998770110064", tg: "HOFFEN1_DILSHOD", coverage_uz: "Chirchiq, Qibray, G'azalkent, Bo'stonliq" },
          { id: "qibray", name_uz: "Qibray", name_ru: "Кибрай", rep: "Dilshod", phone: "+998 77 011 00 64", raw: "+998770110064", tg: "HOFFEN1_DILSHOD", coverage_uz: "Chirchiq, Qibray, G'azalkent, Bo'stonliq" },
          { id: "gazalkent", name_uz: "G'azalkent", name_ru: "Газалкент", rep: "Dilshod", phone: "+998 77 011 00 64", raw: "+998770110064", tg: "HOFFEN1_DILSHOD", coverage_uz: "Chirchiq, Qibray, G'azalkent, Bo'stonliq" },
          { id: "bostonliq", name_uz: "Bo'stonliq", name_ru: "Бостанлык", rep: "Dilshod", phone: "+998 77 011 00 64", raw: "+998770110064", tg: "HOFFEN1_DILSHOD", coverage_uz: "Chirchiq, Qibray, G'azalkent, Bo'stonliq" },
          { id: "yangiyol", name_uz: "Yangiyo'l", name_ru: "Янгиюль", rep: "Faxriddin", phone: "+998 95 551 00 64", raw: "+998955510064", tg: "Hoffen1_Faxriddin", coverage_uz: "Yangiyo'l, Chinoz" },
          { id: "chinoz", name_uz: "Chinoz", name_ru: "Чиназ", rep: "Faxriddin", phone: "+998 95 551 00 64", raw: "+998955510064", tg: "Hoffen1_Faxriddin", coverage_uz: "Yangiyo'l, Chinoz" },
          { id: "zangiota", name_uz: "Zangiota", name_ru: "Зангиата", rep: "Savdo bo'limi", phone: "+998 95 094 00 64", raw: "+998950940064", tg: "Hoffen0064", coverage_uz: "Zangiota, Keles" },
          { id: "keles", name_uz: "Keles", name_ru: "Келес", rep: "Savdo bo'limi", phone: "+998 95 094 00 64", raw: "+998950940064", tg: "Hoffen0064", coverage_uz: "Zangiota, Keles" }
        ]
      },
      other_regions: {
        id: "other_regions",
        name_uz: "Boshqa Viloyatlar",
        name_ru: "Другие Области",
        icon: "fa-truck-moving",
        tag_uz: "100% Bepul Logistika • Butun Respublika viloyatlariga yagona markaziy yetkazish",
        tag_ru: "100% Бесплатная Логистика • Доставка по всем регионам Узбекистана",
        defaultRep: {
          rep: "Bosh Ofis Savdo Bo'limi (Menejer)",
          phone: "+998 97 407 00 64",
          raw: "+998974070064",
          tg: "Hoffen0064"
        },
        office: {
          title_uz: "HOFFEN 1 Bosh Ofisi va Markaziy Logistika Markazi",
          title_ru: "Головной Офис и Центральный Логистический Комплекс HOFFEN 1",
          company_uz: "«KNYAZOV» MChJ • Rasmiy Ishlab Chiqaruvchi",
          company_ru: "ООО «KNYAZOV» • Официальный Производитель",
          address_uz: "Toshkent shahri, Bektemir tumani, HOFFEN 1 Ishlab Chiqarish va Markaziy Ombor Majmuasi",
          address_ru: "г. Ташкент, Бектемирский район, Центральный Производственно-Складской Комплекс HOFFEN 1",
          work_hours_uz: "Dushanba — Shanba: 08:30 — 18:30",
          work_hours_ru: "Понедельник — Суббота: 08:30 — 18:30",
          delivery_note_uz: "Viloyatlarga 100% BEPUL va xavfsiz logistika (Viloyatlararo maxsus marshrutlar orqali 24-48 soatda)",
          delivery_note_ru: "100% БЕСПЛАТНАЯ доставка в регионы (в течение 24-48 часов)",
          contacts: [
            {
              role_uz: "Bosh Savdo Bo'limi (Menejer)",
              role_ru: "Отдел Продаж (Менеджер)",
              phone: "+998 97 407 00 64",
              raw: "+998974070064",
              tg: "Hoffen0064"
            },
            {
              role_uz: "HR & Boshqaruv Ma'muriyati",
              role_ru: "HR и Администрация",
              phone: "+998 77 488 00 64",
              raw: "+998774880064",
              tg: "Hoffen1_HR"
            }
          ]
        },
        districts: [
          {
            id: "samarqand",
            name_uz: "Samarqand viloyati",
            name_ru: "Самаркандская область",
            cities_uz: ["Samarqand shahri", "Kattaqo'rg'on", "Urgut", "Oqdaryo", "Pastdarg'om", "Jomboy", "Bulung'ur", "Payariq"],
            cities_ru: ["г. Самарканд", "Каттакурган", "Ургут", "Акдарья", "Пастдаргом", "Джамбай", "Булунгур"]
          },
          {
            id: "fargona",
            name_uz: "Farg'ona viloyati",
            name_ru: "Ферганская область",
            cities_uz: ["Farg'ona shahri", "Qo'qon", "Marg'ilon", "Quva", "Rishton", "Oltiariq", "Bog'dod", "Beshariq"],
            cities_ru: ["г. Фергана", "Коканд", "Маргилан", "Кува", "Риштан", "Алтыарык", "Багдад"]
          },
          {
            id: "andijon",
            name_uz: "Andijon viloyati",
            name_ru: "Андижанская область",
            cities_uz: ["Andijon shahri", "Asaka", "Shahrixon", "Xonobod", "Qo'rg'ontepa", "Baliqchi", "Bo'ston", "Paxtaobod"],
            cities_ru: ["г. Андижан", "Асака", "Шахрихан", "Ханабад", "Кургантепа", "Балыкчи", "Бустон"]
          },
          {
            id: "namangan",
            name_uz: "Namangan viloyati",
            name_ru: "Наманганская область",
            cities_uz: ["Namangan shahri", "Chust", "Pop", "Kosonsoy", "To'raqo'rg'on", "Uchqo'rg'on", "Chortoq", "Uychi"],
            cities_ru: ["г. Наманган", "Чуст", "Пап", "Касансай", "Туракурган", "Учкурган", "Чартак"]
          },
          {
            id: "buxoro",
            name_uz: "Buxoro viloyati",
            name_ru: "Бухарская область",
            cities_uz: ["Buxoro shahri", "Kogon", "G'ijduvon", "Romitan", "Qorako'l", "Vobkent", "Jondor", "Shofirkon"],
            cities_ru: ["г. Бухара", "Каган", "Гиждуван", "Ромитан", "Каракуль", "Вабкент", "Жондор"]
          },
          {
            id: "qashqadaryo",
            name_uz: "Qashqadaryo viloyati",
            name_ru: "Кашкадарьинская область",
            cities_uz: ["Qarshi shahri", "Shahrisabz", "Koson", "Kitob", "G'uzor", "Yakkabog'", "Chiroqchi", "Muborak"],
            cities_ru: ["г. Карши", "Шахрисабз", "Касан", "Китаб", "Гузар", "Яккабаг", "Чирокчи", "Мубарек"]
          },
          {
            id: "surxondaryo",
            name_uz: "Surxondaryo viloyati",
            name_ru: "Сурхандарьинская область",
            cities_uz: ["Termiz shahri", "Denov", "Sherobod", "Sho'rchi", "Boysun", "Qumqo'rg'on", "Jarqo'rg'on", "Sariosiyo"],
            cities_ru: ["г. Термез", "Денау", "Шерабад", "Шурчи", "Байсун", "Кумкурган", "Джаркурган"]
          },
          {
            id: "xorazm",
            name_uz: "Xorazm viloyati",
            name_ru: "Хорезмская область",
            cities_uz: ["Urganch shahri", "Xiva", "Shovot", "Gurlan", "Xonqa", "Yangiariq", "Hazorasp", "Qo'shko'pir"],
            cities_ru: ["г. Ургенч", "Хива", "Шават", "Гурлен", "Ханка", "Янгиарык", "Хазарасп"]
          },
          {
            id: "navoiy",
            name_uz: "Navoiy viloyati",
            name_ru: "Навоийская область",
            cities_uz: ["Navoiy shahri", "Zarafshon", "Karmana", "Qiziltepa", "Uchquduq", "Xatirchi", "Nurota"],
            cities_ru: ["г. Навои", "Зарафшан", "Кармана", "Кызылтепа", "Учкудук", "Хатырчи", "Нурата"]
          },
          {
            id: "jizzax",
            name_uz: "Jizzax viloyati",
            name_ru: "Джизакская область",
            cities_uz: ["Jizzax shahri", "Zomin", "Paxtakor", "G'allaorol", "Do'stlik", "Zarbdor", "Sharof Rashidov", "Baxmal"],
            cities_ru: ["г. Джизак", "Заамин", "Пахтакор", "Галляарал", "Дустлик", "Зарбдар", "Бахмал"]
          },
          {
            id: "sirdaryo",
            name_uz: "Sirdaryo viloyati",
            name_ru: "Сырдарьинская область",
            cities_uz: ["Guliston shahri", "Shirin", "Yangiyer", "Boyovut", "Sardoba", "Mirzaobod", "Sayxunobod", "Oqoltin"],
            cities_ru: ["г. Гулистан", "Ширин", "Янгиер", "Баяут", "Сардоба", "Мирзаабад", "Сайхунабад"]
          },
          {
            id: "qoraqalpogiston",
            name_uz: "Qoraqalpog'iston Respublikasi",
            name_ru: "Республика Каракалпакстан",
            cities_uz: ["Nukus shahri", "Qo'ng'irot", "To'rtko'l", "Beruniy", "Xo'jayli", "Chimboy", "Mang'it", "Mo'ynoq"],
            cities_ru: ["г. Нукус", "Кунград", "Турткуль", "Беруни", "Ходжейли", "Чимбай", "Мангит"]
          }
        ]
      }
    },
    values: [
      { title_uz: "Halollik", title_ru: "Честность", desc_uz: "Mahsulot sifati va tarkibida 100% halol va aniq ko'rsatkichlar", desc_ru: "Честность в качестве продукции и отношениях с партнерами" },
      { title_uz: "Mas'uliyat", title_ru: "Ответственность", desc_uz: "Mijozlar avtomobili xavfsizligi va maksimal natija uchun kafolat", desc_ru: "Гарантия безопасности для авто и максимального результата" },
      { title_uz: "Samimiylik", title_ru: "Искренность", desc_uz: "Har bir hamkor va mijozga do'stona, professional yondashuv", desc_ru: "Дружелюбный и профессиональный подход к каждому клиенту" }
    ]
  },

  categories: [
    { id: "all", name_uz: "Barcha Mahsulotlar", name_ru: "Все Продукты", icon: "fa-th-large" },
    { id: "shampoo", name_uz: "Avtoshampunlar & Ko'pik", name_ru: "Автошампуни и Пена", icon: "fa-soap" },
    { id: "detailing", name_uz: "Detailing & Spreylar", name_ru: "Детейлинг и Спреи", icon: "fa-spray-can" },
    { id: "wax", name_uz: "Suyuq Mum (Vosk)", name_ru: "Жидкий Воск", icon: "fa-shield-halved" },
    { id: "antifreeze", name_uz: "Antifriz & Qishki Suyuqlik", name_ru: "Антифриз и Незамерзайка", icon: "fa-snowflake" },
    { id: "fogger", name_uz: "Quruq Tuman (Сухой Туман)", name_ru: "Сухой Туман", icon: "fa-smog" },
    { id: "freshener", name_uz: "Aromatizatorlar", name_ru: "Ароматизаторы", icon: "fa-wind" },
    { id: "accessories", name_uz: "Aksessuarlar & Polik", name_ru: "Аксессуары и Полики", icon: "fa-car-side" },
    { id: "home", name_uz: "Maishiy Kimyo (Uy uchun)", name_ru: "Бытовая Химия для Дома", icon: "fa-house-chimney" }
  ],

  catalogPages: [
    { page: 1, id: "shampoo-01-super-pena", code: "HOFFEN 01", title_uz: "Kontaktsiz Avtoshampun «01 Super Pena»", title_ru: "Бесконтактный Автошампунь «01 Супер Пена»", image: "assets/products/shampoo_01_super_pena_ai.jpg" },
    { page: 2, id: "shampoo-magic-77", code: "MAGIC 77", title_uz: "Kontaktsiz Avtoshampun «Magic 77» (Pushti Ko'pik)", title_ru: "Бесконтактный Автошампунь «Magic 77» (Розовая пена)", image: "assets/products/shampoo_magic_77_ai.jpg" },
    { page: 3, id: "shampoo-09-nano", code: "HOFFEN 09", title_uz: "NANO Avtoshampun «09 Nano Shampoo» (Bubble Gum)", title_ru: "NANO Автошампунь «09 Nano Shampoo» (Bubble Gum)", image: "assets/products/shampoo_09_nano_ai.jpg" },
    { page: 4, id: "shampoo-05-active-foam", code: "HOFFEN 05", title_uz: "Avtoshampun «05 Active Foam FMX» (Sariq formula)", title_ru: "Автошампунь «05 Active Foam FMX» (Желтая формула)", image: "assets/products/shampoo_05_active_foam_ai.jpg" },
    { page: 5, id: "shampoo-06-active-foam", code: "HOFFEN 06 & +06", title_uz: "Avtoshampun «06 & +06 Active Foam FMX» (Ko'k formula)", title_ru: "Автошампунь «06 & +06 Active Foam FMX» (Синяя формула)", image: "assets/products/shampoo_06_plus_canisters_ai.jpg?v=5.0" },
    { page: 6, id: "shampoo-07-red-foam", code: "HOFFEN 07", title_uz: "Qalin Pushti Ko'pik «07 Active Foam» (Light Pink)", title_ru: "Густая Розовая Пена «07 Active Foam» (Light Pink)", image: "assets/products/shampoo_07_red_foam_ai.jpg" },
    { page: 7, id: "wax-08-super-wax", code: "HOFFEN 08", title_uz: "Suyuq Mum «08 Super Wax Bubble Gum» (Gidrofob & Jilo)", title_ru: "Жидкий Воск «08 Super Wax Bubble Gum» (Гидрофоб и Блеск)", image: "assets/products/wax_08_super_wax_ai.jpg" },
    { page: 8, id: "spray-rubber-blacker", code: "HOFFEN RB", title_uz: "Balon Qoraytirgich «Rubber Blacker FMX»", title_ru: "Чернитель Шин и Резины «Rubber Blacker FMX»", image: "assets/products/spray_rubber_blacker_ai.jpg" },
    { page: 9, id: "spray-motor-cleaner", code: "HOFFEN MC", title_uz: "Dvigatel Tozalagich «Motor Cleaner FMX»", title_ru: "Очиститель Двигателя «Motor Cleaner FMX»", image: "assets/products/spray_motor_cleaner_ai.jpg" },
    { page: 10, id: "graff-antifreeze-anamal", code: "GRAFF ANAMAL", title_uz: "Antifriz GRAFF Anamal (-40°C Life Time / Long Life)", title_ru: "Антифриз GRAFF Anamal (-40°C Life Time / Long Life)", image: "assets/products/antifreeze_graff_ai.jpg" },
    { page: 11, id: "nezamerzayka-graff", code: "GRAFF -20°C", title_uz: "Qishki Oyna Yuvish Suyuqligi «Nezamerzayka Super Aroma»", title_ru: "Зимний Стеклоомыватель «Незамерзайка Super Aroma»", image: "assets/products/nezamerzayka_graff_ai.jpg" },
    { page: 12, id: "dry-fog-fluids", code: "NANO FOG", title_uz: "Quruq Tuman Suyuqligi «Nano Fogger» (21 xil Elita Ifor)", title_ru: "Жидкость для Сухого Тумана «Nano Fogger» (21 премиум аромат)", image: "assets/products/dry_fog_machine_bottles_ai.jpg" },
    { page: 13, id: "air-freshener-100ml", code: "HOFFEN 100ML", title_uz: "Avtoparfum Aromatizator 100 ml (Shouboks & Flakon)", title_ru: "Автопарфюм Ароматизатор 100 мл (Шоубокс и Флаконы)", image: "assets/products/air_freshener_box_100ml_ai.jpg" },
    { page: 14, id: "detailing-sprays-set", code: "DETAILING SET", title_uz: "Detailing Spreylar To'plami «To'liq Avto Parvarish 5x450ml»", title_ru: "Набор Детейлинг Спреев «Полный Автоуход 5x450мл»", image: "assets/products/detailing_full_set_ai.jpg" },
    { page: 15, id: "spray-glass-cleaner", code: "HOFFEN GC", title_uz: "Oyna Tozalagich «Glass Cleaner»", title_ru: "Очиститель Стекол «Glass Cleaner»", image: "assets/products/spray_glass_cleaner_500ml.jpg" },
    { page: 16, id: "spray-polyrole", code: "HOFFEN PL", title_uz: "Plastik Polirovkasi «Polyrole Shine & Matte»", title_ru: "Полироль для Пластика «Polyrole Shine & Matte»", image: "assets/products/spray_polyrole_shine_450ml.jpg" },
    { page: 17, id: "shampoo-manual-1l", code: "HOFFEN HW-1L", title_uz: "Qo'lda Yuvish Avtoshampuni «Babl Gam & Okean» 1L", title_ru: "Автошампунь для ручной мойки 1л", image: "assets/products/shampoo_manual_hand_wash_02.jpg" },
    { page: 18, id: "cloth-microfiber-set", code: "HOFFEN TOWELS", title_uz: "Deteyling Mikrofibra Sochiqlari (5 xil o'lcham)", title_ru: "Микрофибровые Салфетки и Полотенца", image: "assets/products/microfiber_towels_set_03.jpg" },
    { page: 19, id: "car-paper-mats", code: "HOFFEN MAT-500", title_uz: "Avtomobil Polik Qog'ozi (500 шт)", title_ru: "Защитная бумага для полика (500 шт)", image: "assets/products/car_mat_paper_polik_04.jpg" }
  ],

  products: [
    {
        "id": "shampoo-01-super-pena",
        "code": "HOFFEN 01",
        "category": "shampoo",
        "brand": "HOFFEN 1",
        "name_uz": "Kontaktsiz Avtoshampun «01 Super Pena»",
        "name_ru": "Бесконтактный Автошампунь «01 Супер Пена»",
        "tagline_uz": "Qalin faol ko'pik, FMX formula, tejamkor va lakka zararsiz",
        "tagline_ru": "Густая активная пена, технология FMX, экономичный расход",
        "image": "assets/products/shampoo_01_super_pena_ai.jpg",
        "volumes": [
            "1 L",
            "5 kg",
            "20 kg"
        ],
        "default_prices": {
            "1 L": "35 000",
            "5 kg": "0",
            "20 kg": "480 000"
        },
        "specs": [
            {
                "label_uz": "Suyultirish (Penogenerator)",
                "label_ru": "Разведение (Пеногенератор)",
                "val": "1:50 - 1:100"
            },
            {
                "label_uz": "Suyultirish (Penokomplekt)",
                "label_ru": "Разведение (Пенокомплект)",
                "val": "1:5 - 1:10"
            },
            {
                "label_uz": "Ta'sir qilish vaqti",
                "label_ru": "Время действия",
                "val": "2 daqiqa"
            },
            {
                "label_uz": "Texnologiya",
                "label_ru": "Технология",
                "val": "FMX Technology"
            }
        ],
        "desc_uz": "Avtomobillarni kontaktsiz yuvish uchun yuqori konsentratsiyali professional shampun. Yengil va og'ir yo'l changlari, quritilgan loy va moyli kirlarni lak-bo'yoq qoplamasiga zarar yetkazmasdan oson eritib yuvadi. Bo'yoqqa yorqin jilo bag'ishlaydi.",
        "desc_ru": "Высококонцентрированный автошампунь для бесконтактной мойки всех типов автотранспорта. Образует обильную пену, эффективно расщепляет дорожную грязь, масло и пыль, не повреждая ЛКП и хром."
    },
    {
        "id": "shampoo-magic-77",
        "code": "MAGIC 77",
        "category": "shampoo",
        "brand": "HOFFEN 1",
        "name_uz": "Kontaktsiz Avtoshampun «Magic 77» (Pushti Ko'pik)",
        "name_ru": "Бесконтактный Автошампунь «Magic 77» (Розовая пена)",
        "tagline_uz": "Yorqin pushti faol ko'pik, super tozalash va yaltiroq natija",
        "tagline_ru": "Яркая розовая пена, глубокая очистка и зеркальный блеск",
        "image": "assets/products/shampoo_magic_77_ai.jpg",
        "volumes": [
            "1 L",
            "5 kg",
            "20 kg",
            "20 kg MEGIC (Bubblegum Aroma)"
        ],
        "default_prices": {
            "1 L": "50 000",
            "5 kg": "160 000",
            "20 kg": "580 000",
            "20 kg MEGIC (Bubblegum Aroma)": "630 000"
        },
        "specs": [
            {
                "label_uz": "Formula",
                "label_ru": "Формула",
                "val": "Active Pink Foam FMX"
            },
            {
                "label_uz": "Xususiyati",
                "label_ru": "Свойство",
                "val": "Super Yuvuvchi Konsentrat"
            },
            {
                "label_uz": "Qadoq turlari",
                "label_ru": "Фасовка",
                "val": "1L flakon, 5kg va 20kg kanistr"
            }
        ],
        "desc_uz": "HOFFEN Magic 77 - avtomoykalar uchun maxsus ishlab chiqilgan yuqori tejamkor va kuchli tozalovchi pushti ko'pikli avtoshampun. Har qanday qattiqlikdagi suvda ham qalin va chidamli ko'pik hosil qiladi, oson chayiladi, dog' qoldirmaydi.",
        "desc_ru": "Специальный профессиональный шампунь с повышенным розовым пенообразованием. Легко смывается водой, придает кузову антистатический эффект и защищает от повторного загрязнения."
    },
    {
        "id": "shampoo-09-nano",
        "code": "HOFFEN 09 NANO",
        "category": "shampoo",
        "brand": "HOFFEN 1",
        "name_uz": "NANO Avtoshampun «09 Nano Shampoo» (Bubble Gum)",
        "name_ru": "НАНО Автошампунь «09 Nano Shampoo» (Bubble Gum)",
        "tagline_uz": "Nano-zarralar bilan himoya, Bubble Gum xushbo'y ifori va yaltiroqlik",
        "tagline_ru": "Нано-защита ЛКП, насыщенный аромат Bubble Gum и гидрофобный эффект",
        "image": "assets/products/shampoo_09_nano_ai.jpg",
        "volumes": [
            "1 L",
            "5 kg",
            "20 kg"
        ],
        "default_prices": {
            "1 L": "35 000",
            "5 kg": "150 000",
            "20 kg": "530 000"
        },
        "specs": [
            {
                "label_uz": "Ifor",
                "label_ru": "Аромат",
                "val": "Bubble Gum (Saqich)"
            },
            {
                "label_uz": "Texnologiya",
                "label_ru": "Технология",
                "val": "Nano-polimer FMX"
            },
            {
                "label_uz": "Xususiyati",
                "label_ru": "Свойство",
                "val": "Antistatik & Gidrofob qatlam"
            }
        ],
        "desc_uz": "Nano-texnologiya asosida tayyorlangan elita avtoshampun. Yuvish jarayonida lak yuzasida ko'rinmas mikro-himoya qatlami hosil qiladi, suv va changni qaytaradi hamda atrofga yoqimli Bubble Gum iforini taratadi.",
        "desc_ru": "Нано-шампунь премиального класса с полирующим эффектом. Защищает лак от ультрафиолета и реагентов, создавая долговременную гидрофобную пленку с ароматом жвачки."
    },
    {
        "id": "shampoo-05-active-foam",
        "code": "HOFFEN 05",
        "category": "shampoo",
        "brand": "HOFFEN 1",
        "name_uz": "Avtoshampun «05 Active Foam FMX» (Sariq formula)",
        "name_ru": "Автошампунь «05 Active Foam FMX» (Желтая формула)",
        "tagline_uz": "Yuqori konsentratsiyali faol ko'pik, og'ir kirlarni oson eritish",
        "tagline_ru": "Концентрированная активная пена для стойких загрязнений",
        "image": "assets/products/shampoo_05_active_foam_ai.jpg",
        "volumes": [
            "1 L",
            "5 kg",
            "20 kg"
        ],
        "default_prices": {
            "1 L": "32 000",
            "5 kg": "140 000",
            "20 kg": "490 000"
        },
        "specs": [
            {
                "label_uz": "Rang / Formula",
                "label_ru": "Цвет / Формула",
                "val": "Sariq (Yellow) FMX Active"
            },
            {
                "label_uz": "Konsentratsiya",
                "label_ru": "Концентрация",
                "val": "Yuqori (1:60 - 1:120)"
            },
            {
                "label_uz": "Qadoq",
                "label_ru": "Фасовка",
                "val": "1L, 5kg, 20kg"
            }
        ],
        "desc_uz": "Kuz-qish va bahor mavsumidagi qiyin ketuvchi yo'l kirlari, moy va loylarni bir zumda eritishga mo'ljallangan faol ishqoriy muvozanatli professional avtoshampun.",
        "desc_ru": "Мощный профессиональный автошампунь для удаления стойких дорожных пленок, масел и глины в любых погодных условиях."
    },
    {
        "id": "shampoo-06-active-foam",
        "code": "HOFFEN 06 / +06",
        "category": "shampoo",
        "brand": "HOFFEN 1",
        "name_uz": "Avtoshampun «06 & +06 Active Foam FMX» (Ko'k formula)",
        "name_ru": "Автошампунь «06 и +06 Active Foam FMX» (Синяя формула)",
        "tagline_uz": "Kuchaytirilgan ko'pik formulasi, suv qattiqligiga chidamli",
        "tagline_ru": "Усиленная формула пены, устойчивая к жесткой воде",
        "image": "assets/products/shampoo_06_plus_canisters_ai.jpg?v=5.0",
        "volumes": [
            "1 L",
            "5 kg",
            "20 kg"
        ],
        "default_prices": {
            "1 L": "35 000",
            "5 kg": "150 000",
            "20 kg": "530 000"
        },
        "specs": [
            {
                "label_uz": "Rang / Formula",
                "label_ru": "Цвет / Формула",
                "val": "Ko'k (Blue) FMX Active +06"
            },
            {
                "label_uz": "Suvga chidamlilik",
                "label_ru": "К жесткости воды",
                "val": "100% faol ko'pik"
            },
            {
                "label_uz": "Qadoq",
                "label_ru": "Фасовка",
                "val": "1L, 5kg, 20kg"
            }
        ],
        "desc_uz": "HOFFEN 06 va +06 — avtomobil yuvish markazlari uchun eng ishonchli flagman vosita. Qalin ko'pigi avtomobil vertikal yuzalarida uzoq ushlanib, kirlarni tezda yumshatadi va xrom qismlarga mutlaqo ziyon yetkazmaydi.",
        "desc_ru": "Усиленный автошампунь серии 06 и +06. Создает густую стабильную пену, удерживающуюся на вертикальных панелях кузова для максимального расщепления грязи."
    },
    {
        "id": "shampoo-07-red-foam",
        "code": "HOFFEN 07",
        "category": "shampoo",
        "brand": "HOFFEN 1",
        "name_uz": "Qalin Pushti Ko'pik «07 Active Foam» (Light Pink)",
        "name_ru": "Активная Розовая Пена «07 Active Foam» (Light Pink)",
        "tagline_uz": "Estetik yorqin pushti ko'pik, premium vizual effekt va tozalik",
        "tagline_ru": "Эстетичная плотная розовая пена, премиальный визуальный эффект",
        "image": "assets/products/shampoo_07_red_foam_ai.jpg",
        "volumes": [
            "1 L",
            "5 kg",
            "20 kg"
        ],
        "default_prices": {
            "1 L": "35 000",
            "5 kg": "150 000",
            "20 kg": "520 000"
        },
        "specs": [
            {
                "label_uz": "Ko'pik rangi",
                "label_ru": "Цвет пены",
                "val": "Och Pushti (Light Pink)"
            },
            {
                "label_uz": "Korroziyaga qarshi",
                "label_ru": "Антикоррозия",
                "val": "Maxsus ingibitorlar"
            },
            {
                "label_uz": "Qadoq",
                "label_ru": "Фасовка",
                "val": "1L, 5kg, 20kg"
            }
        ],
        "desc_uz": "Mijozlarda ajoyib taassurot qoldiruvchi rangli qalin ko'pikli avtoshampun. Kuchli tozalash kuchi bilan birga avtomoykangiz nufuzini oshiradi va oson chayiladi.",
        "desc_ru": "Цветная розовая активная пена Light Pink с великолепным моющим действием. Придает автомойке статусность и обеспечивает безупречный результат."
    },
    {
        "id": "wax-08-super-wax",
        "code": "HOFFEN 08 WAX",
        "category": "wax",
        "brand": "HOFFEN 1",
        "name_uz": "Suyuq Mum «08 Super Wax Bubble Gum» (Gidrofob & Jilo)",
        "name_ru": "Жидкий Воск «08 Super Wax Bubble Gum» (Гидрофоб и Блеск)",
        "tagline_uz": "Suv qochiruvchi (gidrofob) qatlam, tez quritish va porloq jilo",
        "tagline_ru": "Быстрая сушка кузова, мощный гидрофобный эффект и блеск",
        "image": "assets/products/wax_08_super_wax_ai.jpg",
        "volumes": [
            "450 ml",
            "1 L",
            "5 kg",
            "20 kg"
        ],
        "default_prices": {
            "450 ml": "22 000",
            "1 L": "45 000",
            "5 kg": "190 000",
            "20 kg": "680 000"
        },
        "specs": [
            {
                "label_uz": "Ifor",
                "label_ru": "Аромат",
                "val": "Bubble Gum (Xushbo'y saqich)"
            },
            {
                "label_uz": "Format",
                "label_ru": "Формат",
                "val": "450ml sprey, 1L flakon, 5kg, 20kg"
            },
            {
                "label_uz": "Natija",
                "label_ru": "Результат",
                "val": "Zerkalniy jilo va suvni itarish"
            }
        ],
        "desc_uz": "Yuvilgan avtomobilni bir zumda quritish va yuzasiga chuqur jilo bag'ishlovchi tezkor suyuq mum. Suv tomchilarini silliq sirg'alib tushishini ta'minlaydi va yangi kirlanishdan uzoq vaqt asraydi.",
        "desc_ru": "Концентрированный жидкий воск с приятным ароматом Bubble Gum. Разрывает водяную пленку за секунды, ускоряет сушку и обеспечивает долговременный глянец."
    },
    {
        "id": "rubber-blacker-450ml",
        "code": "HOFFEN RUBBER",
        "category": "detailing",
        "brand": "HOFFEN 1",
        "name_uz": "Balon Qoraytirgich «Rubber Blacker FMX»",
        "name_ru": "Чернитель Резины «Rubber Blacker FMX»",
        "tagline_uz": "To'q qora nam jilo, UV nurlaridan himoya va elastiklik",
        "tagline_ru": "Глубокий черный влажный блеск, защита от растрескивания и УФ",
        "image": "assets/products/spray_rubber_blacker_ai.jpg",
        "volumes": [
            "450 ml",
            "5 kg",
            "20 kg"
        ],
        "default_prices": {
            "450 ml": "16 000",
            "5 kg": "120 000",
            "20 kg": "420 000"
        },
        "specs": [
            {
                "label_uz": "Effekt",
                "label_ru": "Эффект",
                "val": "Deep Black Wet Shine (Nam jilo)"
            },
            {
                "label_uz": "Himoya",
                "label_ru": "Защита",
                "val": "UV Protection va yorilishdan asrash"
            },
            {
                "label_uz": "Qadoq",
                "label_ru": "Фасовка",
                "val": "450ml trigger sprey, 5kg, 20kg"
            }
        ],
        "desc_uz": "Avtomobil shinalari va tashqi rezina moldinglariga yangi salondan chiqqandek chuqur qora nam jilo baxsh etuvchi maxsus kremniy-organik kompozitsiya. Chang yopishmaydi, suvdan himoyalaydi.",
        "desc_ru": "Премиальный чернитель шин на кремнийорганической основе. Возвращает резине глубокий черный цвет с эффектом мокрого блеска, предотвращает пересыхание и растрескивание."
    },
    {
        "id": "motor-cleaner-500ml",
        "code": "HOFFEN MOTOR",
        "category": "detailing",
        "brand": "HOFFEN 1",
        "name_uz": "Dvigatel Tozalagich «Motor Cleaner FMX»",
        "name_ru": "Очиститель Двигателя «Motor Cleaner FMX»",
        "tagline_uz": "Dvigatel blokidagi moy, yog' va qotgan qorakuylarni eritish",
        "tagline_ru": "Мощное расщепление масляных отложений и нагара под капотом",
        "image": "assets/products/spray_motor_cleaner_ai.jpg",
        "volumes": [
            "500 ml",
            "5 kg"
        ],
        "default_prices": {
            "500 ml": "17 000",
            "5 kg": "100 000"
        },
        "specs": [
            {
                "label_uz": "Qo'llanilishi",
                "label_ru": "Применение",
                "val": "Dvigatel bloki, transmissiya, podkapot"
            },
            {
                "label_uz": "Xavfsizlik",
                "label_ru": "Безопасность",
                "val": "Rezina shlanglar va simlarga zararsiz"
            },
            {
                "label_uz": "Qadoq",
                "label_ru": "Фасовка",
                "val": "500ml trigger sprey, 5kg kanistr"
            }
        ],
        "desc_uz": "Kapoti ostidagi dvigatel agregatlari, transmissiya va osma detallarni qotib qolgan texnik yog', antifriz va loy qatlamlaridan tozalovchi kuchli o'tkazuvchan emulsiyalovchi sprey.",
        "desc_ru": "Специальный состав для очистки подкапотного пространства. Быстро эмульгирует и смывает застарелое моторное масло, копоть и дорожные реагенты."
    },
    {
        "id": "graff-antifreeze-anamal",
        "code": "GRAFF ANAMAL",
        "category": "antifreeze",
        "brand": "GRAFF",
        "name_uz": "Antifriz GRAFF Anamal (-40°C Life Time / Long Life)",
        "name_ru": "Антифриз GRAFF Anamal (-40°C Life Time / Long Life)",
        "tagline_uz": "G11 (ko'k) va G12 (qizil), korroziyadan to'liq himoya, fosfatsiz",
        "tagline_ru": "G11 (синий) и G12 (красный), защита от кавитации и коррозии",
        "image": "assets/products/antifreeze_graff_ai.jpg",
        "volumes": [
            "-40 KO'K 1 kg",
            "-40 QIZIL 1 kg",
            "-40 KO'K 5 kg",
            "-40 QIZIL 5 kg",
            "-40 KO'K 10 kg",
            "-40 QIZIL 10 kg",
            "-40 KO'K 20 kg",
            "-40 QIZIL 20 kg",
            "200 kg (bochka)"
        ],
        "default_prices": {
            "-40 KO'K 1 kg": "16 000",
            "-40 QIZIL 1 kg": "16 500",
            "-40 KO'K 5 kg": "78 000",
            "-40 QIZIL 5 kg": "80 000",
            "-40 KO'K 10 kg": "0",
            "-40 QIZIL 10 kg": "0",
            "-40 KO'K 20 kg": "0",
            "-40 QIZIL 20 kg": "0",
            "200 kg (bochka)": "0"
        },
        "specs": [
            {
                "label_uz": "Muzlash harorati",
                "label_ru": "Температура замерзания",
                "val": "-40°C gacha kafolat"
            },
            {
                "label_uz": "Standartlar",
                "label_ru": "Стандарты",
                "val": "G11 Blue / G12 Red Long Life"
            },
            {
                "label_uz": "Hajmlar",
                "label_ru": "Объемы",
                "val": "1kg, 5kg, 10kg, 20kg, 200kg bochka"
            }
        ],
        "desc_uz": "Zamonaviy alyuminiy va cho'yan dvigatellar sovutish tizimi uchun premium karboksilatli antifriz. Nasos (pompa) va radiatorni kavitatsiya hamda zanglashdan ishonchli asraydi.",
        "desc_ru": "Высококачественный антифриз длительного срока службы. Надежно защищает систему охлаждения от перегрева летом и замерзания при температуре до -40°C зимой."
    },
    {
        "id": "graff-nezamerzayka",
        "code": "GRAFF NEZAMERZAYKA",
        "category": "antifreeze",
        "brand": "GRAFF",
        "name_uz": "Qishki Oyna Yuvish Suyuqligi «Nezamerzayka Super Aroma»",
        "name_ru": "Зимняя Стеклоомывающая Жидкость «Незамерзайка Super Aroma»",
        "tagline_uz": "Muzlamaydi, anti-yomg'ir effekti, iz qoldirmaydi, 5 xil xushbo'y ifor",
        "tagline_ru": "Не замерзает, эффект антидождя, приятные ароматы без спиртового запаха",
        "image": "assets/products/nezamerzayka_graff_ai.jpg",
        "volumes": [
            "1 L (-10°C)",
            "2,5 L (-10°C)",
            "5 L (-10°C)",
            "1 L (-20°C)",
            "2,5 L (-20°C)",
            "5 L (-20°C)"
        ],
        "default_prices": {
            "1 L (-10°C)": "10 000",
            "2,5 L (-10°C)": "18 000",
            "5 L (-10°C)": "32 000",
            "1 L (-20°C)": "12 000",
            "2,5 L (-20°C)": "22 000",
            "5 L (-20°C)": "38 000"
        },
        "specs": [
            {
                "label_uz": "Ifor turlari",
                "label_ru": "Ароматы",
                "val": "Olma, Shaftoli, Okean, Bubble Gum"
            },
            {
                "label_uz": "Harorat rejimi",
                "label_ru": "Температурный режим",
                "val": "-10°C va -20°C gacha"
            },
            {
                "label_uz": "Xavfsizlik",
                "label_ru": "Безопасность",
                "val": "Rezina cho'tka va bo'yoqqa mutlaqo beziyon"
            }
        ],
        "desc_uz": "Qish mavsumida avtomobil old oynasini yaxlashdan, yo'l loylari va tuzli quyqalardan tozalovchi xushbo'y suyuqlik. Spirtning achchiq hidi yo'q, salonga yoqimli meva ifori taraladi.",
        "desc_ru": "Зимний стеклоомыватель с технологией Super Aroma и эффектом антидождя. Обеспечивает кристальный обзор и безопасное вождение в морозную погоду."
    },
    {
        "id": "dry-fog-liquids",
        "code": "HOFFEN FOGGER",
        "category": "fogger",
        "brand": "NANO FOGGER",
        "name_uz": "Quruq Tuman Suyuqligi «Nano Fogger» (21 xil Elita Ifor)",
        "name_ru": "Жидкость для Сухого Тумана «Nano Fogger» (21 Аромат)",
        "tagline_uz": "Salondagi barcha yomon hidlarni yo'qotadi va uzoq vaqt saqlanadi",
        "tagline_ru": "Нейтрализация неприятных запахов и стойкая ароматизация салона",
        "image": "assets/products/dry_fog_machine_bottles_ai.jpg",
        "volumes": [
            "0,5 L",
            "1 L"
        ],
        "default_prices": {
            "0,5 L": "110 000",
            "1 L": "195 000"
        },
        "specs": [
            {
                "label_uz": "Iforlar soni",
                "label_ru": "Количество ароматов",
                "val": "21 xil original elita iforlar"
            },
            {
                "label_uz": "Mashhur iforlar",
                "label_ru": "Популярные вкусы",
                "val": "Chanel Sport, Black Ice, Creed, Eclat"
            },
            {
                "label_uz": "Qadoq",
                "label_ru": "Фасовка",
                "val": "0.5L va 1L maxsus zich flakon"
            }
        ],
        "desc_uz": "Quruq tuman apparatlari uchun maxsus patentlangan dezinfeksiyalovchi va xushbo'ylantiruvchi suyuqlik. Avtomobil konditsioner tizimi va matolaridagi tamaki, chirish va namlik hidlarini molekulyar darajada yo'qotadi.",
        "desc_ru": "Специальная жидкость для технологии «Сухой Туман». Проникает в самые труднодоступные места обивки и вентиляции, полностью устраняя въевшиеся запахи."
    },
    {
        "id": "air-freshener-100ml",
        "code": "HOFFEN 100ML",
        "category": "freshener",
        "brand": "HOFFEN 1",
        "name_uz": "Avtoparfum Aromatizator 100 ml (Shouboks & Flakon)",
        "name_ru": "Ароматизатор Воздуха 100 мл (Шоубокс и Флакон)",
        "tagline_uz": "45 kungacha doimiy yangilik ifori, 5/1 formula, qulay va ixcham",
        "tagline_ru": "Стойкий аромат до 45 дней, удобный формат для авто и дома",
        "image": "assets/products/air_freshener_box_100ml_ai.jpg",
        "volumes": [
            "100 ml Flakon",
            "16 donalik Shouboks"
        ],
        "default_prices": {
            "100 ml Flakon": "18 000",
            "16 donalik Shouboks": "250 000"
        },
        "specs": [
            {
                "label_uz": "Hajm",
                "label_ru": "Объем",
                "val": "100 ml purkagichli flakon"
            },
            {
                "label_uz": "Muddat",
                "label_ru": "Стойкость",
                "val": "45 kungacha tabiiy ifor"
            },
            {
                "label_uz": "Ulgurji shouboks",
                "label_ru": "Шоубокс",
                "val": "16 dona turli iforlar"
            }
        ],
        "desc_uz": "Avtomobil salonida va xonalarda doimiy toza va yoqimli havo muhitini yaratuvchi ixcham 100 ml aromatizator. 16 donalik chiroyli savdo stend-shouboksi bilan yetkazib beriladi.",
        "desc_ru": "Компактный освежитель воздуха 100 мл с распылителем. Стойкие премиальные композиции, удобный формат для витрин магазинов и автомоек."
    },
    {
        "id": "detailing-set-5in1",
        "code": "HOFFEN DETAILING SET",
        "category": "detailing",
        "brand": "HOFFEN 1",
        "name_uz": "Detailing Spreylar To'plami «To'liq Avto Parvarish 5x450ml»",
        "name_ru": "Набор Детейлинг Спреев «Полный Автоуход 5x450мл»",
        "tagline_uz": "Balon, oyna, salon, plastik va torpeda uchun 5 ta mukammal sprey",
        "tagline_ru": "Комплексный уход: чернитель, стеклоочиститель, очиститель салона, полироли",
        "image": "assets/products/detailing_full_set_ai.jpg",
        "volumes": [
            "450 ml Alohida sprey",
            "5 tasi 1 da To'liq Komplekt"
        ],
        "default_prices": {
            "450 ml Alohida sprey": "16 000",
            "5 tasi 1 da To'liq Komplekt": "75 000"
        },
        "specs": [
            {
                "label_uz": "Tarkibi",
                "label_ru": "Состав",
                "val": "Rubber Blacker, Glass, Salon, Polyrole Shine, Matte"
            },
            {
                "label_uz": "Iqtisodiy foyda",
                "label_ru": "Экономия",
                "val": "Komplektda 15% arzonroq"
            },
            {
                "label_uz": "Format",
                "label_ru": "Формат",
                "val": "5 x 450 ml ergonomik triggerlar"
            }
        ],
        "desc_uz": "Avtomobilni to'liq parvarish qilish uchun kerak bo'ladigan barcha flagman spreylar bir joyda: Rezina qoraytirgich, oyna tozalagich, salon interyer kimchistkasi hamda plastik polirovkalar.",
        "desc_ru": "Универсальный детейлинг-набор из 5 ключевых спреев HOFFEN 1. Комплексное решение для кузова, колес, стекол и салона автомобиля."
    },
    {
        "id": "spray-glass-cleaner",
        "code": "HOFFEN GLASS",
        "category": "detailing",
        "brand": "HOFFEN 1",
        "name_uz": "Oyna Tozalagich «Glass Cleaner»",
        "name_ru": "Очиститель Стекол «Glass Cleaner»",
        "tagline_uz": "Oyna va ko'zgularda dog' va iz qoldirmaydigan billur tozalik",
        "tagline_ru": "Кристальная чистота без разводов и следов на стеклах и зеркалах",
        "image": "assets/products/spray_glass_cleaner_500ml.jpg",
        "volumes": [
            "450 ml",
            "1 ta karobka"
        ],
        "default_prices": {
            "450 ml": "14 000",
            "1 ta karobka": "168 000"
        },
        "specs": [
            {
                "label_uz": "Format",
                "label_ru": "Формат",
                "val": "450 ml trigger sprey, 1 ta karobka"
            },
            {
                "label_uz": "Effekt",
                "label_ru": "Эффект",
                "val": "Antistatik va yog'sizlantirish"
            }
        ],
        "desc_uz": "Avtomobil oynalari, ko'zgulari va tonirovkali plyonkalarni barmoq izlari, tamaki tutuni qatlamidan tozalaydi.",
        "desc_ru": "Эффективный очиститель стекол без разводов и бликов. Безопасен для тонировочных пленок."
    },
    {
        "id": "spray-polyrole",
        "code": "HOFFEN POLYROLE",
        "category": "detailing",
        "brand": "HOFFEN 1",
        "name_uz": "Plastik Polirovkasi «Polyrole Shine & Matte»",
        "name_ru": "Полироль Пластика «Polyrole Shine & Matte»",
        "tagline_uz": "Plastik va torpedaga yangi ko'rinish va antistatik himoya",
        "tagline_ru": "Обновление пластика торпедо, антистатический и пылеотталкивающий эффект",
        "image": "assets/products/spray_polyrole_shine_450ml.jpg",
        "volumes": [
            "450 ml Yaltiroq (Shine)",
            "450 ml Mat (Matte)",
            "1 karobka"
        ],
        "default_prices": {
            "450 ml Yaltiroq (Shine)": "16 000",
            "450 ml Mat (Matte)": "16 000",
            "1 karobka": "192 000"
        },
        "specs": [
            {
                "label_uz": "Turlari",
                "label_ru": "Виды",
                "val": "Shine (Yaltiroq) va Matte (Mat)"
            },
            {
                "label_uz": "Ifor",
                "label_ru": "Аромат",
                "val": "Yangi avto ifori"
            }
        ],
        "desc_uz": "Torpeda, eshik kartalari va bamper plastiklarini yangilovchi kremniyli polirovkalar to'plami.",
        "desc_ru": "Защитная полироль для пластиковых панелей салона. Придает ухоженный вид и отталкивает пыль."
    },
    {
        "id": "shampoo-manual-1l",
        "code": "HOFFEN HW-1L",
        "category": "shampoo",
        "brand": "HOFFEN 1",
        "name_uz": "Avtoshampun Qo'lda Yuvish «Manual Hand Wash» 1L",
        "name_ru": "Автошампунь для ручной мойки «Manual Hand Wash» 1л",
        "tagline_uz": "Qo'lda yuvish uchun boy ko'pikli va xushbo'y avtoshampun (Babl Gam / Okean)",
        "tagline_ru": "Премиальный ручной шампунь с обильной пеной и ароматами (Bubble Gum / Ocean)",
        "image": "assets/products/shampoo_manual_hand_wash_02.jpg",
        "volumes": [
            "1L BABL GAM (автошампунь ручной)",
            "1L OKEAN (автошампунь ручной)"
        ],
        "default_prices": {
            "1L BABL GAM (автошампунь ручной)": "22 000",
            "1L OKEAN (автошампунь ручной)": "22 000"
        },
        "specs": [
            {
                "label_uz": "Hajmi",
                "label_ru": "Объем",
                "val": "1 Litr (Flakon)"
            },
            {
                "label_uz": "Turlari / Iforlar",
                "label_ru": "Виды / Ароматы",
                "val": "1L BABL GAM (Pushti) / 1L OKEAN (Moviy)"
            },
            {
                "label_uz": "Qo'llanilishi",
                "label_ru": "Применение",
                "val": "Qo'lda yuvish (vedro, gubka, varezka)"
            },
            {
                "label_uz": "Xususiyati",
                "label_ru": "Особенности",
                "val": "Qo'l terisi va bo'yoqqa 100% xavfsiz, neytral pH"
            }
        ],
        "desc_uz": "HOFFEN 1 qo'lda yuvish uchun maxsus ishlab chiqarilgan avtoshampun. Ikki xil yoqimli ifor: 1L BABL GAM va 1L OKEAN. Lak-bo'yoq qoplamasini chizilishdan saqlovchi boy va sirpanuvchan ko'pik beradi.",
        "desc_ru": "Премиальный автошампунь для ручной мойки HOFFEN 1 объемом 1л. Два вида аромата: 1L BABL GAM и 1L OKEAN. Образует обильную пену с превосходным скольжением, безопасен для ЛКП и кожи рук."
    },
    {
        "id": "cloth-microfiber-set",
        "code": "HOFFEN TOWELS",
        "category": "accessories",
        "brand": "HOFFEN 1",
        "name_uz": "Deteyling Mikrofibra Sochiqlari «Microfiber & Guff Towels»",
        "name_ru": "Микрофибровые салфетки и полотенца «Microfiber & Guff»",
        "tagline_uz": "Chizishdan xavfsiz, lak-bo'yoqqa zarar yetkazmaydigan super nam yutuvchi sochiqlar",
        "tagline_ru": "Безопасная сушка без царапин, ультра-впитывающая микрофибра высокой плотности",
        "image": "assets/products/microfiber_towels_set_03.jpg",
        "volumes": [
            "40/30 sm",
            "60/30 sm",
            "(GUFF) 40/60",
            "(GUFF) 50/70",
            "(GUFF) 60/80"
        ],
        "default_prices": {
            "40/30 sm": "11 000",
            "60/30 sm": "12 000",
            "(GUFF) 40/60": "30 000",
            "(GUFF) 50/70": "35 000",
            "(GUFF) 60/80": "50 000"
        },
        "specs": [
            {
                "label_uz": "O'lchamlar",
                "label_ru": "Размеры",
                "val": "40/30 sm, 60/30 sm, (GUFF) 40/60, (GUFF) 50/70, (GUFF) 60/80"
            },
            {
                "label_uz": "Zichlik (GSM)",
                "label_ru": "Плотность (GSM)",
                "val": "550 - 700 GSM (Professional Detailing)"
            },
            {
                "label_uz": "Tuzilishi",
                "label_ru": "Структура",
                "val": "Super Soft mikrofibra va Plush Guff tolalar"
            },
            {
                "label_uz": "Xavfsizlik",
                "label_ru": "Безопасность",
                "val": "Lakka zarar yetkazmaydi, tuk va dog' qoldirmaydi"
            }
        ],
        "desc_uz": "HOFFEN 1 professional deteyling va quritish sochiqlari to'plami. Turli xil ehtiyojlar uchun 5 xil o'lcham: 40/30 sm, 60/30 sm va qalin GUFF 40/60, 50/70, 60/80. Lak-bo'yoqni chizmasdan suvni bir zumda shimib oladi.",
        "desc_ru": "Профессиональный комплект микрофибровых салфеток и супервпитывающих полотенец GUFF. 5 размеров для кузова, стекол и салона. Плотность 550-700 GSM, абсолютная защита ЛКП от царапин и разводов."
    },
    {
        "id": "car-paper-mats",
        "code": "HOFFEN MAT-500",
        "category": "accessories",
        "brand": "HOFFEN 1",
        "name_uz": "Avtomobil Polik Qog'ozi «Qog'oz (бумага для полика)» 500 шт",
        "name_ru": "Бумага для полика защитная «HOFFEN 1» 500 шт",
        "tagline_uz": "«УДАЧИ НА ДОРОГЕ» yozuvli namga chidamli avtomobil polik qog'ozi (500 dona)",
        "tagline_ru": "Влагостойкие бумажные коврики для автомойки и сервиса (500 шт в упаковке)",
        "image": "assets/products/car_mat_paper_polik_04.jpg",
        "volumes": [
            "500 шт"
        ],
        "default_prices": {
            "500 шт": "225 000"
        },
        "specs": [
            {
                "label_uz": "Miqdori",
                "label_ru": "Количество",
                "val": "500 dona (shtuk) blokda"
            },
            {
                "label_uz": "Qog'oz turi",
                "label_ru": "Тип бумаги",
                "val": "Namga chidamli mustahkam kraft qog'oz"
            },
            {
                "label_uz": "Dizayn",
                "label_ru": "Дизайн",
                "val": "«УДАЧИ НА ДОРОГЕ» va HOFFEN 1 logotipi"
            },
            {
                "label_uz": "Maqsadi",
                "label_ru": "Назначение",
                "val": "Avtomobil poliklarini toza saqlash"
            }
        ],
        "desc_uz": "Moyka va servisdan chiqqan avtomobil poliklarini toza va quruq saqlash uchun maxsus sifatli qog'ozlar to'plami. Namga chidamli, oyoq izi va «УДАЧИ НА ДОРОГЕ» HOFFEN 1 dizayniga ega. Bir to'plamda 500 dona.",
        "desc_ru": "Защитные бумажные коврики для поликов автомобиля после мойки и химчистки. Высокая прочность, устойчивость к влаге, стильный фирменный принт HOFFEN 1 «УДАЧИ НА ДОРОГЕ». 500 штук в упаковке."
    }
]
};

if (typeof window !== 'undefined') {
  window.HOFFEN_DATA = HOFFEN_DATA;
}
