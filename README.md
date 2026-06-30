# Cindy — Comportementaliste félin (V2)

Refonte marketing du site vitrine de Cindy, comportementaliste félin à Castelnau-le-Lez (34).
Site statique généré avec [Eleventy](https://www.11ty.dev/), déployé sur GitHub Pages.

## Développement local

```bash
npm install
npm start      # serveur local avec rechargement à chaud (http://localhost:8080)
npm run build  # génère le site final dans _site/
```

## Structure

```
src/
  _data/        Données du site (site.json, services, formations, faq, testimonials)
  _includes/    Layout et partials (base, header, footer)
  assets/       Images, CSS, JS
  *.njk         Pages (URLs propres : /prestations/, /qui-suis-je/, ...)
.github/workflows/deploy.yml   Build + déploiement automatique
```

## Contenu à compléter

- **Téléphone** : `01 23 45 67 89` dans `src/_data/site.json` est un placeholder.
- **Avis clients** : ajoutez des objets dans `src/_data/testimonials.json` pour faire
  apparaître la section témoignages sur l'accueil. Format :
  `{ "quote": "...", "author": "Prénom", "location": "Ville" }`
- **Réseaux sociaux** : champs `social` dans `site.json`.
- **Mentions légales / confidentialité / cookies / conditions** : textes encore génériques.

## Notes marketing

Le site applique : proposition de valeur claire en hero, preuve sociale (témoignages +
badges de formation), parcours client en 4 étapes, tarifs transparents, CTA répétés
« Prendre rendez-vous », SEO local (JSON-LD `ProfessionalService`, sitemap, robots,
balises Open Graph) et design responsive.
