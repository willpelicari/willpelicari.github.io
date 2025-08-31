const CACHE_NAME = 'wilton-portfolio-v1'
const urlsToCache = [
  '/',
  '/static/js/main.73986b82.js',
  '/static/css/main.3a7d521a.css',
  '/main-photo.jpg',
  '/data/portfolio-en.json',
  '/data/portfolio-fr.json',
  '/data/portfolio-pt.json',
  '/cv/wilton-pelicari-cv.pdf',
  '/icons/dotnet.svg',
  '/icons/react.svg',
  '/icons/solid.svg',
  '/icons/github-mark.svg',
  '/icons/linkedin.svg'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})
