const cacheName = "cache-v1"; // Change value to force update

self.addEventListener("install", event => {
	// Kick out the old service worker
	self.skipWaiting();

	event.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll([
				"/",
                '/quraan/192.png',
                '/quraan/512.png',
                '/quraan/index.html',
                '/quraan/assets/css/custome-style.css',
                '/quraan/assets/css/templatemo-572-designer.css',
                '/quraan/vendor/bootstrap/css/bootstrap.min.css',
                '/quraan/assets/css/fontawesome.css',
                '/quraan/logo.png',
                '/quraan/assets/images/bg1.jpg',
                '/quraan/1.jpg',
                '/quraan/vendor/jquery/jquery.min.js',
                '/quraan/vendor/bootstrap/js/bootstrap.min.js',
                '/quraan/assets/js/custom.js',
                '/quraan/assets/js/script.js',
			]);
		})
	);
});

self.addEventListener("activate", event => {
	// Delete any non-current cache
	event.waitUntil(
		caches.keys().then(keys => {
			Promise.all(
				keys.map(key => {
					if (![cacheName].includes(key)) {
						return caches.delete(key);
					}
				})
			)
		})
	);
});

self.addEventListener("fetch", event => {
	event.respondWith(
		caches.open(cacheName).then(cache => {
			return cache.match(event.request).then(response => {
				return response || fetch(event.request).then(networkResponse => {
					cache.put(event.request, networkResponse.clone());
					return networkResponse;
				});
			})
		})
	);
});
