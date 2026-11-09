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
      home: ["ZA'ATAR — Boulangerie libanaise à Lille · Man'ouches, fatayers, wraps",
        "ZA'ATAR, le furn libanais de la rue des Postes à Lille : man'ouches, fatayers, wraps et knefeh cuits au four. Du mardi au dimanche."],
      carte: ["La Carte — ZA'ATAR, boulangerie libanaise à Lille",
        "Man'ouches, fatayers & beignets, wraps, pizzas, desserts et boissons : la carte de ZA'ATAR, 139 rue des Postes à Lille."],
      infos: ["Infos pratiques — ZA'ATAR, 139 Rue des Postes, Lille",
        "Adresse, horaires, téléphone et questions fréquentes : tout pour venir chez ZA'ATAR, boulangerie libanaise à Lille."],
    },
    a11y: {
      skip: 'Aller au contenu', nav: 'Navigation principale', lang: 'Langue', menuOpen: 'Ouvrir le menu',
      menuClose: 'Fermer le menu', close: 'Fermer', prev: 'Photo précédente', next: 'Photo suivante',
      pause: 'Pause', play: 'Lecture', mapTitle: "Carte : ZA'ATAR, 139 Rue des Postes, Lille",
      newTab: '(nouvel onglet)', home: "ZA'ATAR, accueil", photo: 'Voir la photo',
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
    ticker: ["ZA'ATAR", 'Boulangerie libanaise', 'Cuit au four', 'Fait à la main', 'Lille', '10h–15h · 18h–20h30'],
    actions: { call: 'Appeler', route: 'Itinéraire', menu: 'La carte' },
    hoursSentence: (D, f, to, slots, closed) => (closed
      ? (f === to ? `Fermé le ${D[f]}` : `Fermé du ${D[f]} au ${D[to]}`)
      : `${f === to ? `Le ${D[f]}` : `Du ${D[f]} au ${D[to]}`} : ${slots}`),
    common: {
      directions: 'Itinéraire', seeMenu: 'Voir toute la carte', discover: 'Découvrir',
      review: 'Laisser un avis Google', profile: 'Voir la fiche Google', delivery: 'Livraison', address: 'Adresse', hours: 'Horaires',
      phone: 'Téléphone', instagram: 'Instagram', closed: 'Fermé', today: "Aujourd'hui", sample: "Avis d'exemple",
      veg: 'Végétarien', and: 'et', rating: (v, n) => `${v}/5 · ${n} avis Google`, ratingLine: (v, n) => `${v}/5 sur ${n} avis Google`,
    },
    footer: {
      signed: `Signé chef ${chef.name}, aussi à ${chef.otherHouse} (Lille)`,
      follow: 'Suivre', rights: `© ${CONFIG.year} ZA'ATAR · Lille`,
    },
    home: {
      eyebrow: 'Lille',
      lead: 'Le four de Lille',
      ctaMenu: 'Découvrir la carte', ctaFind: 'Nous trouver',
      maison: {
        eyebrow: 'La maison', title: "Du feu, du ZA'ATAR, <em>de l'envie.</em>",
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
        p: `Derrière le four, le chef ${chef.name}. Il fait vivre plusieurs maisons à Lille, dont ${chef.otherHouse}.\nZA'ATAR, c'est sa boulangerie libanaise, rue des Postes.`,
      },
      sig: { eyebrow: 'Le plat signature', title: 'Trois classiques, <em>un seul four.</em>' },
      envies: {
        title: 'Une seule envie, <em>tout goûter.</em>',
        lead: 'Salé, sucré, frais : chaque page de la carte est une bonne raison d\'y céder.',
      },
      reviews: { eyebrow: 'Avis Google', title: 'Vous en <em>parlez.</em>' },
      find: { eyebrow: 'Nous trouver', title: 'Rue des Postes, <em>à Lille.</em>' },
    },
    carte: {
      title: 'La Carte', script: 'Tout sort du four',
      filters: 'Filtrer la carte', categories: 'Catégories', all: 'Tout',
      search: 'Rechercher un plat', searchPh: 'épinards, halloumi, jebné…', clear: 'Effacer la recherche',
      count: (n) => (n === 0 ? 'Aucun plat' : n === 1 ? '1 plat' : `${n} plats`),
      empty: 'Rien ne sort du four avec ces filtres.', emptyHint: 'Essayez un autre mot, ou repartez de zéro.',
      reset: 'Tout réinitialiser', note: 'Allergènes et compositions : demandez à l’équipe. Prix service compris.',
      vegTag: 'Végétarien', photoOf: (n) => `Photo : ${n}`,
    },
    infos: {
      title: 'Adresse <em>& accès.</em>',
      weekTitle: 'Horaires de la semaine',
      gallery: {
        eyebrow: 'Instagram', title: 'Le four <em>en images.</em>',
        lead: 'Les fournées, les nouveautés, la carte en story : tout passe par Instagram.',
        follow: 'Suivre sur Instagram',
      },
      faq: {
        eyebrow: 'FAQ', title: 'Questions <em>fréquentes.</em>',
        items: [
          ['La viande est-elle halal ?', "Oui, notre viande est halal."],
          ['Réservation, à emporter, groupes ?', `Le plus simple : appelez-nous au ${CONFIG.phone.display}.`],
          ['Avez-vous des options végétariennes ?', "Oui : plusieurs man'ouches (za'atar, fromage, labneh, mouhammara…), les mini fromage et mini épinards, le wrap halloumi pesto et le knefeh. Pour les allergènes, demandez à l'équipe."],
        ],
      },
    },
  },

  en: {
    dir: 'ltr', name: 'English', locale: 'en-GB',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    daysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    meta: {
      home: ["ZA'ATAR — Lebanese bakery in Lille · Man'ouches, fatayers, wraps",
        "ZA'ATAR, the Lebanese furn on Rue des Postes in Lille: oven-baked man'ouches, fatayers, wraps and knefeh. Tuesday to Sunday."],
      carte: ["The Menu — ZA'ATAR, Lebanese bakery in Lille",
        "Man'ouches, fatayers & pastries, wraps, pizzas, desserts and drinks: the ZA'ATAR menu, 139 Rue des Postes, Lille."],
      infos: ["Visit — ZA'ATAR, 139 Rue des Postes, Lille",
        "Address, opening hours, phone and FAQ: everything you need to visit ZA'ATAR, Lebanese bakery in Lille."],
    },
    a11y: {
      skip: 'Skip to content', nav: 'Main navigation', lang: 'Language', menuOpen: 'Open menu',
      menuClose: 'Close menu', close: 'Close', prev: 'Previous photo', next: 'Next photo',
      pause: 'Pause', play: 'Play', mapTitle: "Map: ZA'ATAR, 139 Rue des Postes, Lille",
      newTab: '(new tab)', home: "ZA'ATAR, home", photo: 'View photo',
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
    ticker: ["ZA'ATAR", 'Lebanese bakery', 'Oven-baked', 'Handmade', 'Lille', '10am–3pm · 6pm–8:30pm'],
    actions: { call: 'Call', route: 'Directions', menu: 'Menu' },
    hoursSentence: (D, f, to, slots, closed) => (closed
      ? `Closed on ${D[f]}${f === to ? '' : ` to ${D[to]}`}`
      : `${D[f]}${f === to ? '' : ` to ${D[to]}`}: ${slots}`),
    common: {
      directions: 'Directions', seeMenu: 'See the full menu', discover: 'Discover',
      review: 'Leave a Google review', profile: 'View on Google', delivery: 'Delivery', address: 'Address', hours: 'Hours',
      phone: 'Phone', instagram: 'Instagram', closed: 'Closed', today: 'Today', sample: 'Sample review',
      veg: 'Vegetarian', and: 'and', rating: (v, n) => `${v}/5 · ${n} Google reviews`, ratingLine: (v, n) => `${v}/5 from ${n} Google reviews`,
    },
    footer: {
      signed: `By chef ${chef.name}, also at ${chef.otherHouse} (Lille)`,
      follow: 'Follow', rights: `© ${CONFIG.year} ZA'ATAR · Lille`,
    },
    home: {
      eyebrow: 'Lille',
      lead: "Lille's oven",
      ctaMenu: 'See the menu', ctaFind: 'Find us',
      maison: {
        eyebrow: 'The house', title: "Fire, ZA'ATAR, <em>appetite.</em>",
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
        p: `Behind the oven: chef ${chef.name}. He runs several places in Lille, including ${chef.otherHouse}.\nZA'ATAR is his Lebanese bakery on Rue des Postes.`,
      },
      sig: { eyebrow: 'Signature dishes', title: 'Three classics, <em>one oven.</em>' },
      envies: {
        title: 'One craving, <em>taste it all.</em>',
        lead: 'Savoury, sweet, fresh: every page of the menu is a good reason to give in.',
      },
      reviews: { eyebrow: 'Google reviews', title: 'You <em>talk about us.</em>' },
      find: { eyebrow: 'Find us', title: 'Rue des Postes, <em>Lille.</em>' },
    },
    carte: {
      title: 'The Menu', script: 'Tout sort du four',
      filters: 'Filter the menu', categories: 'Categories', all: 'All',
      search: 'Search a dish', searchPh: 'spinach, halloumi, jebné…', clear: 'Clear search',
      count: (n) => (n === 0 ? 'No dishes' : n === 1 ? '1 dish' : `${n} dishes`),
      empty: 'Nothing comes out of the oven with these filters.', emptyHint: 'Try another word, or start over.',
      reset: 'Reset all', note: 'Allergens and ingredients: please ask the team. Service included.',
      vegTag: 'Vegetarian', photoOf: (n) => `Photo: ${n}`,
    },
    infos: {
      title: 'Address <em>& access.</em>',
      weekTitle: 'Opening hours',
      gallery: {
        eyebrow: 'Instagram', title: 'The oven <em>in pictures.</em>',
        lead: 'Fresh batches, new things, the menu in stories: it all goes through Instagram.',
        follow: 'Follow on Instagram',
      },
      faq: {
        eyebrow: 'FAQ', title: 'Frequently <em>asked.</em>',
        items: [
          ['Is the meat halal?', 'Yes, our meat is halal.'],
          ['Reservations, takeaway, groups?', `The easiest way: call us on ${CONFIG.phone.display}.`],
          ['Do you have vegetarian options?', "Yes: several man'ouches (za'atar, cheese, labneh, mouhammara…), the mini cheese and mini spinach, the halloumi pesto wrap and the knefeh. For allergens, please ask the team."],
        ],
      },
    },
  },

  es: {
    dir: 'ltr', name: 'Español', locale: 'es-ES',
    days: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'],
    daysShort: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    meta: {
      home: ["ZA'ATAR — Panadería libanesa en Lille · Man'ouches, fatayers, wraps",
        "ZA'ATAR, el furn libanés de la Rue des Postes en Lille: man'ouches, fatayers, wraps y knefeh al horno. De martes a domingo."],
      carte: ["La Carta — ZA'ATAR, panadería libanesa en Lille",
        "Man'ouches, fatayers y buñuelos, wraps, pizzas, postres y bebidas: la carta de ZA'ATAR, 139 Rue des Postes, Lille."],
      infos: ["Información — ZA'ATAR, 139 Rue des Postes, Lille",
        "Dirección, horarios, teléfono y preguntas frecuentes: todo para visitar ZA'ATAR, panadería libanesa en Lille."],
    },
    a11y: {
      skip: 'Ir al contenido', nav: 'Navegación principal', lang: 'Idioma', menuOpen: 'Abrir el menú',
      menuClose: 'Cerrar el menú', close: 'Cerrar', prev: 'Foto anterior', next: 'Foto siguiente',
      pause: 'Pausa', play: 'Reproducir', mapTitle: "Mapa: ZA'ATAR, 139 Rue des Postes, Lille",
      newTab: '(pestaña nueva)', home: "ZA'ATAR, inicio", photo: 'Ver la foto',
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
    ticker: ["ZA'ATAR", 'Panadería libanesa', 'Al horno', 'Hecho a mano', 'Lille', '10:00–15:00 · 18:00–20:30'],
    actions: { call: 'Llamar', route: 'Cómo llegar', menu: 'La carta' },
    hoursSentence: (D, f, to, slots, closed) => (closed
      ? (f === to ? `Cerrado el ${D[f]}` : `Cerrado de ${D[f]} a ${D[to]}`)
      : `${f === to ? `El ${D[f]}` : `De ${D[f]} a ${D[to]}`}: ${slots}`),
    common: {
      directions: 'Cómo llegar', seeMenu: 'Ver toda la carta', discover: 'Descubrir',
      review: 'Dejar una reseña en Google', profile: 'Ver la ficha de Google', delivery: 'Entrega', address: 'Dirección', hours: 'Horario',
      phone: 'Teléfono', instagram: 'Instagram', closed: 'Cerrado', today: 'Hoy', sample: 'Reseña de ejemplo',
      veg: 'Vegetariano', and: 'y', rating: (v, n) => `${v}/5 · ${n} reseñas de Google`, ratingLine: (v, n) => `${v}/5 en ${n} reseñas de Google`,
    },
    footer: {
      signed: `Firmado por el chef ${chef.name}, también en ${chef.otherHouse} (Lille)`,
      follow: 'Seguir', rights: `© ${CONFIG.year} ZA'ATAR · Lille`,
    },
    home: {
      eyebrow: 'Lille',
      lead: 'El horno de Lille',
      ctaMenu: 'Descubrir la carta', ctaFind: 'Encontrarnos',
      maison: {
        eyebrow: 'La casa', title: "Fuego, ZA'ATAR, <em>antojo.</em>",
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
        p: `Detrás del horno, el chef ${chef.name}. Lleva varias casas en Lille, entre ellas ${chef.otherHouse}.\nZA'ATAR es su panadería libanesa en la Rue des Postes.`,
      },
      sig: { eyebrow: 'Los platos estrella', title: 'Tres clásicos, <em>un solo horno.</em>' },
      envies: {
        title: 'Un solo antojo, <em>probarlo todo.</em>',
        lead: 'Salado, dulce, fresco: cada página de la carta es una buena razón para ceder.',
      },
      reviews: { eyebrow: 'Reseñas de Google', title: 'Habláis <em>de nosotros.</em>' },
      find: { eyebrow: 'Encontrarnos', title: 'Rue des Postes, <em>en Lille.</em>' },
    },
    carte: {
      title: 'La Carta', script: 'Tout sort du four',
      filters: 'Filtrar la carta', categories: 'Categorías', all: 'Todo',
      search: 'Buscar un plato', searchPh: 'espinacas, halloumi, jebné…', clear: 'Borrar la búsqueda',
      count: (n) => (n === 0 ? 'Ningún plato' : n === 1 ? '1 plato' : `${n} platos`),
      empty: 'Nada sale del horno con estos filtros.', emptyHint: 'Prueba otra palabra o empieza de nuevo.',
      reset: 'Restablecer todo', note: 'Alérgenos e ingredientes: pregunta al equipo. Servicio incluido.',
      vegTag: 'Vegetariano', photoOf: (n) => `Foto: ${n}`,
    },
    infos: {
      title: 'Dirección <em>y acceso.</em>',
      weekTitle: 'Horario de la semana',
      gallery: {
        eyebrow: 'Instagram', title: 'El horno <em>en imágenes.</em>',
        lead: 'Las hornadas, las novedades, la carta en stories: todo pasa por Instagram.',
        follow: 'Seguir en Instagram',
      },
      faq: {
        eyebrow: 'FAQ', title: 'Preguntas <em>frecuentes.</em>',
        items: [
          ['¿La carne es halal?', 'Sí, nuestra carne es halal.'],
          ['¿Reservas, para llevar, grupos?', `Lo más fácil: llámanos al ${CONFIG.phone.display}.`],
          ['¿Tenéis opciones vegetarianas?', "Sí: varias man'ouches (za'atar, queso, labneh, mouhammara…), los mini de queso y de espinacas, el wrap halloumi pesto y el knefeh. Para los alérgenos, pregunta al equipo."],
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
