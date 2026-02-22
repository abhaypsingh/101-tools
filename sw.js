// Service Worker for 101 Tools
const CACHE_NAME = '101tools-v3';
const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './core.js',
    './utilities.js',
    './utility-implementations.js',
    './utility-implementations-extended.js',
    './utility-implementations-2.js',
    './utility-implementations-3.js',
    './utility-implementations-4.js',
    './utility-implementations-5.js',
    './utility-implementations-final.js',
    './utility-implementations-complete-1.js',
    './utility-implementations-complete-2.js',
    './utility-implementations-complete-final.js',
    './utility-implementations-enhanced.js',
    './utility-implementations-ultimate.js',
    './tool-implementations-productivity.js',
    './tool-implementations-wellness1.js',
    './tool-implementations-wellness2.js',
    './tool-implementations-mixed.js',
    './tool-implementations-remaining1.js',
    './tool-implementations-remaining2.js',
    './icons.js',
    './icons-extended.js',
    './app.js',
    './manifest.json'
];

// Install event - cache all resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
    // Only handle http and https requests
    if (!event.request.url.startsWith('http')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone the request
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(response => {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Only cache http/https requests
                    if (event.request.url.startsWith('http')) {
                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            })
                            .catch(err => {
                                console.log('Cache put failed:', err);
                            });
                    }

                    return response;
                })
                .catch(err => {
                    console.log('Fetch failed:', err);
                    // Return cached version if available, even if fetch fails
                    return caches.match(event.request);
                });
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});