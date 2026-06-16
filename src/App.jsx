import { createElement, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Bot,
  Boxes,
  Building2,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Facebook,
  Gem,
  Instagram,
  Languages,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Music2,
  Send,
  Sparkles,
  Trophy,
  X,
  Zap,
} from 'lucide-react'

const A = '/mavi-assets'
const EMAIL_PRIMARY = 'info@mavidesignsrl.it'
const EMAIL_SECONDARY = 'mavidesignsrlmilano@gmail.com'
const PHONE_PRIMARY = '+39 392 667 7298'
const PHONE_SECONDARY = '+39 388 308 3499'
const INSTAGRAM_URL = 'https://www.instagram.com/mavidesignsrl?igsh=MXRydGJ3NmVyNXZ6OA%3D%3D&utm_source=qr'
const FACEBOOK_URL = 'https://www.facebook.com/share/19A2YjYez2/?mibextid=wwXIfr'
const WHATSAPP_URL = 'https://wa.me/393926677298'
const WHATSAPP_SECONDARY_URL = 'https://wa.me/393883083499'
const MAPS_URL = 'https://www.google.com/maps/search/Mavi+Design+SRL+Milan+Italy'
const PROJECT_PREVIEW_COUNT = 10
const AI_BUTTON_LABEL = 'Mavi AI Destek'
const AI_PANEL_TITLE = 'Mavi Design Destek Asistanı'
const AI_PANEL_INTRO = 'Restoran tasarımı, ürünler ve teklif süreci hakkında yardımcı olur.'
const AI_GREETING =
  'Merhaba, Mavi Design SRL destek asistanına hoş geldiniz. Restoran tasarımı, ürün kataloğu, LED dekorasyon, özel üretim ve fiyat teklifi konularında size yardımcı olabiliriz.'
const AI_UNKNOWN_FALLBACK = 'Bu konuda size daha net yardımcı olabilmemiz için WhatsApp üzerinden Mavi Design SRL ekibiyle iletişime geçmenizi öneririz.'
const AI_QUICK_QUESTIONS = [
  'Restoran tasarımı',
  'Fiyat teklifi',
  'Ürün kataloğu',
  'WhatsApp iletişim',
]
const AI_ANSWERS = {
  quote:
    'Fiyat teklifi için mekan ölçüsü, yapılacak iş kapsamı ve ürün seçimi gereklidir. WhatsApp üzerinden proje bilgilerinizi iletirseniz Mavi Design SRL ekibi size dönüş yapabilir.',
  restaurant:
    'Mavi Design SRL restoran, kafe ve ticari mekanlar için konsept tasarım, özel üretim, mobilya, LED dekorasyon ve kurulum sürecinde destek sağlar.',
  catalog: 'Ürün kataloğu ve detaylı seçenekler için WhatsApp üzerinden Mavi Design SRL ekibiyle iletişime geçebilirsiniz.',
  whatsapp: 'WhatsApp üzerinden hızlıca iletişime geçebilirsiniz: +39 392 667 7298 / +39 388 308 3499.',
}

const navItems = [
  ['home', 'home'],
  ['projects', 'projects'],
  ['products', 'products'],
  ['led', 'led'],
  ['catalog', 'catalog'],
  ['aiDesign', 'ai-design'],
  ['packages', 'packages'],
  ['about', 'about'],
  ['contact', 'contact'],
]

const languageOptions = [
  ['en', 'EN'],
  ['it', 'IT'],
  ['tr', 'TR'],
  ['ar', 'AR'],
]

const projects = [
  'completed-1.jpg',
  'product-2.jpg',
  'product-3.jpg',
  'project-1.jpeg',
  'project-2.jpeg',
  'project-3.jpeg',
  'project-4.png',
  'project-5.png',
  'project-6.png',
  'project-7.png',
  'project-8.png',
  'project-9.png',
  'project-10.png',
  'project-11.png',
  'project-15.jpg',
  'project-16.jpeg',
  'project-17.jpeg',
  'project-18.jpeg',
  'project-19.jpeg',
  'project-20.jpeg',
  'project-21.jpeg',
  'project-22.jpeg',
  'project-23.jpeg',
  'project-24.jpeg',
  'project-25.jpeg',
  'project-26.jpeg',
  'project-27.jpeg',
  'project-28.jpeg',
  'project-29.jpeg',
  'project-30.jpeg',
  'project-31.jpeg',
  'project-32.jpeg',
  'project-33.jpeg',
  'project-34.jpeg',
  'project-35.jpeg',
  'project-36.jpeg',
  'project-37.jpeg',
  'project-38.jpeg',
  'service-1.jpg',
  'service-2.jpg',
  'service-4.jpg',
  'timeline-2.jpg',
  'timeline-3.jpg',
  'timeline-5.jpg',
  'timeline-6.jpg',
  'timeline-7.jpg',
].map((file, index) => ({
  src: `${A}/projects/${file}`,
  title: `Restaurant project ${index + 1}`,
}))

const serviceImages = ['service-1.jpg', 'service-2.jpg', 'service-4.jpg', 'timeline-2.jpg', 'timeline-3.jpg', 'timeline-5.jpg'].map(
  (file) => `${A}/projects/${file}`,
)

const catalog = Array.from({ length: 19 }, (_, index) => {
  const n = String(index + 1).padStart(2, '0')
  return {
    src: `${A}/catalog/catalog-${n}.png${index === 11 ? '' : '.png'}`,
    title: `Catalog page ${index + 1}`,
  }
})

const productGroups = [
  ['Chairs', ['IMG_5045.PNG', 'IMG_5048.PNG', 'IMG_5049.PNG', 'IMG_5050.PNG', 'IMG_5051.PNG', 'IMG_5052.PNG', 'IMG_5053.PNG', 'IMG_5054.PNG', 'IMG_5055.PNG', 'IMG_5056.PNG', 'IMG_5057.PNG', 'IMG_5058.PNG', 'IMG_5059.PNG', 'IMG_5066.PNG', 'IMG_5067.PNG', 'IMG_5069.PNG', 'IMG_5070.PNG'].map((file) => `${A}/products/chairs/${file}`)],
  ['ElectronicProducts', ['Ekran görüntüsü 2026-05-05 142903.png', 'IMG_5041.PNG', 'IMG_5042.PNG', 'IMG_5092.PNG', 'IMG_5093.PNG', 'IMG_5094.PNG', 'IMG_5095.PNG', 'IMG_5096.PNG', 'IMG_5097.PNG', 'IMG_5098.PNG', 'IMG_5100.PNG', 'IMG_5101.PNG', 'IMG_5102.PNG', 'IMG_5103.PNG', 'IMG_5104.PNG', 'IMG_5105.PNG', 'IMG_5106.PNG', 'IMG_5107.PNG', 'IMG_5108.PNG', 'IMG_5109.PNG', 'IMG_5176.PNG'].map((file) => `${A}/products/other/${file}`)],
  ['BancoProducts', ['IMG_5178.PNG', 'IMG_5180.PNG', 'IMG_5182.PNG', 'IMG_5184.PNG'].map((file) => `${A}/products/banco/${file}`)],
  ['Tables', ['IMG_5073.PNG', 'IMG_5074.PNG', 'IMG_5075.PNG', 'IMG_5076.PNG', 'IMG_5077.PNG', 'IMG_5078.PNG'].map((file) => `${A}/products/tables/${file}`)],
  ['Sofas', ['IMG_5043.PNG', 'IMG_5044.PNG', 'IMG_5060.PNG', 'IMG_5061.PNG', 'IMG_5063.PNG', 'IMG_5064.PNG', 'IMG_5065.PNG'].map((file) => `${A}/products/sofas/${file}`)],
  ['Accessories', ['IMG_5079.PNG', 'IMG_5081.PNG', 'IMG_5082.PNG', 'IMG_5083.PNG', 'IMG_5085.PNG', 'IMG_5086.PNG', 'IMG_5087.PNG', 'IMG_5088.PNG', 'IMG_5089.PNG', 'IMG_5090.PNG', 'IMG_5091.PNG'].map((file) => `${A}/products/accessories/${file}`)],
  ['PremiumPlateCollection', ['plate-20x30-01.webp.png', 'plate-20x30-02.webp.png', 'plate-20x30-03.webp.png', 'plate-20x30-04.webp.png', 'plate-23x34-01.webp.png', 'plate-23x34-02.webp.png', 'plate-23x34-03.webp.png', 'plate-23x34-04.webp.png'].map((file) => `${A}/plates/${file}`)],
  ['DecorativeWallPanels', ['wall-panel-01.webp.png', 'wall-panel-02.webp.png', 'wall-panel-03.webp.png', 'wall-panel-04.webp.png', 'wall-panel-05.webp.png'].map((file) => `${A}/productswall-panels/${file}`)],
]

