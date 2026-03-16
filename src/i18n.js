import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const fr = {
  nav: {
    home: 'Accueil',
    portfolio: 'Portfolio',
    shop: 'Boutique',
    services: 'Services',
    contact: 'Contact',
    tools: 'Outils',
  },
  home: {
    hero_tag: 'Photographe & Vidéaste',
    hero_title: 'Capturer\nl\'instant\nparfait.',
    hero_subtitle: "Vous avez quelque chose d'exceptionnel à montrer mais vous peinez à vous faire remarquer ? Fini les larmes, les maux de tête et la caféine gaspillés à apprendre à filmer et à monter. Je m'en occupe pour vous.",
    hero_cta: 'Voir le portfolio',
    hero_cta2: 'Prendre contact',
    services_title: 'Ce que je crée',
    services_sub: 'Des prestations sur mesure pour chaque projet',
    portfolio_title: 'Travaux récents',
    portfolio_sub: 'Une sélection de projets créatifs',
    portfolio_cta: 'Voir tout le portfolio',
    shop_title: 'Ressources gratuites',
    shop_sub: 'Téléchargez mes packs créatifs',
    shop_cta: 'Voir la boutique',
    stats_projects: 'Vidéos réalisées',
    stats_clients: 'Vues',
    stats_years: 'Années d\'expérience',
    stats_awards: 'Personnes formées',
  },
  portfolio: {
    title: 'Portfolio',
    subtitle: 'L\'ensemble de mes travaux créatifs',
    all: 'Tous',
    photo: 'Photographie',
    video: 'Vidéo',
    brand: 'Branding',
    view_project: 'Voir le projet',
    close: 'Fermer',
  },
  shop: {
    title: 'Boutique',
    subtitle: 'Packs créatifs gratuits à télécharger',
    free: 'Gratuit',
    download: 'Télécharger',
    items: 'ressources',
  },
  services: {
    title: 'Services',
    subtitle: 'Des prestations adaptées à votre vision',
    contact_cta: 'Demander un devis',
    starting: 'À partir de',
  },
  tools: {
    title: 'Mon équipement',
    subtitle: 'Le matériel au service de la créativité',
    cameras: 'Caméras',
    stabilizers: 'Stabilisateurs',
    lighting: 'Éclairage',
    audio: 'Audio',
    software: 'Logiciels',
  },
  contact: {
    title: 'Contact',
    subtitle: 'Parlons de votre projet',
    name: 'Nom complet',
    email: 'Adresse email',
    subject: 'Sujet',
    message: 'Message',
    attachment: 'Pièce jointe',
    attachment_hint: 'PDF, JPG, PNG — max 10MB',
    send: 'Envoyer le message',
    sending: 'Envoi en cours...',
    success: 'Message envoyé ! Je vous répondrai sous 24h.',
    error: 'Une erreur est survenue. Veuillez réessayer.',
    required: 'Ce champ est requis',
    invalid_email: 'Email invalide',
    social_title: 'Retrouvez-moi sur',
    address_title: 'Localisation',
  },
  footer: {
    tagline: 'Photographie & Vidéographie créative.',
    links: 'Navigation',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
    rights: 'Tous droits réservés.',
  },
  music: {
    play: 'Activer la musique',
    pause: 'Mettre en pause',
    title: 'Musique',
    playing: '▶ En cours',
    paused: '⏸ En pause',
    volume: 'Volume',
    tracks: 'Pistes',
    format: '.mp3',
  },
  theme: {
    title: 'Thème',
    subtitle: 'Personnalisez l\'apparence du site',
    language: 'Langue',
    accent: 'Couleur principale',
    detailed: 'Couleurs détaillées',
    light: '☀ Clair',
    dark: '☾ Sombre',
    labelMainAccent: 'Fond principal',
    labelSecondaryAccent: 'Fond secondaire',
    labelCardAccent: 'Fond cartes',
    labelPrimaryText: 'Texte principal',
    labelMutedText: 'Texte discret',
    labelAccent: 'Accent',
    labelAccentText: 'Texte accent',
    labelBorder: 'Bordures',
    reset: 'Réinitialiser',
  },
  lang: {
    fr: 'Français',
    en: 'English',
  },
  privacy: {
    title: 'Politique de confidentialité',
    updated: 'Dernière mise à jour : 15 mars 2026',
    intro: {
      p1: 'Ce site collecte uniquement les données strictement nécessaires à son fonctionnement et au traitement de vos demandes de contact. Aucune donnée n\'est vendue, partagée ou utilisée à des fins commerciales.',
      p2: 'En utilisant ce site, vous acceptez les pratiques décrites ci-dessous, conformément au Règlement Général sur la Protection des Données (RGPD).',
    },
    dataCollection: {
      title: 'Données collectées',
      personalDataTitle: 'Formulaire de contact',
      personalDataDesc: 'Lorsque vous utilisez le formulaire de contact, les informations suivantes sont collectées uniquement pour répondre à votre demande :',
      email: 'Adresse email',
      name: 'Nom et prénom',
      usageDataTitle: 'Données de navigation',
      usageDataDesc: 'Des données techniques peuvent être collectées automatiquement lors de votre visite : adresse IP, type de navigateur, pages consultées et durée de la visite. Ces données sont anonymisées et ne permettent pas de vous identifier personnellement.',
    },
    security: {
      title: 'Sécurité',
      text: 'Des mesures techniques et organisationnelles sont mises en place pour protéger vos données contre tout accès non autorisé, perte ou divulgation. Aucun système de transmission sur internet ne peut cependant garantir une sécurité absolue.',
    },
    children: {
      title: 'Mineurs',
      text: 'Ce site ne s\'adresse pas aux personnes de moins de 16 ans. Aucune donnée concernant des mineurs n\'est collectée intentionnellement.',
    },
    contact: {
      title: 'Vos droits & contact',
      text: 'Conformément au RGPD, vous disposez d\'un droit d\'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits ou pour toute question relative à cette politique, contactez-nous via :',
    },
  },
  legal: {
    title: "Mentions légales",
    updated: "Dernière mise à jour : 15 mars 2026",

    publisher: {
      title: "Éditeur du site",
      name: "Nom : Khylian",
      status: "Statut : indépendant",
      location: "Localisation : France",
      email: "Email : khylian.griffon-nicolas@hotmail.com"
    },

    host: {
      title: "Hébergement",
      name: "Site hébergé sur GitHub Pages",
      company: "GitHub Inc."
    },

    ip: {
      title: "Propriété intellectuelle",
      text: "Le contenu du site incluant textes, images et code appartient à l’auteur. Toute reproduction sans autorisation reste interdite."
    },

    liability: {
      title: "Responsabilité",
      text: "L’éditeur fournit les informations du site à titre informatif. Aucune garantie concernant l’exactitude ou l’exhaustivité."
    },

    contact: {
      title: "Contact",
      text: "Pour toute question concernant le site"
    }
  }
}

