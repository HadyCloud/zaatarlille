// ═══════════════════════════════════════════════════════════════════════
//  ZA'ATAR — every editable fact lives in this file.
//  Prices, hours, links, reviews, photo alt texts. Nothing else to touch.
// ═══════════════════════════════════════════════════════════════════════

export const CONFIG = {
  name: "ZA'ATAR",
  tagline: 'La Boulangerie Libanaise',
  address: { street: '139 Rue des Postes', postcode: '59000', city: 'Lille', country: 'FR' },
  // Verified 2026-09-24: OpenStreetMap node 6657678076 + api-adresse.data.gouv.fr (score 0.99).
  geo: { lat: 50.623422, lng: 3.054297 },
  transport: '', // Leave empty unless verified (e.g. nearest metro).
  phone: { display: '09 83 84 69 75', tel: '+33983846975' },
  instagram: { handle: 'zaatar.lille', url: 'https://www.instagram.com/zaatar.lille/' },
  deliveroo: 'https://deliveroo.fr/en/menu/lille/lille-gambetta/zaatar-lille',
  googleQuery: "ZA'ATAR 139 Rue des Postes Lille",
  // Set to null to hide the rating everywhere.
  GOOGLE_RATING: { value: 4.8, count: 112 },
  chef: {
    name: 'Jalal',
    otherHouse: 'Maison L',
    otherHouseUrl: 'https://www.privateaser.com/lieu/54563-maison-l',
  },
  timezone: 'Europe/Paris',
  // 24h "HH:MM". A slot closes at its end time (20:30 = closed at 20:30).
  hours: {
    mon: [],
    tue: [['10:00', '15:00'], ['18:00', '20:30']],
    wed: [['10:00', '15:00'], ['18:00', '20:30']],
    thu: [['10:00', '15:00'], ['18:00', '20:30']],
    fri: [['10:00', '15:00'], ['18:00', '20:30']],
    sat: [['10:00', '15:00'], ['18:00', '20:30']],
    sun: [['10:00', '15:00']],
  },
  heroVideo: '', // Set to 'assets/hero.mp4' (file in public/assets/) to replace the photo reel with a video.
  siteUrl: '', // Set the production URL (https://…) for canonical + absolute OG links.
  year: 2026,
};

