const CACHE_NAME = 'three-rights-v2';
const PRECACHE = ['/', '/app.html', '/manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
  // Immediately activate — don't wait for old tabs to close
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  // Delete ALL old caches (any name that isn't the current version)
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  // Take control of all open tabs immediately
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Skip non-GET requests
  if (e.request.method !== 'GET') return;

  // Network-first for EVERYTHING — always try to get the latest version
  // Fall back to cache only if offline
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // Got a fresh response — cache it for offline use
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, clone);
          });
        }
        return response;
      })
      .catch(() => {
        // Offline — serve from cache
        return caches.match(e.request);
      })
  );
});
