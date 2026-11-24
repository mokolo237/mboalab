# Mboa Lab

**Un atelier libre, gratuit et hors ligne pour apprendre et réaliser en réseau, télécoms, développement web et maintenance informatique.**

Mboa Lab est une application web progressive (PWA) : elle s'ouvre dans un navigateur, s'installe sur un téléphone ou un PC comme une vraie application, et **fonctionne sans Internet** une fois installée. Aucun compte, aucune publicité, aucune donnée envoyée : tout reste sur l'appareil.

Elle s'adresse aux novices, aux étudiants, aux techniciens de maintenance et aux développeurs.

---

## Ce que fait l'outil

| Module | Ce qu'il fait |
|---|---|
| 🏠 **Accueil intelligent** | Une barre de question en français. Elle comprend les calculs (« combien de sous-réseaux /27 dans un /24 ? », « 192.168.1.130/26 », « découper 10.0.0.0/16 pour 500 machines », « convertir 172 en binaire »), les demandes de réseau (« mettre 5 machines, 1 imprimante et le fixe en réseau ») et cherche dans la bibliothèque pour le reste. |
| 🧮 **Calculateur IP** | Adresse réseau, broadcast, plage, nombre de machines, wildcard, classe, type. **Explication pas à pas en binaire coloré** (bits réseau / bits hôte). Découpage en sous-réseaux, VLSM, conversions décimal / binaire / hexadécimal. |
| 🔌 **Assistant réseau** | On indique PC, appareils Wi-Fi, imprimantes, téléphone fixe (classique ou IP), serveurs, caméras. L'outil donne le **schéma**, la **liste du matériel avec le budget** (prix modifiables selon votre marché, en FCFA par défaut), le **plan d'adressage IP**, les **étapes de réalisation** (sertissage T568B, réglage de la box, imprimante, tests `ping`/`ipconfig`) et l'export / l'impression. |
| 🛠️ **Atelier projet** | De l'idée à l'hébergement d'un site ou d'une application, selon votre profil : **no-code**, **low-code** ou **code complet**. Étapes à cocher, progression enregistrée, **générateur de tables SQL** (SQLite, PostgreSQL, MySQL) avec relations automatiques. |
| 📚 **Bibliothèque** | Fiches pédagogiques (réseau, web, programmation, maintenance) avec exemples, mini-quiz, favoris, notes personnelles et **lecture à voix haute**. On peut **écrire ses propres fiches**. |
| 🎓 **Parcours** | Chemins guidés : Réseau fondamentaux, Réseau niveau technicien, Premier site sans coder, Devenir développeur web, Technicien de maintenance. |
| 🎨 **Personnaliser** | Nom de l'application, prénom, couleur, thème clair/sombre, taille du texte, **niveau des explications** (débutant / intermédiaire / expert), modules affichés et leur ordre, export / import de toutes les données. |

---

## Lancer l'application sur son ordinateur (gratuit)

Le navigateur refuse de lancer une PWA en double-cliquant sur `index.html` : il faut un petit serveur local. Trois possibilités gratuites :

**Avec Python** (déjà installé sur Linux et macOS) :

```bash
cd mboalab
python3 -m http.server 8000
```

Puis ouvrez `http://localhost:8000` dans le navigateur.

**Avec VS Code** : installez l'extension « Live Server », faites un clic droit sur `index.html`, puis « Open with Live Server ».

**Avec Node.js** : `npx serve .`

Aucune installation de dépendances : le projet n'utilise **aucune bibliothèque externe** ni étape de compilation.

---

## Mettre en ligne gratuitement (GitHub Pages)

