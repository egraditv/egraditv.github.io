// Garde l'application disponible même avec une connexion faible.
// Changez VERSION à chaque mise à jour des fichiers pour que les téléphones la récupèrent.
// Notifications OneSignal (App ID dans config.js).
try { importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js"); } catch (e) {}
const VERSION = "egradi-tv-24a";
const FICHIERS = ["./", "index.html", "styles.css", "app.js", "plus.js", "i18n.js", "config.js", "videos.js", "versets.js", "confidentialite.html", "logo-badge.png", "photos/banniere-apotre-900.jpg", "logo-complet.png", "logo-192.png", "logo-512.png", "manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FICHIERS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((cles) => Promise.all(cles.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

// Réseau d'abord (pour avoir les dernières vidéos), copie locale si pas de connexion.
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin || url.pathname.endsWith(".apk") || url.pathname.endsWith(".mp4")) return; // ni l'APK ni la vidéo ne sont mis en cache
  e.respondWith(
    fetch(e.request)
      .then((r) => {
        const copie = r.clone();
        caches.open(VERSION).then((c) => c.put(e.request, copie));
        return r;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match("index.html")))
  );
});
