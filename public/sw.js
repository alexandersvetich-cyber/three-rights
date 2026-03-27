// Self-destructing service worker
// This file exists only to replace the old cache-first SW
// It immediately unregisters itself and clears all caches

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    Promise.all([
      caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key)))),
      self.registration.unregister(),
    ])
  );
  self.clients.claim();
});

// Pass everything through to network — no caching
self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
});