const decorGroups = [
  ['customDesign', ['custom-design/custom-01/cover.png.png', 'custom-design/custom-02/cover.png.png']],
  [
    'ledSigns',
    [
      'led-signs/buongiorno/cover.png.png',
      'led-signs/cin-cin/cover.png.png',
      'led-signs/coffee-sign/cover.png.png',
      'led-signs/custom-led/cover.png.png',
      'led-signs/döner-kebap/cover.png.png',
      'led-signs/neon-sign/cover.png.png',
      'led-signs/pizza-kebab/cover.png.png',
    ],
  ],
  ['lighting', ['lighting/Lighting-01/cover.png.png', 'lighting/Lighting-02/cover.png.png']],
  ['mirrors', ['mirrors/mirror-01/cover.png.png', 'mirrors/mirror-02/cover.png.png', 'mirrors/mirror-03/cover.png.png']],
  [
    'wallDecor',
    [
      'wall-decor/wall-decor-01/cover.png.png',
      'wall-decor/wall-decor-02/cover.png.png',
      'wall-decor/wall-decor-03/cover.png.png',
      'wall-decor/wall-decor-04/cover.png.png',
      'wall-decor/wall-decor-05/cover.png.png',
      'wall-decor/wall-decor-06/cover.png.png',
    ],
  ],
]

const publishVideos = ['0410(4).mp4', '0410(6).mp4', '0410(9).mp4'].map((file) => `${A}/reels/${file}`)

const sofaShowcase = [
  { key: 'blueSofa', src: `${A}/products/sofas/IMG_5043.PNG` },
  { key: 'redSofa', src: `${A}/products/sofas/IMG_5044.PNG` },
  { key: 'beigeSofa', src: `${A}/products/sofas/IMG_5061.PNG` },
  { key: 'electronicProduct1', title: 'Electronic Product', src: `${A}/products/other/IMG_5041.PNG` },
  { key: 'electronicProduct2', title: 'Electronic Product', src: `${A}/products/other/IMG_5042.PNG` },
  { key: 'electronicProduct3', title: 'Electronic Product', src: `${A}/products/other/IMG_5092.PNG` },
]

const services = [
  ['Restaurant design', ChefHat],
  ['Production', Building2],
  ['Kitchen equipment', Zap],
  ['Custom furniture', Gem],
  ['LED decoration', Sparkles],
  ['Catalog products', Boxes],
  ['AI design', Bot],
  ['Installation', Trophy],
]

const packages = [
  ['Classic', 'Concept, layout direction, core furniture selection and clear production scope.'],
  ['Premium', 'Full interior direction, custom furniture, kitchen coordination and decor planning.'],
  ['Luxury', 'Signature restaurant identity with cinematic materials, LED features and made-to-measure production.'],
  ['VIP', 'End-to-end creative, AI previews, production, installation and launch-ready atmosphere.'],
]

