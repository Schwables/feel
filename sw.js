// Service Worker: legt die App-Dateien im Cache (Zwischenspeicher) ab,
// damit Feel auch ohne Internet startet.
//
// Strategie "aus dem Cache, im Hintergrund auffrischen":
// Die App startet sofort aus dem Cache. Gleichzeitig wird online die neueste
// Version geholt und für den NÄCHSTEN Start abgelegt. Eine neue Version auf
// GitHub ist also ab dem zweiten Öffnen zu sehen.
//
// Deine Einträge liegen NICHT hier, sondern im localStorage (siehe index.html).

const CACHE = "feel-v1";   // nur ändern, wenn Dateien dazukommen oder wegfallen
const DATEIEN = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

// Beim ersten Laden: alle Dateien in den Cache legen
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(DATEIEN)));
  self.skipWaiting();
});

// Alte Caches mit anderem Namen aufräumen
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((namen) => Promise.all(namen.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

// Jede Anfrage der App läuft hier durch
self.addEventListener("fetch", (event) => {
  const anfrage = event.request;
  if (anfrage.method !== "GET" || new URL(anfrage.url).origin !== self.location.origin) return;

  const ausDemNetz = fetch(anfrage).then(async (antwort) => {
    if (antwort.ok) {
      const cache = await caches.open(CACHE);
      await cache.put(anfrage, antwort.clone());
    }
    return antwort;
  });
  event.waitUntil(ausDemNetz.catch(() => {}));   // offline: einfach nichts auffrischen

  event.respondWith(
    caches.match(anfrage, { ignoreSearch: true }).then((treffer) => treffer || ausDemNetz)
  );
});