// Menu checked against the printed menu photos (2026-11-11), previously the Instagram story.
// price: number in euros. veg: true only when obvious from the name.
// gloss: optional one-line universal definition of the dish, never ingredients/allergens as fact.
export const MENU = {
  sections: [
    {
      id: 'manouche', num: 'I', pre: 'La', title: "Man'ouche", post: '',
      script: 'La galette libanaise qui fait voyager',
      label: { fr: "Man'ouche", en: "Man'ouche", es: "Man'ouche" },
      cover: 'manoucheZaatar', itemPrefix: "Man'ouche ",
      items: [
        { id: 'zaatar', photo: 'menu_zaatar', desc: { fr: "Thym sauvage, sésame grillé et huile d'olive", en: "Wild thyme, toasted sesame and olive oil", es: "Tomillo silvestre, sésamo tostado y aceite de oliva" }, name: 'Zaatar', price: 4, veg: true,
          gloss: { fr: 'Galette au mélange thym et sésame', en: 'Flatbread with the thyme–sesame blend', es: 'Torta con la mezcla de tomillo y sésamo' } },
        { id: 'zaatar-fromage', photo: 'menu_zaatar_fromage', desc: { fr: "Thym sauvage et trio de fromages fondants", en: "Wild thyme and a trio of melting cheeses", es: "Tomillo silvestre y trío de quesos fundentes" }, name: 'Zaatar et fromage', price: 6, veg: true },
        { id: 'zaatar-legumes', photo: 'menu_zaatar_legumes', desc: { fr: "Thym sauvage, concombres, tomates fraîches, olives et menthe", en: "Wild thyme, cucumbers, fresh tomatoes, olives and mint", es: "Tomillo silvestre, pepinos, tomates frescos, aceitunas y menta" }, name: 'Zaatar et légumes', price: 5, veg: true },
        { id: 'zaatar-labneh', photo: 'menu_zaatar_labneh', desc: { fr: "Thym sauvage et labneh ultra crémeux", en: "Wild thyme and ultra-creamy labneh", es: "Tomillo silvestre y labneh ultracremoso" }, name: 'Zaatar et labneh', price: 5, veg: true,
          gloss: { fr: 'Labneh : fromage frais de yaourt égoutté', en: 'Labneh: strained yogurt cheese', es: 'Labneh: queso fresco de yogur colado' } },
        { id: 'zaatar-labneh-legumes', photo: 'menu_zaatar_labneh_legumes', desc: { fr: "Le combo parfait : thym sauvage, labneh, concombres, tomates, olives et menthe", en: "The perfect combo: wild thyme, labneh, cucumbers, tomatoes, olives and mint", es: "El combo perfecto: tomillo silvestre, labneh, pepinos, tomates, aceitunas y menta" }, name: 'Zaatar labneh et légumes', price: 6, veg: true },
        { id: 'labneh-sesame', desc: { fr: "Labneh, sésame blanc & noir, tomates, olives, sariette et filet d'huile d'olive", en: "Labneh, white & black sesame, tomatoes, olives, savory and a drizzle of olive oil", es: "Labneh, sésamo blanco y negro, tomates, aceitunas, ajedrea y un chorrito de aceite de oliva" }, name: 'Labneh sésame', price: 6.5, veg: true },
        { id: 'jebne', photo: 'menu_jebne', desc: { fr: "Full fromage fondant", en: "Loaded with melting cheese", es: "Todo de queso fundente" }, name: 'Jebné', price: 5.5, veg: true,
          gloss: { fr: 'Jebné : « fromage » en libanais', en: 'Jebné: Lebanese for “cheese”', es: 'Jebné: «queso» en libanés' } },
        { id: 'jebne-jambon', photo: 'menu_jebne_jambon', desc: { fr: "Full fromage fondant avec du jambon", en: "Loaded with melting cheese and ham", es: "Todo de queso fundente con jamón" }, name: 'Jebné et jambon', price: 8 },
        { id: 'jebne-mouhammara', photo: 'menu_jebne_mouhammara', desc: { fr: "Fromage fondant et mouhammara aux poivrons rouges grillés et mélasse de grenade", en: "Melting cheese and mouhammara with roasted red peppers and pomegranate molasses", es: "Queso fundente y mouhammara con pimientos rojos asados y melaza de granada" }, name: 'Jebné et mouhammara', price: 6, veg: true },
        { id: 'kechek', desc: { fr: "Fromage séché libanais, tomates & oignons", en: "Lebanese dried cheese, tomatoes & onions", es: "Queso seco libanés, tomates y cebollas" }, name: 'Kéchek', price: 5,
          gloss: { fr: 'Blé concassé et yaourt fermentés', en: 'Fermented yogurt and cracked wheat', es: 'Trigo partido y yogur fermentados' } },
        { id: 'lahm-bi-ajin', photo: 'menu_lahm_bi_ajin', desc: { fr: "Viande hachée épicée & tomates. À twister avec un filet de citron et sauce piquante (optionnel)", en: "Spiced minced meat & tomatoes. Twist with a squeeze of lemon and hot sauce (optional)", es: "Carne picada especiada y tomates. Para exprimir con limón y salsa picante (opcional)" }, name: 'Lahm bi ajin', price: 5,
          gloss: { fr: '« Viande sur pâte » : viande hachée épicée', en: '“Meat on dough”: spiced minced meat', es: '«Carne sobre masa»: carne picada especiada' } },
        { id: 'lahm-jebne', photo: 'menu_lahm_jebne', desc: { fr: "Viande hachée épicée & tomates avec du fromage fondant. À twister avec un filet de mélasse de grenade et sauce piquante (optionnel)", en: "Spiced minced meat & tomatoes with melting cheese. Twist with a drizzle of pomegranate molasses and hot sauce (optional)", es: "Carne picada especiada y tomates con queso fundente. Para aderezar con melaza de granada y salsa picante (opcional)" }, name: 'Lahm bi ajin et jebné', price: 6 },
      ],
    },
    {
      id: 'fatayers', num: 'II', pre: '', title: 'Fatayers & Beignets', post: '',
      script: 'Amuse-gueule',
      label: { fr: 'Fatayers & Beignets', en: 'Fatayers & Pastries', es: 'Fatayers y Buñuelos' },
      cover: 'fatayers_plateau', itemPrefix: '',
      items: [
        { id: 'mini-pizza', photo: 'menu_mini_pizza', desc: { fr: "Dinde, fromage, olives", en: "Turkey, cheese, olives", es: "Pavo, queso, aceitunas" }, name: 'Mini pizza', price: 1.5 },
        { id: 'mini-zaatar', photo: 'menu_mini_zaatar', desc: { fr: "Thym sauvage et huile d'olive", en: "Wild thyme and olive oil", es: "Tomillo silvestre y aceite de oliva" }, name: 'Mini zaatar', price: 1, veg: true },
        { id: 'mini-fromage', photo: 'menu_mini_fromage', desc: { fr: "Chausson maison", en: "Homemade turnover", es: "Empanadilla casera" }, name: 'Mini fromage', price: 1, veg: true },
        { id: 'mini-epinards', photo: 'menu_mini_epinards', desc: { fr: "Épinards, tomate, persil et oignons", en: "Spinach, tomato, parsley and onions", es: "Espinacas, tomate, perejil y cebolla" }, name: 'Mini épinards', price: 1, veg: true,
          gloss: { fr: 'Petit chausson aux épinards', en: 'Small spinach turnover', es: 'Empanadilla de espinacas' } },
        { id: 'sfiha', photo: 'menu_sfiha', desc: { fr: "Viande hachée et tomates", en: "Minced meat and tomatoes", es: "Carne picada y tomates" }, name: 'Sfiha', price: 1.5,
          gloss: { fr: 'Petite tarte carrée à la viande', en: 'Small square open meat pie', es: 'Pequeña tarta cuadrada de carne' } },
        { id: 'kebbe', desc: { fr: "Boulette de viande farcie", en: "Stuffed meatball", es: "Albóndiga rellena" }, name: 'Kebbé', price: 2, photo: 'kebbe',
          gloss: { fr: 'Croquette de boulgour et viande', en: 'Bulgur and meat croquette', es: 'Croqueta de bulgur y carne' } },
        { id: 'samboussek', desc: { fr: "Chausson à la viande", en: "Meat turnover", es: "Empanadilla de carne" }, name: 'Samboussek', price: 1.5, photo: 'samboussek',
          gloss: { fr: 'Petit chausson en demi-lune', en: 'Small half-moon turnover', es: 'Empanadilla en media luna' } },
      ],
    },
    {
      id: 'wraps', num: 'III', pre: 'Les', title: 'Wraps', post: '',
      script: 'Roulés, grillés, dévorés',
      label: { fr: 'Wraps', en: 'Wraps', es: 'Wraps' },
      cover: 'wraps', itemPrefix: 'Wrap ',
      items: [
        { id: 'kafta', photo: 'menu_kafta', desc: { fr: "Viande hachée épicée, fromages, tomates, cornichons et mayo", en: "Spiced minced meat, cheeses, tomatoes, pickles and mayo", es: "Carne picada especiada, quesos, tomates, pepinillos y mayonesa" }, name: 'Kafta', price: 9,
          gloss: { fr: 'Viande hachée aux herbes', en: 'Minced meat with herbs', es: 'Carne picada con hierbas' } },
        { id: 'soujouk', photo: 'menu_soujouk', desc: { fr: "Saucisse épicée, poivrons rouges, fromages, cornichons, tomates et mayo", en: "Spiced sausage, red peppers, cheeses, pickles, tomatoes and mayo", es: "Salchicha especiada, pimientos rojos, quesos, pepinillos, tomates y mayonesa" }, name: 'Soujouk', price: 9,
          gloss: { fr: 'Saucisse épicée', en: 'Spiced sausage', es: 'Salchicha especiada' } },
        { id: 'taouk', photo: 'menu_taouk', desc: { fr: "Poulet grillé, crème d'ail, fromage, tomates, cornichons et salade", en: "Grilled chicken, garlic cream, cheese, tomatoes, pickles and salad", es: "Pollo a la plancha, crema de ajo, queso, tomates, pepinillos y ensalada" }, name: 'Taouk', price: 9,
          gloss: { fr: 'Poulet mariné, façon chich taouk', en: 'Marinated chicken, shish taouk style', es: 'Pollo marinado, estilo shish taouk' } },
        { id: 'poulet-avocat', photo: 'menu_poulet_avocat', desc: { fr: "Poulet grillé, fromages, roquette, avocat, tomates et sauce maison", en: "Grilled chicken, cheeses, arugula, avocado, tomatoes and house sauce", es: "Pollo a la plancha, quesos, rúcula, aguacate, tomates y salsa de la casa" }, name: 'Poulet avocat', price: 10 },
        { id: 'dinde-fromage', photo: 'menu_dinde_fromage', desc: { fr: "Dinde, fromages, salade, tomates, cornichons et sauce maison", en: "Turkey, cheeses, salad, tomatoes, pickles and house sauce", es: "Pavo, quesos, ensalada, tomates, pepinillos y salsa de la casa" }, name: 'Dinde et fromage', price: 9 },
        { id: 'halloumi-pesto', photo: 'menu_halloumi_pesto', desc: { fr: "Halloumi grillé, pesto au basilic, olives, roquette et sauce maison", en: "Grilled halloumi, basil pesto, olives, arugula and house sauce", es: "Halloumi a la plancha, pesto de albahaca, aceitunas, rúcula y salsa de la casa" }, name: 'Halloumi pesto', price: 9, veg: true,
          gloss: { fr: 'Halloumi : fromage qui se grille', en: 'Halloumi: a cheese made for grilling', es: 'Halloumi: queso para la plancha' } },
      ],
    },
    {
      id: 'pizzas', num: 'IV', pre: '', title: 'Pizzas', post: '',
      script: 'Frais, Savoureux, Authentique',
      label: { fr: 'Pizzas', en: 'Pizzas', es: 'Pizzas' },
      cover: 'pizza_reine', itemPrefix: '',
      items: [
        { id: 'margherita', photo: 'menu_margherita', desc: { fr: "Sauce tomate cuisinée, mélange de fromages fondants et herbes aromatiques", en: "Cooked tomato sauce, melting cheese blend and aromatic herbs", es: "Salsa de tomate cocinada, mezcla de quesos fundentes y hierbas aromáticas" }, name: 'Margherita', price: 7, veg: true },
        { id: 'reine', photo: 'menu_reine', desc: { fr: "Sauce tomate, fromage, fines tranches de jambon et champignons de Paris frais", en: "Tomato sauce, cheese, thin slices of ham and fresh button mushrooms", es: "Salsa de tomate, queso, finas lonchas de jamón y champiñones frescos" }, name: 'Reine', price: 9 },
        { id: 'pepperoni', photo: 'menu_pepperoni', desc: { fr: "Sauce tomate, fromage et généreuses tranches de pepperoni bœuf", en: "Tomato sauce, cheese and generous slices of beef pepperoni", es: "Salsa de tomate, queso y generosas lonchas de pepperoni de ternera" }, name: 'Pepperoni', price: 9 },
        { id: 'la-libanaise', photo: 'menu_la_libanaise', desc: { fr: "Sauce tomate, fromage, jambon, poivrons frais, olives noires et champignons", en: "Tomato sauce, cheese, ham, fresh peppers, black olives and mushrooms", es: "Salsa de tomate, queso, jamón, pimientos frescos, aceitunas negras y champiñones" }, name: 'La Libanaise', price: 9 },
        { id: 'la-truffe', photo: 'menu_la_truffe', desc: { fr: "Base crème à la truffe noire, champignons émincés et fromage fondant", en: "Black truffle cream base, sliced mushrooms and melting cheese", es: "Base de crema de trufa negra, champiñones laminados y queso fundente" }, name: 'La Truffe', price: 9 },
        { id: 'la-poulet', photo: 'menu_la_poulet', desc: { fr: "Poulet grillé mariné, oignons émincés et base fromage", en: "Marinated grilled chicken, sliced onions and cheese base", es: "Pollo a la plancha marinado, cebolla en juliana y base de queso" }, name: 'La Poulet', price: 9 },
      ],
    },
    {
      id: 'desserts', num: 'V', pre: 'Nos', title: 'Desserts', post: '',
      script: 'Douceur obligatoire',
      label: { fr: 'Desserts', en: 'Desserts', es: 'Postres' },
      cover: 'dessert', itemPrefix: '',
      items: [
        { id: 'knefeh', photo: 'menu_knefeh', desc: { fr: "Fromage fondant, semoule dorée et sirop sucré", en: "Melting cheese, golden semolina and sweet syrup", es: "Queso fundente, sémola dorada y almíbar dulce" }, name: 'Knefeh', price: 7, veg: true,
          gloss: { fr: 'Dessert au fromage fondant et semoule, au sirop', en: 'Soft cheese and semolina pastry in syrup', es: 'Postre de queso fundente y sémola, con almíbar' } },
        { id: 'nutella', photo: 'menu_nutella', desc: { fr: "Nutella et éclats de noisettes", en: "Nutella and hazelnut pieces", es: "Nutella y trocitos de avellana" }, name: 'Nutella', price: 5, veg: true },
      ],
    },
    {
      id: 'boissons', num: 'VI', pre: '', title: 'Boissons', post: 'Froides',
      script: 'Des couches de plaisir',
      label: { fr: 'Boissons froides', en: 'Cold drinks', es: 'Bebidas frías' },
      cover: null, itemPrefix: '',
      items: [
        { id: 'coca', name: 'Coca', price: 2.5, veg: true },
        { id: 'coca-zero', name: 'Coca Zero', price: 2.5, veg: true },
        { id: 'sprite', name: 'Sprite', price: 2.5, veg: true },
        { id: 'fanta', name: 'Fanta', price: 2.5, veg: true },
        { id: 'fuse-tea', name: 'Fuse Tea', price: 2.5, veg: true },
        { id: 'schweppes-agrume', name: 'Schweppes agrume', price: 2.5, veg: true },
        { id: 'laban-iran', name: 'Laban Iran', price: 3, veg: true,
          gloss: { fr: 'Boisson au yaourt, légèrement salée', en: 'Yogurt drink, lightly salted', es: 'Bebida de yogur, ligeramente salada' } },
        { id: 'jus-pyramide', name: 'Jus Pyramide', price: 2, veg: true },
        { id: 'jus-orange', name: "Jus d'orange", price: 3, veg: true },
        { id: 'jus-ananas', name: "Jus d'ananas", price: 3, veg: true },
        { id: 'jus-pomme', name: 'Jus de pomme', price: 3, veg: true },
        { id: 'eau-plate', name: 'Eau plate 50cl', price: 2, veg: true },
        { id: 'eau-gazeuse', name: 'Eau gazeuse 50cl', price: 2, veg: true },
      ],
    },
    {
      id: 'boissons-chaudes', num: 'VII', pre: '', title: 'Boissons', post: 'Chaudes',
      script: 'Le plaisir chaud',
      label: { fr: 'Boissons chaudes', en: 'Hot drinks', es: 'Bebidas calientes' },
      cover: null, itemPrefix: '',
      items: [
        { id: 'cafe', name: 'Café', price: 2, veg: true },
        { id: 'double-cafe', name: 'Double café', price: 3.5, veg: true },
        { id: 'cafe-latte', name: 'Café latté', price: 3.5, veg: true },
        { id: 'capuccino', name: 'Capuccino', price: 4, veg: true },
        { id: 'deca', name: 'Déca', price: 2, veg: true },
        { id: 'chocolat-chaud', name: 'Chocolat chaud', price: 4, veg: true },
        { id: 'the', name: 'Thé', price: 2, veg: true },
      ],
    },
  ],
};

