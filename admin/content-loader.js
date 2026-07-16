/*
 * Merges editor-managed station content (content.json, editable via /admin)
 * into window.APP_DATA (data.js) BEFORE index.js builds the tour.
 *
 * This keeps hotspot positions / scene wiring in data.js (safe, rarely
 * changes) while letting non-technical staff edit title/text/video per
 * event through the CMS, without touching code.
 *
 * Uses a synchronous XHR deliberately: index.js runs immediately as soon as
 * its <script> tag executes and reads window.APP_DATA synchronously, so the
 * merge must finish before that script tag is reached. content.json is tiny
 * (a few KB) and same-origin, so the blocking cost is negligible.
 */
(function () {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'content.json', false); // false = synchronous
    xhr.send(null);

    if (xhr.status !== 200 && xhr.status !== 0) {
      console.warn('content-loader: could not load content.json (status ' + xhr.status + '), using fallback text baked into data.js');
      return;
    }

    var parsed = JSON.parse(xhr.responseText);
    var stations = parsed.stations || [];

    var byKey = {};
    stations.forEach(function (s) {
      if (s && s.key) byKey[s.key] = s;
    });

    var scenes = (window.APP_DATA && window.APP_DATA.scenes) || [];
    scenes.forEach(function (scene) {
      (scene.infoHotspots || []).forEach(function (hotspot, i) {
        var key = scene.id + '-' + i;
        var override = byKey[key];
        if (override) {
          if (override.title) hotspot.title = override.title;
          if (override.text) hotspot.text = override.text;
          if (override.video) hotspot.video = override.video;
        }
      });
    });
  } catch (err) {
    console.warn('content-loader: failed to merge content.json, falling back to data.js defaults', err);
  }
})();