1. Créez un compte sur [github.com](https://github.com) (gratuit).
2. Créez un dépôt public, par exemple `mboalab`.
3. Envoyez les fichiers du projet, soit avec le bouton « Add file → Upload files », soit en ligne de commande :
   ```bash
   git init
   git add .
   git commit -m "Première version de Mboa Lab"
   git branch -M main
   git remote add origin https://github.com/VOTRE-NOM/mboalab.git
   git push -u origin main
   ```
4. Dans le dépôt, ouvrez **Settings → Pages**. Pour la source, choisissez la branche `main` et le dossier `/ (root)`.
5. Après une ou deux minutes, l'application est en ligne en HTTPS : `https://VOTRE-NOM.github.io/mboalab/`.
6. Ouvrez ce lien sur votre téléphone, puis « Installer l'application » (Android) ou « Sur l'écran d'accueil » (iPhone).

Netlify et Cloudflare Pages fonctionnent aussi : il suffit de glisser le dossier sur leur site.

**Coût total : 0 FCFA.** Un nom de domaine personnalisé (`.cm`, `.com`) est facultatif et payant chaque année.

---

## Structure du projet

```
mboalab/
├── index.html              Page unique de l'application
├── manifest.webmanifest    Nom, icônes, couleurs (PWA)
├── sw.js                   Service worker : cache hors ligne
├── css/app.css             Tout le style (variables de thème en haut)
├── icons/                  Icônes SVG et PNG
├── data/knowledge.js       Bibliothèque de fiches + parcours
└── js/
    ├── app.js              Navigation, thème, installation
    ├── router.js           Routeur interne (marche aussi dans un cadre protégé)
    ├── icons.js            Jeu d'icônes SVG original
    ├── store.js            Stockage local (avec secours en mémoire)
    ├── ui.js               Utilitaires : fenêtres, export, copie
    ├── lib/                Logique pure, testable sans navigateur
    │   ├── ipcalc.js       Calculs IPv4, sous-réseaux, VLSM
    │   ├── netplan.js      Planificateur de réseau local
    │   ├── roadmap.js      Feuilles de route projet
    │   ├── sqlgen.js       Générateur de tables SQL
    │   └── search.js       Moteur de questions « intelligent »
    └── modules/            Un fichier par écran
        ├── home.js  ip.js  network.js  webproject.js
        └── library.js  paths.js  settings.js
```

---

## En faire votre propre outil

Le but est que chacun obtienne un résultat qui lui ressemble.

- **Couleurs et style** : les variables en haut de `css/app.css` (`--accent`, `--bg`, `--radius`…), ou directement depuis l'écran « Personnaliser ».
- **Nom et icône** : écran « Personnaliser » ; pour l'icône installée, remplacez les fichiers de `icons/` et le nom dans `manifest.webmanifest`.
- **Ajouter une fiche** : ajoutez un objet dans `data/knowledge.js` (voir `CONTRIBUTING.md`), ou écrivez-la depuis l'application (« Écrire ma propre fiche »).
- **Ajouter un module** : créez `js/modules/monmodule.js`, qui exporte `meta` (`id`, `title`, `short`, `desc`) et une fonction `render(root, ctx)` ; ajoutez son icône dans `js/icons.js` (même `id`). Ajoutez-le ensuite dans `MODULES` (`js/app.js`), dans `DEFAULT_SETTINGS.modules` (`js/store.js`) et dans la liste `FILES` de `sw.js`.
- **Prix du matériel** : modifiables dans l'Assistant réseau ; les valeurs par défaut sont dans `DEFAULT_PRICES` (`js/lib/netplan.js`).

> **Après chaque modification publiée**, changez `VERSION` dans `sw.js`. Sinon, les téléphones qui ont installé l'application garderont l'ancienne version en cache.

---

## Feuille de route (idées pour la suite)

- [ ] Assistant IA **facultatif** : l'utilisateur colle sa propre clé d'API gratuite, ou fait tourner un petit modèle localement. L'outil reste utilisable sans IA.
- [ ] Planificateur de **VLAN** et générateur de configuration Cisco / MikroTik
- [ ] Calculateur **IPv6**
- [ ] Mode **examen** : séries de questions chronométrées (sous-réseaux, OSI, ports)
- [ ] Simulateur de dépannage : « le PC a 169.254.x.x, que vérifiez-vous ? »
- [ ] Diagnostic de pannes PC sous forme d'arbre de décision
- [ ] Version anglaise
- [ ] Davantage de fiches : Linux, Windows Server, fibre optique, GSM/4G/5G, cybersécurité

Les contributions sont les bienvenues : voir `CONTRIBUTING.md`.

---

## Nouveautés de la version 0.2

- Interface épurée : icônes au lieu des emojis, moins de texte, résultats en onglets.
- Aucun champ pré-rempli : tout part de zéro, les résultats apparaissent pendant la saisie.
- Assistant réseau avec compteurs + / −, schéma vertical lisible sur téléphone.
- Atelier projet affiché une phase à la fois.
- Suppression, confirmation et export fonctionnent partout, y compris dans un aperçu intégré (fenêtres internes à l'application).

## Licence

[MIT](LICENSE) : vous pouvez utiliser, modifier, redistribuer et même vendre des services autour de Mboa Lab, à condition de conserver la mention de licence.