// Home "Le Plat Signature": references into MENU (price always comes from MENU).
export const SIGNATURE = [
  { ref: 'manouche/zaatar-legumes', name: "Man'ouche Zaatar et légumes", photo: 'manoucheZaatar' },
  { ref: 'manouche/lahm-jebne', name: 'Lahm bi ajin et jebné', photo: 'jebnelahme' },
  { ref: 'wraps/soujouk', name: 'Wrap Soujouk', photo: 'wrapsoujoukjebne' },
];

// PLACEHOLDER — REPLACE WITH REAL GOOGLE REVIEWS
// These are layout fillers, not real customer reviews. While `placeholder: true`,
// each card shows a visible "Avis d'exemple" tag so they can never pass for genuine.
// Real review shape: { text: '…', author: 'Prénom I.', stars: 5 } (stars optional).
export const REVIEWS = [
  { placeholder: true, text: "La man'ouche zaatar, pliée encore chaude. Simple, et exactement ce qu'on voulait.", author: 'Camille R.' },
  { placeholder: true, text: 'On a pris six sfihas pour la route. Il en restait deux en arrivant.', author: 'Yanis B.' },
  { placeholder: true, text: 'Le wrap soujouk, bien grillé et généreux. On reviendra goûter le taouk.', author: 'Léa M.' },
  { placeholder: true, text: 'Ça sent le pain chaud dès le trottoir de la rue des Postes.', author: 'Karim D.' },
  { placeholder: true, text: 'Le knefeh encore tiède. Il faut goûter, vraiment.', author: 'Sarah L.' },
  { placeholder: true, text: 'Accueil adorable, et les petits fatayers aux épinards partent vite.', author: 'Thomas V.' },
];

