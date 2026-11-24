// Service worker : met toute l'application en cache pour un usage hors ligne.
// Changez VERSION à chaque mise à jour pour que les utilisateurs reçoivent la nouvelle version.
const VERSION = 'mboalab-v0.2.0';

const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/app.css',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './js/app.js',
  './js/store.js',
  './js/ui.js',
  './js/icons.js',
  './js/router.js',
  './js/lib/ipcalc.js',
  './js/lib/netplan.js',
  './js/lib/roadmap.js',
  './js/lib/search.js',
  './js/lib/sqlgen.js',
  './js/modules/home.js',
  './js/modules/ip.js',
  './js/modules/network.js',
  './js/modules/webproject.js',
  './js/modules/library.js',
  './js/modules/paths.js',
  './js/modules/settings.js',
  './data/knowledge.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// Stratégie : cache d'abord (rapide, hors ligne), puis mise à jour en arrière-plan
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  event.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const network = fetch(req)
        .then((res) => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => cached);
      return cached || network;
    }),
  );
});
