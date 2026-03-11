// ─────────────────────────────────────────
// HELPER
// ─────────────────────────────────────────
export const t = (obj, lang) => {
  if (obj && typeof obj === 'object' && !Array.isArray(obj) && ('fr' in obj || 'en' in obj)) {
    return obj[lang] || obj.fr
  }
  return obj
}

// ─────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────
export const NAV_LINKS = {
  fr: [
    { id: 'home',      label: 'Accueil' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'services',  label: 'Services' },
    { id: 'shop',      label: 'Boutique' },
    { id: 'about',     label: 'À propos' },
    { id: 'contact',   label: 'Contact' },
  ],
  en: [
    { id: 'home',      label: 'Home' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'services',  label: 'Services' },
    { id: 'shop',      label: 'Shop' },
    { id: 'about',     label: 'About' },
    { id: 'contact',   label: 'Contact' },
  ],
}

// ─────────────────────────────────────────
// HERO SLIDES
// ─────────────────────────────────────────
export const HERO_SLIDES = [
  { src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1800&q=90', label: { fr: 'Cinématique', en: 'Cinematic' } },
  { src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1800&q=90', label: { fr: 'Rolling Shot', en: 'Rolling Shot' } },
  { src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1800&q=90', label: { fr: 'Supercars', en: 'Supercars' } },
  { src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1800&q=90', label: { fr: 'Dynamique', en: 'Dynamic' } },
  { src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1800&q=90', label: { fr: 'Nocturne', en: 'Night' } },
]

// ─────────────────────────────────────────
// PORTFOLIO
// ─────────────────────────────────────────
// type: 'photo' | 'video'
// src : chemin vers le fichier dans public/media/portfolio/
//       → pour le moment les unsplash sont gardés comme placeholders
//       → remplace par ex. '/media/portfolio/aventador-sunset.jpg' ou '/media/portfolio/aventador-sunset.mp4'
export const PORTFOLIO_ITEMS = [
  { id: 1,  type: 'photo', src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=85',  cat: { fr: 'Cinématique', en: 'Cinematic' },  title: 'Aventador Sunset',   tall: false },
  { id: 2,  type: 'video', src: '/media/portfolio/porsche-pursuit.mp4',  cat: { fr: 'Rolling Shot', en: 'Rolling Shot' },  title: 'Porsche Pursuit',    tall: true  },
  { id: 3,  type: 'photo', src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=85',  cat: { fr: 'Dynamique', en: 'Dynamic' },  title: 'Red Fury',           tall: false },
  { id: 4,  type: 'photo', src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=85',  cat: { fr: 'Supercars', en: 'Supercars' },     title: 'Shadow Class',       tall: false },
  { id: 5,  type: 'video', src: '/media/portfolio/midnight-run.mp4',     cat: { fr: 'Nocturne', en: 'Night' },     title: 'Midnight Run',       tall: false },
  { id: 6,  type: 'photo', src: 'https://images.unsplash.com/photo-1525609004556-c46c6c5104b8?w=800&q=85',  cat: { fr: 'Cinématique', en: 'Cinematic' },  title: 'Ferrari Dreams',     tall: true  },
  { id: 7,  type: 'video', src: '/media/portfolio/m4-smoke.mp4',         cat: { fr: 'Drift', en: 'Drift' },         title: 'M4 Smoke',           tall: false },
  { id: 8,  type: 'photo', src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=85',   cat: { fr: 'Rolling Shot', en: 'Rolling Shot' },  title: 'Highway Flow',       tall: false },
  { id: 9,  type: 'photo', src: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=800&q=85',   cat: { fr: 'Dynamique', en: 'Dynamic' },  title: 'Mustang Spirit',     tall: true  },
  { id: 10, type: 'photo', src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=85',   cat: { fr: 'Supercars', en: 'Supercars' },     title: 'Rosso Corsa',        tall: false },
  { id: 11, type: 'video', src: '/media/portfolio/blue-hour.mp4',        cat: { fr: 'Nocturne', en: 'Night' },     title: 'Blue Hour',          tall: false },
  { id: 12, type: 'photo', src: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=85',   cat: { fr: 'Événement', en: 'Event' },    title: 'Track Day',          tall: false },
  { id: 13, type: 'photo', src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=85',      cat: { fr: 'Nocturne', en: 'Night' },     title: 'GT-R After Dark',    tall: false },
  { id: 14, type: 'video', src: '/media/portfolio/lateral-force.mp4',    cat: { fr: 'Drift', en: 'Drift' },         title: 'Lateral Force',      tall: true  },
  { id: 15, type: 'photo', src: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=85',   cat: { fr: 'Cinématique', en: 'Cinematic' },  title: 'Dark Horse',     tall: false },
  { id: 16, type: 'photo', src: 'https://images.unsplash.com/photo-1514316703755-dca7d7d9d882?w=800&q=85',   cat: { fr: 'Événement', en: 'Event' },    title: 'Light Trails',       tall: false },
]

export const PORTFOLIO_CATS = {
  fr: ['Tout', 'Cinématique', 'Rolling Shot', 'Dynamique', 'Drift', 'Supercars', 'Nocturne', 'Événement'],
  en: ['All', 'Cinematic', 'Rolling Shot', 'Dynamic', 'Drift', 'Supercars', 'Night', 'Event'],
}

// ─────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────
export const SERVICES = [
  {
    num: '01',
    title: { fr: 'Shooting Dynamique', en: 'Dynamic Shooting' },
    sub: { fr: 'Rolling shots & tracking', en: 'Rolling shots & tracking' },
    desc: {
      fr: "Captation en mouvement de votre véhicule sous tous les angles. Rolling shots, tracking, rig shots — chaque plan est pensé pour sublimer la ligne et la puissance de votre voiture.",
      en: "Dynamic vehicle footage from every angle. Rolling shots, tracking, rig shots — each frame is crafted to highlight the lines and power of your car.",
    },
    price: { fr: 'Dès 200 €', en: 'From €200' },
    items: {
      fr: ["Demi-journée de tournage", "10-15 plans livrés montées", "Étalonnage cinématique", "Livraison sous 4 jours"],
      en: ["Half-day shoot", "10–15 delivered and full edited shots", "Cinematic color grading", "Delivery within 4 days"],
    },
  },
  {
    num: '02',
    title: { fr: 'Clip Cinématique', en: 'Cinematic Film' },
    sub: { fr: 'Court-métrage automobile', en: 'Automotive short film' },
    desc: {
      fr: "Un film complet dédié à votre voiture. Scénario, repérage, tournage multi-caméra et post-production soignée. Le résultat : un clip cinématique qui raconte une histoire.",
      en: "A full film dedicated to your car. Script, location scouting, multi-camera shoot and polished post-production. The result: a cinematic clip that tells a story.",
    },
    price: { fr: 'Dès 500 €', en: 'From €500' },
    items: {
      fr: ["Journée complète de tournage", "Scénario & storyboard", "Montage + sound design", "Version longue + version réseaux"],
      en: ["Full-day shoot", "Script & storyboard", "Editing + sound design", "Long version + social cut"],
    },
  },
  {
    num: '03',
    title: { fr: 'Contenu Réseaux', en: 'Social Content' },
    sub: { fr: 'Reels, TikTok & Shorts', en: 'Reels, TikTok & Shorts' },
    desc: {
      fr: "Contenu court et percutant optimisé pour les réseaux sociaux. Format vertical, transitions dynamiques, montage rythmé (speedramps), conçu pour performer et faire réagir.",
      en: "Short, punchy content optimized for social media. Vertical format, dynamic transitions, rhythmic editing (speedramps), designed to perform and drive engagement.",
    },
    price: { fr: 'Dès 350 €', en: 'From €350' },
    items: {
      fr: ["environs 10 à 20 secondes", "Format vertical 9:16", "effets sonores & visuels", "Livraison sous 5 jours"],
      en: ["around 10 to 20 secondes", "Vertical format 9:16", "sound effects & visuals", "Delivery within 5 days"],
    },
  },
  {
    num: '04',
    title: { fr: 'Événement Auto', en: 'Car Event' },
    sub: { fr: 'Meets, salons & courses', en: 'Meets, shows & races' },
    desc: {
      fr: "Couverture vidéo complète de vos événements automobiles. Car meets, rassemblements, courses, salons, je capture l'énergie et l'ambiance de votre événement.",
      en: "Full video coverage of your automotive events. Car meets, gatherings, races, shows, I capture the energy and atmosphere of your event.",
    },
    price: { fr: 'Dès 400 €', en: 'From €400' },
    items: {
      fr: ["Journée de couverture", "Aftermovie complet", "Highlights réseaux sociaux", "Photos bonus incluses"],
      en: ["Full-day coverage", "Complete aftermovie", "Social media highlights", "Bonus photos included"],
    },
  },
  {
    num: '05',
    title: { fr: 'Brand Content', en: 'Brand Content' },
    sub: { fr: 'Contenu pour marques & concessionnaires', en: 'Content for brands & dealers' },
    desc: {
      fr: "Production vidéo professionnelle pour les marques automobiles, concessionnaires et préparateurs. Du brief créatif à la livraison finale, un contenu premium aligné avec votre image.",
      en: "Professional video production for automotive brands, dealerships and tuners. From creative brief to final delivery, premium content aligned with your image.",
    },
    price: { fr: 'Sur devis', en: 'Custom quote' },
    items: {
      fr: ["Brief & direction artistique", "Tournage multi-jours possible", "Droits commerciaux inclus", "Déclinaisons multi-formats"],
      en: ["Brief & art direction", "Multi-day shoots available", "Commercial rights included", "Multi-format versions"],
    },
  },
]

export const PROCESS_STEPS = {
  fr: [
    { num: '01', title: 'Contact',    desc: 'Décrivez-moi votre projet et votre véhicule.' },
    { num: '02', title: 'Échange',    desc: 'On définit le style, les lieux et le planning.' },
    { num: '03', title: 'Tournage',   desc: 'Je filme.' },
    { num: '04', title: 'Livraison',  desc: 'Votre vidéo montée, étalonnée, livrée.' },
  ],
  en: [
    { num: '01', title: 'Contact',    desc: 'Tell me about your project and vehicle.' },
    { num: '02', title: 'Discussion', desc: 'We define the style, locations and schedule.' },
    { num: '03', title: 'Shooting',   desc: 'I film.' },
    { num: '04', title: 'Delivery',   desc: 'Your video edited, graded, delivered.' },
  ],
}

export const FAQ = {
  fr: [
    { q: 'Où se déroulent les tournages ?',             a: "Partout en Normandie, en France. Je me déplace là où votre projet l'exige. Des frais peuvent augmenter selon la distance." },
    { q: 'Combien de temps pour recevoir ma vidéo ?',    a: "4 à 7 jours ouvrés selon la complexité." },
    { q: 'Puis-je choisir la musique ?',                 a: "Oui, vous pouvez proposer des morceaux (libre de droit :))." },
    { q: 'Comment réserver un tournage ?',               a: "Remplissez le formulaire de contact ou envoyez-moi un DM sur Instagram." },
  ],
  en: [
    { q: 'Where do shoots take place?',                  a: 'Anywhere in en Normandie, France. I travel to wherever your project requires it. Fees may increase depending on the distance.' },
    { q: 'How long to receive my video?',                a: '4 to 7 business days depending on complexity.' },
    { q: 'Can I choose the music?',                      a: 'Yes, you can suggest tracks (free-usage :)).' },
    { q: 'How do I book a shoot?',                       a: 'Fill in the contact form or send me a DM on Instagram.' },
  ],
}

// ─────────────────────────────────────────
// SHOP PRODUCTS
// ─────────────────────────────────────────
export const PRODUCTS = [
  {
    id: 1, price: 39,
    img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80',
    title: { fr: 'Cinematic Car LUTs', en: 'Cinematic Car LUTs' },
    sub: { fr: '12 LUTs pour DaVinci / Premiere', en: '12 LUTs for DaVinci / Premiere' },
    badge: 'Best-seller',
    desc: { fr: 'Tons cinématiques chauds et contrastés. Parfait pour sublimer vos vidéos automobiles.', en: 'Warm cinematic tones with contrast. Perfect to elevate your automotive videos.' },
    filter: 'LUTs',
    file: '/downloads/cinematic-car-luts.zip',
    features: {
      fr: ['12 fichiers .cube compatibles', 'DaVinci Resolve & Premiere Pro', 'Guide d\'installation PDF', 'Avant / Après inclus'],
      en: ['12 compatible .cube files', 'DaVinci Resolve & Premiere Pro', 'PDF installation guide', 'Before / After included'],
    },
  },
  {
    id: 2, price: 34,
    img: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80',
    title: { fr: 'Moody Night LUTs', en: 'Moody Night LUTs' },
    sub: { fr: '10 LUTs ambiance nocturne', en: '10 Night mood LUTs' },
    badge: { fr: 'Nouveau', en: 'New' },
    desc: { fr: 'Contrastes profonds et tons froids. Idéal pour les shoots de nuit et ambiances sombres.', en: 'Deep contrasts and cold tones. Ideal for night shoots and dark mood.' },
    filter: 'LUTs',
    file: '/downloads/moody-night-luts.zip',
    features: {
      fr: ['10 fichiers .cube', 'Optimisé pour les scènes nocturnes', 'Compatible DaVinci & Premiere', 'Licence usage commercial'],
      en: ['10 .cube files', 'Optimized for night scenes', 'Compatible DaVinci & Premiere', 'Commercial use license'],
    },
  },
  {
    id: 3, price: 24,
    img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80',
    title: { fr: 'Pack Transitions', en: 'Transitions Pack' },
    sub: { fr: '25 transitions Premiere Pro', en: '25 Premiere Pro transitions' },
    badge: null,
    desc: { fr: 'Transitions fluides et dynamiques pour donner du rythme à vos montages auto.', en: 'Smooth, dynamic transitions to give rhythm to your automotive edits.' },
    filter: { fr: 'Transitions', en: 'Transitions' },
    file: '/downloads/pack-transitions.zip',
    features: {
      fr: ['25 transitions uniques', 'Glitch, Zoom, Whip, Flash', 'Fichiers .mogrt Premiere Pro', 'Tutoriel vidéo inclus'],
      en: ['25 unique transitions', 'Glitch, Zoom, Whip, Flash', '.mogrt files for Premiere Pro', 'Video tutorial included'],
    },
  },
  {
    id: 4, price: 44,
    img: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&q=80',
    title: { fr: 'Sound Design Pack', en: 'Sound Design Pack' },
    sub: { fr: '50+ effets sonores auto', en: '50+ automotive SFX' },
    badge: null,
    desc: { fr: "Bruits moteur, whooshes, impacts et ambiances. Tout pour un sound design automobile pro.", en: "Engine sounds, whooshes, impacts and atmospheres. Everything for pro automotive sound design." },
    filter: 'SFX',
    file: '/downloads/sound-design-pack.zip',
    features: {
      fr: ['50+ fichiers WAV haute qualité', 'Moteurs, whooshes, impacts', 'Ambiances circuit & garage', 'Licence libre de droits'],
      en: ['50+ high quality WAV files', 'Engines, whooshes, impacts', 'Track & garage atmospheres', 'Royalty-free license'],
    },
  },
  {
    id: 5, price: 99,
    img: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80',
    title: { fr: 'Collection Complète', en: 'Complete Collection' },
    sub: { fr: 'Tous les packs réunis', en: 'All packs combined' },
    badge: { fr: 'Économie', en: 'Save' },
    desc: { fr: "L'intégralité de la bibliothèque : LUTs, transitions, SFX. Le kit ultime.", en: "The entire library: LUTs, transitions, SFX. The ultimate kit." },
    filter: 'Collection',
    file: '/downloads/collection-complete.zip',
    features: {
      fr: ['22 LUTs cinématiques', '25 transitions Premiere', '50+ effets sonores', 'Économisez 42 € vs achat séparé', 'Mises à jour à vie'],
      en: ['22 cinematic LUTs', '25 Premiere transitions', '50+ sound effects', 'Save €42 vs separate purchase', 'Lifetime updates'],
    },
  },
  {
    id: 6, price: 120,
    img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80',
    title: { fr: 'Mentorat Individuel 1h', en: 'Individual Mentoring 1h' },
    sub: { fr: 'Session vidéo personnalisée', en: 'Personalized video session' },
    badge: { fr: 'Places limitées', en: 'Limited spots' },
    desc: { fr: "Retour sur votre travail, conseils techniques de tournage et montage, Q&A en direct.", en: "Feedback on your work, shooting and editing tips, live Q&A." },
    filter: { fr: 'Mentorat', en: 'Mentoring' },
    file: '/downloads/mentorat-confirmation.zip',
    features: {
      fr: ['1h de visio en direct', 'Retour personnalisé sur votre travail', 'Conseils tournage & montage', 'Replay de la session inclus'],
      en: ['1h live video call', 'Personalized feedback on your work', 'Shooting & editing tips', 'Session replay included'],
    },
  },
]

export const SHOP_FILTERS = {
  fr: ['Tout', 'LUTs', 'Transitions', 'SFX', 'Collection', 'Mentorat'],
  en: ['All', 'LUTs', 'Transitions', 'SFX', 'Collection', 'Mentoring'],
}

// ─────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────
export const TESTIMONIALS = {
/*  fr: [
    {
      name: 'Julien R.', role: 'Propriétaire BMW M4',
      text: "Physic a capturé ma voiture comme personne. Le résultat est digne d'une pub officielle. Je recommande à 100 %.",
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    },
    {
      name: 'Cars & Coffee Lyon', role: 'Événement mensuel',
      text: "On fait appel à Khylian pour chaque édition. Ses aftermovies font exploser notre communauté en ligne.",
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    },
    {
      name: 'Garage Performance 31', role: 'Préparateur auto',
      text: "Un œil créatif rare et une maîtrise technique bluffante. Nos clients adorent les vidéos de leurs projets.",
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    },
  ],
  en: [
    {
      name: 'Julien R.', role: 'BMW M4 Owner',
      text: "Physic captured my car like no one else. The result looks like an official commercial. 100% recommended.",
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    },
    {
      name: 'Cars & Coffee Lyon', role: 'Monthly event',
      text: "We hire Khylian for every edition. His aftermovies blow up our online community.",
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    },
    {
      name: 'Garage Performance 31', role: 'Car tuning shop',
      text: "A rare creative eye and stunning technical expertise. Our clients love the videos of their builds.",
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    },
  ],*/
}


// ─────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────
export const TIMELINE = {
  fr: [
    { year: '2019', event: 'Premières vidéos de voitures sur Instagram.' },
    { year: '2020', event: 'Achat du premier setup pro, formation autodidacte.' },
    { year: '2021', event: 'Première collaboration avec un préparateur auto.' },
    { year: '2022', event: 'Couverture de car meets et événements régionaux.' },
    { year: '2023', event: 'Lancement de la boutique de LUTs et presets.' },
    { year: '2024', event: '+200 vidéos produites, collaborations nationales.' },
  ],
  en: [
    { year: '2019', event: 'First car videos on Instagram.' },
    { year: '2020', event: 'First pro setup, self-taught training.' },
    { year: '2021', event: 'First collaboration with a car tuner.' },
    { year: '2022', event: 'Coverage of car meets and regional events.' },
    { year: '2023', event: 'Launch of LUTs and presets shop.' },
    { year: '2024', event: '200+ videos produced, national collaborations.' },
  ],
}

export const GEAR = {
  fr: [
    { cat: 'Caméras',    items: ['Osmo pocket 3'] },
    { cat: 'Rig',    items: ['Osmo pocket 3'] },
    { cat: 'Post-prod.',  items: ['DaVinci Resolve', 'Adobe Premiere', 'After Effects'] },
  ],
  en: [
    { cat: 'Cameras',       items: ['Sony A7S III', 'Sony FX3'] },
    { cat: 'Lenses',        items: ['24mm f/1.4 GM', '35mm f/1.4 GM', '85mm f/1.4 GM'] },
    { cat: 'Stabilization', items: ['DJI RS 3 Pro', 'DJI Mavic 3 Pro'] },
    { cat: 'Post-prod.',    items: ['DaVinci Resolve', 'Adobe Premiere', 'After Effects'] },
  ],
}

// ─────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────
export const CONTACT_INFO = {
  fr: [
    { label: 'Email',        value: 'contact@physic-vfx.com' },
    { label: 'Instagram',    value: '@physic.vfx' },
    { label: 'Localisation', value: 'France' },
    { label: 'TikTok',       value: '@physic.vfx' },
  ],
  en: [
    { label: 'Email',    value: 'contact@physic-vfx.com' },
    { label: 'Instagram', value: '@physic.vfx' },
    { label: 'Location', value: 'France' },
    { label: 'TikTok',   value: '@physic.vfx' },
  ],
}

export const BUDGETS = {
  fr: ['Moins de 300 €', '300 – 600 €', '600 – 1 200 €', '1 200 – 2 000 €', 'Plus de 2 000 €', 'À définir'],
  en: ['Under €300', '€300 – €600', '€600 – €1,200', '€1,200 – €2,000', 'Over €2,000', 'To be defined'],
}

export const PRESTATIONS = {
  fr: ['Shooting Dynamique', 'Clip Cinématique', 'Contenu Réseaux', 'Événement Auto', 'Brand Content', 'Vidéo Drone', 'Autre'],
  en: ['Dynamic Shooting', 'Cinematic Film', 'Social Content', 'Car Event', 'Brand Content', 'Drone Footage', 'Other'],
}

// ─────────────────────────────────────────
// UI STRINGS (misc)
// ─────────────────────────────────────────
export const UI = {
  fr: {
    heroSub: 'Vidéaste automobile · VFX · France',
    heroTagline: "Je filme l'adrénaline. L'émotion brute.",
    heroCtaPortfolio: 'Voir le portfolio',
    heroCtaContact: 'Me contacter',
    introLabel: 'Vidéaste automobile',
    introTitle1: 'La vidéo qui',
    introTitle2: "parle d'elle-même",
    introP1: "Je suis Khylian, alias Physic. Vidéaste automobile basé en France, je capture la puissance, les lignes et l'émotion de chaque véhicule avec un regard cinématique unique.",
    introP2: "Chaque voiture a une histoire. Chaque vidéo, une promesse de la raconter.",
    introBtn: 'En savoir plus',
    recentLabel: 'Travaux récents',
    recentTitle: 'Portfolio —',
    recentTitleEm: 'sélection',
    recentBtn: 'Voir tout →',
    statsYears: "Ans d'expérience",
    statsProjects: 'Projets réalisés',
    statsBrands: 'Marques partenaires',
    statsCountries: 'Villes couvertes',
    svcLabel: 'Ce que je propose',
    svcTitle: 'Mes',
    svcTitleEm: 'services',
    svcBtn: 'Tout voir →',
    testimonialsLabel: 'Témoignages',
    testimonialsTitle: "Ce qu'ils",
    testimonialsTitleEm: 'disent',
    quote: '"Filmer une voiture, c\'est capturer un rêve en mouvement."',
    quoteAuthor: '— Physic',
    ctaLabel: 'Prêt à créer ensemble ?',
    ctaTitle: 'Votre prochain projet',
    ctaTitleEm: 'commence ici',
    ctaBtn: 'Prendre contact',
    bookService: 'Réserver ce service',
    processLabel: 'Comment ça marche',
    processTitle: 'Mon',
    processTitleEm: 'processus',
    faqLabel: 'Questions fréquentes',
    ctaServicesTitle: 'Réservez votre',
    ctaServicesTitleEm: 'tournage',
    ctaServicesBtn: 'Prendre contact',
    aboutHeroLabel: 'Mon histoire',
    aboutHeroTitle1: 'À propos',
    aboutHeroTitle2: 'de Physic',
    aboutWhoLabel: 'Qui je suis',
    aboutWhoTitle1: "L'œil derrière",
    aboutWhoTitle2: 'la caméra',
    aboutP1: "Tout a commencé avec une GoPro scotchée sur le capot et l'envie de capturer la vitesse. Depuis, la vidéo automobile est devenue bien plus qu'une passion : c'est mon langage.",
    aboutP2: "Autodidacte passionné, j'ai développé un style cinématique et dynamique. Je cherche à capturer ce qui rend chaque voiture unique — sa personnalité, son caractère, son âme.",
    aboutP3: "Que ce soit un car meet underground ou une collaboration avec une marque, j'apporte la même énergie et la même exigence à chaque projet.",
    aboutBtn: 'Travaillons ensemble',
    aboutValuesLabel: 'Ce qui me guide',
    aboutValuesTitle: 'Mes',
    aboutValuesTitleEm: 'valeurs',
    aboutValues: [
      { title: 'Passion', desc: "Chaque projet est porté par une passion brute pour l'automobile." },
      { title: 'Créativité', desc: "Repousser les limites visuelles, trouver l'angle que personne n'a vu." },
      { title: 'Excellence', desc: "Chaque frame livrée est le reflet d'une exigence absolue." },
    ],
    aboutTimelineLabel: 'Mon parcours',
    aboutGearLabel: 'Mon équipement',
    aboutGearTitle: 'Mes',
    aboutGearTitleEm: 'outils',
    portfolioLabel: 'Galerie complète',
    portfolioTitle1: 'Mon',
    portfolioTitle2: 'portfolio',
    shopLabel: 'Ressources créatives',
    shopTitle1: 'La',
    shopTitle2: 'boutique',
    cartTitle: 'Panier',
    cartEmpty: 'Votre panier est vide.',
    cartTotal: 'Total',
    cartOrder: 'Commander',
    addToCart: '+ Ajouter',
    addedToast: '✓ Ajouté —',
    guarantees: [
      { icon: '↺', title: 'Satisfait ou remboursé', desc: '30 jours, sans questions.' },
      { icon: '⇩', title: 'Téléchargement immédiat', desc: 'Accès après paiement.' },
      { icon: '∞', title: 'Mises à jour incluses', desc: 'Toutes les futures versions.' },
    ],
    contactHeroLabel: 'Parlons de votre projet',
    contactHeroTitle1: 'Contactez',
    contactHeroTitle2: '-moi',
    contactInfoLabel: 'Informations',
    contactAvailLabel: 'Disponibilités',
    contactAvailText: 'Réponse sous 24–48h.',
    contactSocialLabel: 'Réseaux sociaux',
    contactFormLabel: 'Formulaire de contact',
    contactFirstname: 'Prénom',
    contactLastname: 'Nom',
    contactEmail: 'Email',
    contactPhone: 'Téléphone',
    contactDate: 'Date souhaitée',
    contactService: 'Type de prestation',
    contactBudget: 'Budget approximatif',
    contactMessage: 'Message',
    contactPlaceholderMsg: "Décrivez votre projet, le véhicule, le style souhaité...",
    contactChoose: 'Choisir...',
    contactRequired: '* Champs obligatoires',
    contactSubmit: 'Envoyer le message',
    contactSentTitle: 'Message envoyé',
    contactSentText: 'Je vous répondrai dans les 24–48h.',
    contactLocationLabel: 'Localisation',
    contactLocation: 'France',
    contactLocationSub: 'Disponible pour déplacements en Europe',
    footerDesc: 'Vidéaste automobile basé en France, disponible partout en Europe.',
    footerCopyright: '© 2024 Physic.VFX · Tous droits réservés',
    footerLegal: 'Mentions légales · Confidentialité',
    footerNav: 'Navigation',
    footerServices: 'Services',
    footerContact: 'Contact',
  },
  en: {
    heroSub: 'Automotive videographer · VFX · France',
    heroTagline: 'I film the adrenaline. The raw emotion.',
    heroCtaPortfolio: 'View portfolio',
    heroCtaContact: 'Contact me',
    introLabel: 'Automotive videographer',
    introTitle1: 'The video that',
    introTitle2: 'speaks for itself',
    introP1: "I'm Khylian, aka Physic. Automotive videographer based in France, I capture the power, lines and emotion of every vehicle with a unique cinematic eye.",
    introP2: 'Every car has a story. Every video, a promise to tell it.',
    introBtn: 'Learn more',
    recentLabel: 'Recent work',
    recentTitle: 'Portfolio —',
    recentTitleEm: 'selection',
    recentBtn: 'See all →',
    statsYears: 'Years of experience',
    statsProjects: 'Projects completed',
    statsBrands: 'Brand partners',
    statsCountries: 'Cities covered',
    svcLabel: 'What I offer',
    svcTitle: 'My',
    svcTitleEm: 'services',
    svcBtn: 'See all →',
    testimonialsLabel: 'Testimonials',
    testimonialsTitle: 'What they',
    testimonialsTitleEm: 'say',
    quote: '"Filming a car is capturing a dream in motion."',
    quoteAuthor: '— Physic',
    ctaLabel: 'Ready to create together?',
    ctaTitle: 'Your next project',
    ctaTitleEm: 'starts here',
    ctaBtn: 'Get in touch',
    bookService: 'Book this service',
    processLabel: 'How it works',
    processTitle: 'My',
    processTitleEm: 'process',
    faqLabel: 'Frequently asked questions',
    ctaServicesTitle: 'Book your',
    ctaServicesTitleEm: 'shoot',
    ctaServicesBtn: 'Get in touch',
    aboutHeroLabel: 'My story',
    aboutHeroTitle1: 'About',
    aboutHeroTitle2: 'Physic',
    aboutWhoLabel: 'Who I am',
    aboutWhoTitle1: 'The eye behind',
    aboutWhoTitle2: 'the camera',
    aboutP1: "It all started with a GoPro taped to a hood and the urge to capture speed. Since then, automotive video has become much more than a passion: it's my language.",
    aboutP2: "A passionate self-taught creator, I developed a cinematic and dynamic style. I seek to capture what makes each car unique — its personality, character, soul.",
    aboutP3: "Whether it's an underground car meet or a brand collaboration, I bring the same energy and standards to every project.",
    aboutBtn: "Let's work together",
    aboutValuesLabel: 'What guides me',
    aboutValuesTitle: 'My',
    aboutValuesTitleEm: 'values',
    aboutValues: [
      { title: 'Passion', desc: 'Every project is driven by a raw passion for cars.' },
      { title: 'Creativity', desc: "Pushing visual boundaries, finding the angle no one has seen." },
      { title: 'Excellence', desc: 'Every delivered frame reflects absolute standards.' },
    ],
    aboutTimelineLabel: 'My journey',
    aboutGearLabel: 'My equipment',
    aboutGearTitle: 'My',
    aboutGearTitleEm: 'tools',
    portfolioLabel: 'Full gallery',
    portfolioTitle1: 'My',
    portfolioTitle2: 'portfolio',
    shopLabel: 'Creative resources',
    shopTitle1: 'The',
    shopTitle2: 'shop',
    cartTitle: 'Cart',
    cartEmpty: 'Your cart is empty.',
    cartTotal: 'Total',
    cartOrder: 'Checkout',
    addToCart: '+ Add',
    addedToast: '✓ Added —',
    guarantees: [
      { icon: '↺', title: 'Money-back guarantee', desc: '30 days, no questions asked.' },
      { icon: '⇩', title: 'Instant download', desc: 'Access after payment.' },
      { icon: '∞', title: 'Free updates', desc: 'All future versions included.' },
    ],
    contactHeroLabel: "Let's discuss your project",
    contactHeroTitle1: 'Contact',
    contactHeroTitle2: 'me',
    contactInfoLabel: 'Information',
    contactAvailLabel: 'Availability',
    contactAvailText: 'Response within 24–48h.',
    contactSocialLabel: 'Social media',
    contactFormLabel: 'Contact form',
    contactFirstname: 'First name',
    contactLastname: 'Last name',
    contactEmail: 'Email',
    contactPhone: 'Phone',
    contactDate: 'Preferred date',
    contactService: 'Service type',
    contactBudget: 'Approximate budget',
    contactMessage: 'Message',
    contactPlaceholderMsg: 'Describe your project, vehicle, desired style...',
    contactChoose: 'Choose...',
    contactRequired: '* Required fields',
    contactSubmit: 'Send message',
    contactSentTitle: 'Message sent',
    contactSentText: "I'll get back to you within 24–48h.",
    contactLocationLabel: 'Location',
    contactLocation: 'France',
    contactLocationSub: 'Available for travel across Europe',
    footerDesc: 'Automotive videographer based in France, available across Europe.',
    footerCopyright: '© 2024 Physic.VFX · All rights reserved',
    footerLegal: 'Legal notice · Privacy',
    footerNav: 'Navigation',
    footerServices: 'Services',
    footerContact: 'Contact',
  },
}
