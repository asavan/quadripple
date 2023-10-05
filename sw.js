const version = "1.0.1";
const CACHE = "cache-only" + version;

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request, {ignoreSearch: true}).then(function (matching) {
            return matching || Promise.reject("request-not-in-cache");
        });
    });
}

function precacheOld() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll([
            "./",
            "./main.js",
            "./style.css",
            "./icon.svg",
            "./manifest.json",
            "./rules.html",
            "./rules",
        ]);
    });
}

self.addEventListener("install", function (evt) {
    evt.waitUntil(precacheOld().then(function () {
        return self.skipWaiting();
    }));
});

function fromNetwork(request, timeout) {
    return new Promise(function (resolve, reject) {
        const timeoutId = setTimeout(reject, timeout);

        fetch(request).then(function (response) {
            clearTimeout(timeoutId);
            resolve(response);
        }, reject);
    });
}

function networkOrCache(request) {
    return fromNetwork(request, 400).catch(function () {
        return fromCache(request);
    });
}

self.addEventListener("fetch", function (evt) {
    evt.respondWith(networkOrCache(evt.request));
});

self.addEventListener("activate", function (evt) {
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
