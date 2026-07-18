const CACHE_NAME = 'perumpayil-v5';
const urlsToCache = [
  '/perumpayil-onam/',
  '/perumpayil-onam/index.html',
  '/perumpayil-onam/manifest.json',
  '/perumpayil-onam/Logo.png',
  '/perumpayil-onam/maveli.png',
  '/perumpayil-onam/onambg.mp3',
  '/perumpayil-onam/onam_wish.mp4',
  '/perumpayil-onam/bg01.webp',
  '/perumpayil-onam/onam26.webp',
  '/perumpayil-onam/Pacifico.ttf',
  '/perumpayil-onam/TarmilesAction.otf',
  '/perumpayil-onam/MLU-Anakha.ttf',
  '/perumpayil-onam/icon-192.png',
  '/perumpayil-onam/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});