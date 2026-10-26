# Fiche de cadrage — Apex Telemetry

Ethan Rieu · ESGI Reims · TailwindCSS & SASS · Projet noté

| Rubrique | Contenu |
|---|---|
| **Le client** | **Apex Telemetry** (fictif) · outil professionnel en ligne (SaaS) · Reims · startup de 3 personnes |
| **Ce qu'il propose** | **Gratuit** 0 € (5 sessions/mois) · **Pilote** 6 €/mois (sessions illimitées, comparaison de tours) · **Team** 19 €/mois (jusqu'à 5 pilotes) · **Analyse coaching** 29 € une fois (rapport d'un coach sous 72 h) |
| **L'objectif du site** | Obtenir des inscriptions en ligne à l'offre Pilote. |
| **Persona 1** | **Thomas**, 24 ans, étudiant, simracer sur ACC 4 soirs par semaine. *Contexte :* chez lui, **sur ordinateur**, entre deux relais. *Veut :* savoir où il perd du temps. *Gêne :* les logiciels de télémétrie pleins de courbes illisibles. **Mission : sur ordinateur, ouvrir sa dernière session à Spa et trouver son secteur le plus coûteux en moins de 30 secondes.** |
| **Persona 2** | **Julie**, 38 ans, infirmière, fait 6 trackdays par an en Alpine avec un boîtier RaceBox. *Contexte :* **sur son téléphone, au paddock**, en plein soleil, entre deux sessions. *Veut :* s'abonner sans se faire piéger. *Gêne :* les abonnements au prix caché, les formulaires longs sur mobile. **Mission : sur téléphone, s'inscrire à l'offre Pilote en moins de 2 minutes, sans erreur de saisie.** |
| **Les écrans** | 1. **Accueil** : proposition de valeur, CTA « Choisir mon offre », aperçu d'une analyse. 2. **Sessions** (interactif) : liste depuis le JSON, filtre par source (puces) × filtre par circuit + tri, détail en modale, état vide. 3. **Tarifs** : les 4 offres et leurs prix (Julie veut connaître le prix avant de donner son e-mail). 4. **Inscription** (action) : choix de l'offre, prénom, e-mail, mot de passe, CGU ; validation, erreurs, chargement, confirmation. |
| **Parcours** | Thomas : Accueil → Sessions → filtre « Spa » → détail. Julie : Accueil → Tarifs → Inscription → Confirmation. |
| **Les données** | `sessions.json` : 12 sessions. Champs : `id`, `circuit`, `pays`, `longueurKm`, `source` (ACC, iRacing, Assetto Corsa, RaceBox), `voiture`, `date`, `conditions`, `vitesseMaxKmh`, `tours[]` (`numero`, `secteurs[3]` en ms). Le temps au tour, le meilleur tour et le tour idéal sont **calculés**, pas stockés. `offres.json` : les 4 offres. |
| **Le composant en SASS** | **SectorBadge** : le code couleur du chronométrage (violet = meilleur secteur, vert = amélioration, jaune = plus lent). Une **map SASS** de variantes + une **boucle `@each`** génère une classe par statut, un **mixin** calcule le fond teinté et la bordure à partir d'une seule couleur (`color-mix`). |
| **L'ambiance** | **Précis, nerveux, nocturne.** Noir carbone `#0A0C10` · rouge signal `#E10600` · vert chrono `#3DDC84`. |
