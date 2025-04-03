const CACHE_NAME = "abdullah-pwa-cache-v59"; // Increment this to force cache update

const ASSETS_TO_CACHE = [
  "/Logos/Translate.png",
  "/Logos/discord.png",
  "/Logos/facebook.png",
  "/Logos/github.svg",
  "/Logos/locate.svg",
  "/Logos/reddit.png",
  "/Logos/twitter.png",
  "/legacy/hamburger.svg",
  "/response/index.html",
  "/response/response.js",
  "/response/response.css",
  "/Contact/index.html",
  "/Contact/contact.js",
  "/Contact/contact.css",
  "/privacy/index.html",
  "/terms/index.html",
  "/credits/index.html",
  "/credits/credits.js",
  "/credits/credits.css",
  "/drop.html",
  "/future.html",
  "/image.png",
  "/icon5.png",
  "/score.html",
  "/qr-code.svg"
];

// Files that should **never** be cached (always fetch fresh from the server)
const NO_CACHE_FILES = [
  "/legacy/",
  "/legacy/index.html",
  "/legacy/legacy.css",
  "/legacy/legacy.js",
  "/reflections/",
  "/reflections/index.html",
  "/index.html",
  "/index.css",
  "/index.js",
  "/search.js",
  "https://reflectserver.github.io/Content/verses.json",
  "https://reflectserver.github.io/Content/rational.json",
  "https://reflectserver.github.io/Content/scientific.json",
  "https://reflectserver.github.io/Content/inspirational.json",
  "https://reflectserver.github.io/Content/reactions.json"
];

// 🟢 Install Event - Cache Static Assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache:", CACHE_NAME);
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Activate immediately
});

// 🔵 Fetch Event - Handle Different Caching Strategies
self.addEventListener("fetch", (event) => {
  let requestUrl = new URL(event.request.url);
  let requestPath = requestUrl.pathname;

  // Normalize directory requests to `index.html`
  if (requestPath.endsWith("/")) {
    requestPath += "index.html";
  }


  // 🛑 Ignore non-GET requests (like POST, PUT, DELETE)
  if (event.request.method !== "GET") {
    return;
  }

  // 🚨 Always fetch fresh versions of NO_CACHE_FILES
  if (NO_CACHE_FILES.some((file) => requestPath.startsWith(file))) {
    event.respondWith(
      fetch(event.request, { cache: "no-store" })
        .catch(() => new Response("Failed to fetch data", { status: 500 }))
    );
    return;
  }

  // ✅ Serve Cached Assets for Everything Else
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Serve from cache
      }
      return fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone()); // Cache new fetch
          return response;
        });
      });
    })
  );
});

// 🟣 Activate Event - Remove Old Caches
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
