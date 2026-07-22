/*
 * Station dwell-time tracking.
 * Hooks into window.onStationChanged, which index.js already calls on
 * every scene switch. Logs an "entered_at" row per station visit, then
 * fills in "exited_at" + "duration_seconds" the moment the visitor moves
 * on (or closes the tab).
 *
 * LOAD ORDER MATTERS: include this script BEFORE index.js, so
 * window.onStationChanged exists before the tour starts firing scene
 * switches.
 *
 * KNOWN LIMITATION: index.js fires the very first switchScene() call on
 * page load, before the registration overlay has been submitted — so
 * that very first entry (always the same starting scene) won't have a
 * session_id yet and will be skipped with a console warning. Every
 * subsequent station switch, which is the data that actually matters,
 * is logged normally.
 */
'use strict';

(function() {
  var SUPABASE_URL = 'https://azgpwljluznkxceorzlm.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_r_twGsvckTKfA1O3XaPHEg_-FDfWeWi';
  var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  // Exposed so index.html's registration handler can reuse the same
  // client instead of creating a second connection.
  window.analyticsSupabase = supabase;

  var currentVisit = null; // { id, stationId, enteredAt }

  function getSessionId() {
    try {
      return sessionStorage.getItem('lites_session_id');
    } catch (e) {
      return null;
    }
  }

  function closeCurrentVisit() {
    if (!currentVisit) return Promise.resolve();

    var exitedAt = new Date();
    var durationSeconds = Math.round((exitedAt - currentVisit.enteredAt) / 1000);
    var visitId = currentVisit.id;
    currentVisit = null; // clear immediately so overlapping calls can't double-close

    return supabase
      .from('station_visits')
      .update({
        exited_at: exitedAt.toISOString(),
        duration_seconds: durationSeconds
      })
      .eq('id', visitId)
      .then(function(response) {
        if (response.error) {
          console.error('Error closing station visit:', response.error);
        }
      });
  }

  function logStationEntry(stationId) {
    var sessionId = getSessionId();
    if (!sessionId) {
      console.warn('No session_id yet — skipping visit log for "' + stationId + '" (expected only on the very first scene load, before registration).');
      return Promise.resolve();
    }

    var enteredAt = new Date();

    return supabase
      .from('station_visits')
      .insert([{
        session_id: sessionId,
        station_id: stationId,
        entered_at: enteredAt.toISOString()
      }])
      .select()
      .single()
      .then(function(response) {
        if (response.error) {
          console.error('Error logging station visit:', response.error);
          return;
        }
        currentVisit = { id: response.data.id, stationId: stationId, enteredAt: enteredAt };
      });
  }

  // Hook into index.js's existing per-scene callback.
  window.onStationChanged = function(scene) {
    closeCurrentVisit().then(function() {
      logStationEntry(scene.data.id);
    });
  };

  // Best-effort close-out if the guest closes the tab mid-station.
  // Uses a raw keepalive fetch instead of the supabase client, since
  // async client calls are not guaranteed to complete during unload.
  window.addEventListener('beforeunload', function() {
    if (!currentVisit) return;

    var exitedAt = new Date();
    var durationSeconds = Math.round((exitedAt - currentVisit.enteredAt) / 1000);
    var url = SUPABASE_URL + '/rest/v1/station_visits?id=eq.' + currentVisit.id;

    fetch(url, {
      method: 'PATCH',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY
      },
      body: JSON.stringify({
        exited_at: exitedAt.toISOString(),
        duration_seconds: durationSeconds
      })
    });
  });
})();
