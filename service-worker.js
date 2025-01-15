const CACHE_NAME = "abdullah-pwa-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/index.js",
  "/index.css",
  "/Logos/Translate.png",
  "/Logos/discord.png",
  "/Logos/facebook.png",
  "/Logos/github.svg",
  "/Logos/locate.svg",
  "/Logos/reddit.png",
  "/Logos/twitter.png",
  "/Homepage.png",
  "/License.md",
  "/README.md",
  "/ReflectIMG.png",
  "/drop.html",
  "/future.html",
  "/green.png",
  "/hamburger.svg",
  "/icon2.png",
  "/icon4.png",
  "/icon5.png",
  "/score.html",
  "/search.js"
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch Event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