const translations = {
  en: {
    dir: 'ltr',
    nav: {
      home: 'Home',
      projects: 'Projects',
      products: 'Products',
      led: 'LED',
      catalog: 'Catalog',
      aiDesign: 'AI Design',
      packages: 'Packages',
      about: 'About',
      contact: 'Contact',
    },
    aria: {
      menu: 'Toggle menu',
      language: 'Select language',
      lightbox: 'Image preview',
      close: 'Close lightbox',
      previous: 'Previous image',
      next: 'Next image',
      whatsapp: 'WhatsApp contact details',
    },
    intro: 'Mavi Design SRL',
    heroKicker: 'Milan / Italy / 92 completed projects',
    heroTitle: 'Restaurant interiors built like cinematic brands.',
    heroText:
      'Mavi Design SRL creates restaurant design, production, kitchen equipment, custom furniture, LED decoration, AI concepts and installation for ambitious hospitality spaces.',
    heroSlogan: 'Imagine it, we will design it.',
    viewProjects: 'View projects',
    explorePackages: 'Explore packages',
    stats: ['completed projects', 'integrated services', 'premium packages'],
    projectsKicker: 'Projects',
    projectsTitle: 'Completed restaurant atmospheres',
    projectsText: 'A selected gallery from the provided Mavi Design SRL project archive.',
    projectLabel: 'Restaurant project',
    loadMoreProjects: 'Load more projects',
    servicesKicker: 'Services',
    servicesTitle: 'Design, manufacture, install, launch.',
    services: {
      'Restaurant design': 'Restaurant design',
      Production: 'Production',
      'Kitchen equipment': 'Kitchen equipment',
      'Custom furniture': 'Custom furniture',
      'LED decoration': 'LED decoration',
      'Catalog products': 'Catalog products',
      'AI design': 'AI design',
      Installation: 'Installation',
    },
    productsKicker: 'Products',
    productsTitle: 'Furniture and equipment catalog selections',
    productsText: 'Preview thumbnails are loaded first so the page stays fast on mobile.',
    loadMoreProducts: 'Load more products',
    productGroups: {
      Chairs: 'Chairs',
      ElectronicProducts: 'Electronic Products',
      BancoProducts: 'Banco Products',
      Sofas: 'Sofas',
      Tables: 'Tables',
      Accessories: 'Accessories',
      PremiumPlateCollection: 'Premium Plate Collection',
      DecorativeWallPanels: 'Decorative Wall Panels',
    },
    productGroupText: {
      PremiumPlateCollection: 'Premium plates for restaurants, cafés, hotels and elegant food presentation.',
      DecorativeWallPanels: 'Decorative wall panels and functional restaurant equipment solutions for commercial spaces.',
    },
    reelsKicker: 'Reels',
    reelsTitle: 'Motion, material, atmosphere',
    reelsText: 'Videos use metadata preload only and stay lightweight until playback.',
    reelLabel: 'Reel',
    ledKicker: 'Decor Production',
    ledTitle: 'Custom decor, LED, lighting, mirrors and wall production',
    ledText: 'Every decor category from the Mavi Design production archive is shown below.',
    decorGroups: {
      customDesign: 'Custom Design',
      ledSigns: 'LED Signs',
      lighting: 'Lighting',
      mirrors: 'Mirrors',
      wallDecor: 'Wall Decor',
    },
    catalogKicker: 'Catalog',
    catalogTitle: 'Browse the real catalog without loading every page at once',
    catalogLabel: 'Catalog page',
    loadMoreCatalog: 'Load more catalog pages',
    aiKicker: 'AI Design',
    aiTitle: 'Fast concept direction before production begins.',
    aiText:
      'AI-assisted previews help align atmosphere, lighting, furniture language and guest flow before detailed production, installation and catalog selection.',
    aiImage: 'AI design reference',
    aiSupportTitle: 'AI Support',
    aiSupportIntro: 'Ask about budgets, restaurant design, LED, furniture, catalog products or AI concept design.',
    aiPlaceholder: 'Ask Mavi AI...',
    aiSend: 'Send',
    aiInitial: AI_GREETING,
    aiFallback: 'For clearer help on this topic, you can contact the Mavi Design SRL team on WhatsApp.',
    aiWhatsappCta: 'Continue on WhatsApp',
    aiQuestions: [
      'I want restaurant design',
      'I want a price quote',
      'I want to see the product catalog',
      'I want to contact you on WhatsApp',
    ],
    aiAnswers: {
      quote: 'For a price quote, share your location, approximate square meters, concept style, product needs and installation scope. Mavi Design SRL can then prepare a clearer proposal by WhatsApp.',
      restaurant: 'Mavi Design SRL supports restaurant concept design, guest flow, material direction, custom production, kitchen coordination and installation planning from idea to opening.',
      catalog: 'The catalog includes chairs, sofas, tables, accessories and restaurant furniture selections. You can review the catalog section on the site or ask the team for current availability on WhatsApp.',
      led: 'LED decoration can include neon signs, branded wall features, lighting details, mirrors and custom decorative production tailored to the restaurant identity.',
      furniture: 'Tables, chairs, sofas and special furniture can be selected from catalog products or produced custom according to your restaurant measurements and brand language.',
      process: 'The project process usually starts with photos, measurements, style expectations and budget range, then continues with concept direction, product selection, production and installation planning.',
      whatsapp: 'You can contact Mavi Design SRL on WhatsApp: +39 392 667 7298 / +39 388 308 3499 or by email: info@mavidesignsrl.it / mavidesignsrlmilano@gmail.com.',
    },
    supportWhatsapp: 'WhatsApp Support',
    supportAi: 'AI Support',
    packagesKicker: 'Packages',
    packagesTitle: 'Four levels of restaurant transformation',
    packageNames: {
      Classic: 'Classic',
      Premium: 'Premium',
      Luxury: 'Luxury',
      VIP: 'VIP',
    },
    packageText: {
      Classic: 'Concept, layout direction, core furniture selection and clear production scope.',
      Premium: 'Full interior direction, custom furniture, kitchen coordination and decor planning.',
      Luxury: 'Signature restaurant identity with cinematic materials, LED features and made-to-measure production.',
      VIP: 'End-to-end creative, AI previews, production, installation and launch-ready atmosphere.',
    },
    aboutKicker: 'About',
    aboutTitle: 'Mavi Design SRL is a Milan-based design and production studio for hospitality spaces.',
    aboutText:
      'The studio connects restaurant concept design, kitchen equipment, furniture, LED decoration, catalog sourcing, AI design and installation into one premium workflow.',
    aboutImage: 'Mavi Design product detail',
    contactKicker: 'Contact',
    contactTitle: 'Start a restaurant transformation with Mavi Design SRL',
    contactText: 'Based in Italy / Milan. Contact the studio by Gmail, Google Maps or the fixed WhatsApp contact button.',
    phone: 'Phone / WhatsApp',
    testimonialsKicker: 'Testimonials',
    testimonialsTitle: 'What clients say about Mavi Design',
    testimonials: [
      ['Resul D.', 'Mavi Design restoran konseptimizi sade bir fikirden premium bir mekana donusturdu. Mobilya, LED ve montaj sureci cok net ilerledi.'],
      ['Marco R.', 'Il team ha coordinato design, produzione e arredi con grande precisione. Il risultato finale ha dato al locale un carattere elegante e riconoscibile.'],
      ['James W.', 'The project felt organized from concept to installation. The AI previews helped us approve the atmosphere before production started.'],
      ['Ahmed K.', 'عمل احترافي ومنظم. ساعدتنا التصاميم والديكورات على بناء مطعم فاخر بتفاصيل واضحة وتنفيذ قوي.'],
    ],
    socialKicker: 'Social',
    socialTitle: 'Connect with Mavi Design SRL',
    instagram: 'Instagram',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    googleMaps: 'Google Maps',
    gmail: 'Gmail',
    whatsapp: 'WhatsApp',
    openSocial: 'Open',
    contactViaWhatsapp: 'Contact',
    brandLabel: 'Mavi Design SRL',
    sofaKicker: 'Custom seating',
    blueSofa: 'Blue Sofa',
    redSofa: 'Red Sofa',
    beigeSofa: 'Beige Sofa',
    electronicProduct1: 'Electronic Product',
    electronicProduct2: 'Electronic Product',
    electronicProduct3: 'Electronic Product',
    location: 'Milan, Italy',
    contactTags: ['Restaurant design', 'Production and installation'],
  },
  it: {
    dir: 'ltr',
    nav: {
      home: 'Home',
      projects: 'Progetti',
      products: 'Prodotti',
      led: 'LED',
      catalog: 'Catalogo',
      aiDesign: 'AI Design',
      packages: 'Pacchetti',
      about: 'Chi siamo',
      contact: 'Contatti',
    },
    aria: {
      menu: 'Apri o chiudi menu',
      language: 'Seleziona lingua',
      lightbox: 'Anteprima immagine',
      close: 'Chiudi anteprima',
      previous: 'Immagine precedente',
      next: 'Immagine successiva',
      whatsapp: 'Dettagli contatto WhatsApp',
    },
    intro: 'Mavi Design SRL',
    heroKicker: 'Milano / Italia / 92 progetti completati',
    heroTitle: 'Interni per ristoranti costruiti come brand cinematografici.',
    heroText:
      'Mavi Design SRL realizza design per ristoranti, produzione, attrezzature cucina, arredi su misura, decorazioni LED, concept AI e installazione per spazi hospitality ambiziosi.',
    heroSlogan: 'Immaginatelo, lo progettiamo noi.',
    viewProjects: 'Vedi progetti',
    explorePackages: 'Esplora pacchetti',
    stats: ['progetti completati', 'servizi integrati', 'pacchetti premium'],
    projectsKicker: 'Progetti',
    projectsTitle: 'Atmosfere ristorante completate',
    projectsText: "Una gallery selezionata dall'archivio progetti Mavi Design SRL fornito.",
    projectLabel: 'Progetto ristorante',
    loadMoreProjects: 'Carica altri progetti',
    servicesKicker: 'Servizi',
    servicesTitle: 'Design, produzione, installazione, apertura.',
    services: {
      'Restaurant design': 'Design ristoranti',
      Production: 'Produzione',
      'Kitchen equipment': 'Attrezzature cucina',
      'Custom furniture': 'Arredi su misura',
      'LED decoration': 'Decorazione LED',
      'Catalog products': 'Prodotti catalogo',
      'AI design': 'AI design',
      Installation: 'Installazione',
    },
    productsKicker: 'Prodotti',
    productsTitle: 'Selezioni catalogo arredi e attrezzature',
    productsText: "Le anteprime vengono caricate prima per mantenere veloce l'esperienza mobile.",
    loadMoreProducts: 'Carica altri prodotti',
    productGroups: {
      Chairs: 'Sedie',
      ElectronicProducts: 'Prodotti Elettronici',
      BancoProducts: 'Prodotti Banco',
      Sofas: 'Divani',
      Tables: 'Tavoli',
      Accessories: 'Accessori',
      PremiumPlateCollection: 'Premium Plate Collection',
      DecorativeWallPanels: 'Decorative Wall Panels',
    },
    productGroupText: {
      PremiumPlateCollection: 'Premium plates for restaurants, cafés, hotels and elegant food presentation.',
      DecorativeWallPanels: 'Decorative wall panels and functional restaurant equipment solutions for commercial spaces.',
    },
    reelsKicker: 'Reel',
    reelsTitle: 'Movimento, materiali, atmosfera',
    reelsText: 'I video usano solo preload metadata e restano leggeri fino alla riproduzione.',
    reelLabel: 'Reel',
    ledKicker: 'Produzione decorativa',
    ledTitle: 'Decor custom, LED, illuminazione, specchi e pareti',
    ledText: "Tutte le categorie dell'archivio produzione decorativa Mavi Design sono mostrate qui.",
    decorGroups: {
      customDesign: 'Design custom',
      ledSigns: 'Insegne LED',
      lighting: 'Illuminazione',
      mirrors: 'Specchi',
      wallDecor: 'Decorazione pareti',
    },
    catalogKicker: 'Catalogo',
    catalogTitle: 'Sfoglia il catalogo reale senza caricare tutte le pagine insieme',
    catalogLabel: 'Pagina catalogo',
    loadMoreCatalog: 'Carica altre pagine',
    aiKicker: 'AI Design',
    aiTitle: "Direzione concept rapida prima dell'inizio produzione.",
    aiText:
      'Le anteprime assistite da AI aiutano ad allineare atmosfera, luci, linguaggio degli arredi e flusso ospiti prima di produzione, installazione e selezione catalogo.',
    aiImage: 'Riferimento AI design',
    aiSupportTitle: 'Supporto AI',
    aiSupportIntro: 'Chiedi informazioni su budget, design ristorante, LED, arredi, catalogo o concept AI.',
    aiPlaceholder: 'Chiedi a Mavi AI...',
    aiSend: 'Invia',
    aiInitial: AI_GREETING,
    aiFallback: 'Per aiutarti meglio su questo tema, puoi contattare il team Mavi Design SRL su WhatsApp.',
    aiWhatsappCta: 'Continua su WhatsApp',
    aiQuestions: [
      'Voglio progettare un ristorante',
      'Voglio un preventivo',
      'Voglio vedere il catalogo prodotti',
      'Voglio contattarvi su WhatsApp',
    ],
    aiAnswers: {
      quote: 'Per un preventivo, condividi posizione, metri quadri indicativi, stile, prodotti richiesti e livello di installazione. Mavi Design SRL potra preparare una proposta piu chiara via WhatsApp.',
      restaurant: 'Mavi Design SRL supporta concept ristorante, flusso ospiti, materiali, produzione su misura, coordinamento cucina e pianificazione installazione fino all’apertura.',
      catalog: 'Il catalogo include sedie, divani, tavoli, accessori e selezioni per arredo ristorante. Puoi consultare la sezione catalogo o chiedere disponibilita attuale su WhatsApp.',
      led: 'La decorazione LED puo includere insegne neon, pareti brandizzate, dettagli luce, specchi e produzione decorativa su misura per l’identita del locale.',
      furniture: 'Tavoli, sedie, divani e arredi speciali possono essere scelti dal catalogo o prodotti su misura in base alle misure e al linguaggio del brand.',
      process: 'Il processo parte da foto, misure, stile desiderato e fascia budget, poi prosegue con direzione concept, scelta prodotti, produzione e pianificazione montaggio.',
      whatsapp: 'Puoi contattare Mavi Design SRL su WhatsApp: +39 392 667 7298 / +39 388 308 3499 o via email: info@mavidesignsrl.it / mavidesignsrlmilano@gmail.com.',
    },
    supportWhatsapp: 'Supporto WhatsApp',
    supportAi: 'Supporto AI',
    packagesKicker: 'Pacchetti',
    packagesTitle: 'Quattro livelli di trasformazione ristorante',
    packageNames: {
      Classic: 'Classic',
      Premium: 'Premium',
      Luxury: 'Luxury',
      VIP: 'VIP',
    },
    packageText: {
      Classic: 'Concept, direzione layout, selezione arredi principali e perimetro produttivo chiaro.',
      Premium: 'Direzione completa degli interni, arredi custom, coordinamento cucina e planning decorativo.',
      Luxury: 'Identita ristorante signature con materiali scenografici, LED e produzione su misura.',
      VIP: 'Creativita end-to-end, preview AI, produzione, installazione e atmosfera pronta al lancio.',
    },
    aboutKicker: 'Chi siamo',
    aboutTitle: 'Mavi Design SRL e uno studio di design e produzione per hospitality con base a Milano.',
    aboutText:
      'Lo studio connette concept per ristoranti, attrezzature cucina, arredi, decorazione LED, sourcing catalogo, AI design e installazione in un unico workflow premium.',
    aboutImage: 'Dettaglio prodotto Mavi Design',
    contactKicker: 'Contatti',
    contactTitle: 'Avvia una trasformazione ristorante con Mavi Design SRL',
    contactText: 'Con base in Italia / Milano. Contatta lo studio tramite Gmail, Google Maps o il pulsante WhatsApp fisso.',
    phone: 'Telefono / WhatsApp',
    testimonialsKicker: 'Testimonianze',
    testimonialsTitle: 'Cosa dicono i clienti di Mavi Design',
    testimonials: [
      ['Resul D.', 'Mavi Design ha trasformato il nostro concept da una semplice idea a uno spazio premium. Arredi, LED e montaggio sono stati gestiti con grande chiarezza.'],
      ['Marco R.', 'Il team ha coordinato design, produzione e arredi con grande precisione. Il risultato finale ha dato al locale un carattere elegante e riconoscibile.'],
      ['James W.', 'Il progetto e stato organizzato dal concept all’installazione. Le preview AI ci hanno aiutato ad approvare l’atmosfera prima della produzione.'],
      ['Ahmed K.', 'Un lavoro professionale e ordinato. Design e decorazioni ci hanno aiutato a creare un ristorante elegante con dettagli chiari e forte esecuzione.'],
    ],
    socialKicker: 'Social',
    socialTitle: 'Connettiti con Mavi Design SRL',
    instagram: 'Instagram',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    googleMaps: 'Google Maps',
    gmail: 'Gmail',
    whatsapp: 'WhatsApp',
    openSocial: 'Apri',
    contactViaWhatsapp: 'Contatto',
    brandLabel: 'Mavi Design SRL',
    sofaKicker: 'Sedute su misura',
    blueSofa: 'Divano blu',
    redSofa: 'Divano rosso',
    beigeSofa: 'Divano beige',
    electronicProduct1: 'Prodotto elettronico',
    electronicProduct2: 'Prodotto elettronico',
    electronicProduct3: 'Prodotto elettronico',
    location: 'Milano, Italia',
    contactTags: ['Design ristoranti', 'Produzione e installazione'],
  },
  tr: {
    dir: 'ltr',
    nav: {
      home: 'Ana Sayfa',
      projects: 'Projeler',
      products: 'Urunler',
      led: 'LED',
      catalog: 'Katalog',
      aiDesign: 'AI Tasarim',
      packages: 'Paketler',
      about: 'Hakkimizda',
      contact: 'Iletisim',
    },
    aria: {
      menu: 'Menuyu ac veya kapat',
      language: 'Dil sec',
      lightbox: 'Gorsel onizleme',
      close: 'Onizlemeyi kapat',
      previous: 'Onceki gorsel',
      next: 'Sonraki gorsel',
      whatsapp: 'WhatsApp iletisim bilgileri',
    },
    intro: 'Mavi Design SRL',
    heroKicker: 'Milano / İtalya / 92 tamamlanmış proje',
    heroTitle: 'Restoran ic mekanlari sinematik markalar gibi tasarlanir.',
    heroText:
      'Mavi Design SRL; restoran tasarimi, uretim, mutfak ekipmanlari, ozel mobilya, LED dekorasyon, AI konsept ve montaj hizmetleriyle iddiali hospitality alanlari olusturur.',
    heroSlogan: 'Hayal edin, biz tasarlayalım.',
    viewProjects: 'Projeleri gor',
    explorePackages: 'Paketleri incele',
    stats: ['tamamlanmış proje', 'entegre hizmet', 'premium paket'],
    projectsKicker: 'Projeler',
    projectsTitle: 'Tamamlanmis restoran atmosferleri',
    projectsText: 'Saglanan Mavi Design SRL proje arsivinden secilmis galeri.',
    projectLabel: 'Restoran projesi',
    loadMoreProjects: 'Daha fazla proje yukle',
    servicesKicker: 'Hizmetler',
    servicesTitle: 'Tasarla, uret, kur, acilisa hazirla.',
    services: {
      'Restaurant design': 'Restoran tasarimi',
      Production: 'Uretim',
      'Kitchen equipment': 'Mutfak ekipmanlari',
      'Custom furniture': 'Ozel mobilya',
      'LED decoration': 'LED dekorasyon',
      'Catalog products': 'Katalog urunleri',
      'AI design': 'AI tasarim',
      Installation: 'Montaj',
    },
    productsKicker: 'Urunler',
    productsTitle: 'Mobilya ve ekipman katalog secimleri',
    productsText: 'Mobilde hizli kalmasi icin once onizleme gorselleri yuklenir.',
    loadMoreProducts: 'Daha fazla urun yukle',
    productGroups: {
      Chairs: 'Sandalyeler',
      ElectronicProducts: 'Elektronik Ürünler',
      BancoProducts: 'Banco Ürünleri',
      Sofas: 'Koltuklar',
      Tables: 'Masalar',
      Accessories: 'Aksesuarlar',
      PremiumPlateCollection: 'Premium Plate Collection',
      DecorativeWallPanels: 'Decorative Wall Panels',
    },
    productGroupText: {
      PremiumPlateCollection: 'Premium plates for restaurants, cafés, hotels and elegant food presentation.',
      DecorativeWallPanels: 'Decorative wall panels and functional restaurant equipment solutions for commercial spaces.',
    },
    reelsKicker: 'Reels',
    reelsTitle: 'Hareket, malzeme, atmosfer',
    reelsText: 'Videolar yalnizca metadata preload kullanir ve oynatmaya kadar hafif kalir.',
    reelLabel: 'Reel',
    ledKicker: 'Dekor Uretimi',
    ledTitle: 'Ozel dekor, LED, aydinlatma, aynalar ve duvar uretimi',
    ledText: 'Mavi Design dekor uretim arsivindeki tum kategoriler asagida gosterilir.',
    decorGroups: {
      customDesign: 'Ozel Tasarim',
      ledSigns: 'LED Tabelalar',
      lighting: 'Aydinlatma',
      mirrors: 'Aynalar',
      wallDecor: 'Duvar Dekoru',
    },
    catalogKicker: 'Katalog',
    catalogTitle: 'Gercek katalogu tum sayfalari ayni anda yuklemeden incele',
    catalogLabel: 'Katalog sayfasi',
    loadMoreCatalog: 'Daha fazla katalog sayfasi yukle',
    aiKicker: 'AI Tasarim',
    aiTitle: 'Uretim baslamadan once hizli konsept yonu.',
    aiText:
      'AI destekli onizlemeler; atmosfer, aydinlatma, mobilya dili ve misafir akisini uretim, montaj ve katalog seciminden once hizalamaya yardimci olur.',
    aiImage: 'AI tasarim referansi',
    aiSupportTitle: 'AI Destek',
    aiSupportIntro: 'Butce, restoran tasarimi, LED, mobilya, katalog urunleri veya AI konsept hakkinda sorun.',
    aiPlaceholder: 'Mavi AI destek yazin...',
    aiSend: 'Gonder',
    aiInitial: AI_GREETING,
    aiFallback: 'Bu konuda size daha net yardımcı olabilmemiz için Mavi Design SRL ekibiyle WhatsApp üzerinden iletişime geçebilirsiniz.',
    aiWhatsappCta: 'WhatsApp üzerinden yazın',
    aiQuestions: [
      'Restoran tasarımı yaptırmak istiyorum',
      'Fiyat teklifi almak istiyorum',
      'Ürün kataloğunu görmek istiyorum',
      'WhatsApp üzerinden iletişime geçmek istiyorum',
    ],
    aiAnswers: {
      quote: 'Fiyat teklifi için konum, yaklaşık metrekare, istediğiniz tarz, ürün ihtiyacı ve montaj kapsamı paylaşılmalıdır. Mavi Design SRL bu bilgilere göre WhatsApp üzerinden daha net teklif hazırlayabilir.',
      restaurant: 'Mavi Design SRL restoran konsepti, müşteri akışı, malzeme dili, özel üretim, mutfak koordinasyonu, mobilya seçimi ve montaj planını açılışa hazır şekilde ele alır.',
      catalog: 'Ürün kataloğunda sandalye, koltuk, masa, aksesuar ve restoran mobilyası seçenekleri bulunur. Sitedeki katalog bölümünü inceleyebilir veya güncel uygunluk için WhatsApp’tan yazabilirsiniz.',
      led: 'LED dekorasyon; neon tabela, markalı duvar uygulamaları, ışık detayları, aynalar ve restoran kimliğine özel dekor üretimlerini kapsayabilir.',
      furniture: 'Masa, sandalye, koltuk ve özel mobilyalar katalogdan seçilebilir veya restoran ölçüsüne ve marka diline göre özel üretilebilir.',
      process: 'Proje süreci genelde mekan fotoğrafları, ölçüler, stil beklentisi ve bütçe aralığıyla başlar; ardından konsept, ürün seçimi, üretim ve montaj planı hazırlanır.',
      whatsapp: 'Mavi Design SRL ile WhatsApp üzerinden iletişime geçebilirsiniz: +39 392 667 7298 / +39 388 308 3499. E-posta: info@mavidesignsrl.it / mavidesignsrlmilano@gmail.com.',
    },
    supportWhatsapp: 'WhatsApp Destek',
    supportAi: 'AI Destek',
    packagesKicker: 'Paketler',
    packagesTitle: 'Restoran donusumu icin dort seviye',
    packageNames: {
      Classic: 'Classic',
      Premium: 'Premium',
      Luxury: 'Luxury',
      VIP: 'VIP',
    },
    packageText: {
      Classic: 'Konsept, yerlesim yonu, temel mobilya secimi ve net uretim kapsami.',
      Premium: 'Tam ic mekan yonu, ozel mobilya, mutfak koordinasyonu ve dekor planlama.',
      Luxury: 'Sinematik malzemeler, LED ozellikler ve olcuye ozel uretimle imza restoran kimligi.',
      VIP: 'Uctan uca kreatif surec, AI onizlemeler, uretim, montaj ve acilisa hazir atmosfer.',
    },
    aboutKicker: 'Hakkimizda',
    aboutTitle: 'Mavi Design SRL, Milano merkezli hospitality tasarim ve uretim studyosudur.',
    aboutText:
      'Studyo; restoran konsept tasarimi, mutfak ekipmanlari, mobilya, LED dekorasyon, katalog tedarigi, AI tasarim ve montaji tek premium surecte birlestirir.',
    aboutImage: 'Mavi Design urun detayi',
    contactKicker: 'Iletisim',
    contactTitle: 'Mavi Design SRL ile restoran donusumunu baslatin',
    contactText: 'Italya / Milano merkezli. Studyoya Gmail, Google Maps veya sabit WhatsApp butonu ile ulasin.',
    phone: 'Telefon / WhatsApp',
    testimonialsKicker: 'Musteri Yorumlari',
    testimonialsTitle: 'Mavi Design hakkinda musteri deneyimleri',
    testimonials: [
      ['Resul D.', 'Mavi Design restoran konseptimizi sade bir fikirden premium bir mekana donusturdu. Mobilya, LED ve montaj sureci cok net ilerledi.'],
      ['Marco R.', 'Ekip tasarim, uretim ve mobilyalari buyuk bir hassasiyetle koordine etti. Sonuc mekana zarif ve ayirt edici bir karakter verdi.'],
      ['James W.', 'Proje konseptten montaja kadar duzenli ilerledi. AI onizlemeler uretimden once atmosferi onaylamamizi sagladi.'],
      ['Ahmed K.', 'Profesyonel ve planli bir calisma oldu. Tasarim ve dekorasyon detaylari restoranımıza luks ve guclu bir kimlik kazandirdi.'],
    ],
    socialKicker: 'Sosyal',
    socialTitle: 'Mavi Design SRL ile baglanti kur',
    instagram: 'Instagram',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    googleMaps: 'Google Maps',
    gmail: 'Gmail',
    whatsapp: 'WhatsApp',
    openSocial: 'Ac',
    contactViaWhatsapp: 'Iletisim',
    brandLabel: 'Mavi Design SRL',
    sofaKicker: 'Ozel oturma',
    blueSofa: 'Mavi Koltuk',
    redSofa: 'Kirmizi Koltuk',
    beigeSofa: 'Bej Koltuk',
    electronicProduct1: 'Elektronik Urun',
    electronicProduct2: 'Elektronik Urun',
    electronicProduct3: 'Elektronik Urun',
    location: 'Milano, Italya',
    contactTags: ['Restoran tasarimi', 'Uretim ve montaj'],
  },
  ar: {
    dir: 'rtl',
    nav: {
      home: 'الرئيسية',
      projects: 'المشاريع',
      products: 'المنتجات',
      led: 'LED',
      catalog: 'الكتالوج',
      aiDesign: 'تصميم AI',
      packages: 'الباقات',
      about: 'من نحن',
      contact: 'تواصل',
    },
    aria: {
      menu: 'فتح أو إغلاق القائمة',
      language: 'اختيار اللغة',
      lightbox: 'معاينة الصورة',
      close: 'إغلاق المعاينة',
      previous: 'الصورة السابقة',
      next: 'الصورة التالية',
      whatsapp: 'تفاصيل تواصل واتساب',
    },
    intro: 'Mavi Design SRL',
    heroKicker: 'ميلانو / إيطاليا / 92 مشروعًا مكتملًا',
    heroTitle: 'تصميم داخلي للمطاعم بروح العلامات السينمائية.',
    heroText:
      'تقدم Mavi Design SRL تصميم المطاعم، الإنتاج، معدات المطابخ، الأثاث المخصص، ديكور LED، مفاهيم AI والتركيب لمساحات الضيافة الطموحة.',
    heroSlogan: 'تخيلوا، ونحن نصمم.',
    viewProjects: 'عرض المشاريع',
    explorePackages: 'استكشاف الباقات',
    stats: ['مشروعًا مكتملًا', 'خدمات متكاملة', 'باقات فاخرة'],
    projectsKicker: 'المشاريع',
    projectsTitle: 'أجواء مطاعم منجزة',
    projectsText: 'معرض مختار من أرشيف مشاريع Mavi Design SRL المتوفر.',
    projectLabel: 'مشروع مطعم',
    loadMoreProjects: 'تحميل المزيد من المشاريع',
    servicesKicker: 'الخدمات',
    servicesTitle: 'تصميم، إنتاج، تركيب، إطلاق.',
    services: {
      'Restaurant design': 'تصميم المطاعم',
      Production: 'الإنتاج',
      'Kitchen equipment': 'معدات المطابخ',
      'Custom furniture': 'أثاث مخصص',
      'LED decoration': 'ديكور LED',
      'Catalog products': 'منتجات الكتالوج',
      'AI design': 'تصميم AI',
      Installation: 'التركيب',
    },
    productsKicker: 'المنتجات',
    productsTitle: 'اختيارات من كتالوج الأثاث والمعدات',
    productsText: 'يتم تحميل صور المعاينة أولاً للحفاظ على سرعة التجربة على الهاتف.',
    loadMoreProducts: 'تحميل المزيد من المنتجات',
    productGroups: {
      Chairs: 'كراسي',
      ElectronicProducts: 'منتجات إلكترونية',
      BancoProducts: 'منتجات البانكو',
      Sofas: 'أرائك',
      Tables: 'طاولات',
      Accessories: 'إكسسوارات',
      PremiumPlateCollection: 'Premium Plate Collection',
      DecorativeWallPanels: 'Decorative Wall Panels',
    },
    productGroupText: {
      PremiumPlateCollection: 'Premium plates for restaurants, cafés, hotels and elegant food presentation.',
      DecorativeWallPanels: 'Decorative wall panels and functional restaurant equipment solutions for commercial spaces.',
    },
    reelsKicker: 'ريلز',
    reelsTitle: 'حركة، مواد، أجواء',
    reelsText: 'تستخدم الفيديوهات تحميل بيانات metadata فقط وتبقى خفيفة حتى التشغيل.',
    reelLabel: 'ريل',
    ledKicker: 'إنتاج الديكور',
    ledTitle: 'ديكور مخصص، LED، إضاءة، مرايا وجدران',
    ledText: 'كل فئات أرشيف إنتاج الديكور لدى Mavi Design معروضة هنا.',
    decorGroups: {
      customDesign: 'تصميم مخصص',
      ledSigns: 'لافتات LED',
      lighting: 'إضاءة',
      mirrors: 'مرايا',
      wallDecor: 'ديكور الجدران',
    },
    catalogKicker: 'الكتالوج',
    catalogTitle: 'تصفح الكتالوج الحقيقي دون تحميل كل الصفحات دفعة واحدة',
    catalogLabel: 'صفحة كتالوج',
    loadMoreCatalog: 'تحميل المزيد من صفحات الكتالوج',
    aiKicker: 'تصميم AI',
    aiTitle: 'اتجاه مفهومي سريع قبل بدء الإنتاج.',
    aiText:
      'تساعد المعاينات المدعومة بالذكاء الاصطناعي على تنسيق الأجواء، الإضاءة، لغة الأثاث وحركة الضيوف قبل الإنتاج والتركيب واختيار الكتالوج.',
    aiImage: 'مرجع تصميم AI',
    aiSupportTitle: 'دعم AI',
    aiSupportIntro: 'اسأل عن الميزانية، تصميم المطاعم، LED، الأثاث، الكتالوج أو مفهوم AI.',
    aiPlaceholder: 'اسأل Mavi AI...',
    aiSend: 'إرسال',
    aiInitial: AI_GREETING,
    aiFallback: 'للمساعدة بشكل أوضح في هذا الموضوع، يمكنك التواصل مع فريق Mavi Design SRL عبر واتساب.',
    aiWhatsappCta: 'تابع عبر واتساب',
    aiQuestions: [
      'أريد تصميم مطعم',
      'أريد عرض سعر',
      'أريد مشاهدة كتالوج المنتجات',
      'أريد التواصل عبر واتساب',
    ],
    aiAnswers: {
      quote: 'للحصول على عرض سعر، شارك الموقع، المساحة التقريبية، النمط المطلوب، المنتجات المطلوبة ونطاق التركيب. بعدها يمكن لفريق Mavi Design SRL تحضير عرض أوضح عبر واتساب.',
      restaurant: 'تدعم Mavi Design SRL مفهوم المطعم، حركة الضيوف، المواد، الإنتاج المخصص، تنسيق المطبخ، اختيار الأثاث وخطة التركيب حتى الافتتاح.',
      catalog: 'يشمل الكتالوج كراسي، أرائك، طاولات، إكسسوارات وخيارات أثاث للمطاعم. يمكنك مراجعة قسم الكتالوج أو طلب التوفر الحالي عبر واتساب.',
      led: 'يمكن أن يشمل ديكور LED لوحات نيون، جدران مخصصة للعلامة، تفاصيل إضاءة، مرايا وإنتاج ديكوري مخصص لهوية المطعم.',
      furniture: 'يمكن اختيار الطاولات والكراسي والأرائك والأثاث الخاص من الكتالوج أو إنتاجها حسب مقاسات المطعم وهوية العلامة.',
      process: 'يبدأ مسار المشروع عادة بالصور، القياسات، النمط المطلوب ونطاق الميزانية، ثم ينتقل إلى المفهوم، اختيار المنتجات، الإنتاج وخطة التركيب.',
      whatsapp: 'يمكنك التواصل مع Mavi Design SRL عبر واتساب: +39 392 667 7298 / +39 388 308 3499 أو البريد: info@mavidesignsrl.it / mavidesignsrlmilano@gmail.com.',
    },
    supportWhatsapp: 'دعم واتساب',
    supportAi: 'دعم AI',
    packagesKicker: 'الباقات',
    packagesTitle: 'أربعة مستويات لتحويل المطعم',
    packageNames: {
      Classic: 'كلاسيك',
      Premium: 'بريميوم',
      Luxury: 'فاخر',
      VIP: 'VIP',
    },
    packageText: {
      Classic: 'مفهوم، اتجاه تخطيط، اختيار الأثاث الأساسي ونطاق إنتاج واضح.',
      Premium: 'اتجاه داخلي كامل، أثاث مخصص، تنسيق المطبخ وتخطيط الديكور.',
      Luxury: 'هوية مطعم مميزة بمواد سينمائية، عناصر LED وإنتاج حسب المقاس.',
      VIP: 'إبداع شامل، معاينات AI، إنتاج، تركيب وأجواء جاهزة للإطلاق.',
    },
    aboutKicker: 'من نحن',
    aboutTitle: 'Mavi Design SRL استوديو تصميم وإنتاج لمساحات الضيافة مقره ميلانو.',
    aboutText:
      'يربط الاستوديو تصميم مفهوم المطعم، معدات المطبخ، الأثاث، ديكور LED، توريد الكتالوج، تصميم AI والتركيب في مسار فاخر واحد.',
    aboutImage: 'تفاصيل منتج Mavi Design',
    contactKicker: 'تواصل',
    contactTitle: 'ابدأ تحويل مطعمك مع Mavi Design SRL',
    contactText: 'المقر في إيطاليا / ميلانو. تواصل مع الاستوديو عبر Gmail أو Google Maps أو زر WhatsApp الثابت.',
    phone: 'الهاتف / واتساب',
    testimonialsKicker: 'آراء العملاء',
    testimonialsTitle: 'ما يقوله العملاء عن Mavi Design',
    testimonials: [
      ['Resul D.', 'حوّلت Mavi Design فكرة مطعمنا البسيطة إلى مساحة فاخرة. كان مسار الأثاث وLED والتركيب واضحاً ومنظماً.'],
      ['Marco R.', 'نسق الفريق التصميم والإنتاج والأثاث بدقة عالية. النتيجة منحت المكان شخصية أنيقة وسهلة التمييز.'],
      ['James W.', 'كان المشروع منظماً من الفكرة حتى التركيب. ساعدتنا معاينات AI على اعتماد الأجواء قبل الإنتاج.'],
      ['Ahmed K.', 'عمل احترافي ومنظم. ساعدتنا التصاميم والديكورات على بناء مطعم فاخر بتفاصيل واضحة وتنفيذ قوي.'],
    ],
    socialKicker: 'التواصل الاجتماعي',
    socialTitle: 'تواصل مع Mavi Design SRL',
    instagram: 'Instagram',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    googleMaps: 'Google Maps',
    gmail: 'Gmail',
    whatsapp: 'WhatsApp',
    openSocial: 'فتح',
    contactViaWhatsapp: 'تواصل',
    brandLabel: 'Mavi Design SRL',
    sofaKicker: 'جلسات مخصصة',
    blueSofa: 'أريكة زرقاء',
    redSofa: 'أريكة حمراء',
    beigeSofa: 'أريكة بيج',
    electronicProduct1: 'منتج إلكتروني',
    electronicProduct2: 'منتج إلكتروني',
    electronicProduct3: 'منتج إلكتروني',
    location: 'ميلانو، إيطاليا',
    contactTags: ['تصميم المطاعم', 'الإنتاج والتركيب'],
  },
}

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.12 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function ParticleField() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

    const resize = () => {
      const ratio = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      particles = Array.from({ length: Math.min(96, Math.floor(window.innerWidth / 16)) }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1
        ctx.beginPath()
        ctx.fillStyle = i % 7 === 0 ? 'rgba(201,168,76,.62)' : 'rgba(255,255,255,.2)'
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })
      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas className="particles" ref={ref} aria-hidden="true" />
}

