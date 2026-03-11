# ShotsByHash — Site Portfolio

Site portfolio professionnel pour photographe, construit avec **React + Vite**.

## Stack technique

- **React 18** — UI components
- **Vite 5** — Bundler & dev server
- **CSS pur** — Pas de framework CSS (styles dans `src/styles/global.css`)
- **Google Fonts** — Playfair Display + Jost
- **Images** — Unsplash (à remplacer par vos photos)

## Structure du projet

```
shotsbyhash-site/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx              # Point d'entrée React
    ├── App.jsx               # Router SPA + layout principal
    ├── styles/
    │   └── global.css        # Système de design complet
    ├── data/
    │   └── content.js        # Toutes les données du site
    ├── hooks/
    │   └── useFadeIn.js      # Hook Intersection Observer
    ├── components/
    │   ├── Navbar.jsx        # Navigation + menu overlay
    │   ├── Footer.jsx        # Pied de page
    │   └── Lightbox.jsx      # Visionneuse photo
    └── pages/
        ├── Home.jsx          # Page d'accueil + hero slideshow
        ├── Portfolio.jsx     # Galerie avec filtres
        ├── Services.jsx      # Services + FAQ
        ├── Shop.jsx          # Boutique + panier
        ├── About.jsx         # À propos + timeline
        └── Contact.jsx       # Formulaire de contact
```

## Installation & lancement

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
# → http://localhost:3000

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

## Personnalisation

### Changer le contenu
Tout le texte et les données sont centralisés dans **`src/data/content.js`** :
- Noms, prix, descriptions des services
- Photos du portfolio
- Produits de la boutique
- Informations de contact
- Timeline personnelle

### Remplacer les photos
Les images viennent d'Unsplash. Remplacez les URLs par vos propres photos :
1. Hébergez vos photos (Cloudinary, AWS S3, ou dossier `public/images/`)
2. Mettez à jour les URLs dans `src/data/content.js`

### Couleurs & typographie
Le système de design est dans `src/styles/global.css` :
- Couleurs : variables CSS en haut du fichier
- Typographies : import Google Fonts dans `index.html`

## Pages incluses

| Page | Description |
|------|-------------|
| **Accueil** | Hero slideshow plein écran, intro, galerie sélection, stats, services, témoignages |
| **Portfolio** | Grille 3 colonnes avec filtres par catégorie + lightbox navigable |
| **Services** | Liste accordion avec prix, processus en 4 étapes, FAQ |
| **Boutique** | Grille produits avec filtres, panier latéral, toast notifications |
| **À propos** | Histoire, valeurs, timeline, équipement photo |
| **Contact** | Formulaire complet avec validation, infos de contact |

## Design

- **Fond** : Noir pur `#0c0c0c`
- **Texte** : Blanc cassé `#e8e4de`
- **Typographie display** : Playfair Display (serif italic)
- **Typographie UI** : Jost (weight 200–400)
- **Animations** : Fade-in au scroll via Intersection Observer
- **Navigation** : Links top-right + hamburger avec overlay plein écran
