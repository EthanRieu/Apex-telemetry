# Apex Telemetry

Site d'un client fictif : un SaaS d'analyse de sessions circuit (simracing et trackday).
Projet noté du module TailwindCSS & SASS, ESGI Reims.

## Lancer le projet

```bash
npm install
npm run dev              # site sur http://localhost:5173
npm run storybook        # design system sur http://localhost:6006
npm test                 # chaque story : rendu + audit d'accessibilité
npm run build            # build de production dans dist/
```

## Stack

Vite, React, Tailwind 4 (tokens dans `@theme`), `sass-embedded`, Storybook.

## Organisation

```
src/
  index.css            tokens du design system (@theme)
  styles/              partials SASS (_variables, _mixins)
  data/                sessions.json (12 sessions), offres.json
  lib/                 calculs dérivés (chrono), validation du formulaire
  hooks/               navigation par hash
  components/          composants de base + stories
  layout/              en-tête, pied de page, logo
  pages/               Accueil, Sessions, Tarifs, Inscription
docs/                  fiche de cadrage, dossier de projet, captures
```

## Écrans

| Route | Écran |
|---|---|
| `#/` | Accueil |
| `#/sessions` | Sessions : filtres, tri, détail en modale, état vide |
| `#/tarifs` | Tarifs |
| `#/inscription` | Inscription : validation, chargement, confirmation |
