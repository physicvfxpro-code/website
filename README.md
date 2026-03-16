# Portfolio Creative Studio

Site portfolio professionnel — React + Vite + Tailwind CSS + GSAP.

## Stack technique
- **React 18** + **Vite 5**
- **Tailwind CSS 3** (Dark mode, responsive)
- **React Router 6** (navigation SPA)
- **GSAP 3** + ScrollTrigger (scroll horizontal, parallax, reveals)
- **react-i18next** (FR / EN, persisté en localStorage)
- **react-helmet-async** (SEO)

## Démarrage rapide

```bash
npm install
npm run dev
```

Ouvrir http://localhost:5173

## Build production

```bash
npm run build
npm run preview
```

## Déploiement GitHub Pages

1. Pousser sur la branche `main`
2. Settings → Pages → Source: **GitHub Actions**
3. Le workflow `.github/workflows/static.yml` se charge du reste

> Si votre repo ne s'appelle pas `portfolio-site`, mettez à jour `base` dans `vite.config.js`.

## Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── PortfolioCard.jsx
│   ├── ProductCard.jsx
│   ├── ServiceCard.jsx
│   └── ProjectModal.jsx
├── context/
│   ├── ThemeContext.jsx   (dark/light)
│   └── MusicContext.jsx   (musique de fond)
├── data/
│   └── index.js           (projets, packs, services, outils)
├── hooks/
│   └── useGSAP.js         (useReveal, useParallax)
├── pages/
│   ├── Home.jsx
│   ├── Portfolio.jsx
│   ├── Shop.jsx
│   ├── Services.jsx
│   ├── Tools.jsx
│   └── Contact.jsx
├── i18n.js
├── App.jsx
└── index.css

public/
├── images/     → Vos photos (voir images/README.md)
├── video/      → Vos vidéos (voir video/README.md)
├── audio/      → ambient.mp3 (musique de fond)
└── packs/      → Vos fichiers ZIP téléchargeables
```

## Checklist complète

Voir **TODO.md** pour la liste complète des personnalisations à effectuer.
