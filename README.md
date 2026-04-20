# Qastia

Refonte du site Qastia en React avec Vite.

Le contenu historique reste dans `content/` et les assets restent dans `static/`. L'application React relit ces fichiers pour reconstruire les pages publiques sans dupliquer les textes métier.

## Prérequis

- Node.js 20+
- npm

## Démarrage

```bash
npm install
npm run dev
```

Le site de développement sera disponible sur `http://localhost:5173`.

## Build

```bash
npm run build
```

Le bundle de production est généré dans `dist/`.

## Structure utile

```text
content/      Contenus source historiques
static/       Images et fichiers statiques
src/          Application React
config.toml   Configuration reprise pour la navigation et les liens
```

## Déploiement

- Netlify build: `npm run build`
- Répertoire publié: `dist`
- Le script `deploy.sh` pousse aussi `dist/`
- GitHub Pages: workflow [deploy-pages.yml](/home/bjalon/projects/qastia/qastia/.github/workflows/deploy-pages.yml)

## GitHub Pages

Le workflow GitHub Actions publie automatiquement sur GitHub Pages à chaque push sur `master`.

Points importants :

- Le build Pages publie le site à la racine `/`, ce qui est nécessaire pour le domaine custom `www.qastia.com`
- `dist/404.html` est généré à partir de `index.html` pour laisser fonctionner le routing SPA
- Dans les réglages GitHub du dépôt, Pages doit être configuré sur `GitHub Actions`
