const CACHE_NAME = 'perumpayil-v21';
const BASE = '/perumpayil-onam/';
const urlsToCache = [
  BASE + '?v=21',
  BASE + 'index.html?v=21',
  BASE + 'manifest.json?v=21',
  BASE + 'Logo.png?v=21',
  BASE + 'maveli.png?v=21',
  BASE + 'onambg.mp3?v=21',
  BASE + 'onam_wish.mp4?v=21',
  BASE + 'bg01.webp?v=21',
  BASE + 'onam26.webp?v=21',
  BASE + 'splash_video.mp4?v=21',
  BASE + 'Pacifico.ttf?v=21',
  BASE + 'TarmilesAction.otf?v=21',
  BASE + 'MLU-Anakha.ttf?v=21',
  BASE + 'MLU-Ambili Bold.ttf?v=21',
  BASE + 'icon-192.png?v=21',
  BASE + 'icon-512.png?v=21'
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