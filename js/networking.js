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
 *   - window.onTourCompleted(sceneId) exactly once, at 100% tour completion
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
  // The 5 real booths inside the networking segment (13-Networking1 /
  // 14-Networking2 — see the infoHotspots in data.js, matched here by
  // boothId). yaw/pitch mirror those hotspots so "Take Me There" can look
  // straight at the recommended booth after switching scenes.
  var BOOTHS = [
    { boothId: "sustainability",      name: "Sustainability",       sceneId: "13-Networking1", yaw: -1.8, pitch: 0.05 },
    { boothId: "optimisation",        name: "Optimisation",         sceneId: "13-Networking1", yaw: -0.3, pitch: 0.05 },
    { boothId: "workplace-learning",  name: "Workplace Learning",   sceneId: "13-Networking1", yaw: 1.35, pitch: 0.05 },
    { boothId: "supply-chain-ai",     name: "Supply Chain AI",      sceneId: "14-Networking2", yaw: -1.0, pitch: 0.05 },
    { boothId: "digitalisation",      name: "Digitalisation",       sceneId: "14-Networking2", yaw: 0.8,  pitch: 0.05 }
  ];
  window.NETWORKING_BOOTHS = BOOTHS;

  var RULES = [
    {
      keywords: ["it", "tech", "engineer", "developer", "software", "digital", "data"],
      boothId: "digitalisation",
      reason: "Based on your designation, the Digitalisation booth shows how connected, paperless workflows can plug directly into your systems."
    },
    {
      keywords: ["operation", "logistic", "warehouse", "supply chain", "fulfilment", "fulfillment"],
      boothId: "supply-chain-ai",
      reason: "Given your role in operations/logistics, the Supply Chain AI booth demonstrates forecasting and anomaly detection most relevant to you."
    },
    {
      keywords: ["sales", "business development", "marketing", "account"],
      boothId: "optimisation",
      reason: "As someone in a client-facing role, the Optimisation booth is a strong showcase piece — measurable routing and scheduling gains that are easy to demonstrate to prospects."
    },
    {
      keywords: ["founder", "ceo", "coo", "cto", "director", "manager", "owner", "president", "vp", "head"],
      boothId: "workplace-learning",
      reason: "As a decision-maker, Workplace Learning gives you a clear picture of how upskilling your teams supports adoption of new systems end-to-end."
    },
    {
      keywords: ["finance", "account", "procurement", "sustainability", "esg", "environment"],
      boothId: "sustainability",
      reason: "For finance, procurement, and ESG-minded roles, the Sustainability booth ties operational efficiency directly to cost and environmental impact."
    }
  ];

  var DEFAULT_RECOMMENDATION_BOOTH_ID = "sustainability";

  function findBooth(boothId) {
    for (var i = 0; i < BOOTHS.length; i++) {
      if (BOOTHS[i].boothId === boothId) return BOOTHS[i];
    }
    return BOOTHS[0];
  }

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
          var matched = findBooth(rule.boothId);
          return {
            boothId: matched.boothId,
            sceneId: matched.sceneId,
            booth: matched.name,
            yaw: matched.yaw,
            pitch: matched.pitch,
            reason: rule.reason
          };
        }
      }
    }
    var fallback = findBooth(DEFAULT_RECOMMENDATION_BOOTH_ID);
    return {
      boothId: fallback.boothId,
      sceneId: fallback.sceneId,
      booth: fallback.name,
      yaw: fallback.yaw,
      pitch: fallback.pitch,
      reason: "Sustainability is a great starting point no matter your role — a look at how efficiency and environmental impact tie together."
    };
  }
  window.getRecommendedBooth = getRecommendedBooth;

  // ---------------------------------------------------------------------
  // DOM refs
  // ---------------------------------------------------------------------
  var networkingOverlay = document.getElementById('networking-overlay');
  var recommendationCardEl = document.getElementById('recommendation-card');
  var dismissRecommendationBtn = document.getElementById('dismiss-recommendation-btn');
  var cardTitleEl = document.getElementById('networking-card-title');
  var cardWelcomeEl = document.getElementById('networking-card-welcome');
  var boothListEl = document.getElementById('networking-booth-list');
  var boothNameEl = document.getElementById('recommended-booth-name');
  var boothReasonEl = document.getElementById('recommended-booth-reason');
  var goHereBtn = document.getElementById('go-here-btn');
  var overlayScrimEl = document.querySelector('.networking-overlay-scrim');

  var currentRecommendation = null;
  var completionMessageShown = false;

  // ---------------------------------------------------------------------
  // Fill in the recommendation card from the registration data, and list
  // out all 5 booths (highlighting the recommended one) the first time
  // this shows right after finishing the tour.
  // ---------------------------------------------------------------------
  function renderRecommendation(showCompletionCopy) {
    var user = getRegistrationData();
    currentRecommendation = getRecommendedBooth(user);

    if (showCompletionCopy) {
      if (cardTitleEl) {
        cardTitleEl.textContent = "You've finished the LITES tour! \uD83C\uDF89";
      }
      if (cardWelcomeEl) {
        cardWelcomeEl.innerHTML =
          "Explore the networking session below. Based on your company and designation, " +
          "we suggest you go to this booth:";
      }
      if (boothListEl) {
        boothListEl.innerHTML = '';
        BOOTHS.forEach(function(b) {
          var li = document.createElement('li');
          li.textContent = b.name;
          if (b.boothId === currentRecommendation.boothId) {
            li.classList.add('is-recommended');
            li.textContent = b.name + ' \u2b50';
          }
          boothListEl.appendChild(li);
        });
        boothListEl.style.display = '';
      }
    } else {
      if (cardTitleEl) {
        cardTitleEl.textContent = "Networking Event";
      }
      if (cardWelcomeEl) {
        cardWelcomeEl.innerHTML =
          "Welcome to our Networking Event!<br>" +
          "Based on your company and designation, we recommend visiting the following booth.";
      }
      if (boothListEl) {
        boothListEl.style.display = 'none';
      }
    }

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
  function showNetworkingRecommendation(sceneId, showCompletionCopy) {
    renderRecommendation(!!showCompletionCopy);

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

  // ---------------------------------------------------------------------
  // Called exactly once by index.js's updateProgressBar() the moment the
  // main LITES tour progress bar hits 100%. Shows the completion copy +
  // full 5-booth list (with the recommended one highlighted) instead of
  // the regular recurring recommendation card.
  // ---------------------------------------------------------------------
  function onTourCompleted(sceneId) {
    if (completionMessageShown) return;
    completionMessageShown = true;
    showNetworkingRecommendation(sceneId, true);
  }
  window.onTourCompleted = onTourCompleted;

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
        var viewParams = (typeof currentRecommendation.yaw === 'number')
          ? { yaw: currentRecommendation.yaw, pitch: currentRecommendation.pitch, fov: 1.4469324312346197 }
          : undefined;
        window.switchScene(currentRecommendation.sceneId, viewParams);
      }
      closeNetworkingOverlay();
    });
  }

})();