function AmbientParticleField() {
  const ref = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) return undefined

    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

    const resize = () => {
      const ratio = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight
      const mobile = width < 768
      canvas.width = width * ratio
      canvas.height = height * ratio
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      particles = Array.from({ length: mobile ? 34 : 72 }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * (mobile ? 1 : 1.35) + 0.35,
        vx: (Math.random() - 0.5) * (mobile ? 0.06 : 0.1),
        vy: (Math.random() - 0.5) * (mobile ? 0.05 : 0.08),
        glow: index % 6 === 0,
      }))
    }

    const draw = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      ctx.clearRect(0, 0, width, height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -8) p.x = width + 8
        if (p.x > width + 8) p.x = -8
        if (p.y < -8) p.y = height + 8
        if (p.y > height + 8) p.y = -8
        ctx.beginPath()
        ctx.fillStyle = p.glow ? 'rgba(201, 168, 76, 0.22)' : 'rgba(26, 39, 68, 0.08)'
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })
      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas className="ambient-particles" ref={ref} aria-hidden="true" />
}

function Intro() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 3800)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className={`intro ${hidden ? 'intro--hidden' : ''}`} aria-hidden={hidden}>
      <img src={`${A}/logo/mavi-logo.png`} alt="" />
      <div className="intro__type">
        <span className="intro__brand">MAVI DESIGN SRL</span>
        <strong className="intro__city">İSTANBUL</strong>
      </div>
    </div>
  )
}

