# Contribuer à Mboa Lab

Merci ! Toute aide compte : une faute corrigée, une fiche, un module, une traduction.

## Proposer une fiche

Ajoutez un objet dans le tableau `KNOWLEDGE` de `data/knowledge.js` :

```js
{
  id: 'fibre-optique',              // unique, en minuscules, avec des tirets
  titre: 'La fibre optique expliquée',
  domaine: 'reseau',                // reseau | web | prog | maintenance
  niveau: 1,                        // 1 débutant, 2 intermédiaire, 3 avancé
  tags: ['fibre', 'ftth', 'monomode', 'multimode'],  // mots que les gens tapent
  resume: 'Une phrase qui donne envie de lire.',
  contenu: `<p>Texte en HTML simple : p, ul, ol, li, strong, code, pre, table.</p>`,
  exemple: 'Un cas concret, facultatif.',
  outil: '#/reseau',                // lien vers un module, facultatif
  quiz: [                           // facultatif
    { q: 'Question ?', choix: ['A', 'B', 'C'], bonne: 1, pourquoi: 'Explication.' },
  ],
},
```

Pour rédiger une fiche :

- Écrivez pour un débutant : phrases courtes, un exemple concret, une analogie si possible.
- Vérifiez chaque fait technique (chiffres, commandes, normes).
- N'écrivez pas de prix précis ni de conditions d'offres commerciales, qui changent vite.
- Les mots-clés (`tags`) sont la clé de la recherche : mettez les mots qu'un débutant taperait, sans accents si possible.

Vous pouvez aussi écrire la fiche dans l'application (Bibliothèque → « Écrire ma propre fiche »), l'exporter en JSON et la joindre à votre proposition.

## Proposer du code

1. Faites un *fork* du dépôt, puis créez une branche : `git checkout -b ma-fonction`.
2. Gardez l'esprit du projet : **aucune dépendance externe**, fonctionnement **hors ligne**, **mobile d'abord**, textes en français clair.
3. Placez la logique de calcul dans `js/lib/` (sans `document` ni `window`) pour qu'elle reste testable avec Node.js :
   ```bash
   node -e "import('./js/lib/ipcalc.js').then(m => console.log(m.analyze(m.parseIP('192.168.1.10'), 24)))"
   ```
4. Si vous ajoutez un fichier, ajoutez-le aussi à la liste `FILES` de `sw.js`, puis augmentez `VERSION`.
5. Ouvrez une *pull request* qui explique le changement.

## Code de conduite

Respect, patience et bienveillance, surtout envers les débutants : ce projet existe pour eux.
