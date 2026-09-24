import { CONFIG } from './data.js';
import { formatTime } from './format.js';

// To add Arabic later: add an `ar` block with dir: 'rtl'; layout uses logical CSS properties.
export const LANGS = ['fr', 'en', 'es'];
const STORE_KEY = 'zaatar.lang';
const { chef } = CONFIG;

const DICT = {
  fr: {
    dir: 'ltr', name: 'Français', locale: 'fr-FR',
    days: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
    daysShort: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    meta: {
      home: ["Za'atar — Boulangerie libanaise à Lille · Man'ouches, fatayers, wraps",
        "Za'atar, le furn libanais de la rue des Postes à Lille : man'ouches, fatayers, wraps et knefeh cuits au four. Du mardi au dimanche."],
      carte: ["La Carte — Za'atar, boulangerie libanaise à Lille",
        "Man'ouches, fatayers & beignets, wraps, desserts et boissons fraîches : la carte de Za'atar, 139 rue des Postes à Lille."],
      infos: ["Infos pratiques — Za'atar, 139 Rue des Postes, Lille",
        "Adresse, horaires, téléphone et questions fréquentes : tout pour venir chez Za'atar, boulangerie libanaise à Lille."],
    },
    a11y: {
      skip: 'Aller au contenu', nav: 'Navigation principale', lang: 'Langue', menuOpen: 'Ouvrir le menu',
      menuClose: 'Fermer le menu', close: 'Fermer', prev: 'Photo précédente', next: 'Photo suivante',
      pause: 'Pause', play: 'Lecture', mapTitle: "Carte : Za'atar, 139 Rue des Postes, Lille",
      newTab: '(nouvel onglet)', home: "Za'atar, accueil", photo: 'Voir la photo',
      routeLoaded: (p) => `Page ${p} chargée`,
    },
    nav: { home: 'Accueil', carte: 'La Carte', infos: 'Infos' },
    status: {
      open: 'Ouvert maintenant', openShort: 'Ouvert',
      until: (t) => `jusqu'à ${t}`,
      closed: 'Fermé',
      opensAt: (t) => `ouvre à ${t}`,
      opensTomorrow: (t) => `ouvre demain à ${t}`,
      opensDay: (d, t) => `ouvre ${d} à ${t}`,
    },
    ticker: ["Za'atar", 'Boulangerie libanaise', 'Cuit au four', 'Fait à la main', 'Lille', '10h–15h · 18h–20h30'],
    actions: { call: 'Appeler', route: 'Itinéraire', menu: 'La carte' },
    hoursSentence: (D, f, to, slots, closed) => (closed
      ? (f === to ? `Fermé le ${D[f]}` : `Fermé du ${D[f]} au ${D[to]}`)
      : `${f === to ? `Le ${D[f]}` : `Du ${D[f]} au ${D[to]}`} : ${slots}`),
    common: {
      directions: 'Itinéraire', seeMenu: 'Voir toute la carte', discover: 'Découvrir',
      review: 'Laisser un avis Google', profile: 'Voir la fiche Google', address: 'Adresse', hours: 'Horaires',
      phone: 'Téléphone', instagram: 'Instagram', closed: 'Fermé', today: "Aujourd'hui", sample: "Avis d'exemple",
      veg: 'Végétarien', and: 'et', rating: (v, n) => `${v}/5 · ${n} avis Google`, story: 'Notre histoire',
    },
    footer: {
      pitch: 'Le four du quartier, version libanaise.',
      signed: `Signé chef ${chef.name}, aussi à ${chef.otherHouse} (Lille)`,
      follow: 'Suivre', rights: `© ${CONFIG.year} Za'atar · Lille`,
    },
    home: {
      eyebrow: 'Un furn à Lille',
      lead: "Au Liban, le furn, c'est le four du quartier. Le nôtre est rue des Postes, et il sent le za'atar.",
      ctaMenu: 'Découvrir la carte', ctaFind: 'Nous trouver',
      maison: {
        eyebrow: 'La maison', title: "Un four, des mains, <em>du za'atar.</em>",
        p1: "Za'atar, c'est une boulangerie libanaise comme au pays, où chaque quartier a son four. On y passe pour une man'ouche, on repart avec trois fatayers de plus.",
        p2: "La pâte est garnie à la main, glissée sur la pelle, poussée vers le feu. Za'atar, fromage, viande épicée : elle sort du four, on la plie, on la roule, on la partage.",
      },
      process: {
        eyebrow: 'Du pétrin au four', title: 'Quatre gestes, <em>une galette.</em>',
        steps: [
          ['Garnir', 'On étale, on garnit, à la main.'],
          ['Enfourner', 'Sur la pelle, direction le feu.'],
          ['Plier', 'Elle sort du four, on la plie encore chaude.'],
          ['Rouler', 'Ou on la roule et on la grille : voilà un wrap.'],
        ],
      },
      chef: {
        eyebrow: 'Le chef', title: `Signé <em>${chef.name}.</em>`,
        p: `Derrière le four, le chef ${chef.name}. Il fait vivre plusieurs maisons à Lille, dont ${chef.otherHouse}. Za'atar, c'est sa boulangerie libanaise, rue des Postes.`,
      },
      sig: { eyebrow: 'Le plat signature', title: 'Trois classiques, <em>un seul four.</em>' },
      envies: {
        title: 'Quatre envies, <em>une seule adresse.</em>',
        lead: 'Salé, sucré, frais : chaque envie a sa page sur la carte.',
      },
      reviews: { eyebrow: 'Avis Google', title: 'Ils en <em>parlent.</em>' },
      find: { eyebrow: 'Nous trouver', title: 'Rue des Postes, <em>à Lille.</em>' },
    },
    carte: {
      title: 'La Carte', script: 'Tout sort du four, ou presque',
      lead: "Man'ouches, fatayers, wraps, desserts et boissons fraîches.",
      filters: 'Filtrer la carte', categories: 'Catégories', all: 'Tout', vegOnly: 'Végétarien',
      search: 'Rechercher un plat', searchPh: 'épinards, halloumi, jebné…', clear: 'Effacer la recherche',
      count: (n) => (n === 0 ? 'Aucun plat' : n === 1 ? '1 plat' : `${n} plats`),
      empty: 'Rien ne sort du four avec ces filtres.', emptyHint: 'Essayez un autre mot, ou repartez de zéro.',
      reset: 'Tout réinitialiser', note: 'Allergènes et compositions : demandez à l’équipe. Prix service compris.',
      vegTag: 'Végétarien', photoOf: (n) => `Photo : ${n}`,
    },
    infos: {
      title: 'Adresse <em>& accès.</em>',
      lead: 'Rue des Postes, à Lille. Passez nous voir, le four est chaud.',
      weekTitle: 'Horaires de la semaine',
      histoire: {
        eyebrow: 'À propos', title: 'Une histoire <em>de four.</em>',
        p1: "Au Liban, chaque quartier a son furn. On y passe le matin, on repart avec une man'ouche pliée dans du papier, encore chaude.",
        p2: `Za'atar, c'est ce four-là, rue des Postes, à Lille. Aux commandes, le chef ${chef.name}, qu'on connaît aussi à ${chef.otherHouse}.`,
        quote: 'Au Liban, le furn, c’est le four du quartier. À Lille, c’est rue des Postes.',
      },
      gallery: {
        eyebrow: 'Instagram', title: 'Le four <em>en images.</em>',
        lead: 'Les fournées, les nouveautés, la carte en story : tout passe par Instagram.',
        follow: 'Suivre sur Instagram',
      },
      faq: {
        eyebrow: 'FAQ', title: 'Questions <em>fréquentes.</em>',
        items: [
          ['Quels sont vos horaires ?', 'HOURS'],
          ['Comment venir ?', `Nous sommes au 139 Rue des Postes, 59000 Lille. Le plus simple : ouvrez l’itinéraire depuis cette page.`],
          ["C'est quoi, une man'ouche ?", "Une galette libanaise garnie puis cuite au four. La plus classique est au za'atar, un mélange de thym et de sésame ; on la trouve aussi au fromage ou à la viande épicée. Au Liban, c'est le petit-déjeuner du quartier."],
          ['Avez-vous des options végétariennes ?', "Oui : plusieurs man'ouches (za'atar, fromage, labneh, mouhammara…), les mini fromage et mini épinards, le wrap halloumi pesto et le knefeh. Pour les allergènes, demandez à l'équipe."],
          ['Où voir la carte ?', "Sur la page La Carte de ce site, et en story sur notre Instagram @zaatar.lille."],
          ["Qui est derrière Za'atar ?", `Le chef ${chef.name}, qui fait vivre plusieurs restaurants à Lille, dont ${chef.otherHouse}.`],
          ['Réservation, à emporter, groupes ?', `Le plus simple : appelez-nous au ${CONFIG.phone.display}.`],
        ],
      },
    },
  },

  en: {
    dir: 'ltr', name: 'English', locale: 'en-GB',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    daysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    meta: {
      home: ["Za'atar — Lebanese bakery in Lille · Man'ouches, fatayers, wraps",
        "Za'atar, the Lebanese furn on Rue des Postes in Lille: oven-baked man'ouches, fatayers, wraps and knefeh. Tuesday to Sunday."],
      carte: ["The Menu — Za'atar, Lebanese bakery in Lille",
        "Man'ouches, fatayers & pastries, wraps, desserts and cold drinks: the Za'atar menu, 139 Rue des Postes, Lille."],
      infos: ["Visit — Za'atar, 139 Rue des Postes, Lille",
        "Address, opening hours, phone and FAQ: everything you need to visit Za'atar, Lebanese bakery in Lille."],
    },
    a11y: {
      skip: 'Skip to content', nav: 'Main navigation', lang: 'Language', menuOpen: 'Open menu',
      menuClose: 'Close menu', close: 'Close', prev: 'Previous photo', next: 'Next photo',
      pause: 'Pause', play: 'Play', mapTitle: "Map: Za'atar, 139 Rue des Postes, Lille",
      newTab: '(new tab)', home: "Za'atar, home", photo: 'View photo',
      routeLoaded: (p) => `${p} page loaded`,
    },
    nav: { home: 'Home', carte: 'Menu', infos: 'Visit' },
    status: {
      open: 'Open now', openShort: 'Open',
      until: (t) => `until ${t}`,
      closed: 'Closed',
      opensAt: (t) => `opens at ${t}`,
      opensTomorrow: (t) => `opens tomorrow at ${t}`,
      opensDay: (d, t) => `opens ${d} at ${t}`,
    },
    ticker: ["Za'atar", 'Lebanese bakery', 'Oven-baked', 'Handmade', 'Lille', '10am–3pm · 6pm–8:30pm'],
    actions: { call: 'Call', route: 'Directions', menu: 'Menu' },
    hoursSentence: (D, f, to, slots, closed) => (closed
      ? `Closed on ${D[f]}${f === to ? '' : ` to ${D[to]}`}`
      : `${D[f]}${f === to ? '' : ` to ${D[to]}`}: ${slots}`),
    common: {
      directions: 'Directions', seeMenu: 'See the full menu', discover: 'Discover',
      review: 'Leave a Google review', profile: 'View on Google', address: 'Address', hours: 'Hours',
      phone: 'Phone', instagram: 'Instagram', closed: 'Closed', today: 'Today', sample: 'Sample review',
      veg: 'Vegetarian', and: 'and', rating: (v, n) => `${v}/5 · ${n} Google reviews`, story: 'Our story',
    },
    footer: {
      pitch: 'The neighbourhood oven, Lebanese style.',
      signed: `By chef ${chef.name}, also at ${chef.otherHouse} (Lille)`,
      follow: 'Follow', rights: `© ${CONFIG.year} Za'atar · Lille`,
    },
    home: {
      eyebrow: 'A furn in Lille',
      lead: "In Lebanon, the furn is the neighbourhood oven. Ours is on Rue des Postes, and it smells of za'atar.",
      ctaMenu: 'See the menu', ctaFind: 'Find us',
      maison: {
        eyebrow: 'The house', title: "One oven, two hands, <em>some za'atar.</em>",
        p1: "Za'atar is a Lebanese bakery like back home, where every neighbourhood has its oven. You come in for one man'ouche and leave with three more fatayers.",
        p2: "The dough is topped by hand, slid onto the peel, pushed towards the fire. Za'atar, cheese, spiced meat: out of the oven, folded, rolled, shared.",
      },
      process: {
        eyebrow: 'From dough to oven', title: 'Four moves, <em>one flatbread.</em>',
        steps: [
          ['Top', 'Rolled out and topped by hand.'],
          ['Bake', 'Onto the peel, into the fire.'],
          ['Fold', 'Out of the oven, folded while still hot.'],
          ['Roll', 'Or rolled and grilled: that’s a wrap.'],
        ],
      },
      chef: {
        eyebrow: 'The chef', title: `Signed <em>${chef.name}.</em>`,
        p: `Behind the oven: chef ${chef.name}. He runs several places in Lille, including ${chef.otherHouse}. Za'atar is his Lebanese bakery on Rue des Postes.`,
      },
      sig: { eyebrow: 'Signature dishes', title: 'Three classics, <em>one oven.</em>' },
      envies: {
        title: 'Four cravings, <em>one address.</em>',
        lead: 'Savoury, sweet, cold: every craving has its page on the menu.',
      },
      reviews: { eyebrow: 'Google reviews', title: 'What people <em>say.</em>' },
      find: { eyebrow: 'Find us', title: 'Rue des Postes, <em>Lille.</em>' },
    },
    carte: {
      title: 'The Menu', script: 'Tout sort du four, ou presque',
      lead: "Man'ouches, fatayers, wraps, desserts and cold drinks.",
      filters: 'Filter the menu', categories: 'Categories', all: 'All', vegOnly: 'Vegetarian',
      search: 'Search a dish', searchPh: 'spinach, halloumi, jebné…', clear: 'Clear search',
      count: (n) => (n === 0 ? 'No dishes' : n === 1 ? '1 dish' : `${n} dishes`),
      empty: 'Nothing comes out of the oven with these filters.', emptyHint: 'Try another word, or start over.',
      reset: 'Reset all', note: 'Allergens and ingredients: please ask the team. Service included.',
      vegTag: 'Vegetarian', photoOf: (n) => `Photo: ${n}`,
    },
    infos: {
      title: 'Address <em>& access.</em>',
      lead: 'Rue des Postes, Lille. Drop by, the oven is hot.',
      weekTitle: 'Opening hours',
      histoire: {
        eyebrow: 'About', title: 'A story <em>of an oven.</em>',
        p1: "In Lebanon, every neighbourhood has its furn. You stop by in the morning and leave with a man'ouche folded in paper, still warm.",
        p2: `Za'atar is that oven, on Rue des Postes in Lille. At the helm: chef ${chef.name}, also known for ${chef.otherHouse}.`,
        quote: 'In Lebanon, the furn is the neighbourhood oven. In Lille, it’s on Rue des Postes.',
      },
      gallery: {
        eyebrow: 'Instagram', title: 'The oven <em>in pictures.</em>',
        lead: 'Fresh batches, new things, the menu in stories: it all goes through Instagram.',
        follow: 'Follow on Instagram',
      },
      faq: {
        eyebrow: 'FAQ', title: 'Frequently <em>asked.</em>',
        items: [
          ['What are your opening hours?', 'HOURS'],
          ['How do I get there?', 'We are at 139 Rue des Postes, 59000 Lille. The easiest way: open the directions from this page.'],
          ["What is a man'ouche?", "A Lebanese flatbread, topped and then baked in the oven. The classic one is za'atar, a thyme and sesame blend; it also comes with cheese or spiced meat. In Lebanon, it’s the neighbourhood breakfast."],
          ['Do you have vegetarian options?', "Yes: several man'ouches (za'atar, cheese, labneh, mouhammara…), the mini cheese and mini spinach, the halloumi pesto wrap and the knefeh. For allergens, please ask the team."],
          ['Where can I see the menu?', 'On the Menu page of this site, and in the stories of our Instagram @zaatar.lille.'],
          ["Who is behind Za'atar?", `Chef ${chef.name}, who runs several restaurants in Lille, including ${chef.otherHouse}.`],
          ['Reservations, takeaway, groups?', `The easiest way: call us on ${CONFIG.phone.display}.`],
        ],
      },
    },
  },

  es: {
    dir: 'ltr', name: 'Español', locale: 'es-ES',
    days: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'],
    daysShort: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    meta: {
      home: ["Za'atar — Panadería libanesa en Lille · Man'ouches, fatayers, wraps",
        "Za'atar, el furn libanés de la Rue des Postes en Lille: man'ouches, fatayers, wraps y knefeh al horno. De martes a domingo."],
      carte: ["La Carta — Za'atar, panadería libanesa en Lille",
        "Man'ouches, fatayers y buñuelos, wraps, postres y bebidas frías: la carta de Za'atar, 139 Rue des Postes, Lille."],
      infos: ["Información — Za'atar, 139 Rue des Postes, Lille",
        "Dirección, horarios, teléfono y preguntas frecuentes: todo para visitar Za'atar, panadería libanesa en Lille."],
    },
    a11y: {
      skip: 'Ir al contenido', nav: 'Navegación principal', lang: 'Idioma', menuOpen: 'Abrir el menú',
      menuClose: 'Cerrar el menú', close: 'Cerrar', prev: 'Foto anterior', next: 'Foto siguiente',
      pause: 'Pausa', play: 'Reproducir', mapTitle: "Mapa: Za'atar, 139 Rue des Postes, Lille",
      newTab: '(pestaña nueva)', home: "Za'atar, inicio", photo: 'Ver la foto',
      routeLoaded: (p) => `Página ${p} cargada`,
    },
    nav: { home: 'Inicio', carte: 'La Carta', infos: 'Info' },
    status: {
      open: 'Abierto ahora', openShort: 'Abierto',
      until: (t) => `hasta las ${t}`,
      closed: 'Cerrado',
      opensAt: (t) => `abre a las ${t}`,
      opensTomorrow: (t) => `abre mañana a las ${t}`,
      opensDay: (d, t) => `abre el ${d} a las ${t}`,
    },
    ticker: ["Za'atar", 'Panadería libanesa', 'Al horno', 'Hecho a mano', 'Lille', '10:00–15:00 · 18:00–20:30'],
    actions: { call: 'Llamar', route: 'Cómo llegar', menu: 'La carta' },
    hoursSentence: (D, f, to, slots, closed) => (closed
      ? (f === to ? `Cerrado el ${D[f]}` : `Cerrado de ${D[f]} a ${D[to]}`)
      : `${f === to ? `El ${D[f]}` : `De ${D[f]} a ${D[to]}`}: ${slots}`),
    common: {
      directions: 'Cómo llegar', seeMenu: 'Ver toda la carta', discover: 'Descubrir',
      review: 'Dejar una reseña en Google', profile: 'Ver la ficha de Google', address: 'Dirección', hours: 'Horario',
      phone: 'Teléfono', instagram: 'Instagram', closed: 'Cerrado', today: 'Hoy', sample: 'Reseña de ejemplo',
      veg: 'Vegetariano', and: 'y', rating: (v, n) => `${v}/5 · ${n} reseñas de Google`, story: 'Nuestra historia',
    },
    footer: {
      pitch: 'El horno del barrio, a la libanesa.',
      signed: `Firmado por el chef ${chef.name}, también en ${chef.otherHouse} (Lille)`,
      follow: 'Seguir', rights: `© ${CONFIG.year} Za'atar · Lille`,
    },
    home: {
      eyebrow: 'Un furn en Lille',
      lead: "En el Líbano, el furn es el horno del barrio. El nuestro está en la Rue des Postes, y huele a za'atar.",
      ctaMenu: 'Descubrir la carta', ctaFind: 'Encontrarnos',
      maison: {
        eyebrow: 'La casa', title: "Un horno, dos manos, <em>y za'atar.</em>",
        p1: "Za'atar es una panadería libanesa como las de allí, donde cada barrio tiene su horno. Entras por una man'ouche y sales con tres fatayers más.",
        p2: "La masa se prepara a mano, pasa a la pala y va hacia el fuego. Za'atar, queso, carne especiada: sale del horno, se dobla, se enrolla, se comparte.",
      },
      process: {
        eyebrow: 'De la masa al horno', title: 'Cuatro gestos, <em>una torta.</em>',
        steps: [
          ['Preparar', 'Se estira y se cubre a mano.'],
          ['Hornear', 'A la pala, directo al fuego.'],
          ['Doblar', 'Sale del horno y se dobla aún caliente.'],
          ['Enrollar', 'O se enrolla y se tuesta: eso es un wrap.'],
        ],
      },
      chef: {
        eyebrow: 'El chef', title: `Firmado <em>${chef.name}.</em>`,
        p: `Detrás del horno, el chef ${chef.name}. Lleva varias casas en Lille, entre ellas ${chef.otherHouse}. Za'atar es su panadería libanesa en la Rue des Postes.`,
      },
      sig: { eyebrow: 'Los platos estrella', title: 'Tres clásicos, <em>un solo horno.</em>' },
      envies: {
        title: 'Cuatro antojos, <em>una sola dirección.</em>',
        lead: 'Salado, dulce, fresco: cada antojo tiene su página en la carta.',
      },
      reviews: { eyebrow: 'Reseñas de Google', title: 'Lo que <em>dicen.</em>' },
      find: { eyebrow: 'Encontrarnos', title: 'Rue des Postes, <em>en Lille.</em>' },
    },
    carte: {
      title: 'La Carta', script: 'Tout sort du four, ou presque',
      lead: "Man'ouches, fatayers, wraps, postres y bebidas frías.",
      filters: 'Filtrar la carta', categories: 'Categorías', all: 'Todo', vegOnly: 'Vegetariano',
      search: 'Buscar un plato', searchPh: 'espinacas, halloumi, jebné…', clear: 'Borrar la búsqueda',
      count: (n) => (n === 0 ? 'Ningún plato' : n === 1 ? '1 plato' : `${n} platos`),
      empty: 'Nada sale del horno con estos filtros.', emptyHint: 'Prueba otra palabra o empieza de nuevo.',
      reset: 'Restablecer todo', note: 'Alérgenos e ingredientes: pregunta al equipo. Servicio incluido.',
      vegTag: 'Vegetariano', photoOf: (n) => `Foto: ${n}`,
    },
    infos: {
      title: 'Dirección <em>y acceso.</em>',
      lead: 'Rue des Postes, en Lille. Pásate, el horno está caliente.',
      weekTitle: 'Horario de la semana',
      histoire: {
        eyebrow: 'Sobre nosotros', title: 'Una historia <em>de horno.</em>',
        p1: "En el Líbano, cada barrio tiene su furn. Pasas por la mañana y te vas con una man'ouche doblada en papel, todavía caliente.",
        p2: `Za'atar es ese horno, en la Rue des Postes de Lille. Al mando, el chef ${chef.name}, al que también conocen por ${chef.otherHouse}.`,
        quote: 'En el Líbano, el furn es el horno del barrio. En Lille, está en la Rue des Postes.',
      },
      gallery: {
        eyebrow: 'Instagram', title: 'El horno <em>en imágenes.</em>',
        lead: 'Las hornadas, las novedades, la carta en stories: todo pasa por Instagram.',
        follow: 'Seguir en Instagram',
      },
      faq: {
        eyebrow: 'FAQ', title: 'Preguntas <em>frecuentes.</em>',
        items: [
          ['¿Cuál es vuestro horario?', 'HOURS'],
          ['¿Cómo llegar?', 'Estamos en el 139 Rue des Postes, 59000 Lille. Lo más fácil: abre la ruta desde esta página.'],
          ["¿Qué es una man'ouche?", "Una torta libanesa que se cubre y luego se hornea. La más clásica es de za'atar, una mezcla de tomillo y sésamo; también la hay de queso o de carne especiada. En el Líbano es el desayuno del barrio."],
          ['¿Tenéis opciones vegetarianas?', "Sí: varias man'ouches (za'atar, queso, labneh, mouhammara…), los mini de queso y de espinacas, el wrap halloumi pesto y el knefeh. Para los alérgenos, pregunta al equipo."],
          ['¿Dónde veo la carta?', 'En la página La Carta de esta web, y en las stories de nuestro Instagram @zaatar.lille.'],
          ["¿Quién está detrás de Za'atar?", `El chef ${chef.name}, que lleva varios restaurantes en Lille, entre ellos ${chef.otherHouse}.`],
          ['¿Reservas, para llevar, grupos?', `Lo más fácil: llámanos al ${CONFIG.phone.display}.`],
        ],
      },
    },
  },
};

let current = 'fr';

function stored() {
  try { return localStorage.getItem(STORE_KEY); } catch { return null; }
}

export function initLang() {
  const s = stored();
  if (LANGS.includes(s)) current = s;
  applyDocumentLang();
  return current;
}

export function setLang(lang) {
  if (!LANGS.includes(lang)) return;
  current = lang;
  try { localStorage.setItem(STORE_KEY, lang); } catch { /* private mode */ }
  applyDocumentLang();
}

function applyDocumentLang() {
  document.documentElement.lang = current;
  document.documentElement.dir = DICT[current].dir;
}

export const lang = () => current;
export const t = () => DICT[current];
export const tl = (l) => DICT[l];
export const time = (hhmm) => formatTime(hhmm, current);
