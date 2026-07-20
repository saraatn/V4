var APP_DATA = {
  "scenes": [
    {
      "id": "1-Seats",
      "name": "1. Seats",
      "file": "1-Seats.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.4469324312346197 },
      "linkHotspots": [
        { "yaw": 0.6832859992630951, "pitch": 0.26776133307676986, "rotation": 0, "target": "2-transition" },
        // 🆕 New shortcut hotspot: Seats -> IoT
        { "yaw": -0.8365754076800247, "pitch": 0.2996353101657707, "rotation": 0, "target": "11-IoT" }
      ],
      "infoHotspots": [
        {
          "title": "AI OCR",
          "text": "AI OCR (Artificial Intelligence Optical Character Recognition) is an advanced technology that uses machine learning and neural networks to automatically detect, extract, and convert text from images or scanned documents into editable and machine-readable data.",
          "yaw": 0.03319037544346415,
          "pitch": 0.03193024507100617,
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
        { "yaw": -2.4194224570906773, "pitch": 0.32546688057977846, "rotation": 0, "target": "3-AppSheet" },
        { "yaw": -1.1531931819261239, "pitch": 0.35358984849095876, "rotation": 0, "target": "1-Seats" },
        // 🆕 New shortcut hotspot: Transition -> LiBiao
        { "yaw": 2.1301203916949287, "pitch": 0.2731964891548291, "rotation": 0, "target": "9-LiBiao" }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-AppSheet",
      "name": "3. AppSheet",
      "file": "3-AppSheet.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.4469324312346197 },
      "linkHotspots": [
        { "yaw": 1.591638488331622, "pitch": 0.23769689381780168, "rotation": 0, "target": "4-transition" },
        { "yaw": -1.1332526039894368, "pitch": 0.22871764377123682, "rotation": 0, "target": "2-transition" },
        // 🆕 New hotspot found in measured data — not in original file
        { "yaw": -1.3942682670711086, "pitch": 0.1923439148453827, "rotation": 0, "target": "1-Seats" }
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
        { "yaw": 1.5543242962609174, "pitch": 0.18153642652895208, "rotation": 0, "target": "5-LEAN" },
        { "yaw": -1.6298564443730825, "pitch": 0.20569200265416043, "rotation": 0, "target": "3-AppSheet" }
      ],
      "infoHotspots": []
    },
    {
      "id": "5-LEAN",
      "name": "5. LEAN",
      "file": "5-LEAN.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.2446250333351525 },
      "linkHotspots": [
        { "yaw": 1.8777978673811724, "pitch": 0.4518497793203977, "rotation": 0, "target": "6-4-Way-Shuttle" },
        { "yaw": -0.5370042280088576, "pitch": 0.2758133326893759, "rotation": 0, "target": "4-transition" },
        // 🆕 New shortcut hotspot: LEAN -> Linde
        { "yaw": 0.31360790069007294, "pitch": 0.25437315908887115, "rotation": 0, "target": "7-Linde" }
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
        { "yaw": 0.27085536393577847, "pitch": 0.2526253179487128, "rotation": 0, "target": "7-Linde" },
        { "yaw": -2.0484289870897676, "pitch": 0.510812803355174, "rotation": 0, "target": "5-LEAN" },
        // 🆕 New hotspot found in measured data — not in original file
        { "yaw": -0.587509458460346, "pitch": 0.2682826286276061, "rotation": 0, "target": "4-transition" }
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
        { "yaw": -1.5200409217393904, "pitch": 0.3511546368635585, "rotation": 0, "target": "8-transition" },
        { "yaw": 1.4922515179113063, "pitch": 0.19590363948482903, "rotation": 0, "target": "6-4-Way-Shuttle" },
        // 🆕 New hotspot found in measured data — direct link to 5-LEAN (skips 6-4-Way-Shuttle)
        { "yaw": 2.0097130232166913, "pitch": 0.16335544035836946, "rotation": 0, "target": "5-LEAN" }
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
        { "yaw": -1.6935374078117427, "pitch": 0.4102135504849098, "rotation": 0, "target": "9-LiBiao" },
        { "yaw": 1.3904360968516087, "pitch": 0.24765774945649, "rotation": 0, "target": "7-Linde" }
      ],
      "infoHotspots": []
    },
    {
      "id": "9-LiBiao",
      "name": "9. LiBiao",
      "file": "9-LiBiao.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.2446250333351525 },
      "linkHotspots": [
        { "yaw": -1.1621409369190552, "pitch": 0.2682372280575738, "rotation": 0, "target": "10-transition" },
        { "yaw": 1.7820412245340087, "pitch": 0.23236256403128763, "rotation": 0, "target": "8-transition" },
        // Updated coordinates (confirms/replaces previous assumption)
        { "yaw": -2.3155798177056575, "pitch": 0.24782660981990112, "rotation": 0, "target": "2-transition" },
        // ✅ Fixed: previously duplicated coordinates with the ->10-transition hotspot, now has its own correct value
        { "yaw": -1.7263578704888634, "pitch": 0.24843561299397976, "rotation": 0, "target": "1-Seats" }
        // ✅ Removed: ->11-IoT hotspot (per request)
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
        { "yaw": 3.0440594039132822, "pitch": 0.25947674617576055, "rotation": 0, "target": "11-IoT" },
        { "yaw": 0.07105900265506726, "pitch": 0.2534284976145216, "rotation": 0, "target": "9-LiBiao" },
        // 🆕 New hotspots found in measured data
        { "yaw": 2.2501834291712566, "pitch": 0.3892645683704732, "rotation": 0, "target": "1-Seats" },
        // Updated coordinates
        { "yaw": 1.3502278194673032, "pitch": 0.1960297055399387, "rotation": 0, "target": "2-transition" }
      ],
      "infoHotspots": []
    },
    {
      "id": "11-IoT",
      "name": "11. IoT",
      "file": "11-IoT.jpg",
      // Initial view now faces the IoT infoHotspot directly (same yaw/pitch as that hotspot below)
      "initialViewParameters": { "yaw": -3.077344877679586, "pitch": 0.08122853964974475, "fov": 1.2446250333351525 },
      "linkHotspots": [
        { "yaw": 1.0313917182115908, "pitch": 0.19204415516707485, "rotation": 0, "target": "12-Nexus" },
        { "yaw": -1.414154678796013, "pitch": 0.34487233863543487, "rotation": 0, "target": "10-transition" }
        // ✅ Removed: ->13-Networking1 hotspot (scene removed for now)
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
        { "yaw": -1.7935945155371655, "pitch": 0.3085524271103104, "rotation": 0, "target": "11-IoT" },
        // 🆕 Manual forward path into the networking segment (also reached
        // automatically once the progress bar hits 100% — see index.js).
        { "yaw": 1.9, "pitch": 0.22, "rotation": 0, "target": "13-Networking1" }
      ],
      "infoHotspots": [
        {
          "title": "Station 8: Nexus",
          "text": "A digital platform that centralises operational data and workflows. Provides better visibility, collaboration, and control across business processes.",
          "yaw": 0.08659418147503395,
          "pitch": 0.01856556925197239,
          "video": "OYbPOhK0wPo"
        }
      ]
    },
    {
      // 🆕 Networking segment, scene 1 of 2. Reached automatically when the
      // main LITES tour progress bar hits 100% (see updateProgressBar in
      // index.js), or manually via the 12-Nexus link hotspot above.
      // Excluded from the progress-bar denominator (see excludeFromProgress)
      // so finishing the tour itself — not the networking segment — is what
      // drives the bar to 100%.
      "id": "13-Networking1",
      "name": "13. Networking",
      "file": "13-Networking1.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.4469324312346197 },
      "excludeFromProgress": true,
      "linkHotspots": [
        { "yaw": -2.5, "pitch": 0.2, "rotation": 0, "target": "12-Nexus" },
        { "yaw": 1.15, "pitch": 0.15, "rotation": 0, "target": "14-Networking2" }
      ],
      "infoHotspots": [
        {
          "boothId": "sustainability",
          "title": "Sustainability",
          "text": "Explore how sustainable practices — energy efficiency, waste reduction, and greener material flows — are being built into modern supply chains.",
          "yaw": -1.8,
          "pitch": 0.05
        },
        {
          "boothId": "optimisation",
          "title": "Optimisation",
          "text": "See how data-driven optimisation improves routing, scheduling, and resource allocation across warehouse and logistics operations.",
          "yaw": -0.3,
          "pitch": 0.05
        },
        {
          "boothId": "workplace-learning",
          "title": "Workplace Learning",
          "text": "Discover tools and programmes that upskill teams on the floor, from digital onboarding to hands-on training with new automation systems.",
          "yaw": 1.35,
          "pitch": 0.05
        }
      ]
    },
    {
      // 🆕 Networking segment, scene 2 of 2.
      "id": "14-Networking2",
      "name": "14. Networking",
      "file": "14-Networking.jpg",
      "initialViewParameters": { "yaw": 0, "pitch": 0, "fov": 1.4469324312346197 },
      "excludeFromProgress": true,
      "linkHotspots": [
        { "yaw": -1.9, "pitch": 0.15, "rotation": 0, "target": "13-Networking1" }
      ],
      "infoHotspots": [
        {
          "boothId": "supply-chain-ai",
          "title": "Supply Chain AI",
          "text": "Learn how AI-driven forecasting and anomaly detection help teams anticipate disruptions and make faster, more confident supply chain decisions.",
          "yaw": -1.0,
          "pitch": 0.05
        },
        {
          "boothId": "digitalisation",
          "title": "Digitalisation",
          "text": "See how paper-based processes are being replaced with connected digital workflows, giving teams real-time visibility from floor to office.",
          "yaw": 0.8,
          "pitch": 0.05
        }
      ]
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
