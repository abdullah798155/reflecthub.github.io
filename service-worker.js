const CACHE_NAME = "abdullah-pwa-cache-v2"; // Update this version to force a cache refresh

const ASSETS_TO_CACHE = [
  "/Logos/Translate.png",
  "/Logos/discord.png",
  "/Logos/facebook.png",
  "/Logos/github.svg",
  "/Logos/locate.svg",
  "/Logos/reddit.png",
  "/Logos/twitter.png",
  "/drop.html",
  "/future.html",
  "/image.png",
  "/icon5.png",
  "/score.html",
  "/search.js"
];

// Files that should **never** be cached (always request fresh from the server)
const NO_CACHE_FILES = [
  "/index.html",
  "/index.css",
  "/index.js",
  "https://reflectserver.github.io/Content/verses.json",
  "https://reflectserver.github.io/Content/rational.json",
  "https://reflectserver.github.io/Content/scientific.json",
  "https://reflectserver.github.io/Content/inspirational.json",
  "https://reflectserver.github.io/Content/reactions.json"
];

// Install Service Worker and Cache Assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Activate the new service worker immediately
});

// Fetch Event - Handle JSON, HTML, CSS, and JS separately
self.addEventListener("fetch", (event) => {
  const requestUrl = event.request.url;
  const requestPath = new URL(requestUrl).pathname;

  // Always fetch NO_CACHE_FILES fresh from the network
  if (NO_CACHE_FILES.includes(requestPath) || NO_CACHE_FILES.includes(requestUrl)) {
    event.respondWith(
      fetch(event.request, { cache: "no-store" })
        .catch(() => new Response("Failed to fetch data", { status: 500 }))
    );
    return;
  }

  // Serve cached assets for everything else
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Return from cache if available
      }
      return fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone()); // Update cache
          return response;
        });
      });
    })
  );
});

// Activate Service Worker and Remove Old Caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  self.clients.claim(); // Take control of clients immediately
});
