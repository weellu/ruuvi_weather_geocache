
const CACHE_NAME = 'ruuvi_weather_geocache_v1';

const urlsToCache = [
    './',
    './sw.js',
    './css/good-styles.css',
    './css/bad-styles.css',
    './js/base64.js',
    './js/respond.js',
    './images/bg.jpg',
    './images/bg-m.jpg',
    './images/logo.png',
    './images/badweather_bg.jpg',
    './images/badweather_bg-m.jpg',
    //'./images/favicon.ico',
    './images/icon-temperature.svg',
    './images/icon-humidity.svg',
    './images/icon-air-pressure.svg',
];

// Perform install steps
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    )
});

// Use network-first strategy for cache
self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request);
        })
    );
});

