# Feel – Gefühlsprotokoll

Kleine Web-App (PWA) zum schnellen Festhalten von Situation, Gedanke, Gefühlen und Körperempfindungen.
Alle Einträge bleiben im Browser auf dem Handy. Es gibt keinen Server, kein Konto und kein Tracking.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | die ganze App: Aufbau (HTML), Aussehen (CSS), Logik (JavaScript) |
| `manifest.webmanifest` | Name, Icon, Farben: damit lässt sich die App „installieren“ |
| `sw.js` | Service Worker: speichert die App-Dateien, damit sie offline startet |
| `icon-192.png`, `icon-512.png` | App-Icons |

## Einrichtung auf GitHub Pages (einmalig)

1. Auf **github.com** einloggen, oben rechts **+** → **New repository**.
2. **Repository name:** `feel` · **Public** auswählen (für kostenloses GitHub Pages nötig; öffentlich ist nur der Code, nicht deine Einträge) · **Create repository**.
3. Auf der leeren Repo-Seite auf den Link **uploading an existing file** klicken.
4. Die fünf Dateien aus der Tabelle oben in das Fenster ziehen.
   Die Ordner `.claude` und diese `README.md` braucht es nicht, die README darf aber mit.
5. Unten auf **Commit changes** klicken. Ein „Commit“ ist ein gespeicherter Stand der Dateien.
6. Im Repo oben auf **Settings** → links **Pages**.
7. Unter **Build and deployment**: Source = **Deploy from a branch**, Branch = **main**, Ordner = **/ (root)** → **Save**.
8. 1–2 Minuten warten und die Seite neu laden. Oben steht dann
   **Your site is live at `https://DEINNAME.github.io/feel/`**.

## Auf dem Pixel installieren

1. Die Adresse in **Chrome** öffnen.
2. Menü **⋮** → **Zum Startbildschirm hinzufügen** → **Installieren**.
   Manchmal bietet Chrome das auch selbst unten als Leiste an.
3. Ab jetzt die App über das **Feel-Icon** öffnen. Sie läuft im Vollbild und ohne Adressleiste.
4. Offline-Test: Flugmodus an, Feel öffnen. Die App sollte normal starten.

## Eine neue Version hochladen

Im Repo **Add file** → **Upload files** → die geänderten Dateien hineinziehen (gleiche Namen überschreiben) → **Commit changes**.
Nach 1–2 Minuten ist die neue Version online. Auf dem Handy erscheint sie beim **zweiten** Öffnen der App:
Beim ersten Öffnen lädt sie im Hintergrund nach. Deine Einträge bleiben dabei erhalten.

## Wo Daten verloren gehen können (Android / Chrome)

Die Einträge liegen im **localStorage** von Chrome für die Adresse `DEINNAME.github.io`.
Sie gehen verloren, wenn …

- in Chrome **Browserdaten löschen** mit „Cookies und Websitedaten“ ausgeführt wird;
- unter Android-Einstellungen → Apps → Chrome → Speicher **Speicher leeren** gedrückt wird;
- Chrome deinstalliert oder das Handy zurückgesetzt wird;
- die **Feel-App deinstalliert** wird: Das kann die Daten mitlöschen, deshalb vorher ein Backup machen;
- du ein **neues Handy** einrichtest: Die Daten wandern nicht automatisch mit;
- du die App im **Inkognito-Tab** benutzt: Dort ist nach dem Schließen alles weg;
- sich die **Adresse ändert**, zum Beispiel weil du deinen GitHub-Benutzernamen änderst: Die alten Daten hängen an der alten Adresse.

Gut zu wissen: Auf Android teilen sich die installierte App und der normale Chrome-Tab mit derselben Adresse denselben Speicher.

**Schutz:** Ab Version 2 gibt es ein JSON-Backup. Dafür regelmäßig eine Sicherung machen und z. B. in Google Drive ablegen.
Bis dahin ist der wöchentliche Export deine Sicherung, zumindest als Text.
