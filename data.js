var APP_DATA = {
  "scenes": [
    {
      "id": "0-01nexus",
      "name": "(01)nexus",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 },
        { "tileSize": 512, "size": 2048 }
      ],
      "faceSize": 1488,
      "initialViewParameters": {
        "yaw": 3.1119080796529737,
        "pitch": 0.00202215394311267,
        "fov": 1.4469324312346197
      },
      "linkHotspots": [
        { "yaw": 1.3055071598985801, "pitch": 0.26957758113598373, "rotation": 0, "target": "1-02iot" }
      ],
      "infoHotspots": [],
      "videoHotspots": [
        {
          "title": "Station 1: Nexus Introduction",
          "yaw": 3.11,
          "pitch": 0.0,
          "youtubeId": "YOUR_YOUTUBE_ID_HERE"
        }
      ]
    },
    {
      "id": "1-02iot",
      "name": "(02)IoT",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 },
        { "tileSize": 512, "size": 2048 }
      ],
      "faceSize": 1488,
      "initialViewParameters": {
        "yaw": -3.1126880146521216,
        "pitch": 0.09605815712125931,
        "fov": 1.2446250333351525
      },
      "linkHotspots": [
        { "yaw": 1.057364848216599, "pitch": 0.24186397528697157, "rotation": 0, "target": "0-01nexus" },
        { "yaw": -1.1024589330649306, "pitch": 0.259600956589809, "rotation": 0, "target": "10-11seat" },
        { "yaw": -1.4028954440114756, "pitch": 0.37843758030693664, "rotation": 0, "target": "2-03transition" }
      ],
      "infoHotspots": [],
      "videoHotspots": [
        {
          "title": "Station 2: Internet of Things (IoT)",
          "yaw": -0.25, 
          "pitch": 0.05,
          "youtubeId": "YOUR_YOUTUBE_ID_HERE"
        }
      ]
    },
    {
      "id": "2-03transition",
      "name": "(03)Transition",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 },
        { "tileSize": 512, "size": 2048 }
      ],
      "faceSize": 1488,
      "initialViewParameters": { "pitch": 0, "yaw": 0, "fov": 1.5707963267948966 },
      "linkHotspots": [
        { "yaw": 0.009822964641541532, "pitch": 0.28673151183983947, "rotation": 0, "target": "3-04libiao" },
        { "yaw": 3.057193984367995, "pitch": 0.3420701635090069, "rotation": 0, "target": "1-02iot" },
        { "yaw": 2.277641121429231, "pitch": 0.40180137760028245, "rotation": 0, "target": "10-11seat" }
      ],
      "infoHotspots": [],
      "videoHotspots": []
    },
    {
      "id": "3-04libiao",
      "name": "(04)libiao",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 },
        { "tileSize": 512, "size": 2048 }
      ],
      "faceSize": 1488,
      "initialViewParameters": {
        "yaw": 0.17921665117960117, "pitch": -0.005100922267761376, "fov": 1.2446250333351525
      },
      "linkHotspots": [
        { "yaw": 1.8046571918460268, "pitch": 0.2848931217476043, "rotation": 0, "target": "4-05transition-2-3" }
      ],
      "infoHotspots": [],
      "videoHotspots": [
        {
          "title": "Station 3: Libiao Sorting Robots",
          "yaw": 0.10,
          "pitch": -0.02,
          "youtubeId": "YOUR_YOUTUBE_ID_HERE"
        }
      ]
    },
    {
      "id": "4-05transition-2-3",
      "name": "(05)transition (2-3)",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 },
        { "tileSize": 512, "size": 2048 }
      ],
      "faceSize": 1488,
      "initialViewParameters": {
        "yaw": 1.3415108445594512, "pitch": 0.09784584063676505, "fov": 1.4469324312346197
      },
      "linkHotspots": [
        { "yaw": 1.3710722800095212, "pitch": 0.25920822058027504, "rotation": 0, "target": "5-06linde" }
      ],
      "infoHotspots": [],
      "videoHotspots": []
    },
    {
      "id": "5-06linde",
      "name": "(06)linde",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 },
        { "tileSize": 512, "size": 2048 }
      ],
      "faceSize": 1488,
      "initialViewParameters": {
        "yaw": 0.006565305927697551, "pitch": -0.15731876381901166, "fov": 1.4469324312346197
      },
      "linkHotspots": [
        { "yaw": 1.7377239892072645, "pitch": 0.2545587401394833, "rotation": 0, "target": "6-074ws-and-lean" }
      ],
      "infoHotspots": [],
      "videoHotspots": [
        {
          "title": "Station 4: Linde Automated Reach Truck",
          "yaw": 0.45,
          "pitch": 0.0,
          "youtubeId": "YOUR_YOUTUBE_ID_HERE"
        }
      ]
    },
    {
      "id": "6-074ws-and-lean",
      "name": "(07)4ws and lean",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 },
        { "tileSize": 512, "size": 2048 }
      ],
      "faceSize": 1488,
      "initialViewParameters": {
        "yaw": 2.0026076028901496, "pitch": -0.10945381139996613, "fov": 1.2446250333351525
      },
      "linkHotspots": [
        { "yaw": -0.5925982314055016, "pitch": 0.35109348318183997, "rotation": 0, "target": "7-08transition-aft-lean" }
      ],
      "infoHotspots": [],
      "videoHotspots": [
        {
          "title": "Station 5: 4-Way Shuttle System",
          "yaw": 2.00,
          "pitch": -0.10,
          "youtubeId": "YOUR_YOUTUBE_ID_HERE"
        },
        {
          "title": "Station 6: LEAN Manufacturing",
          "yaw": -1.14,
          "pitch": 0.05,
          "youtubeId": "YOUR_YOUTUBE_ID_HERE"
        }
      ]
    },
    {
      "id": "7-08transition-aft-lean",
      "name": "(08)transition (aft lean)",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 },
        { "tileSize": 512, "size": 2048 }
      ],
      "faceSize": 1488,
      "initialViewParameters": {
        "yaw": -1.7665574750632125, "pitch": 0.18569268327569866, "fov": 1.4469324312346197
      },
      "linkHotspots": [
        { "yaw": -1.6526267989944632, "pitch": 0.2455493149372785, "rotation": 0, "target": "8-09appsheet" }
      ],
      "infoHotspots": [],
      "videoHotspots": []
    },
    {
      "id": "8-09appsheet",
      "name": "(09)appsheet",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 },
        { "tileSize": 512, "size": 2048 }
      ],
      "faceSize": 1488,
      "initialViewParameters": {
        "yaw": -2.7066905310356866, "pitch": 0.016471583426062253, "fov": 1.4469324312346197
      },
      "linkHotspots": [
        { "yaw": -1.3889535237972392, "pitch": 0.30860131149692727, "rotation": 0, "target": "9-10behind-seats" }
      ],
      "infoHotspots": [],
      "videoHotspots": [
        {
          "title": "Station 7: AppSheet System Automation",
          "yaw": -2.5,
          "pitch": -0.05,
          "youtubeId": "YOUR_YOUTUBE_ID_HERE"
        }
      ]
    },
    {
      "id": "9-10behind-seats",
      "name": "(10)behind seats",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 },
        { "tileSize": 512, "size": 2048 }
      ],
      "faceSize": 1488,
      "initialViewParameters": {
        "yaw": 1.294109252625809, "pitch": 0.18985798088099237, "fov": 1.4469324312346197
      },
      "linkHotspots": [
        { "yaw": -1.165102579005353, "pitch": 0.29652463052920197, "rotation": 0, "target": "10-11seat" },
        { "yaw": 1.5072626728679754, "pitch": 0.46423176670189115, "rotation": 0, "target": "2-03transition" }
      ],
      "infoHotspots": [],
      "videoHotspots": []
    },
    {
      "id": "10-11seat",
      "name": "(11)seat",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 },
        { "tileSize": 512, "size": 2048 }
      ],
      "faceSize": 1488,
      "initialViewParameters": {
        "yaw": -1.9853720365325245, "pitch": 0.09990527283444806, "fov": 1.4469324312346197
      },
      "linkHotspots": [
        { "yaw": 3.1020901124042073, "pitch": 0.24191502708143453, "rotation": 0, "target": "2-03transition" },
        { "yaw": -1.1329952193055508, "pitch": 0.30927228757802894, "rotation": 0, "target": "9-10behind-seats" }
      ],
      "infoHotspots": [],
      "videoHotspots": []
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