function Nav({ lang, setLang, t }) {
  const [open, setOpen] = useState(false)
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }
  return (
    <header className="nav-shell">
      <a className="brand" href="#home" aria-label="Mavi Design SRL home">
        <img src={`${A}/logo/mavi-logo.png`} alt="Mavi Design SRL" />
      </a>
      <nav className={open ? 'nav-links nav-links--open' : 'nav-links'} aria-label="Primary navigation">
        {navItems.map(([key, id]) => (
          <button key={id} onClick={() => go(id)} type="button">
            {t.nav[key]}
          </button>
        ))}
      </nav>
      <div className="language-switcher" aria-label={t.aria.language}>
        <Languages size={17} aria-hidden="true" />
        {languageOptions.map(([code, label]) => (
          <button className={lang === code ? 'is-active' : ''} key={code} onClick={() => setLang(code)} type="button">
            {label}
          </button>
        ))}
      </div>
      <button className="icon-button menu-button" onClick={() => setOpen((value) => !value)} aria-label={t.aria.menu} type="button">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  )
}

function SectionHeading({ kicker, title, text }) {
  return (
    <div className="section-heading" data-reveal>
      <span>{kicker}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}

function SofaShowcase({ t }) {
  return (
    <aside className="sofa-showcase" aria-label={t.sofaKicker}>
      <div className="sofa-showcase__track">
        {sofaShowcase.map((item) => (
          <figure className="sofa-slide" key={item.key}>
            <img src={item.src} alt={t[item.key] || item.title} loading="eager" decoding="async" />
          </figure>
        ))}
      </div>
    </aside>
  )
}

function MediaCard({ item, onClick, tall = false, contain = false }) {
  const className = ['media-card', tall ? 'media-card--tall' : '', contain ? 'media-card--contain' : ''].filter(Boolean).join(' ')
  return (
    <button className={className} onClick={onClick} type="button" data-reveal>
      <img src={item.src} alt={item.title} loading="lazy" decoding="async" />
      <span>{item.title}</span>
    </button>
  )
}

function SocialCard({ href, icon, title, action, external = false, onClick }) {
  const content = (
    <>
      {createElement(icon, { size: 22 })}
      <span>{title}</span>
      <strong>{action}</strong>
    </>
  )

  if (href) {
    return (
      <a className="social-link" href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
        {content}
      </a>
    )
  }

  if (!onClick) {
    return <div className="social-link">{content}</div>
  }

  return (
    <button className="social-link" onClick={onClick} type="button">
      {content}
    </button>
  )
}

function AiSupportPanel({ open, onClose, t }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    if (open) {
      setMessages([{ from: 'bot', text: AI_GREETING }])
      setInput('')
    }
  }, [open])

  if (!open) return null

  const getAnswer = (value) => {
    const normalized = value.toLocaleLowerCase('tr-TR')
    const supportRules = [
      ['quote', ['fiyat', 'teklif', 'ücret', 'ucret']],
      ['restaurant', ['restoran', 'tasarım', 'tasarim', 'konsept']],
      ['catalog', ['katalog', 'ürün', 'urun', 'masa', 'sandalye', 'led']],
      ['whatsapp', ['whatsapp', 'iletişim', 'iletisim', 'telefon']],
    ]
    const match = supportRules.find(([, terms]) => terms.some((term) => normalized.includes(term)))
    return match ? AI_ANSWERS[match[0]] : AI_UNKNOWN_FALLBACK
  }

  const sendMessage = (value) => {
    const text = value.trim()
    if (!text) return
    setMessages((current) => [...current, { from: 'user', text }, { from: 'bot', text: getAnswer(text) }])
    setInput('')
  }

  return (
    <aside className="ai-support-panel" aria-label={AI_PANEL_TITLE}>
      <div className="ai-support-panel__header">
        <div>
          <span>{AI_BUTTON_LABEL}</span>
          <h3>{AI_PANEL_TITLE}</h3>
        </div>
        <button className="icon-button" onClick={onClose} type="button" aria-label={t.aria.close}>
          <X size={18} />
        </button>
      </div>
      <p>{AI_PANEL_INTRO}</p>
      <div className="ai-question-list">
        {AI_QUICK_QUESTIONS.map((question) => (
          <button key={question} onClick={() => sendMessage(question)} type="button">
            {question}
          </button>
        ))}
      </div>
      <div className="ai-chat-log" aria-live="polite">
        {messages.map((message, index) => (
          <div className={`ai-message ai-message--${message.from}`} key={`${message.from}-${index}`}>
            {message.from === 'bot' ? <Bot size={18} /> : null}
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="ai-support-actions">
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
          <MessageCircle size={17} />
          {PHONE_PRIMARY}
        </a>
        <a href={WHATSAPP_SECONDARY_URL} target="_blank" rel="noreferrer">
          <MessageCircle size={17} />
          {PHONE_SECONDARY}
        </a>
        <a href={`mailto:${EMAIL_PRIMARY}`}>
          <Mail size={17} />
          {EMAIL_PRIMARY}
        </a>
        <a href={`mailto:${EMAIL_SECONDARY}`}>
          <Mail size={17} />
          {EMAIL_SECONDARY}
        </a>
      </div>
      <form
        className="ai-chat-form"
        onSubmit={(event) => {
          event.preventDefault()
          sendMessage(input)
        }}
      >
        <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Sorunuzu yazın..." />
        <button type="submit" aria-label="Gönder">
          <Send size={18} />
        </button>
      </form>
    </aside>
  )
}

function Lightbox({ items, activeIndex, setActiveIndex, t }) {
  const active = activeIndex === null ? null : items[activeIndex]
  useEffect(() => {
    const onKey = (event) => {
      if (!active) return
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowRight') setActiveIndex((activeIndex + 1) % items.length)
      if (event.key === 'ArrowLeft') setActiveIndex((activeIndex - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, activeIndex, items.length, setActiveIndex])

  if (!active) return null
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={t.aria.lightbox}>
      <button className="icon-button lightbox__close" onClick={() => setActiveIndex(null)} type="button" aria-label={t.aria.close}>
        <X />
      </button>
      <button className="icon-button lightbox__prev" onClick={() => setActiveIndex((activeIndex - 1 + items.length) % items.length)} type="button" aria-label={t.aria.previous}>
        <ChevronLeft />
      </button>
      <img src={active.src} alt={active.title} />
      <button className="icon-button lightbox__next" onClick={() => setActiveIndex((activeIndex + 1) % items.length)} type="button" aria-label={t.aria.next}>
        <ChevronRight />
      </button>
      <p>{active.title}</p>
    </div>
  )
}

function App() {
  const [lang, setLang] = useState('en')
  const [lightboxItems, setLightboxItems] = useState([])
  const [activeIndex, setActiveIndex] = useState(null)
  const [supportOpen, setSupportOpen] = useState(false)
  const [catalogIndex, setCatalogIndex] = useState(0)
  const t = translations[lang]
  const productSections = useMemo(
    () =>
      productGroups.map(([group, urls]) => ({
        group,
        title: translations[lang].productGroups[group],
        text: translations[lang].productGroupText?.[group],
        items: urls.map((src, index) => ({ src, title: `${translations[lang].productGroups[group]} ${index + 1}` })),
      })),
    [lang],
  )
  const productItems = useMemo(() => productSections.flatMap((section) => section.items), [productSections])
  const projectItems = useMemo(
    () => projects.map((item, index) => ({ ...item, title: `${t.projectLabel} ${index + 1}` })),
    [t.projectLabel],
  )
  const catalogItems = useMemo(
    () => catalog.map((item, index) => ({ ...item, title: `${t.catalogLabel} ${index + 1}` })),
    [t.catalogLabel],
  )

  useReveal()

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = t.dir
  }, [lang, t.dir])

  const openLightbox = (items, index) => {
    setLightboxItems(items)
    setActiveIndex(index)
  }

  const activeCatalogItem = catalogItems[catalogIndex]
  const goCatalog = (direction) => {
    setCatalogIndex((index) => (index + direction + catalogItems.length) % catalogItems.length)
  }

  return (
    <div className="app" dir={t.dir}>
      <AmbientParticleField />
      <Intro />
      <Nav lang={lang} setLang={setLang} t={t} />
      <main>
        <section className="hero" id="home">
          <ParticleField />
          <div className="hero__media" aria-hidden="true">
            <video src={publishVideos[0]} autoPlay muted loop playsInline preload="metadata" />
          </div>
          <div className="hero__content">
            <p className="eyebrow">{t.heroKicker}</p>
            <h1>{t.heroTitle}</h1>
            <strong className="hero-slogan">{t.heroSlogan}</strong>
            <p>{t.heroText}</p>
            <div className="hero__actions">
              <a className="button button--primary" href="#projects">
                {t.viewProjects} <ArrowUpRight size={18} />
              </a>
              <a className="button" href="#packages">
                {t.explorePackages}
              </a>
            </div>
          </div>
          <SofaShowcase t={t} />
        </section>

        <section className="stats-band" aria-label="Mavi Design metrics">
          {[
            ['92', t.stats[0]],
            ['8', t.stats[1]],
            ['4', t.stats[2]],
          ].map(([value, label]) => (
            <div key={label} data-reveal>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section className="section" id="projects">
          <SectionHeading kicker={t.projectsKicker} title={t.projectsTitle} text={t.projectsText} />
          <div className="masonry-grid">
            {projectItems.slice(0, PROJECT_PREVIEW_COUNT).map((item, index) => (
              <MediaCard key={item.src} item={item} onClick={() => openLightbox(projectItems, index)} tall={index % 3 === 0} />
            ))}
          </div>
        </section>

        <section className="section section--split">
          <div data-reveal>
            <span className="eyebrow">{t.servicesKicker}</span>
            <h2>{t.servicesTitle}</h2>
          </div>
          <div className="service-grid">
            {services.map(([label, Icon]) => (
              <article className="service-card" key={label} data-reveal>
                {createElement(Icon, { size: 22 })}
                <h3>{t.services[label]}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="products">
          <SectionHeading kicker={t.productsKicker} title={t.productsTitle} text={t.productsText} />
          <div className="product-sections">
            {productSections.map((section) => (
              <article className="product-category" key={section.group}>
                <h3>{section.title}</h3>
                {section.text ? <p>{section.text}</p> : null}
                <div className={`product-grid product-grid--desktop-remainder-${section.items.length % 3} product-grid--mobile-remainder-${section.items.length % 2}`}>
                  {section.items.map((item) => (
                    <MediaCard key={item.src} item={item} onClick={() => openLightbox(productItems, productItems.indexOf(item))} contain />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section video-section">
          <SectionHeading kicker={t.reelsKicker} title={t.reelsTitle} text={t.reelsText} />
          <div className="video-grid">
            {publishVideos.map((src, index) => (
              <article className="video-card" key={src} data-reveal>
                <video src={src} controls preload="metadata" playsInline poster={serviceImages[index % serviceImages.length]} />
                <span>
                  <CirclePlay size={18} /> {t.reelLabel} {index + 1}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="led">
          <SectionHeading kicker={t.ledKicker} title={t.ledTitle} text={t.ledText} />
          <div className="decor-sections">
            {decorGroups.map(([groupKey, files]) => {
              const groupItems = files.map((file, index) => ({
                src: `${A}/decor-production/${file}`,
                title: `${t.decorGroups[groupKey]} ${index + 1}`,
              }))
              return (
                <article className="decor-section" key={groupKey} data-reveal>
                  <h3>{t.decorGroups[groupKey]}</h3>
                  <div className="decor-grid">
                    {groupItems.map((item, index) => (
                      <MediaCard key={item.src} item={item} onClick={() => openLightbox(groupItems, index)} contain />
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="section" id="catalog">
          <div className="catalog-carousel" data-reveal>
            <div className="catalog-carousel__header">
              <span className="eyebrow">Catalog</span>
              <h2>Catalog</h2>
              <p>Premium product catalogs and technical sheets</p>
            </div>
            <div className="catalog-carousel__stage">
              <button className="icon-button catalog-carousel__arrow catalog-carousel__arrow--prev" onClick={() => goCatalog(-1)} type="button" aria-label={t.aria.previous}>
                <ChevronLeft />
              </button>
              <button className="catalog-carousel__image" onClick={() => openLightbox(catalogItems, catalogIndex)} type="button">
                <img key={activeCatalogItem.src} src={activeCatalogItem.src} alt={activeCatalogItem.title} loading="lazy" decoding="async" />
                <span>{activeCatalogItem.title}</span>
              </button>
              <button className="icon-button catalog-carousel__arrow catalog-carousel__arrow--next" onClick={() => goCatalog(1)} type="button" aria-label={t.aria.next}>
                <ChevronRight />
              </button>
            </div>
            <div className="catalog-carousel__count">
              {String(catalogIndex + 1).padStart(2, '0')} / {String(catalogItems.length).padStart(2, '0')}
            </div>
          </div>
        </section>

        <section className="section ai-section compact-heading" id="ai-design">
          <div data-reveal>
            <span className="eyebrow">{t.aiKicker}</span>
            <h2>{t.aiTitle}</h2>
            <p>{t.aiText}</p>
          </div>
          <div className="ai-panel" data-reveal>
            {serviceImages.slice(0, 4).map((src, index) => (
              <img key={src} src={src} alt={`${t.aiImage} ${index + 1}`} loading="lazy" decoding="async" />
            ))}
          </div>
        </section>

        <section className="section" id="packages">
          <SectionHeading kicker={t.packagesKicker} title={t.packagesTitle} />
          <div className="package-grid">
            {packages.map(([name, text], index) => (
              <article className={index === 3 ? 'package-card package-card--vip' : 'package-card'} key={name} data-reveal>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{t.packageNames[name]}</h3>
                <p>{t.packageText[name] || text}</p>
              </article>
            ))}
          </div>
        </section>

        {t.testimonials.length ? (
          <section className="section testimonials-section">
            <SectionHeading kicker={t.testimonialsKicker} title={t.testimonialsTitle} />
            <div className="testimonials-grid">
              {t.testimonials.map(([name, quote]) => (
                <article className="testimonial-card" key={name} data-reveal>
                  <p>{quote}</p>
                  <strong>{name}</strong>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="section about-section" id="about">
          <div data-reveal>
            <span className="eyebrow">{t.aboutKicker}</span>
            <h2>{t.aboutTitle}</h2>
            <p>{t.aboutText}</p>
          </div>
          <img src={`${A}/projects/product-3.jpg`} alt={t.aboutImage} loading="lazy" decoding="async" data-reveal />
        </section>

        <section className="section contact-section" id="contact">
          <SectionHeading kicker={t.contactKicker} title={t.contactTitle} text={t.contactText} />
          <div className="contact-grid">
            <a href={MAPS_URL} target="_blank" rel="noreferrer">
              {t.location} <ArrowUpRight size={18} />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              {t.phone}: {PHONE_PRIMARY} <ArrowUpRight size={18} />
            </a>
            <a href={WHATSAPP_SECONDARY_URL} target="_blank" rel="noreferrer">
              {t.phone}: {PHONE_SECONDARY} <ArrowUpRight size={18} />
            </a>
            <a href={`mailto:${EMAIL_PRIMARY}`}>
              {t.gmail}: {EMAIL_PRIMARY} <ArrowUpRight size={18} />
            </a>
            <a href={`mailto:${EMAIL_SECONDARY}`}>
              {t.gmail}: {EMAIL_SECONDARY} <ArrowUpRight size={18} />
            </a>
            {t.contactTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="social-panel" data-reveal>
            <div>
              <span className="eyebrow">{t.socialKicker}</span>
              <h2>{t.socialTitle}</h2>
            </div>
            <div className="social-grid">
              <SocialCard href={INSTAGRAM_URL} icon={Instagram} title={t.instagram} action={t.openSocial} external />
              <SocialCard href={FACEBOOK_URL} icon={Facebook} title={t.facebook} action={t.openSocial} external />
              <SocialCard icon={Music2} title={t.tiktok} action={t.brandLabel} />
              <SocialCard href={MAPS_URL} icon={MapPin} title={t.googleMaps} action={t.openSocial} external />
              <SocialCard href={`mailto:${EMAIL_PRIMARY}`} icon={Mail} title={t.gmail} action={EMAIL_PRIMARY} />
              <SocialCard href={`mailto:${EMAIL_SECONDARY}`} icon={Mail} title={t.gmail} action={EMAIL_SECONDARY} />
              <SocialCard href={WHATSAPP_URL} icon={MessageCircle} title={t.whatsapp} action={PHONE_PRIMARY} external />
              <SocialCard href={WHATSAPP_SECONDARY_URL} icon={MessageCircle} title={t.whatsapp} action={PHONE_SECONDARY} external />
            </div>
          </div>
        </section>
      </main>

      <div className="support-buttons">
        <button className="support-button support-button--ai" onClick={() => setSupportOpen((value) => !value)} type="button">
          <Bot size={20} />
          <span>{AI_BUTTON_LABEL}</span>
        </button>
      </div>
      <AiSupportPanel open={supportOpen} onClose={() => setSupportOpen(false)} t={t} />

      <Lightbox items={lightboxItems} activeIndex={activeIndex} setActiveIndex={setActiveIndex} t={t} />
    </div>
  )
}

export default App
