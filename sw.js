// Service Worker: legt die App-Dateien im Cache (Zwischenspeicher) ab,
// damit Feel auch ohne Internet startet.
//
// Strategie "aus dem Cache, im Hintergrund auffrischen":
// Die App startet sofort aus dem Cache. Gleichzeitig fragt der Service Worker
// online bei GitHub nach der neuesten Version und legt sie für den nächsten
// Start ab. Hat sich die App geändert, bekommt die geöffnete Seite Bescheid
// und zeigt "Neue Version geladen – tippen zum Aktualisieren".
//
// Deine Einträge liegen NICHT hier, sondern im localStorage (siehe index.html).

const CACHE = "feel-v1";   // nur ändern, wenn Dateien dazukommen oder wegfallen
const DATEIEN = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

// Beim ersten Laden: alle Dateien in den Cache legen.
// cache: "reload" holt sie wirklich vom Server statt aus dem Browser-Zwischenspeicher.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      cache.addAll(DATEIEN.map((datei) => new Request(datei, { cache: "reload" }))))
  );
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

// Allen offenen Feel-Fenstern eine Nachricht schicken
async function fensterBenachrichtigen(nachricht) {
  const fenster = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
  for (const f of fenster) f.postMessage(nachricht);
}

// Jede Anfrage der App läuft hier durch
self.addEventListener("fetch", (event) => {
  const anfrage = event.request;
  if (anfrage.method !== "GET" || new URL(anfrage.url).origin !== self.location.origin) return;

  const ausDemCache = caches.match(anfrage, { ignoreSearch: true });

  // cache: "no-cache" = beim Server nachfragen, ob es eine neuere Datei gibt.
  // Ohne das nimmt der Browser bis zu 10 Minuten lang eine zwischengespeicherte
  // Kopie (so stellt GitHub Pages es ein) und das Update kommt verspätet an.
  const ausDemNetz = fetch(anfrage.url, { cache: "no-cache" }).then(async (antwort) => {
    if (antwort.ok) {
      const alt = await ausDemCache;
      const cache = await caches.open(CACHE);
      await cache.put(anfrage, antwort.clone());
      // Die Seite selbst (index.html) hat sich geändert: Bescheid geben.
      // Das ETag ist eine Art Fingerabdruck der Datei, den der Server mitschickt.
      const neu = antwort.headers.get("ETag");
      if (anfrage.mode === "navigate" && alt && neu && alt.headers.get("ETag") !== neu) {
        await fensterBenachrichtigen("neue-version");
      }
    }
    return antwort;
  });
  event.waitUntil(ausDemNetz.catch(() => {}));   // offline: einfach nichts auffrischen

  event.respondWith(ausDemCache.then((treffer) => treffer || ausDemNetz));
});
