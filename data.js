var APP_DATA = {
  "scenes": [
    {
      "id": "1-Seats",
      "name": "1. Seats",
      "file": "1-Seats.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.4469324312346197 },
      "linkHotspots": [
        { "yaw": 0, "pitch": 0.25, "rotation": 0, "target": "2-transition" }
      ],
      "infoHotspots": [
        {
          "title": "AI OCR",
          "text": "AI OCR (Artificial Intelligence Optical Character Recognition) is an advanced technology that uses machine learning and neural networks to automatically detect, extract, and convert text from images or scanned documents into editable and machine-readable data.",
          "yaw": -1.9673868375327324,
          "pitch": -0.0651348639273408,
          "video": "ExJLvYz2_cs"
        }
      ]
    },
    {
      "id": "2-transition",
      "name": "2. Transition",
      "file": "2-transition.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.5707963267948966 },
      "linkHotspots": [
        { "yaw": 0, "pitch": 0.25, "rotation": 0, "target": "3-AppSheet" },
        { "yaw": Math.PI, "pitch": 0.25, "rotation": 0, "target": "1-Seats" }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-AppSheet",
      "name": "3. AppSheet",
      "file": "3-AppSheet.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.4469324312346197 },
      "linkHotspots": [
        { "yaw": 0, "pitch": 0.25, "rotation": 0, "target": "4-transition" },
        { "yaw": Math.PI, "pitch": 0.25, "rotation": 0, "target": "2-transition" }
      ],
      "infoHotspots": [
        {
          "title": "Station 7: AppSheet Scanner",
          "text": "A mobile scanning solution built with AppSheet for digital inventory tracking. Enables real-time data capture, reducing manual paperwork and errors.",
          "yaw": -2.743275775700603,
          "pitch": 0.11753466103633059,
          "video": "HOELR0LFNIM"
        }
      ]
    },
    {
      "id": "4-transition",
      "name": "4. Transition",
      "file": "4-transition.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.4469324312346197 },
      "linkHotspots": [
        { "yaw": 0, "pitch": 0.25, "rotation": 0, "target": "5-LEAN" },
        { "yaw": Math.PI, "pitch": 0.25, "rotation": 0, "target": "3-AppSheet" }
      ],
      "infoHotspots": []
    },
    {
      "id": "5-LEAN",
      "name": "5. LEAN",
      "file": "5-LEAN.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.2446250333351525 },
      "linkHotspots": [
        { "yaw": 0, "pitch": 0.25, "rotation": 0, "target": "6-4-Way-Shuttle" },
        { "yaw": Math.PI, "pitch": 0.25, "rotation": 0, "target": "4-transition" }
      ],
      "infoHotspots": [
        {
          "title": "Station 6: LEAN",
          "text": "A methodology focused on eliminating waste and continuously improving processes.<br><br>Helps organisations increase efficiency, quality, and customer value.",
          "yaw": -1.8849436428002058,
          "pitch": 0.07121170070608329,
          "video": "s2HCrhNVfak"
        }
      ]
    },
    {
      "id": "6-4-Way-Shuttle",
      "name": "6. 4-Way Shuttle",
      "file": "6-4-Way Shuttle.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.2446250333351525 },
      "linkHotspots": [
        { "yaw": 0, "pitch": 0.25, "rotation": 0, "target": "7-Linde" },
        { "yaw": Math.PI, "pitch": 0.25, "rotation": 0, "target": "5-LEAN" }
      ],
      "infoHotspots": [
        {
          "title": "Station 5: 4-Way Shuttle (ICAS Technology)",
          "text": "An automated storage and retrieval system that moves inventory in multiple directions. Maximises storage density and enables fast, flexible warehouse operations.",
          "yaw": 1.814296509066514,
          "pitch": -0.04301245209520843,
          "video": "nC7-9PYJ1Tk"
        }
      ]
    },
    {
      "id": "7-Linde",
      "name": "7. Linde",
      "file": "7-Linde.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.4469324312346197 },
      "linkHotspots": [
        { "yaw": 0, "pitch": 0.25, "rotation": 0, "target": "8-transition" },
        { "yaw": Math.PI, "pitch": 0.25, "rotation": 0, "target": "6-4-Way-Shuttle" }
      ],
      "infoHotspots": [
        {
          "title": "Station 4: Automated Reach Truck (Linde)",
          "text": "Provides advanced material handling solutions, including forklifts and warehouse automation.<br><br>Enhances safety, productivity, and operational efficiency in logistics environments.",
          "yaw": 0.15575780357974267,
          "pitch": -0.3084486433412472,
          "video": "6xEJnABdkBo"
        }
      ]
    },
    {
      "id": "8-transition",
      "name": "8. Transition",
      "file": "8-transition.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.4469324312346197 },
      "linkHotspots": [
        { "yaw": 0, "pitch": 0.25, "rotation": 0, "target": "9-LiBiao" },
        { "yaw": Math.PI, "pitch": 0.25, "rotation": 0, "target": "7-Linde" }
      ],
      "infoHotspots": []
    },
    {
      "id": "9-LiBiao",
      "name": "9. LiBiao",
      "file": "9-LiBiao.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.2446250333351525 },
      "linkHotspots": [
        { "yaw": 0, "pitch": 0.25, "rotation": 0, "target": "10-transition" },
        { "yaw": Math.PI, "pitch": 0.25, "rotation": 0, "target": "8-transition" }
      ],
      "infoHotspots": [
        {
          "title": "Station 3: Libiao 3D-Sorting System",
          "text": "An efficient e-commerce sorting solution that integrates high-density sorting walls with autonomous robots.<br><br>Maximizes flexibility with modular platforms, saves up to 83% in pick labor, and operates with 100% sorting accuracy to optimize delivery throughput.",
          "yaw": 0.1848993790054756,
          "pitch": 0.06187690025872783,
          "video": "llHxFnLVuAM"
        }
      ]
    },
    {
      "id": "10-transition",
      "name": "10. Transition",
      "file": "10-transition.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.4469324312346197 },
      "linkHotspots": [
        { "yaw": 0, "pitch": 0.25, "rotation": 0, "target": "11-IoT" },
        { "yaw": Math.PI, "pitch": 0.25, "rotation": 0, "target": "9-LiBiao" }
      ],
      "infoHotspots": []
    },
    {
      "id": "11-IoT",
      "name": "11. IoT",
      "file": "11-IoT.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.2446250333351525 },
      "linkHotspots": [
        { "yaw": 0, "pitch": 0.25, "rotation": 0, "target": "12-Nexus" },
        { "yaw": Math.PI, "pitch": 0.25, "rotation": 0, "target": "10-transition" }
      ],
      "infoHotspots": [
        {
          "title": "Station 2: Internet of Things (IoT)",
          "text": "Connects devices, sensors, and systems to collect and share real-time data. Improves visibility, automation, and decision-making across operations.",
          "yaw": -3.077344877679586,
          "pitch": 0.08122853964974475,
          "video": "2IVgKpI4xuU"
        }
      ]
    },
    {
      "id": "12-Nexus",
      "name": "12. Nexus",
      "file": "12-Nexus.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.4469324312346197 },
      "linkHotspots": [
        { "yaw": 0, "pitch": 0.25, "rotation": 0, "target": "13-Networking1" },
        { "yaw": Math.PI, "pitch": 0.25, "rotation": 0, "target": "11-IoT" }
      ],
      "infoHotspots": [
        {
          "title": "Station 8: Nexus",
          "text": "A digital platform that centralises operational data and workflows. Provides better visibility, collaboration, and control across business processes.",
          "yaw": -3.1320671776627336,
          "pitch": -0.1443075117404149,
          "video": "OYbPOhK0wPo"
        }
      ]
    },
    {
      "id": "13-Networking1",
      "name": "13. Networking Event",
      "file": "13-Networking1.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.4469324312346197 },
      "linkHotspots": [
        { "yaw": 0, "pitch": 0.25, "rotation": 0, "target": "14-Networking2" },
        { "yaw": Math.PI, "pitch": 0.25, "rotation": 0, "target": "12-Nexus" }
      ],
      "infoHotspots": []
    },
    {
      "id": "14-Networking2",
      "name": "14. Networking Event",
      "file": "14-Networking.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.4469324312346197 },
      "linkHotspots": [
        { "yaw": Math.PI, "pitch": 0.25, "rotation": 0, "target": "13-Networking1" }
      ],
      "infoHotspots": []
    }
  ],
  "name": "Project Title",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": false,
    "viewControlButtons": false
  }
};
