/*
 * Post-tour Networking Event feature.
 * Vanilla JS, no framework — matches the rest of this Marzipano tour's
 * structure. Depends on nothing from index.js except being loaded after it
 * (and needs window.Marzipano + window.APP_DATA to already exist).
 *
 * Feature 3: placeholder recommendation engine, deliberately isolated from
 * the UI so it can later be swapped for a real Eventbrite/Supabase lookup
 * without touching any of the DOM code below.
 *
 * The 360 background is a second, independent Marzipano viewer mounted in
 * #networking-pano, reusing the existing Nexus tile set as a placeholder.
 * It's kept completely separate from the main tour's `viewer`/`scene`
 * objects in index.js so nothing here can affect tour navigation.
 */
'use strict';

(function() {

  // ---------------------------------------------------------------------
  // Recommendation engine (placeholder logic for now)
  // ---------------------------------------------------------------------
  function getRecommendedBooth(user) {
    return {
      booth: "AI Innovation Hub",
      reason: "Recommended because professionals with similar backgrounds usually find this booth most relevant."
    };
  }
  window.getRecommendedBooth = getRecommendedBooth;

  // ---------------------------------------------------------------------
  // Placeholder booth data for the 360 networking environment.
  // Swap titles/text/positions once the real photo + booth list exist.
  // ---------------------------------------------------------------------
  var BOOTHS = [
    { id: "booth-1", title: "Booth 1", yaw: -2.4, pitch: 0.15, text: "Placeholder booth — swap with real booth details later." },
    { id: "booth-2", title: "Booth 2", yaw: -1.2, pitch: 0.05, text: "Placeholder booth — swap with real booth details later." },
    { id: "booth-3", title: "Booth 3", yaw:  0.0, pitch: 0.10, text: "Placeholder booth — swap with real booth details later." },
    { id: "booth-4", title: "Booth 4", yaw:  1.2, pitch: 0.05, text: "Placeholder booth — swap with real booth details later." },
    { id: "booth-5", title: "Booth 5", yaw:  2.4, pitch: 0.15, text: "Placeholder booth — swap with real booth details later." }
  ];

  // ---------------------------------------------------------------------
  // DOM refs
  // ---------------------------------------------------------------------
  var navArrowLeftTour = document.getElementById('nav-arrow-left-tour');
  var navArrowRightTour = document.getElementById('nav-arrow-right-tour');
  var navArrowLeftNetworking = document.getElementById('nav-arrow-left-networking');
  var networkingOverlay = document.getElementById('networking-overlay');
  var recommendationCardEl = document.getElementById('recommendation-card');
  var dismissRecommendationBtn = document.getElementById('dismiss-recommendation-btn');
  var boothNameEl = document.getElementById('recommended-booth-name');
  var boothReasonEl = document.getElementById('recommended-booth-reason');
  var goHereBtn = document.getElementById('go-here-btn');
  var boothVisitCountEl = document.getElementById('booth-visit-count');
  var boothToastEl = document.getElementById('booth-toast');
  var panoEl = document.getElementById('networking-pano');
  var overlayScrimEl = document.querySelector('.networking-overlay-scrim');

  // ---------------------------------------------------------------------
  // Feature 1: show the right arrow once progress hits 100%.
  // Called from index.js's updateProgressBar().
  // ---------------------------------------------------------------------
  function showNetworkingButton() {
    if (navArrowRightTour) {
      navArrowRightTour.classList.add('visible');
    }
  }
  window.showNetworkingButton = showNetworkingButton;

  // ---------------------------------------------------------------------
  // Feature 3: fill in the recommendation card from the (placeholder) engine
  // ---------------------------------------------------------------------
  function renderRecommendation() {
    // Placeholder registrant — swap this for real registration data later
    // (see handleFormSubmit in index.html for where guest-name/org/designation
    // are currently captured but not yet stored anywhere).
    var user = {
      name: "Guest",
      company: "",
      designation: ""
    };

    var recommendation = getRecommendedBooth(user);

    if (boothNameEl) {
      boothNameEl.textContent = recommendation.booth;
    }
    if (boothReasonEl) {
      boothReasonEl.textContent = recommendation.reason;
    }
  }

  // ---------------------------------------------------------------------
  // Booth visit counter (mirrors the visitedScenes pattern in index.js)
  // ---------------------------------------------------------------------
  var visitedBooths = new Set();

  function updateBoothCounter() {
    if (boothVisitCountEl) {
      boothVisitCountEl.textContent = visitedBooths.size;
    }
  }

  var toastTimer = null;
  function showBoothToast(booth) {
    if (!boothToastEl) return;
    boothToastEl.textContent = booth.title + " — " + booth.text;
    boothToastEl.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {
      boothToastEl.classList.remove('visible');
    }, 3000);
  }

  function visitBooth(booth) {
    visitedBooths.add(booth.id);
    updateBoothCounter();
    showBoothToast(booth);
  }

  // ---------------------------------------------------------------------
  // 360 networking pano (separate Marzipano viewer instance)
  // ---------------------------------------------------------------------
  var networkingViewer = null;
  var networkingScene = null;
  var networkingPanoReady = false;

  function createBoothHotspotElement(booth) {
    var wrapper = document.createElement('div');
    wrapper.classList.add('booth-hotspot');

    var iconWrapper = document.createElement('div');
    iconWrapper.classList.add('booth-hotspot-icon-wrapper');
    iconWrapper.setAttribute('title', booth.title);
    iconWrapper.textContent = booth.title.replace('Booth ', '');
    wrapper.appendChild(iconWrapper);

    wrapper.addEventListener('click', function(event) {
      event.stopPropagation();
      visitBooth(booth);
    });

    return wrapper;
  }

  function initNetworkingPano() {
    if (networkingPanoReady) return;
    if (!panoEl || !window.Marzipano || !window.APP_DATA) return;

    // Reuse the Nexus scene's tile config as the placeholder 360 background.
    var nexusData = null;
    for (var i = 0; i < window.APP_DATA.scenes.length; i++) {
      if (window.APP_DATA.scenes[i].id === '0-01nexus') {
        nexusData = window.APP_DATA.scenes[i];
        break;
      }
    }
    if (!nexusData) return;

    networkingViewer = new Marzipano.Viewer(panoEl, {
      controls: { mouseViewMode: 'drag' }
    });

    var source = Marzipano.ImageUrlSource.fromString(
      'tiles/' + nexusData.id + '/{z}/{f}/{y}/{x}.jpg',
      { cubeMapPreviewUrl: 'tiles/' + nexusData.id + '/preview.jpg' }
    );
    var geometry = new Marzipano.CubeGeometry(nexusData.levels);
    var limiter = Marzipano.RectilinearView.limit.traditional(
      nexusData.faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180
    );
    var view = new Marzipano.RectilinearView(nexusData.initialViewParameters, limiter);

    networkingScene = networkingViewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true
    });
    networkingScene.switchTo();

    BOOTHS.forEach(function(booth) {
      var el = createBoothHotspotElement(booth);
      networkingScene.hotspotContainer().createHotspot(el, { yaw: booth.yaw, pitch: booth.pitch });
    });

    networkingPanoReady = true;
  }

  // Simple ease-out pan, used by the "Go Here" button so the jump to a
  // booth doesn't feel like a hard cut. Wraps yaw the short way around.
  function panTo(view, targetYaw, targetPitch, duration) {
    var start = view.parameters();
    var startTime = null;

    var yawDelta = targetYaw - start.yaw;
    while (yawDelta > Math.PI) yawDelta -= 2 * Math.PI;
    while (yawDelta < -Math.PI) yawDelta += 2 * Math.PI;
    var pitchDelta = targetPitch - start.pitch;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      view.setParameters({
        yaw: start.yaw + yawDelta * eased,
        pitch: start.pitch + pitchDelta * eased,
        fov: start.fov
      });
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  function clearBackgroundTint() {
    if (overlayScrimEl) {
      overlayScrimEl.classList.add('tint-off');
    }
  }

  // ---------------------------------------------------------------------
  // Feature 2: open/close the full-screen networking overlay
  // ---------------------------------------------------------------------
  function openNetworkingOverlay() {
    renderRecommendation();

    // Reset the recommendation card and background tint back to their
    // default (visible/dimmed) state each time the overlay is reopened,
    // even if they were dismissed/cleared last visit.
    if (recommendationCardEl) {
      recommendationCardEl.classList.remove('dismissed');
    }
    if (overlayScrimEl) {
      overlayScrimEl.classList.remove('tint-off');
    }

    if (networkingOverlay) {
      networkingOverlay.classList.add('open');
    }

    // Pause the main tour's pano while the overlay is open so drags/scroll
    // don't leak through to the simulator underneath.
    if (window.viewer && typeof window.viewer.stopMovement === 'function') {
      window.viewer.stopMovement();
    }

    // Lazy-init the networking pano on first open (not at page load) to
    // avoid loading a second set of tiles until it's actually needed.
    initNetworkingPano();
  }
  window.openNetworkingOverlay = openNetworkingOverlay;

  function closeNetworkingOverlay() {
    if (networkingOverlay) {
      networkingOverlay.classList.remove('open');
    }
  }
  window.closeNetworkingOverlay = closeNetworkingOverlay;

  // Main tour view: left arrow -> back to registration, right arrow -> networking.
  if (navArrowLeftTour) {
    navArrowLeftTour.addEventListener('click', function() {
      var welcomeOverlay = document.getElementById('welcome-overlay');
      if (welcomeOverlay) {
        welcomeOverlay.style.display = 'flex';
        // Force a reflow so removing .fade-out re-triggers the CSS
        // transition (it was set to display:none by handleFormSubmit).
        void welcomeOverlay.offsetWidth;
        welcomeOverlay.classList.remove('fade-out');
      }
    });
  }
  if (navArrowRightTour) {
    navArrowRightTour.addEventListener('click', openNetworkingOverlay);
  }

  // Networking view: only a left arrow, back to the tour.
  if (navArrowLeftNetworking) {
    navArrowLeftNetworking.addEventListener('click', closeNetworkingOverlay);
  }

  // Dismiss just the recommendation card (title/intro text is inside it
  // now, so it all disappears together) and clear the background tint.
  if (dismissRecommendationBtn) {
    dismissRecommendationBtn.addEventListener('click', function() {
      if (recommendationCardEl) {
        recommendationCardEl.classList.add('dismissed');
      }
      clearBackgroundTint();
    });
  }

  // "Go Here" always targets Booth 1 for now, matching the (currently
  // hardcoded) recommendation. Once getRecommendedBooth() returns a real
  // booth id, swap this lookup to match it instead of BOOTHS[0].
  if (goHereBtn) {
    goHereBtn.addEventListener('click', function() {
      var target = BOOTHS[0];
      if (networkingScene) {
        panTo(networkingScene.view(), target.yaw, target.pitch, 900);
      }
      visitBooth(target);
      clearBackgroundTint();
    });
  }

})();
