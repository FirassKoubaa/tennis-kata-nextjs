# Tennis Kata Front

Ce projet est une application Next.js (React) qui permet de tester des séquences de points pour un jeu de tennis, en interagissant avec le backend Spring Boot du projet tennis-kata.

## Prérequis
- Node.js >= 18
- npm >= 9

## Installation

1. Cloner le dépôt (ou placer ce dossier dans le même repo que le backend).
2. Installer les dépendances :
   ```bash
   npm install
   ```

## Lancement en développement

```bash
npm run dev
```

L'application sera accessible sur http://localhost:3000

## Lancement en production

1. Générer le build :
   ```bash
   npm run build
   ```
2. Démarrer le serveur :
   ```bash
   npm run start
   ```

## Utilisation

- Deux boutons "A" et "B" permettent de saisir une séquence de points.
- Le bouton "Envoyer" envoie la séquence au backend (qui doit tourner sur http://localhost:8080).
- Le résultat du jeu s'affiche ligne par ligne.

## Configuration

- L'URL du backend est définie dans `app/TennisGameComponent.tsx` (variable `API_URL`).
- Si besoin, modifiez-la pour pointer vers l'API de votre backend.

## Dépendances principales
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Bootstrap 5](https://getbootstrap.com/)

## Notes
- Le backend doit être démarré et accessible pour que l'application fonctionne correctement.
- Le CORS doit être activé côté backend (voir la classe `CorsConfig` dans le projet Spring Boot).

---

Pour toute question, reportez-vous à la documentation du backend ou contactez l'auteur du projet.

