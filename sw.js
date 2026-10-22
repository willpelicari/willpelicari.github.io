const CACHE_NAME = 'wilton-portfolio-v2'

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)

  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const responseToCache = response.clone()
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(request, responseToCache))
        }

        return response
      })
      .catch(() =>
        caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }

          if (request.mode === 'navigate') {
            return caches.match('/')
          }

          return Response.error()
        })
      )
  )
})