// Photo library: alt text describes the food and the place, never the people.
// pos = object-position focal point.
export const PHOTOS = {
  furn: { pos: '50% 44%', alt: {
    fr: "Une galette sur la pelle, à l'entrée d'un four où brûle un feu vif",
    en: 'A flatbread on the peel at the mouth of an oven with a bright fire inside',
    es: 'Una torta sobre la pala, en la boca de un horno con el fuego encendido' } },
  furn_boutique: { pos: '60% 50%', alt: {
    fr: 'Le four en dôme de mosaïque de la boutique, allumé, à côté du comptoir des garnitures',
    en: "The shop's mosaic-domed oven, lit, beside the toppings counter",
    es: 'El horno de cúpula de mosaico de la tienda, encendido, junto al mostrador de ingredientes' } },
  sfiha: { pos: '45% 46%', alt: {
    fr: 'Une sfiha carrée aux coins pincés, tenue devant les flammes du four',
    en: 'A square sfiha with pinched corners, held up in front of the oven flames',
    es: 'Una sfiha cuadrada con las esquinas pellizcadas, frente a las llamas del horno' } },
  manoucheZaatar: { pos: '50% 58%', alt: {
    fr: "Une man'ouche au za'atar pliée à la main, avec tomate, concombre, menthe et olives",
    en: "A za'atar man'ouche folded by hand, with tomato, cucumber, mint and olives",
    es: "Una man'ouche de za'atar doblada a mano, con tomate, pepino, menta y aceitunas" } },
  taouk: { pos: '50% 46%', alt: {
    fr: "Une galette garnie de poulet et de fromage fondu sur la pelle, à la bouche du four",
    en: 'A flatbread topped with chicken and melted cheese on the peel, at the oven mouth',
    es: 'Una torta con pollo y queso fundido sobre la pala, en la boca del horno' } },
  jebnelahme: { pos: '50% 60%', alt: {
    fr: 'Une galette moitié fromage fondu, moitié viande épicée, croquée à pleines dents',
    en: 'A flatbread half melted cheese, half spiced meat, mid-bite',
    es: 'Una torta mitad queso fundido, mitad carne especiada, a medio morder' } },
  jebne: { pos: '50% 50%', alt: {
    fr: "Une man'ouche au fromage fondu, tenue à deux mains au-dessus d'une planche en bois",
    en: "A melted-cheese man'ouche held in both hands over a wooden board",
    es: "Una man'ouche de queso fundido, sostenida con las dos manos sobre una tabla de madera" } },
  zaatar_labneh_legumes: { pos: '50% 50%', alt: {
    fr: 'Une galette au sésame garnie de labneh, tomate, concombre, menthe et olives',
    en: 'A sesame flatbread topped with labneh, tomato, cucumber, mint and olives',
    es: 'Una torta de sésamo con labneh, tomate, pepino, menta y aceitunas' } },
  minipizza_cuite: { pos: '50% 50%', alt: {
    fr: 'Une mini pizza dorée à la tomate, au fromage fondu, poivron et olive, tenue à deux mains',
    en: 'A golden mini pizza with tomato, melted cheese, pepper and an olive, held in both hands',
    es: 'Una mini pizza dorada con tomate, queso fundido, pimiento y aceituna, sostenida con las dos manos' } },
  mini_zaatar: { pos: '50% 50%', alt: {
    fr: "Deux petits pains au za'atar et au sésame, en gros plan",
    en: "Two small za'atar and sesame breads, close up",
    es: "Dos panecillos de za'atar y sésamo, en primer plano" } },
  kebbe: { pos: '50% 50%', alt: {
    fr: 'Deux kebbés dorés, croquettes de boulgour, en gros plan',
    en: 'Two golden kebbe, bulgur croquettes, close up',
    es: 'Dos kebbés dorados, croquetas de bulgur, en primer plano' } },
  samboussek: { pos: '50% 50%', alt: {
    fr: 'Des samboussek en demi-lune, dorés, alignés sur du papier',
    en: 'Golden half-moon samboussek lined up on paper',
    es: 'Samboussek dorados en media luna, alineados sobre papel' } },
  dinde_fromage: { pos: '50% 50%', alt: {
    fr: "Coupe d'un chausson à la dinde et au fromage fondu, posé sur du papier journal",
    en: 'Cross-section of a turkey and melted cheese wrap, on newsprint',
    es: 'Corte de un wrap de pavo y queso fundido, sobre papel de periódico' } },
  knefeh: { pos: '50% 22%', alt: {
    fr: 'Un chef soulève une part de knefeh au fromage filant, au-dessus de la grande plaque dorée',
    en: 'A chef lifts a stretchy cheese portion of knefeh above the large golden tray',
    es: 'Un chef levanta una porción de knefeh de queso hilante sobre la gran bandeja dorada' } },
  pizza_reine: { pos: '50% 36%', alt: {
    fr: 'Une pizza reine au jambon, champignons et fromage fondu, part soulevée',
    en: 'A ham, mushroom and melted cheese pizza, a slice lifted',
    es: 'Una pizza reina de jamón, champiñones y queso fundido, con una porción levantada' } },
  pizza_pepperoni: { pos: '50% 50%', alt: {
    fr: 'Une pizza au pepperoni, sauce tomate et fromage filant, part soulevée',
    en: 'A pepperoni pizza with tomato sauce and stretchy cheese, a slice lifted',
    es: 'Una pizza de pepperoni con salsa de tomate y queso hilante, con una porción levantada' } },
  pizza_truffe: { pos: '50% 50%', alt: {
    fr: 'Une pizza à la truffe noire, aux champignons et au fromage filant',
    en: 'A black truffle pizza with mushrooms and stretchy cheese',
    es: 'Una pizza de trufa negra con champiñones y queso hilante' } },
  fatayers_plateau: { pos: '50% 50%', alt: {
    fr: "Des plateaux en bois de fatayers dorés : triangles, carrés à la viande et au fromage, petites pizzas et za'atar",
    en: "Wooden boards of golden fatayers: triangles, square pies with meat and cheese, mini pizzas and za'atar rounds",
    es: "Tablas de madera con fatayers dorados: triángulos, tartas cuadradas de carne y queso, mini pizzas y redondas de za'atar" } },
  dessert: { pos: '50% 72%', alt: {
    fr: 'Un chef détache une part de knefeh fondant à la spatule, sur une grande plaque dorée',
    en: 'A chef lifts a melting portion of knefeh with a spatula from a large golden tray',
    es: 'Un chef levanta con la espátula una porción de knefeh fundente de una gran bandeja dorada' } },
  knefe_chef: { pos: '50% 40%', alt: {
    fr: 'Une grande plaque de knefeh doré sur le feu, en cuisine',
    en: 'A large tray of golden knefeh on the burner, in the kitchen',
    es: 'Una gran bandeja de knefeh dorado sobre el fuego, en la cocina' } },
  wrapsoujoukjebne: { pos: '50% 45%', alt: {
    fr: 'Coupe d’un wrap grillé au soujouk et fromage fondu, posé sur du papier journal',
    en: 'Cross-section of a grilled soujouk wrap with melted cheese, on newsprint',
    es: 'Corte de un wrap a la plancha de soujouk y queso fundido, sobre papel de periódico' } },
  epinard: { pos: '50% 50%', alt: {
    fr: 'Un fatayer aux épinards croqué, vu de très près',
    en: 'A bitten spinach fatayer, up close',
    es: 'Un fatayer de espinacas mordido, visto muy de cerca' } },
  pizzalibaniase: { pos: '50% 60%', alt: {
    fr: 'Une pizza ronde aux champignons, poivrons et olives, fromage filant',
    en: 'A round pizza with mushrooms, peppers and olives, cheese pulling',
    es: 'Una pizza redonda con champiñones, pimientos y aceitunas, queso fundido' } },
  manouchefromagepommedeterre: { pos: '50% 55%', alt: {
    fr: 'Une galette au fromage fondu, pomme de terre et oignon rouge, part soulevée',
    en: 'A flatbread with melted cheese, potato and red onion, a slice lifted',
    es: 'Una torta con queso fundido, patata y cebolla morada, con una porción levantada' } },
  minipizza: { pos: '50% 50%', alt: {
    fr: 'Une plaque de mini pizzas crues, garnies une à une',
    en: 'A tray of raw mini pizzas being topped one by one',
    es: 'Una bandeja de mini pizzas crudas, preparadas una a una' } },
  sfihafromage: { pos: '55% 40%', alt: {
    fr: "Des fatayers au fromage et aux herbes, et des mini galettes au za'atar sur des planches",
    en: "Cheese and herb fatayers, with mini za'atar flatbreads on wooden boards",
    es: "Fatayers de queso y hierbas, con mini tortas de za'atar sobre tablas" } },
  wraps: { pos: '50% 38%', alt: {
    fr: 'Une pile de six wraps grillés coupés en deux',
    en: 'A stack of six grilled wraps cut in half',
    es: 'Una pila de seis wraps a la plancha cortados por la mitad' } },
  Portrait: { pos: '50% 35%', alt: {
    fr: "Deux sfihas tenues comme des lunettes, devant une table de fatayers et de man'ouches",
    en: "Two sfihas held up like glasses, above a table of fatayers and man'ouches",
    es: "Dos sfihas sostenidas como gafas, sobre una mesa de fatayers y man'ouches" } },
  homepage: { pos: '50% 30%', alt: {
    fr: "L'enseigne ZA'ATAR en métal brossé sur un mur gris-vert, au-dessus d'un ficus",
    en: "The brushed-metal ZA'ATAR sign on a grey-green wall, above a potted ficus",
    es: "El rótulo de ZA'ATAR en metal cepillado sobre una pared gris verdosa, sobre un ficus" } },
  storefront: { pos: '50% 55%', alt: {
    fr: "La façade noire de ZA'ATAR, rue des Postes, et la salle derrière la vitrine",
    en: "ZA'ATAR's black shopfront on Rue des Postes, with the room behind the glass",
    es: "La fachada negra de ZA'ATAR en la Rue des Postes, con la sala tras el cristal" } },
  interior: { pos: '50% 58%', alt: {
    fr: 'La salle : comptoir en bois éclairé, tabourets colorés le long d’un mur vert sauge',
    en: 'The room: a lit wooden counter and colourful stools along a sage-green wall',
    es: 'La sala: mostrador de madera iluminado y taburetes de colores junto a una pared verde salvia' } },
  // Carte page: Jalal's dish photos (4:5, named after the dish).
  menu_zaatar: { pos: '50% 50%', alt: {
    fr: "Une man'ouche au za'atar dorée, nappée de thym sauvage et de sésame",
    en: "A golden za'atar man'ouche covered in wild thyme and sesame",
    es: "Una man'ouche de za'atar dorada, cubierta de tomillo silvestre y sésamo" } },
  menu_zaatar_fromage: { pos: '50% 50%', alt: {
    fr: "Une man'ouche au za'atar et au fromage fondant, pliée sur une planche en bois",
    en: "A za'atar and melted cheese man'ouche, folded on a wooden board",
    es: "Una man'ouche de za'atar y queso fundido, doblada sobre una tabla de madera" } },
  menu_zaatar_legumes: { pos: '50% 50%', alt: {
    fr: "Une man'ouche au za'atar pliée, garnie de tomate, concombre et olives",
    en: "A folded za'atar man'ouche filled with tomato, cucumber and olives",
    es: "Una man'ouche de za'atar doblada, con tomate, pepino y aceitunas" } },
  menu_zaatar_labneh: { pos: '50% 50%', alt: {
    fr: "Une man'ouche moitié za'atar, moitié labneh crémeux",
    en: "A man'ouche half za'atar, half creamy labneh",
    es: "Una man'ouche mitad za'atar, mitad labneh cremoso" } },
  menu_zaatar_labneh_legumes: { pos: '50% 50%', alt: {
    fr: "Une man'ouche au sésame dépliée sur du labneh, tomate, concombre, menthe et olives",
    en: "A sesame man'ouche unfolded over labneh, tomato, cucumber, mint and olives",
    es: "Una man'ouche de sésamo desplegada sobre labneh, tomate, pepino, menta y aceitunas" } },
  menu_jebne: { pos: '50% 50%', alt: {
    fr: "Une man'ouche au fromage fondant, dorée, tenue au-dessus d'une table de galettes",
    en: "A golden melted-cheese man'ouche held above a table of flatbreads",
    es: "Una man'ouche de queso fundido, dorada, sobre una mesa de tortas" } },
  menu_jebne_jambon: { pos: '50% 50%', alt: {
    fr: "Une man'ouche au fromage fondant et au jambon, avec un long filet de fromage",
    en: "A melted cheese and ham man'ouche with a long stretch of cheese",
    es: "Una man'ouche de queso fundido y jamón, con un largo hilo de queso" } },
  menu_jebne_mouhammara: { pos: '50% 50%', alt: {
    fr: "Une man'ouche à la mouhammara orange et au fromage, pliée sur une planche",
    en: "An orange mouhammara and cheese man'ouche, folded on a board",
    es: "Una man'ouche de mouhammara naranja y queso, doblada sobre una tabla" } },
  menu_lahm_bi_ajin: { pos: '50% 50%', alt: {
    fr: "Un lahm bi ajin, galette de viande hachée épicée, avec citron et poivre sur la planche",
    en: "A lahm bi ajin, spiced minced-meat flatbread, with a lemon and pepper shaker on the board",
    es: "Un lahm bi ajin, torta de carne picada especiada, con limón y pimentero sobre la tabla" } },
  menu_lahm_jebne: { pos: '50% 50%', alt: {
    fr: "Un lahm bi ajin et jebné plié, viande hachée et fromage fondant qui déborde",
    en: "A folded lahm bi ajin with jebné, minced meat and melted cheese oozing out",
    es: "Un lahm bi ajin con jebné doblado, carne picada y queso fundido desbordando" } },
  menu_mini_pizza: { pos: '50% 50%', alt: {
    fr: "Une mini pizza dorée à la tomate, au fromage fondant, poivron et olive, devant un plateau de minis",
    en: "A golden mini pizza with tomato, melted cheese, pepper and olive, above a tray of minis",
    es: "Una mini pizza dorada con tomate, queso fundido, pimiento y aceituna, sobre una bandeja de minis" } },
  menu_mini_zaatar: { pos: '50% 50%', alt: {
    fr: "Un mini za'atar doré, couvert de thym et de sésame, au-dessus d'une pile de minis",
    en: "A golden mini za'atar covered in thyme and sesame, above a stack of minis",
    es: "Un mini za'atar dorado, cubierto de tomillo y sésamo, sobre una pila de minis" } },
  menu_mini_fromage: { pos: '50% 50%', alt: {
    fr: "Un petit fatayer carré au fromage et aux herbes, aux coins pincés",
    en: "A small square fatayer filled with cheese and herbs, with pinched corners",
    es: "Un pequeño fatayer cuadrado de queso y hierbas, con las esquinas pellizcadas" } },
  menu_mini_epinards: { pos: '50% 50%', alt: {
    fr: "Un fatayer triangulaire aux épinards, croqué, devant un plateau de fatayers",
    en: "A triangular spinach fatayer, bitten, in front of a tray of fatayers",
    es: "Un fatayer triangular de espinacas, mordido, ante una bandeja de fatayers" } },
  menu_sfiha: { pos: '50% 50%', alt: {
    fr: "Une sfiha carrée à la viande hachée et aux tomates, aux coins pincés",
    en: "A square sfiha with minced meat and tomatoes, pinched corners",
    es: "Una sfiha cuadrada de carne picada y tomate, con las esquinas pellizcadas" } },
  menu_kafta: { pos: '50% 50%', alt: {
    fr: "Un wrap grillé à la kafta coupé en deux : viande hachée, fromage, tomate et cornichons",
    en: "A grilled kafta wrap cut in half: minced meat, cheese, tomato and pickles",
    es: "Un wrap a la plancha de kafta cortado por la mitad: carne picada, queso, tomate y pepinillos" } },
  menu_soujouk: { pos: '50% 50%', alt: {
    fr: "Un wrap grillé au soujouk coupé en deux : saucisse épicée et fromage fondant",
    en: "A grilled soujouk wrap cut in half: spiced sausage and melted cheese",
    es: "Un wrap a la plancha de soujouk cortado por la mitad: salchicha especiada y queso fundido" } },
  menu_taouk: { pos: '50% 50%', alt: {
    fr: "Un wrap grillé au poulet taouk coupé en deux, avec salade, tomate et fromage",
    en: "A grilled taouk chicken wrap cut in half, with salad, tomato and cheese",
    es: "Un wrap a la plancha de pollo taouk cortado por la mitad, con ensalada, tomate y queso" } },
  menu_poulet_avocat: { pos: '50% 50%', alt: {
    fr: "Un wrap grillé au poulet et à l'avocat coupé en deux, avec roquette et tomate",
    en: "A grilled chicken and avocado wrap cut in half, with arugula and tomato",
    es: "Un wrap a la plancha de pollo y aguacate cortado por la mitad, con rúcula y tomate" } },
  menu_dinde_fromage: { pos: '50% 50%', alt: {
    fr: "Un wrap grillé à la dinde et au fromage fondant coupé en deux, avec salade et tomate",
    en: "A grilled turkey and melted cheese wrap cut in half, with salad and tomato",
    es: "Un wrap a la plancha de pavo y queso fundido cortado por la mitad, con ensalada y tomate" } },
  menu_halloumi_pesto: { pos: '50% 50%', alt: {
    fr: "Un wrap grillé au halloumi et au pesto coupé en deux, avec olives, roquette et tomate",
    en: "A grilled halloumi and pesto wrap cut in half, with olives, arugula and tomato",
    es: "Un wrap a la plancha de halloumi y pesto cortado por la mitad, con aceitunas, rúcula y tomate" } },
  menu_margherita: { pos: '50% 50%', alt: {
    fr: "Une pizza margherita, sauce tomate et fromage fondant, part soulevée avec un long filet de fromage",
    en: "A margherita pizza with tomato sauce and melted cheese, a slice lifted with a long cheese pull",
    es: "Una pizza margarita con salsa de tomate y queso fundido, con una porción levantada y un largo hilo de queso" } },
  menu_reine: { pos: '50% 50%', alt: {
    fr: "Une pizza reine au jambon, champignons et fromage fondant, part soulevée",
    en: "A ham, mushroom and melted cheese pizza, a slice lifted",
    es: "Una pizza reina de jamón, champiñones y queso fundido, con una porción levantada" } },
  menu_pepperoni: { pos: '50% 50%', alt: {
    fr: "Une part de pizza au pepperoni, sauce tomate et fromage fondant",
    en: "A slice of pepperoni pizza with tomato sauce and melted cheese",
    es: "Una porción de pizza de pepperoni con salsa de tomate y queso fundido" } },
  menu_la_libanaise: { pos: '50% 50%', alt: {
    fr: "Une part de pizza libanaise aux champignons, poivrons verts et olives noires, fromage filant",
    en: "A slice of Lebanese pizza with mushrooms, green peppers and black olives, stretchy cheese",
    es: "Una porción de pizza libanesa con champiñones, pimientos verdes y aceitunas negras, queso hilante" } },
  menu_la_truffe: { pos: '50% 50%', alt: {
    fr: "Une pizza à la crème de truffe noire, champignons et fromage fondant, part soulevée",
    en: "A black truffle cream pizza with mushrooms and melted cheese, a slice lifted",
    es: "Una pizza de crema de trufa negra con champiñones y queso fundido, con una porción levantada" } },
  menu_la_poulet: { pos: '50% 50%', alt: {
    fr: "Une pizza au poulet grillé mariné, oignons rouges et fromage, vue du dessus",
    en: "A pizza with marinated grilled chicken, red onions and cheese, seen from above",
    es: "Una pizza de pollo a la plancha marinado, cebolla morada y queso, vista desde arriba" } },
  menu_knefeh: { pos: '50% 50%', alt: {
    fr: "Une part de knefeh : fromage fondant, semoule dorée et sirop sucré, servie sur une assiette blanche",
    en: "A portion of knefeh: melted cheese, golden semolina and sweet syrup, served on a white plate",
    es: "Una porción de knefeh: queso fundente, sémola dorada y almíbar dulce, servida en un plato blanco" } },
  menu_nutella: { pos: '50% 50%', alt: {
    fr: "Une galette au Nutella parsemée d'éclats de noisettes, sur une planche en bois",
    en: "A flatbread with Nutella and hazelnut pieces, on a wooden board",
    es: "Una torta con Nutella y trocitos de avellana, sobre una tabla de madera" } },
};

// Hero reel (frame #1 = the fire).
export const HERO_REEL = ['storefront', 'furn', 'interior', 'sfiha', 'manoucheZaatar', 'taouk', 'fatayers_plateau', 'pizza_reine', 'wraps', 'dessert'];

// Infos mosaic. Add `video: 'assets/ig-1.mp4'` to a tile to play a clip in place of the photo.
export const GALLERY = [
  { photo: 'Portrait', size: 'xl', video: null },
  { photo: 'interior', size: 'tall', video: null },
  { photo: 'pizzalibaniase', size: 's', video: null },
  { photo: 'pizza_pepperoni', size: 's', video: null },
  { photo: 'epinard', size: 'wide', video: null },
  { photo: 'manouchefromagepommedeterre', size: 's', video: null },
  { photo: 'storefront', size: 's', video: null },
  { photo: 'jebnelahme', size: 'tall', video: null },
  { photo: 'wraps', size: 'tall', video: null },
  { photo: 'fatayers_plateau', size: 'sq', pcOnly: true, video: null }, // fills the last 2×2 gap on desktop only
];
