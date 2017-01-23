var dataCacheName = 'stanza.io-data-1';
var cacheName = 'stanza.io-PWA-1';
var filesToCache = [
  '/',
  '/index.html',
  '/sw.js'
];

var path = 'localhost:3000';

self.addEventListener('push', function(event) {
  console.log(event);
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});


self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');

      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');

  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});



self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        if(response){
          return response;
        }else {
          fetch(e.request)
           .then(function(response){
             return caches.open(dataCacheName).then(function(cache){
               cache.put(e.request.url, response.clone());
               console.log('blabla');
               return response;
             })
           })
         }
      })
    );
});
