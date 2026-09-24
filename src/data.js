// ═══════════════════════════════════════════════════════════════════════
//  ZA'ATAR — every editable fact lives in this file.
//  Prices, hours, links, reviews, photo alt texts. Nothing else to touch.
// ═══════════════════════════════════════════════════════════════════════

export const CONFIG = {
  name: "Za'atar",
  tagline: 'La Boulangerie Libanaise',
  address: { street: '139 Rue des Postes', postcode: '59000', city: 'Lille', country: 'FR' },
  // Verified 2026-09-24: OpenStreetMap node 6657678076 + api-adresse.data.gouv.fr (score 0.99).
  geo: { lat: 50.623422, lng: 3.054297 },
  transport: '', // Leave empty unless verified (e.g. nearest metro).
  phone: { display: '09 83 84 69 75', tel: '+33983846975' },
  instagram: { handle: 'zaatar.lille', url: 'https://www.instagram.com/zaatar.lille/' },
  googleQuery: "Za'atar 139 Rue des Postes Lille",
  // Hidden everywhere while null. Example: { value: 4.8, count: 212 }
  GOOGLE_RATING: null,
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
  heroVideo: 'assets/hero.mp4', // Drop the file in public/assets/ and it replaces the photo reel.
  siteUrl: '', // Set the production URL (https://…) for canonical + absolute OG links.
  year: 2026,
};

