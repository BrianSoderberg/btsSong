// Service worker for the OnSong Viewer — enables offline use after the first online visit.
// Strategy: cache-first, falling back to network; successful network responses refresh the cache
// in the background so you always get the fastest (offline-safe) load, with silent updates when online.

const CACHE_NAME = 'onsong-viewer-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cached) => {
        const networkFetch = fetch(event.request)
          .then((response) => {
            if (response && response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          })
          .catch(() => cached); // offline — fall back to whatever we have cached
        // Serve cached instantly if we have it (fast + works offline); otherwise wait on network.
        return cached || networkFetch;
      })
    )
  );
});
