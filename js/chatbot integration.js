// js/chatbot-integration.js
(function() {
  var STATION_MAP = {
    '0-01nexus':     { id: 'nexus',   name: 'Nexus' },
    '1-02iot':       { id: 'iot',     name: 'IoT' },
    '3-04libiao':    { id: 'libiao',  name: 'Libiao 3D-Sorting System' },
    '5-06linde':     { id: 'linde',   name: 'Automated Reach Truck (Linde)' },
    '8-09appsheet':  { id: 'appsheet',name: 'AppSheet Scanner' },
    '10-11seat':     { id: 'ai_ocr',  name: 'AI OCR' }
  };

  // The shared scene has two info hotspots — resolve by which one
  // the camera is currently closest to (yaw values copied from data.js).
  var SHARED_SCENE_ID = '6-074ws-and-lean';
  var SHARED_SCENE_SUBSTATIONS = [
    { id: '4ws',  name: '4-Way Shuttle', yaw: 1.814296509066514 },
    { id: 'lean', name: 'LEAN',          yaw: -1.8849436428002058 }
  ];

  var lastAnnouncedStation = null;

  function angleDiff(a, b) {
    var d = Math.abs(a - b) % (2 * Math.PI);
    return d > Math.PI ? (2 * Math.PI - d) : d;
  }

  function resolveSharedSceneStation(scene) {
    var currentYaw = scene.view.parameters().yaw;
    var closest = SHARED_SCENE_SUBSTATIONS[0];
    var closestDiff = angleDiff(currentYaw, closest.yaw);
    for (var i = 1; i < SHARED_SCENE_SUBSTATIONS.length; i++) {
      var diff = angleDiff(currentYaw, SHARED_SCENE_SUBSTATIONS[i].yaw);
      if (diff < closestDiff) { closest = SHARED_SCENE_SUBSTATIONS[i]; closestDiff = diff; }
    }
    return closest;
  }

  function sendStationToVoiceflow(station) {
    if (station.id === lastAnnouncedStation) return; // don't repeat same station

    if (!window.voiceflow || !window.voiceflow.chat) {
      // widget script hasn't finished loading yet — retry shortly
      setTimeout(function() { sendStationToVoiceflow(station); }, 800);
      return;
    }

    lastAnnouncedStation = station.id;

    console.log('SENDING TO VOICEFLOW:', station.id, station.name);

    window.voiceflow.chat.interact({
      type: 'event',
      payload: {
        event: { name: 'station_update' },
        station: station.id,
        stationName: station.name
      }
    });
  }

  // Called by index.js every time the pano switches to a new scene.
  window.onStationChanged = function(scene) {
    if (!scene || !scene.data) return;
    var sceneId = scene.data.id;

    if (sceneId === SHARED_SCENE_ID) {
      sendStationToVoiceflow(resolveSharedSceneStation(scene));
      return;
    }

    var station = STATION_MAP[sceneId];
    if (station) {
      sendStationToVoiceflow(station);
    } else {
      lastAnnouncedStation = null; // transition scene — reset so re-entering a station re-announces
    }
  };
})();