// Menu transcribed from the Instagram story (≈15 weeks old on 2026-09-24).
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
        { id: 'zaatar', name: 'Zaatar', price: 4, veg: true,
          gloss: { fr: 'Galette au mélange thym et sésame', en: 'Flatbread with the thyme–sesame blend', es: 'Torta con la mezcla de tomillo y sésamo' } },
        { id: 'zaatar-fromage', name: 'Zaatar et fromage', price: 5, veg: true },
        { id: 'zaatar-legumes', name: 'Zaatar et légumes', price: 5, veg: true, photo: 'manoucheZaatar' },
        { id: 'zaatar-labneh', name: 'Zaatar et labneh', price: 5, veg: true,
          gloss: { fr: 'Labneh : fromage frais de yaourt égoutté', en: 'Labneh: strained yogurt cheese', es: 'Labneh: queso fresco de yogur colado' } },
        { id: 'zaatar-labneh-legumes', name: 'Zaatar labneh et légumes', price: 6, veg: true, photo: 'zaatar_labneh_legumes' },
        { id: 'labneh-sesame', name: 'Labneh sésame', price: 6.5, veg: true },
        { id: 'jebne', name: 'Jebné', price: 5.5, veg: true, photo: 'jebne',
          gloss: { fr: 'Jebné : « fromage » en libanais', en: 'Jebné: Lebanese for “cheese”', es: 'Jebné: «queso» en libanés' } },
        { id: 'jebne-jambon', name: 'Jebné et jambon', price: 8 },
        { id: 'jebne-mouhammara', name: 'Jebné et mouhammara', price: 6, veg: true },
        { id: 'mouhammara', name: 'Mouhammara', price: 5, veg: true,
          gloss: { fr: 'Tartinade de poivron rouge et noix', en: 'Red pepper and walnut spread', es: 'Crema de pimiento rojo y nueces' } },
        { id: 'kechek', name: 'Kéchek', price: 5,
          gloss: { fr: 'Blé concassé et yaourt fermentés', en: 'Fermented yogurt and cracked wheat', es: 'Trigo partido y yogur fermentados' } },
        { id: 'lahm-bi-ajin', name: 'Lahm bi ajin', price: 5,
          gloss: { fr: '« Viande sur pâte » : viande hachée épicée', en: '“Meat on dough”: spiced minced meat', es: '«Carne sobre masa»: carne picada especiada' } },
        { id: 'lahm-jebne', name: 'Lahm bi ajin et jebné', price: 6, photo: 'jebnelahme' },
      ],
    },
    {
      id: 'fatayers', num: 'II', pre: '', title: 'Fatayers & Beignets', post: '',
      script: 'Amuse-gueule',
      label: { fr: 'Fatayers & Beignets', en: 'Fatayers & Pastries', es: 'Fatayers y Buñuelos' },
      cover: 'fatayers_plateau', itemPrefix: '',
      items: [
        { id: 'mini-pizza', name: 'Mini pizza', price: 1.5, photo: 'minipizza_cuite' },
        { id: 'mini-zaatar', name: 'Mini zaatar', price: 1, veg: true, photo: 'mini_zaatar' },
        { id: 'mini-fromage', name: 'Mini fromage', price: 1, veg: true, photo: 'sfihafromage' },
        { id: 'mini-epinards', name: 'Mini épinards', price: 1, veg: true, photo: 'epinard',
          gloss: { fr: 'Petit chausson aux épinards', en: 'Small spinach turnover', es: 'Empanadilla de espinacas' } },
        { id: 'sfiha', name: 'Sfiha', price: 1.5, photo: 'sfiha',
          gloss: { fr: 'Petite tarte carrée à la viande', en: 'Small square open meat pie', es: 'Pequeña tarta cuadrada de carne' } },
        { id: 'kebbe', name: 'Kebbé', price: 2, photo: 'kebbe',
          gloss: { fr: 'Croquette de boulgour et viande', en: 'Bulgur and meat croquette', es: 'Croqueta de bulgur y carne' } },
        { id: 'samboussek', name: 'Samboussek', price: 1.5, photo: 'samboussek',
          gloss: { fr: 'Petit chausson en demi-lune', en: 'Small half-moon turnover', es: 'Empanadilla en media luna' } },
      ],
    },
    {
      id: 'wraps', num: 'III', pre: 'Les', title: 'Wraps', post: '',
      script: 'Roulés, Grillés, Dévorés',
      label: { fr: 'Wraps', en: 'Wraps', es: 'Wraps' },
      cover: 'wraps', itemPrefix: 'Wrap ',
      items: [
        { id: 'kafta', name: 'Kafta', price: 9,
          gloss: { fr: 'Viande hachée aux herbes', en: 'Minced meat with herbs', es: 'Carne picada con hierbas' } },
        { id: 'soujouk', name: 'Soujouk', price: 9, photo: 'wrapsoujoukjebne',
          gloss: { fr: 'Saucisse épicée', en: 'Spiced sausage', es: 'Salchicha especiada' } },
        { id: 'taouk', name: 'Taouk', price: 9, photo: 'taouk',
          gloss: { fr: 'Poulet mariné, façon chich taouk', en: 'Marinated chicken, shish taouk style', es: 'Pollo marinado, estilo shish taouk' } },
        { id: 'poulet-avocat', name: 'Poulet avocat', price: 10 },
        { id: 'dinde-fromage', name: 'Dinde et fromage', price: 9, photo: 'dinde_fromage' },
        { id: 'halloumi-pesto', name: 'Halloumi pesto', price: 9, veg: true,
          gloss: { fr: 'Halloumi : fromage qui se grille', en: 'Halloumi: a cheese made for grilling', es: 'Halloumi: queso para la plancha' } },
      ],
    },
    {
      id: 'pizzas', num: 'IV', pre: '', title: 'Pizzas', post: '',
      script: 'Frais, Savoureux, Authentique',
      label: { fr: 'Pizzas', en: 'Pizzas', es: 'Pizzas' },
      cover: 'pizza_reine', itemPrefix: '',
      items: [
        { id: 'margherita', name: 'Margherita', price: 7, veg: true },
        { id: 'reine', name: 'Reine', price: 9, photo: 'pizza_reine' },
        { id: 'pepperoni', name: 'Pepperoni', price: 9, photo: 'pizza_pepperoni' },
        { id: 'la-libanaise', name: 'La Libanaise', price: 9, photo: 'pizzalibaniase' },
        { id: 'la-truffe', name: 'La Truffe', price: 9, photo: 'pizza_truffe' },
        { id: 'la-poulet', name: 'La Poulet', price: 9 },
      ],
    },
    {
      id: 'desserts', num: 'V', pre: 'Nos', title: 'Desserts', post: '',
      script: '',
      label: { fr: 'Desserts', en: 'Desserts', es: 'Postres' },
      cover: 'knefeh', itemPrefix: '',
      items: [
        { id: 'knefeh', name: 'Knefeh', price: 7, veg: true, photo: 'dessert',
          gloss: { fr: 'Dessert au fromage fondant et semoule, au sirop', en: 'Soft cheese and semolina pastry in syrup', es: 'Postre de queso fundente y sémola, con almíbar' } },
        { id: 'nutella', name: 'Nutella', price: 5, veg: true },
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
      script: 'Des couches de plaisir',
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
  knefeh: { pos: '50% 50%', alt: {
    fr: 'Un chef soulève une part de knefeh au fromage filant, au-dessus de la grande plaque dorée',
    en: 'A chef lifts a stretchy cheese portion of knefeh above the large golden tray',
    es: 'Un chef levanta una porción de knefeh de queso hilante sobre la gran bandeja dorada' } },
  pizza_reine: { pos: '50% 50%', alt: {
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
  dessert: { pos: '50% 50%', alt: {
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
  wraps: { pos: '50% 55%', alt: {
    fr: 'Une pile de six wraps grillés coupés en deux',
    en: 'A stack of six grilled wraps cut in half',
    es: 'Una pila de seis wraps a la plancha cortados por la mitad' } },
  Portrait: { pos: '50% 35%', alt: {
    fr: "Deux sfihas tenues comme des lunettes, devant une table de fatayers et de man'ouches",
    en: "Two sfihas held up like glasses, above a table of fatayers and man'ouches",
    es: "Dos sfihas sostenidas como gafas, sobre una mesa de fatayers y man'ouches" } },
  homepage: { pos: '50% 30%', alt: {
    fr: "L'enseigne Za'atar en métal brossé sur un mur gris-vert, au-dessus d'un ficus",
    en: "The brushed-metal Za'atar sign on a grey-green wall, above a potted ficus",
    es: "El rótulo de Za'atar en metal cepillado sobre una pared gris verdosa, sobre un ficus" } },
  storefront: { pos: '50% 55%', alt: {
    fr: 'La façade noire de Za’atar, rue des Postes, et la salle derrière la vitrine',
    en: "Za'atar's black shopfront on Rue des Postes, with the room behind the glass",
    es: 'La fachada negra de Za’atar en la Rue des Postes, con la sala tras el cristal' } },
  interior: { pos: '50% 58%', alt: {
    fr: 'La salle : comptoir en bois éclairé, tabourets colorés le long d’un mur vert sauge',
    en: 'The room: a lit wooden counter and colourful stools along a sage-green wall',
    es: 'La sala: mostrador de madera iluminado y taburetes de colores junto a una pared verde salvia' } },
};

// Hero reel (frame #1 = the fire).
export const HERO_REEL = ['furn', 'sfiha', 'manoucheZaatar', 'taouk', 'interior', 'storefront'];

// Infos mosaic. Add `video: 'assets/ig-1.mp4'` to a tile to play a clip in place of the photo.
export const GALLERY = [
  { photo: 'Portrait', size: 'xl', video: null },
  { photo: 'interior', size: 'tall', video: null },
  { photo: 'pizzalibaniase', size: 's', video: null },
  { photo: 'furn_boutique', size: 's', video: null },
  { photo: 'epinard', size: 'wide', video: null },
  { photo: 'manouchefromagepommedeterre', size: 's', video: null },
  { photo: 'storefront', size: 's', video: null },
  { photo: 'jebnelahme', size: 'tall', video: null },
];
