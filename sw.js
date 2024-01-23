const cacheName = 'my-cache';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        	"/",
          '192.png',
          '512.png',
          'index.html',
          'assets/css/custome-style.css',
          'assets/css/templatemo-572-designer.css',
          'vendor/bootstrap/css/bootstrap.min.css',
          'assets/css/fontawesome.css',
          'logo.png',
          'assets/images/bg1.jpg',
          '1.jpg',
          'vendor/jquery/jquery.min.js',
          'vendor/bootstrap/js/bootstrap.min.js',
          'assets/js/custom.js',
          'assets/js/script.js',
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.command === 'trigger-broadcast') {
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({ command: 'broadcast-update' });
      });
    });
  }
});
