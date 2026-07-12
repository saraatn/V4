/*
 * Post-tour Networking Event feature.
 * Vanilla JS, no framework — matches the rest of this Marzipano tour's
 * structure. Depends on nothing from index.js except being loaded after it.
 *
 * Feature 3: placeholder recommendation engine, deliberately isolated from
 * the UI so it can later be swapped for a real Eventbrite/Supabase lookup
 * without touching any of the DOM code below.
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
  // DOM refs
  // ---------------------------------------------------------------------
  var networkingBtn = document.getElementById('networking-btn');
  var networkingOverlay = document.getElementById('networking-overlay');
  var networkingCloseBtn = document.getElementById('networking-close-btn');
  var boothNameEl = document.getElementById('recommended-booth-name');
  var boothReasonEl = document.getElementById('recommended-booth-reason');

  // ---------------------------------------------------------------------
  // Feature 1: show the button once progress hits 100%.
  // Called from index.js's updateProgressBar().
  // ---------------------------------------------------------------------
  function showNetworkingButton() {
    if (networkingBtn) {
      networkingBtn.classList.add('visible');
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
  // Feature 2: open/close the full-screen networking overlay
  // ---------------------------------------------------------------------
  function openNetworkingOverlay() {
    renderRecommendation();

    if (networkingOverlay) {
      networkingOverlay.classList.add('open');
    }

    // Pause pano interaction while the overlay is open so drags/scroll
    // don't leak through to the simulator underneath.
    if (window.viewer && typeof window.viewer.stopMovement === 'function') {
      window.viewer.stopMovement();
    }
  }

  function closeNetworkingOverlay() {
    if (networkingOverlay) {
      networkingOverlay.classList.remove('open');
    }
  }
  window.closeNetworkingOverlay = closeNetworkingOverlay;

  if (networkingBtn) {
    networkingBtn.addEventListener('click', openNetworkingOverlay);
  }
  if (networkingCloseBtn) {
    networkingCloseBtn.addEventListener('click', closeNetworkingOverlay);
  }

})();
