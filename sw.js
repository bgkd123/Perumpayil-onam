const CACHE_NAME = 'perumpayil-v9';
const BASE = '/perumpayil-onam/';
const urlsToCache = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json',
  BASE + 'Logo.png',
  BASE + 'maveli.png',
  BASE + 'onambg.mp3',
  BASE + 'onam_wish.mp4',
  BASE + 'bg01.webp',
  BASE + 'onam26.webp',
  BASE + 'Pacifico.ttf',
  BASE + 'TarmilesAction.otf',
  BASE + 'MLU-Anakha.ttf',
  BASE + 'icon-192.png',
  BASE + 'icon-512.png'
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