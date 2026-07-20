/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

(function() {
  var Marzipano = window.Marzipano;
  var bowser = window.bowser;
  var screenfull = window.screenfull;
  var data = window.APP_DATA;

  // Track visited scenes to update the progress bar.
  // Scenes flagged excludeFromProgress (the two networking scenes) don't
  // count towards the denominator or numerator — finishing the main LITES
  // tour itself is what should drive the bar to 100%, not visiting the
  // networking segment it unlocks.
  var visitedScenes = new Set();
  var progressBar = document.querySelector('#progress-bar');
  var tourCompleted = false;
  var pendingCompletionAnnouncement = false;
  var navArrowLeftTour = document.querySelector('#nav-arrow-left-tour');
  var navArrowRightTour = document.querySelector('#nav-arrow-right-tour');

  // Grab elements from DOM.
  var panoElement = document.querySelector('#pano');
  var sceneNameElement = document.querySelector('#titleBar .sceneName');
  var sceneListElement = document.querySelector('#sceneList');
  var sceneElements = document.querySelectorAll('#sceneList .scene');
  var sceneListToggleElement = document.querySelector('#sceneListToggle');
  var autorotateToggleElement = document.querySelector('#autorotateToggle');
  var fullscreenToggleElement = document.querySelector('#fullscreenToggle');

  // Detect desktop or mobile mode.
  if (window.matchMedia) {
    var setMode = function() {
      if (mql.matches) {
        document.body.classList.remove('desktop');
        document.body.classList.add('mobile');
      } else {
        document.body.classList.remove('mobile');
        document.body.classList.add('desktop');
      }
    };
    var mql = matchMedia("(max-width: 500px), (max-height: 500px)");
    setMode();
    mql.addListener(setMode);
  } else {
    document.body.classList.add('desktop');
  }

  // Detect whether we are on a touch device.
  document.body.classList.add('no-touch');
  window.addEventListener('touchstart', function() {
    document.body.classList.remove('no-touch');
    document.body.classList.add('touch');
  });

  // Use tooltip fallback mode on IE < 11.
  if (bowser.msie && parseFloat(bowser.version) < 11) {
    document.body.classList.add('tooltip-fallback');
  }

  // Viewer options.
  var viewerOpts = {
    controls: {
      mouseViewMode: data.settings.mouseViewMode
    }
  };

  // Initialize viewer.
  var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

  // Create scenes.
  //
  // NOTE: scenes are now built from single flat equirectangular (2:1) JPGs
  // living in tiles/<file>, NOT from cube-face tile pyramids. Each scene in
  // data.js has a "file" property pointing at its equirect image. We use
  // Marzipano's EquirectGeometry + a plain (non-templated) ImageUrlSource,
  // which tells Marzipano to load the whole image as a single texture
  // instead of requesting tiled cube faces.
  var EQUIRECT_IMAGE_WIDTH = 5952; // matches the source photos (5952x2976)

  var scenes = data.scenes.map(function(data) {
    var urlPrefix = "tiles";

    var source = Marzipano.ImageUrlSource.fromString(
      urlPrefix + "/" + data.file
    );

    var geometry = new Marzipano.EquirectGeometry([{ width: EQUIRECT_IMAGE_WIDTH }]);

    var limiter = Marzipano.RectilinearView.limit.traditional(EQUIRECT_IMAGE_WIDTH, 100*Math.PI/180, 120*Math.PI/180);
    var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

    var scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true
    });

    // Create link hotspots.
    data.linkHotspots.forEach(function(hotspot) {
      var element = createLinkHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    // Create info hotspots (the pulsing green video buttons).
    data.infoHotspots.forEach(function(hotspot) {
      var element = createInfoHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    return {
      data: data,
      scene: scene,
      view: view
    };
  });

  // Scenes that count towards main-tour completion (i.e. everything except
  // the networking segment, which is unlocked BY completion rather than
  // being part of it).
  var countableScenes = scenes.filter(function(s) { return !s.data.excludeFromProgress; });

  // Expose scenes/viewer + a real global switchScene so other scripts
  // (e.g. the welcome overlay / floorplan script in index.html) can hook in
  // without re-implementing scene switching themselves.
  window.viewer = viewer;
  window.APP_SCENES = scenes;
  window.switchScene = function(sceneOrId, viewParams) {
    var target = typeof sceneOrId === 'string' ? findSceneById(sceneOrId) : sceneOrId;
    if (target) switchScene(target, viewParams);
  };

  // Set up autorotate, if enabled.
  var autorotate = Marzipano.autorotate({
    yawSpeed: 0.03,
    targetPitch: 0,
    targetFov: Math.PI/2
  });

  // FORCE DISABLE IT HERE:
  data.settings.autorotateEnabled = false;

  if (data.settings.autorotateEnabled) {
    autorotateToggleElement.classList.add('enabled');
  }

  // Set handler for autorotate toggle.
  autorotateToggleElement.addEventListener('click', toggleAutorotate);

  // Set up fullscreen mode, if supported.
  if (screenfull.enabled && data.settings.fullscreenButton) {
    document.body.classList.add('fullscreen-enabled');
    fullscreenToggleElement.addEventListener('click', function() {
      screenfull.toggle();
    });
    screenfull.on('change', function() {
      if (screenfull.isFullscreen) {
        fullscreenToggleElement.classList.add('enabled');
      } else {
        fullscreenToggleElement.classList.remove('enabled');
      }
    });
  } else {
    document.body.classList.add('fullscreen-disabled');
  }

  // Set handler for scene list toggle.
  sceneListToggleElement.addEventListener('click', toggleSceneList);

  // Start with the scene list open on desktop.
  if (!document.body.classList.contains('mobile')) {
    showSceneList();
  }

  // Set handler for scene switch.
  scenes.forEach(function(scene) {
    var el = document.querySelector('#sceneList .scene[data-id="' + scene.data.id + '"]');
    if (el) {
      el.addEventListener('click', function() {
        switchScene(scene);
        if (document.body.classList.contains('mobile')) {
          hideSceneList();
        }
      });
    }
  });

  // ==========================================================================
  // 2D FLOOR PLAN MAP INTERACTION LOOP
  // (this is the ONLY floorplan-dot click handler now; the duplicate one
  // that used to live in index.html has been removed)
  // ==========================================================================
  const mapDots = document.querySelectorAll('.map-dot');
  mapDots.forEach(function(dot) {
    dot.addEventListener('click', function() {
      const targetSceneId = this.getAttribute('data-scene');

      const targetScene = scenes.find(function(s) {
        return s.data.id === targetSceneId;
      });

      if (targetScene) {
        switchScene(targetScene);
      } else {
        console.warn("Scene ID tracking mismatch: " + targetSceneId);
      }
    });
  });

  // DOM elements for view controls.
  var viewUpElement = document.querySelector('#viewUp');
  var viewDownElement = document.querySelector('#viewDown');
  var viewLeftElement = document.querySelector('#viewLeft');
  var viewRightElement = document.querySelector('#viewRight');
  var viewInElement = document.querySelector('#viewIn');
  var viewOutElement = document.querySelector('#viewOut');

  // Dynamic parameters for controls.
  var velocity = 0.7;
  var friction = 3;

  // Associate view controls with elements.
  var controls = viewer.controls();
  controls.registerMethod('upElement',    new Marzipano.ElementPressControlMethod(viewUpElement,     'y', -velocity, friction), true);
  controls.registerMethod('downElement',  new Marzipano.ElementPressControlMethod(viewDownElement,   'y',  velocity, friction), true);
  controls.registerMethod('leftElement',  new Marzipano.ElementPressControlMethod(viewLeftElement,   'x', -velocity, friction), true);
  controls.registerMethod('rightElement', new Marzipano.ElementPressControlMethod(viewRightElement,  'x',  velocity, friction), true);
  controls.registerMethod('inElement',    new Marzipano.ElementPressControlMethod(viewInElement,     'zoom', -velocity, friction), true);
  controls.registerMethod('outElement',   new Marzipano.ElementPressControlMethod(viewOutElement,    'zoom',  velocity, friction), true);

  function sanitize(s) {
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
  }

  function switchScene(scene, viewParams) {
    stopAutorotate();
    scene.view.setParameters(viewParams || scene.data.initialViewParameters);
    scene.scene.switchTo();
    startAutorotate();
    updateSceneName(scene);
    updateSceneList(scene);
    updateProgressBar(scene);

    // NEW — notify the chatbot integration of the new scene
    if (typeof window.onStationChanged === 'function') {
      window.onStationChanged(scene);
    }
}

  function updateSceneName(scene) {
    if (sceneNameElement) {
      sceneNameElement.innerHTML = sanitize(scene.data.name || "Transition Point");
    }
  }

  function updateSceneList(scene) {
    for (var i = 0; i < sceneElements.length; i++) {
      var el = sceneElements[i];
      if (el.getAttribute('data-id') === scene.data.id) {
        el.classList.add('current');
      } else {
        el.classList.remove('current');
      }
    }
  }

  function updateProgressBar(scene) {
    if (progressBar) {
      visitedScenes.add(scene.data.id);

      // Only count visits to non-networking scenes towards the bar.
      var visitedCountable = 0;
      visitedScenes.forEach(function(id) {
        var sceneData = findSceneDataById(id);
        if (sceneData && !sceneData.excludeFromProgress) visitedCountable++;
      });
      var percentage = (visitedCountable / countableScenes.length) * 100;
      progressBar.style.width = percentage + '%';

      // The moment the main LITES tour hits 100%, unlock + reveal the
      // right nav arrow and auto-jump into the networking segment with a
      // one-time completion message. Guarded by tourCompleted so this only
      // ever fires once per session, however many times 100% is re-touched
      // (e.g. bouncing back into the tour from networking later).
      var isNetworkingScene = (scene.data.id === '13-Networking1' || scene.data.id === '14-Networking2');

      if (percentage >= 100 && !tourCompleted) {
        tourCompleted = true;
        if (navArrowRightTour) navArrowRightTour.classList.add('visible');

        if (!isNetworkingScene) {
          var networkingScene = findSceneById('13-Networking1');
          if (networkingScene) {
            // Not there yet — jump in, and flag that the *next* time we
            // land on a networking scene it should show the one-time
            // completion message rather than the regular recurring card.
            // Small delay so the progress bar's own fill animation has a
            // beat to register before the jump.
            pendingCompletionAnnouncement = true;
            setTimeout(function() { switchScene(networkingScene); }, 400);
          }
        } else if (typeof window.onTourCompleted === 'function') {
          // Already standing in a networking scene when 100% was reached —
          // show the completion message immediately, and skip the regular
          // recommendation call below for this same invocation.
          window.onTourCompleted(scene.data.id);
          isNetworkingScene = false;
        }
      }

      // Networking recommendation hook: fires every time the visitor steps
      // into either networking station. Defined in js/networking.js;
      // guarded so this file still works standalone if that script isn't
      // loaded.
      if (isNetworkingScene) {
        if (pendingCompletionAnnouncement && typeof window.onTourCompleted === 'function') {
          pendingCompletionAnnouncement = false;
          window.onTourCompleted(scene.data.id);
        } else if (typeof window.showNetworkingRecommendation === 'function') {
          window.showNetworkingRecommendation(scene.data.id);
        }
      } else if (typeof window.closeNetworkingOverlay === 'function') {
        // Leaving the networking stations closes the recommendation card
        // so it doesn't linger over unrelated scenes.
        window.closeNetworkingOverlay();
      }
    }
  }

  function showSceneList() {
    if (sceneListElement && sceneListToggleElement) {
      sceneListElement.classList.add('enabled');
      sceneListToggleElement.classList.add('enabled');
    }
  }

  function hideSceneList() {
    if (sceneListElement && sceneListToggleElement) {
      sceneListElement.classList.remove('enabled');
      sceneListToggleElement.classList.remove('enabled');
    }
  }

  function toggleSceneList() {
    if (sceneListElement && sceneListToggleElement) {
      sceneListElement.classList.toggle('enabled');
      sceneListToggleElement.classList.toggle('enabled');
    }
  }

  function startAutorotate() {
    // FORCE INTERCEPT: Prevents scene switcher loops from setting camera in motion
    return;

    if (!autorotateToggleElement || !autorotateToggleElement.classList.contains('enabled')) {
      return;
    }
    viewer.startMovement(autorotate);
    viewer.setIdleMovement(3000, autorotate);
  }

  function stopAutorotate() {
    viewer.stopMovement();
    viewer.setIdleMovement(Infinity);
  }

  function toggleAutorotate() {
    if (!autorotateToggleElement) return;
    if (autorotateToggleElement.classList.contains('enabled')) {
      autorotateToggleElement.classList.remove('enabled');
      stopAutorotate();
    } else {
      autorotateToggleElement.classList.add('enabled');
      startAutorotate();
    }
  }

  function createLinkHotspotElement(hotspot) {
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('link-hotspot');

    var icon = document.createElement('img');
    icon.src = 'img/link.png';
    icon.classList.add('link-hotspot-icon');

    var transformProperties = [ '-ms-transform', '-webkit-transform', 'transform' ];
    for (var i = 0; i < transformProperties.length; i++) {
      var property = transformProperties[i];
      icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
    }

    wrapper.addEventListener('click', function() {
      switchScene(findSceneById(hotspot.target));
    });

    stopTouchAndScrollEventPropagation(wrapper);

    var tooltip = document.createElement('div');
    tooltip.classList.add('hotspot-tooltip');
    tooltip.classList.add('link-hotspot-tooltip');
    tooltip.innerHTML = findSceneDataById(hotspot.target).name || "Transition Point";

    wrapper.appendChild(icon);
    wrapper.appendChild(tooltip);

    return wrapper;
  }

  // Info hotspot = the dark circular "i" button (styled in style.css via
  // .info-hotspot / .info-hotspot-icon-wrapper) that opens the video modal
  // defined in index.html (#video-modal-overlay). This is now the ONLY
  // place info hotspots are created — no more duplicate hotspot system
  // living in index.html.
  function createInfoHotspotElement(hotspot) {
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('info-hotspot');

    var iconWrapper = document.createElement('div');
    iconWrapper.classList.add('info-hotspot-icon-wrapper');

    if (hotspot.title) {
      iconWrapper.setAttribute('title', hotspot.title);
    }

    var icon = document.createElement('img');
    icon.src = 'img/info.png';
    icon.classList.add('info-hotspot-icon');
    iconWrapper.appendChild(icon);
    wrapper.appendChild(iconWrapper);

    iconWrapper.addEventListener('click', function(event) {
      event.stopPropagation();
      if (typeof window.openVideoModal === 'function' && (hotspot.video || hotspot.text)) {
        window.openVideoModal(hotspot.title, hotspot.video, hotspot.text);
      }
    });

    stopTouchAndScrollEventPropagation(wrapper);

    return wrapper;
  }

  function stopTouchAndScrollEventPropagation(element) {
    var eventList = [ 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'wheel', 'mousewheel' ];
    for (var i = 0; i < eventList.length; i++) {
      element.addEventListener(eventList[i], function(event) {
        event.stopPropagation();
      });
    }
  }

  function findSceneById(id) {
    for (var i = 0; i < scenes.length; i++) {
      if (scenes[i].data.id === id) {
        return scenes[i];
      }
    }
    return null;
  }

  function findSceneDataById(id) {
    for (var i = 0; i < data.scenes.length; i++) {
      if (data.scenes[i].id === id) {
        return data.scenes[i];
      }
    }
    return {};
  }

  // ---- Left/right nav arrows (main tour view) ----
  // Left: always available, reopens the registration form.
  // Right: hidden until tourCompleted flips it to .visible (see
  // updateProgressBar above); jumps straight into the networking segment.
  if (navArrowLeftTour) {
    navArrowLeftTour.addEventListener('click', function() {
      var overlay = document.getElementById('welcome-overlay');
      if (overlay) {
        overlay.style.display = 'flex';
        overlay.classList.remove('fade-out');
      }
    });
  }
  if (navArrowRightTour) {
    navArrowRightTour.addEventListener('click', function() {
      window.switchScene('13-Networking1');
    });
  }

  // Display the initial scene.
  switchScene(scenes[0]);

})();
