const CACHE_NAME = '{{cache}}';

const CRITICAL = [
  '/',
  '/bundle/public/common-dependencies.js',
  '/bundle/public/skeleton.js',
];

const NON_CRITICAL = [
  '/bundle/public/styles/images/favicon.png'
];

const addToCache = (request, response) => {
  caches.open(CACHE_NAME).then(cache => cache.put(request, response))
    .catch((err) => {
      console.log(err);
      return err;
    });
};

// Respond with cached resources
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {

      return (response && new Promise((resolve) => {

        // Resolve the response
        resolve(response);

        // Fetch the request
        fetch(event.request).then(res => {
          // And cache it
          addToCache(event.request, res)
        });

      })) || fetch(event.request).then(res => {
        let clone = res.clone();
        addToCache(event.request, clone);
        return res;
      });
    })
  );
});

// Cache resources
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      // Add the non-important resources
      cache.addAll(NON_CRITICAL);

      // Add the critical ones
      return cache.addAll(CRITICAL)
    })
    .then(() => self.skipWaiting())
  );
});

const clearOldCaches = () => {
  return caches.keys().then(keys => {
    return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => {
      console.log('[sw] remove cache', key);
      caches.delete(key);
    }));
  });
};

// Delete outdated caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    clearOldCaches().then(() => self.clients.claim())
  );
});