const en = {
  nav: {
    home: 'Home',
    portfolio: 'Portfolio',
    shop: 'Shop',
    services: 'Services',
    contact: 'Contact',
    tools: 'Tools',
  },
  home: {
    hero_tag: 'Photographer & Videographer',
    hero_title: 'Capturing\nthe perfect\nmoment.',
    hero_subtitle: 'You have something exceptional to show but struggle to get noticed? Skip the tears, headaches, and caffeine spent learning to shoot and edit. I handle it for you.',
    hero_cta: 'View portfolio',
    hero_cta2: 'Get in touch',
    services_title: 'What I create',
    services_sub: 'Tailor-made services for every project',
    portfolio_title: 'Recent work',
    portfolio_sub: 'A selection of creative projects',
    portfolio_cta: 'View full portfolio',
    shop_title: 'Free resources',
    shop_sub: 'Download my creative packs',
    shop_cta: 'Browse shop',
    stats_projects: 'Videos created',
    stats_clients: 'Views',
    stats_years: 'Years experience',
    stats_awards: 'People trained',
  },
  portfolio: {
    title: 'Portfolio',
    subtitle: 'All my creative work',
    all: 'All',
    photo: 'Photography',
    video: 'Video',
    brand: 'Branding',
    view_project: 'View project',
    close: 'Close',
  },
  shop: {
    title: 'Shop',
    subtitle: 'Free creative packs to download',
    free: 'Free',
    download: 'Download',
    items: 'resources',
  },
  services: {
    title: 'Services',
    subtitle: 'Services tailored to your vision',
    contact_cta: 'Request a quote',
    starting: 'Starting at',
  },
  tools: {
    title: 'My Equipment',
    subtitle: 'Gear in service of creativity',
    cameras: 'Cameras',
    stabilizers: 'Stabilizers',
    lighting: 'Lighting',
    audio: 'Audio',
    software: 'Software',
  },
  contact: {
    title: 'Contact',
    subtitle: 'Let\'s talk about your project',
    name: 'Full name',
    email: 'Email address',
    subject: 'Subject',
    message: 'Message',
    attachment: 'Attachment',
    send: 'Send message',
    sending: 'Sending...',
    success: 'Message sent! I\'ll reply within 24h.',
    error: 'An error occurred. Please try again.',
    required: 'This field is required',
    invalid_email: 'Invalid email',
    social_title: 'Find me on',
    address_title: 'Location',
  },
  footer: {
    tagline: 'Creative Photography & Videography.',
    links: 'Navigation',
    legal: 'Legal',
    privacy: 'Privacy',
    rights: 'All rights reserved.',
  },
  music: {
    play: 'Enable music',
    pause: 'Pause music',
    title: 'Music',
    playing: '▶ Playing',
    paused: '⏸ Paused',
    volume: 'Volume',
    tracks: 'Tracks',
    format: '.mp3',
  },
  theme: {
    title: 'Theme',
    subtitle: 'Customize the site appearance',
    language: 'Language',
    accent: 'Main color',
    detailed: 'Detailed colors',
    light: '☀ Light',
    dark: '☾ Dark',
    labelMainAccent: 'Main background',
    labelSecondaryAccent: 'Secondary background',
    labelCardAccent: 'Cards background',
    labelPrimaryText: 'Primary text',
    labelMutedText: 'Muted text',
    labelAccent: 'Accent color',
    labelAccentText: 'Accent text',
    labelBorder: 'Borders',
    reset: 'Reset',
  },
  lang: {
    fr: 'Français',
    en: 'English',
  },
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated: March 15, 2026',
    intro: {
      p1: 'This website only collects data strictly necessary for its operation and to process your contact requests. No data is sold, shared, or used for commercial purposes.',
      p2: 'By using this website, you agree to the practices described below, in compliance with the General Data Protection Regulation (GDPR).',
    },
    dataCollection: {
      title: 'Data collected',
      personalDataTitle: 'Contact form',
      personalDataDesc: 'When you use the contact form, the following information is collected solely to respond to your request:',
      email: 'Email address',
      name: 'First and last name',
      usageDataTitle: 'Browsing data',
      usageDataDesc: 'Technical data may be collected automatically during your visit: IP address, browser type, pages viewed and visit duration. This data is anonymised and cannot be used to identify you personally.',
    },
    security: {
      title: 'Security',
      text: 'Technical and organisational measures are in place to protect your data against unauthorised access, loss or disclosure. However, no internet transmission system can guarantee absolute security.',
    },
    children: {
      title: 'Minors',
      text: 'This website is not intended for users under the age of 16. No data relating to minors is intentionally collected.',
    },
    contact: {
      title: 'Your rights & contact',
      text: 'Under GDPR, you have the right to access, rectify, delete and port your data. To exercise these rights or for any question regarding this policy, contact us via:',
    },
  },

  legal: {
    title: "Legal Notice",
    updated: "Last updated: March 15, 2026",

    publisher: {
      title: "Site Editor",
      name: "Name: Khylian",
      status: "Status: Independent Developer",
      location: "Location: France",
      email: "Email: khylian.griffon-nicolas@hotmail.com"
    },

    host: {
      title: "Hosting",
      name: "Site hosted on GitHub Pages",
      company: "GitHub Inc."
    },

    ip: {
      title: "Intellectual Property",
      text: "The content of the site including texts, images and code belongs to the author. Any reproduction without authorization remains prohibited."
    },

    liability: {
      title: "Liability",
      text: "The site editor provides the information on the site for informational purposes only. No warranty is given regarding the accuracy or completeness."
    },

    contact: {
      title: "Contact",
      text: "For any questions regarding the site"
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    lng: localStorage.getItem('lang') || 'fr',
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
  })

export default i18n