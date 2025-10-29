# activ-senior — Minimal Scaffold (Angular 19, standalone, signals)

Ce paquet contient **le code source minimal** (sans `node_modules`) pour démarrer *activ-senior* avec :
- Standalone components
- **Signals** (`signal`, `computed`, `effect`) pour le state
- **`input()` / `output()`** pour la com parent/enfant
- Une **feature Participants** légère (search + liste + store en mémoire)

## Démarrage
1. Crée un workspace Angular 19 :
   ```bash
   npm i -g @angular/cli@19
   ng new activ-senior --standalone --routing --style=css
   cd activ-senior
   ng add @angular/material
   ```
2. Copie le contenu de ce ZIP **par-dessus** ton `src/` (remplace les fichiers si nécessaire).
3. Installe & lance :
   ```bash
   npm install
   npm start
   ```

> Remarque: ce scaffold utilise fortement **Signals** et **Signal Inputs/Outputs** d'Angular 19.
