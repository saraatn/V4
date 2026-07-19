/*
 * Networking Event recommendation feature.
 * Vanilla JS, no framework — matches the rest of this Marzipano tour's
 * structure. Depends on window.APP_DATA (data.js) and window.switchScene /
 * window.viewer (exposed by index.js).
 *
 * 13-Networking1 and 14-Networking2 are now real scenes inside the main
 * tour (see data.js), reached the same way as any other station. This
 * script no longer mounts a second Marzipano viewer or a separate
 * full-screen "networking event" page — instead it shows a recommendation
 * card overlaid on top of whichever of the two networking scenes the
 * visitor is currently standing in, based on the company/designation they
 * entered on the registration form (see handleFormSubmit in index.html).
 *
 * Called from index.js's updateProgressBar():
 *   - window.showNetworkingRecommendation(sceneId) when entering 13/14
 *   - window.closeNetworkingOverlay() when leaving them
 */
'use strict';

(function() {

  // ---------------------------------------------------------------------
  // Recommendation engine
  // ---------------------------------------------------------------------
  // Maps a registrant's designation to whichever real tour station is
  // most relevant to them. Matching is done on simple keyword lookup
  // against the free-text "Designation" field from the registration form.
  //
  // This is intentionally a simple, editable rules table rather than a
  // real backend lookup — no company/designation -> booth mapping was
  // supplied, so extend RULES below (or swap getRecommendedBooth for a
  // real API/Sheet call) once real mapping data exists. Company name is
  // captured and available on `user.company` for that future use, but
  // isn't currently factored into which station is recommended.
  var RULES = [
    {
      keywords: ["it", "tech", "engineer", "developer", "software", "digital", "data"],
      sceneId: "11-IoT",
      booth: "IoT Station",
      reason: "Based on your designation, our Internet of Things (IoT) setup shows how connected sensors and real-time data can plug directly into your workflows."
    },
    {
      keywords: ["operation", "logistic", "warehouse", "supply chain", "fulfilment", "fulfillment"],
      sceneId: "6-4-Way-Shuttle",
      booth: "4-Way Shuttle & Automated Reach Truck",
      reason: "Given your role in operations/logistics, the 4-Way Shuttle and Automated Reach Truck stations demonstrate storage density and material handling gains most relevant to you."
    },
    {
      keywords: ["sales", "business development", "marketing", "account"],
      sceneId: "9-LiBiao",
      booth: "LiBiao 3D-Sorting System",
      reason: "As someone in a client-facing role, the LiBiao 3D-Sorting System is a strong showcase piece — high accuracy and throughput that's easy to demonstrate to prospects."
    },
    {
      keywords: ["founder", "ceo", "coo", "cto", "director", "manager", "owner", "president", "vp", "head"],
      sceneId: "12-Nexus",
      booth: "Nexus Platform",
      reason: "As a decision-maker, Nexus gives you the clearest picture of how centralised data and workflow visibility can support your organisation end-to-end."
    },
    {
      keywords: ["finance", "account", "procurement"],
      sceneId: "3-AppSheet",
      booth: "AppSheet Scanner",
      reason: "For finance and procurement roles, AppSheet's digital inventory tracking cuts down manual paperwork and reconciliation errors."
    }
  ];

  var DEFAULT_RECOMMENDATION = {
    sceneId: "12-Nexus",
    booth: "Nexus Platform",
    reason: "Nexus is our central platform tying every station together — a great starting point no matter your role."
  };

  function getRegistrationData() {
    if (window.registrationData) return window.registrationData;
    try {
      var stored = sessionStorage.getItem("lites_registration");
      if (stored) return JSON.parse(stored);
    } catch (e) { /* ignore */ }
    return { name: "Guest", company: "", designation: "" };
  }

  function getRecommendedBooth(user) {
    var designation = (user.designation || "").toLowerCase();

    for (var i = 0; i < RULES.length; i++) {
      var rule = RULES[i];
      for (var j = 0; j < rule.keywords.length; j++) {
        if (designation.indexOf(rule.keywords[j]) !== -1) {
          return { sceneId: rule.sceneId, booth: rule.booth, reason: rule.reason };
        }
      }
    }
    return DEFAULT_RECOMMENDATION;
  }
  window.getRecommendedBooth = getRecommendedBooth;

  // ---------------------------------------------------------------------
  // DOM refs
  // ---------------------------------------------------------------------
  var networkingOverlay = document.getElementById('networking-overlay');
  var recommendationCardEl = document.getElementById('recommendation-card');
  var dismissRecommendationBtn = document.getElementById('dismiss-recommendation-btn');
  var boothNameEl = document.getElementById('recommended-booth-name');
  var boothReasonEl = document.getElementById('recommended-booth-reason');
  var goHereBtn = document.getElementById('go-here-btn');
  var overlayScrimEl = document.querySelector('.networking-overlay-scrim');

  var currentRecommendation = null;

  // ---------------------------------------------------------------------
  // Fill in the recommendation card from the registration data
  // ---------------------------------------------------------------------
  function renderRecommendation() {
    var user = getRegistrationData();
    currentRecommendation = getRecommendedBooth(user);

    if (boothNameEl) {
      boothNameEl.textContent = currentRecommendation.booth;
    }
    if (boothReasonEl) {
      boothReasonEl.textContent = currentRecommendation.reason;
    }
  }

  function clearBackgroundTint() {
    if (overlayScrimEl) {
      overlayScrimEl.classList.add('tint-off');
    }
  }

  // ---------------------------------------------------------------------
  // Show the recommendation card over whichever networking scene
  // (13-Networking1 / 14-Networking2) the visitor just stepped into.
  // Called from index.js's updateProgressBar() every time it happens,
  // so the recommendation reappears each time either scene is entered.
  // ---------------------------------------------------------------------
  function showNetworkingRecommendation(sceneId) {
    renderRecommendation();

    if (recommendationCardEl) {
      recommendationCardEl.classList.remove('dismissed');
    }
    if (overlayScrimEl) {
      overlayScrimEl.classList.remove('tint-off');
    }
    if (networkingOverlay) {
      networkingOverlay.classList.add('open');
    }
  }
  window.showNetworkingRecommendation = showNetworkingRecommendation;

  function closeNetworkingOverlay() {
    if (networkingOverlay) {
      networkingOverlay.classList.remove('open');
    }
  }
  window.closeNetworkingOverlay = closeNetworkingOverlay;

  // Dismiss just the recommendation card/text (× button), leaving the
  // visitor free to look around the networking scene without the tint.
  if (dismissRecommendationBtn) {
    dismissRecommendationBtn.addEventListener('click', function() {
      if (recommendationCardEl) {
        recommendationCardEl.classList.add('dismissed');
      }
      clearBackgroundTint();
    });
  }

  // "Take Me There" jumps the main tour straight to the recommended
  // station using index.js's exposed window.switchScene().
  if (goHereBtn) {
    goHereBtn.addEventListener('click', function() {
      if (currentRecommendation && typeof window.switchScene === 'function') {
        window.switchScene(currentRecommendation.sceneId);
      }
      closeNetworkingOverlay();
    });
  }

})();
