# Feel – Gefühlsprotokoll

Kleine Web-App (PWA) zum schnellen Festhalten von Situation, Gedanke, Gefühlen und Körperempfindungen.
Alle Einträge bleiben im Browser auf dem Handy. Es gibt keinen Server, kein Konto und kein Tracking.

## So wird Feel benutzt

- **Check** (Startbildschirm): tagsüber in wenigen Sekunden festhalten, ob ein Moment angenehm (+),
  neutral (0) oder unangenehm (−) war, optional mit Stichwort. Antippen eines Checks: bearbeiten oder löschen.
- **Eintrag**: der vollständige Eintrag. Oben stehen die Checks des Tages aus „Wann“. Ein angetippter Check
  übernimmt Uhrzeit und (falls leer) Situation und wird als „ausgewählt“ markiert.
- **Liste**: alles nach Tagen. Einen Eintrag oder Check antippen, um ihn zu bearbeiten oder zu löschen.
- **Export**: Text für den Wochen-Chat (Checks pro Tag vor den Einträgen) und das **Backup**.

## Gespeicherte Daten

| Schlüssel im localStorage | Inhalt |
|---|---|
| `feel.eintraege.v1` | alle vollständigen Einträge |
| `feel.checks.v1` | alle Kurz-Checks |
| `feel.entwurf.v1` | das gerade halb ausgefüllte Eintrag-Formular |
| `feel.version` | Version der Datenstruktur (aktuell 2), für die Migration beim Start |
| `feel.sicherung.v1` | Sicherheitskopie der Einträge von vor der Migration auf Version 2 |
| `feel.letztesBackup` | Zeitpunkt des letzten JSON-Backups |

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

Mit Git: Änderungen committen und `git push origin main`.
Ohne Git: Im Repo **Add file** → **Upload files** → die geänderten Dateien hineinziehen (gleiche Namen überschreiben) → **Commit changes**.
Nach 1–2 Minuten ist die neue Version online. Beim nächsten Öffnen startet Feel noch mit der alten Version,
lädt die neue im Hintergrund und zeigt unten **„Neue Version geladen – tippen zum Aktualisieren“**.
Deine Einträge bleiben dabei erhalten.

Welche Version läuft, steht ganz unten unter **Export** („Feel · Version …“). Bei jeder Änderung
`APP_VERSION` in `index.html` hochzählen.

## Wo Daten verloren gehen können (Android / Chrome)

Einträge und Checks liegen im **localStorage** von Chrome für die Adresse `DEINNAME.github.io`.
Sie gehen verloren, wenn …

- in Chrome **Browserdaten löschen** mit „Cookies und Websitedaten“ ausgeführt wird;
- unter Android-Einstellungen → Apps → Chrome → Speicher **Speicher leeren** gedrückt wird;
- Chrome deinstalliert oder das Handy zurückgesetzt wird;
- die **Feel-App deinstalliert** wird: Das kann die Daten mitlöschen, deshalb vorher ein Backup machen;
- du ein **neues Handy** einrichtest: Die Daten wandern nicht automatisch mit;
- du die App im **Inkognito-Tab** benutzt: Dort ist nach dem Schließen alles weg;
- sich die **Adresse ändert**, zum Beispiel weil du deinen GitHub-Benutzernamen änderst: Die alten Daten hängen an der alten Adresse.

Gut zu wissen: Auf Android teilen sich die installierte App und der normale Chrome-Tab mit derselben Adresse denselben Speicher.

**Schutz:** Unter **Export → Backup → Speichern** entsteht eine JSON-Datei mit allen Einträgen und Checks
(landet im Download-Ordner). Regelmäßig speichern und z. B. in Google Drive ablegen; die App zeigt an,
wann das letzte Backup war, und färbt den Hinweis rot, wenn es länger als 14 Tage her ist.
**Backup → Laden** fügt nur hinzu, was fehlt – vorhandene Einträge und Checks werden nie überschrieben.
Auch ältere Backups ohne Checks lassen sich laden.
