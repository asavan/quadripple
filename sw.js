const version = "1.0.0";
const CACHE = 'cache-only' + version;

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request, {ignoreSearch: true}).then(function (matching) {
            return matching || Promise.reject('request-not-in-cache');
        });
    });
}

function precacheOld() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll([
            './',
            './main.js',
            './style.css',
            './icon.svg',
            './manifest.json',
            './rules.html',
            './rules',
        ]);
    });
}

// eslint-disable-next-line no-unused-vars
function precache() {
    const filesToCache = self.__WB_MANIFEST.map((e) => e.url);
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll([
            "./",
            ...filesToCache
        ]);
    });
}

self.addEventListener('install', function (evt) {
    evt.waitUntil(precacheOld());
});

self.addEventListener('install', function (evt) {
    evt.waitUntil(precache().then(function () {
        return self.skipWaiting();
    }));
});

function networkOrCache(request) {
    return fetch(request).then(function (response) {
        return response.ok ? response : fromCache(request);
    })
        .catch(function () {
            return fromCache(request);
        });
}

self.addEventListener('fetch', function (evt) {
    evt.respondWith(networkOrCache(evt.request));
});

self.addEventListener('activate', function (evt) {
    evt.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});
