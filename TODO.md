# TODO — Portfolio Site Checklist

## Contenu à remplacer
- [ ] `public/images/hero-bg.jpg` — Image de fond du hero (1920×1080 recommandé)
- [ ] `public/images/cta-bg.jpg` — Image de fond section CTA
- [ ] `public/images/og-image.jpg` — Image Open Graph pour les réseaux sociaux (1200×630)
- [ ] `public/images/portfolio/project-1.jpg` à `project-6.jpg` — Photos de vos projets
- [ ] `public/images/shop/pack-*.jpg` — Visuels de vos packs (6 images)
- [ ] `public/images/tools/` — Photos de votre matériel (caméras, stabilisateurs, éclairage, audio, logiciels)
- [ ] `public/packs/*.zip` — Remplacer les placeholders par vos vrais fichiers ZIP
- [ ] `public/audio/ambient.mp3` — Ajouter votre musique de fond
- [ ] `public/video/` — Ajouter vos vidéos (showreel, etc.)

## Personnalisation du code
- [ ] `src/data/index.js` — Mettre à jour les titres, descriptions et clients des projets
- [ ] `src/data/index.js` — Mettre à jour les packs (titres, descriptions, nombre d'items)
- [ ] `src/data/index.js` — Mettre à jour les services et leurs prix
- [ ] `src/data/index.js` — Mettre à jour la liste du matériel (Tools)
- [ ] `src/i18n.js` — Ajuster les traductions si nécessaire
- [ ] `src/components/Footer.jsx` — Mettre à jour liens réseaux sociaux et email
- [ ] `src/pages/Contact.jsx` — Connecter le formulaire à un vrai service (EmailJS, Formspree, etc.)
- [ ] `index.html` — Mettre à jour l'URL `<link rel="canonical">`
- [ ] `index.html` — Mettre à jour les meta tags og:image avec votre URL
- [ ] `vite.config.js` — Changer `base` si le repo GitHub ne s'appelle pas `portfolio-site`

## GitHub Pages
- [ ] Créer un repo GitHub nommé `portfolio-site` (ou adapter `base` dans vite.config.js)
- [ ] Pousser sur la branche `main`
- [ ] Dans Settings > Pages : choisir Source = "GitHub Actions"
- [ ] Le workflow `.github/workflows/static.yml` se lancera automatiquement

## Fonctionnalités vérifiées
- [x] Navigation React Router avec scroll to top
- [x] Menu burger mobile
- [x] Dark / Light mode avec persistance localStorage
- [x] Switch FR / EN avec persistance localStorage
- [x] Musique de fond avec persistance localStorage (désactivée par défaut)
- [x] GSAP ScrollTrigger — reveals au scroll (fade, slide, scale)
- [x] GSAP — Scroll horizontal épinglé (section portfolio Home)
- [x] GSAP — Parallax hero background
- [x] Grille portfolio avec filtre par catégorie
- [x] Modal détail projet
- [x] Cartes produits avec téléchargement direct
- [x] Cartes services avec prix
- [x] Page Outils avec switch entre catégories (onglets)
- [x] Formulaire contact avec validation
- [x] Pièce jointe dans le formulaire (PDF, JPG, PNG — max 10MB)
- [x] Responsive mobile / tablette / desktop
- [x] SEO : meta tags, Open Graph, canonical, robots
- [x] GitHub Actions pour déploiement automatique
- [x] Fonts Google (Playfair Display + DM Sans)

## Optionnel / Améliorations futures
- [ ] Connecter le formulaire à EmailJS ou Formspree pour les vrais envois
- [ ] Ajouter un showreel vidéo en hero (remplacer l'image statique)
- [ ] Ajouter Google Analytics ou Plausible
- [ ] Ajouter un sitemap.xml pour le SEO
- [ ] Ajouter des transitions de page avec Framer Motion
