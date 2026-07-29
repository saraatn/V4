/*
 * Chatbase live-guide integration.
 * Hooks into window.onStationChanged, which index.js already calls on
 * every scene switch. Sends a hidden, station-specific prompt to your
 * Chatbase AI agent via window.chatbase.open({ message, hideMessage: true })
 * — the message is sent silently and the widget only pops open once the
 * bot's reply starts coming through, so it reads as the assistant
 * proactively greeting the visitor rather than a fake user message.
 *
 * REQUIRES: your Chatbase embed script must already be loaded on the page
 * (the <script> snippet from your Chatbase dashboard) before this file.
 *
 * Customize STATION_PROMPTS below with whatever framing works best for
 * your AI agent's training data / system prompt. Stations not listed here
 * (transition scenes, etc.) are silently skipped — no message is sent.
 */
'use strict';

(function() {

  var STATION_PROMPTS = {
    '1-Seats': "The visitor just arrived at the AI OCR station. Give a short, friendly welcome and a 1-2 sentence explanation of what AI OCR does here, then ask if they'd like to know more or try a quick quiz about it.",
    '3-AppSheet': "The visitor just arrived at the AppSheet Scanner station. Briefly explain what this station demonstrates in 1-2 sentences, then offer to go deeper or quiz them.",
    '5-LEAN': "The visitor just arrived at the LEAN station. Briefly explain what LEAN methodology means in this context, then offer to go deeper or quiz them.",
    '6-4-Way-Shuttle': "The visitor just arrived at the 4-Way Shuttle (ICAS Technology) station. Briefly explain what it does, then offer to go deeper or quiz them.",
    '7-Linde': "The visitor just arrived at the Automated Reach Truck (Linde) station. Briefly explain what it does, then offer to go deeper or quiz them.",
    '9-LiBiao': "The visitor just arrived at the Libiao 3D-Sorting System station. Briefly explain what it does, then offer to go deeper or quiz them.",
    '11-IoT': "The visitor just arrived at the Internet of Things (IoT) station. Briefly explain what it does, then offer to go deeper or quiz them.",
    '12-Nexus': "The visitor just arrived at the Nexus station. Briefly explain what it does, then offer to go deeper or quiz them."
    // Add more scene IDs here as needed. Transition scenes are
    // intentionally left out so visitors aren't interrupted while
    // just walking between stations.
  };

  // Set to true if you'd rather each station only greet the visitor ONCE
  // per session (won't re-fire if they backtrack to a station they've
  // already visited). false = greets every single time they arrive,
  // even on repeat visits.
  var ONLY_GREET_ONCE_PER_STATION = false;

  var alreadyGreeted = {};

  function greetStation(scene) {
    var sceneId = scene && scene.data && scene.data.id;
    if (!sceneId) return;

    var prompt = STATION_PROMPTS[sceneId];
    if (!prompt) return; // no prompt configured for this scene — skip silently

    if (ONLY_GREET_ONCE_PER_STATION && alreadyGreeted[sceneId]) return;
    alreadyGreeted[sceneId] = true;

    if (window.chatbase && typeof window.chatbase.open === 'function') {
      window.chatbase.open({
        message: prompt,
        hideMessage: true
      });
    } else {
      console.warn('Chatbase widget not loaded yet — skipped greeting for "' + sceneId + '".');
    }
  }

  // Wraps whatever onStationChanged already does (if anything was set
  // before this script loaded) so this integration composes cleanly with
  // other hooks rather than silently overwriting them.
  var previousHandler = window.onStationChanged;
  window.onStationChanged = function(scene) {
    if (typeof previousHandler === 'function') {
      previousHandler(scene);
    }
    greetStation(scene);
  };

})();
