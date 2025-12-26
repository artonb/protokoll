import type { Template } from "./types";

export const TEMPLATES: Template[] = [
  {
    id: "inspection",
    name: "Inspektion",
    serviceTitle: "Inspektion",
    sections: [
      {
        id: "interior_check",
        title: "Bilen invändigt",
        rows: [
          { id: "horn_check", text: "Signalhorn: Kontrollera funktionen" },
        ],
      },
      {
        id: "exterior_check",
        title: "Bilen utvändigt",
        rows: [
          {
            id: "washer_check",
            text: "Strålkastarrengörare: Kontrollera funktionen",
          },
          {
            id: "lights_check",
            text: "Ljus fram - kontrollera funktionen: Parkeringsljus, halvljus, helljus, dimstrålkastare, blinkers, varningsblinkers",
          },
          {
            id: "light_check_curved",
            text: "Statiskt kurvljus (kurvljus för tvär sväng): Kontrollera",
          },
          {
            id: "auto_light_check",
            text: "Automatisk ljusstyrning: Kontrollera funktionen",
          },
          {
            id: "taillights_check",
            text: "Bakljus - kontrollera funktionen: Bromsljus (även extra bromsljus), baklyktor, backstrålkastare, dimbaklyktor, nummerbelysning, blinkers, varningsblinkers",
          },
          {
            id: "wipers_check",
            text: "Vindrutetorkare och -spolare: Kontrollera funktionen, munstycksinställningen och att de är hela, ställ in om nödvändigt",
          },
          {
            id: "wipers_check_rubber",
            text: "Torkarblad: Aktivera serviceläget och kontrollera om skadade, kontrollera ändläget",
          },
        ],
      },
      {
        id: "under_check",
        title: "Bilen underifrån",
        rows: [
          {
            id: "engine_check_under",
            text: "Motor och komponenter i motorrummet (underifrån): Okulärkontroll (otätheter och skador)",
          },
          {
            id: "gearbox_check",
            text: "Växellåda, slutväxel och drivaxeldamasker: Okulärkontroll (läckage och skador)",
          },
          {
            id: "brake_check",
            text: "Bromsbeläggens tjocklek och bromsskivornas skick fram och bak: Kontrollera",
          },
          {
            id: "brake_check_leak",
            text: "Bromssystem och stötdämpare: Gör en visuell kontroll avseende läckage och skador",
          },
        ],
      },
      {
        id: "tires_check",
        title: "Däck",
        rows: [
          {
            id: "type_of_tires",
            text: "Sommardäck [1], vinterdäck [2], åretrunt-däck [3]: Notera däcktyp",
            valueBox: { width: 50 },
          },
          {
            id: "tire_pressure_front",
            text: "Däcktrycken i båda framdäcken: Kontrollera; Vid ändring ska dellastdäcktrycket på dekalen ställas in.",
            valueBox: { width: 60 },
          },
          {
            id: "tire_pressure_back",
            text: "Däcktrycken i båda bakdäcken: Kontrollera; Vid ändring ska dellastdäcktrycket på dekalen ställas in.",
            valueBox: { width: 60 },
          },
          {
            id: "tire_right_rear",
            text: "Däck höger bak: Kontrollera däcktryck, skick och slitagebild; notera mönsterdjupet",
            valueBox: { width: 60 },
          },

          {
            id: "tire_left_rear",
            text: "Däck vänster bak: Kontrollera däcktryck, skick och slitagebild; notera mönsterdjupet",
            valueBox: { width: 60 },
          },
          {
            id: "tire_left_front",
            text: "Däck vänster fram: Kontrollera däcktryck, skick och slitagebild; notera mönsterdjupet",
            valueBox: { width: 60 },
          },

          {
            id: "tire_right_front",
            text: "Däck höger fram: Kontrollera däcktryck, skick och slitagebild; notera mönsterdjupet",
            valueBox: { width: 60 },
          },

          {
            id: "spare_tire",
            text: "Punkteringssats: Kontrollera skador och förbrukning; kontrollera och fyll i punkteringsvätskans hållbarhetsdatum:",
            valueBox: { width: 60 },
          },
        ],
      },
      {
        id: "engine_check",
        title: "Motorrum",
        rows: [
          {
            id: "battery_check",
            text: "Batteri: Kontrollera med batteriprovaren (reparationshandboken måste följas)",
          },
          {
            id: "oil_level_check",
            text: "Oljenivå: Kontrollera; beakta oljespecifikationen!",
          },
          {
            id: "engine_bay_check",
            text: "Motor och komponenter i motorrummet (uppifrån): Okulärkontroll (otätheter och skador)",
          },
          {
            id: "brake_fluid_check",
            text: "Kontrollera bromsvätskenivå (beroende på beläggens slitage)",
          },
          {
            id: "coolant_level_check",
            text: "Kylsystem: Kontrollera frostskydd och kylvätskenivå/minst föreskrivet värde frostskydd: -25 °C (länder med arktiskt klimat -35 °C); för in är-värde (uppmätt värde):",
            valueBox: { width: 60 },
          },
          {
            id: "washer_fluid_check",
            text: "Vindrutetorkare/-spolare: Kontrollera frostskydd, spolarvätska, fylla på (endast enligt kundens önskemål)",
          },
        ],
      },
      {
        id: "final_check",
        title: "Avslutande arbeten",
        rows: [
          {
            id: "reset_service_light",
            text: "Serviceintervallindikering: Nollställa Inspektion. Observera PR-nummer i fordonsdatan.",
          },
          {
            id: "light_check",
            text: "Strålkastarinställning: Kontrollera; En justering av inställningen sker mot särskild debitering.",
          },
          {
            id: "dim_light_check",
            text: "Dimstrålkastarinställning: Kontrollera; En justering av inställningen sker mot särskild debitering.",
          },
          {
            id: "TMPS_check",
            text: "Däcktrycksvarnare: Spara däcktryck",
          },
          {
            id: "test_drive",
            text: "Provkör",
          },
        ],
      },
    ],
    extraWorks: [
      {
        id: "extra_inspektion",
        label: "Utökad inspektionsomfattning",
        add: [
          {
            sectionId: "interior_check",
            rows: [
              {
                id: "interior_lights_check",
                text: "Innerbelysning i innertaket, bagagerums- och handskfacksbelysning: Kontrollera funktionen",
              },
            ],
            beforeRowId: "horn_check",
          },
          {
            sectionId: "exterior_check",
            rows: [
              {
                id: "windshield_check",
                text: "Vindruta: Okulär kontroll med avseende på skador",
              },
            ],
            afterRowId: "wipers_check",
            beforeRowId: "wipers_check_rubber",
          },
          {
            sectionId: "exterior_check",
            rows: [
              {
                id: "body_check",
                text: "Karossen utvändigt och invändigt: Okulärkontroll med avseende på rost vid öppna dörrar, huvar och luckor",
              },
            ],
            afterRowId: "wipers_check_rubber",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "belt_check",
                text: "Spårkilrem: Kontrollera skicket",
              },
            ],
            afterRowId: "gearbox_check",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "bearing_check",
                text: "Fjäderbenskulleder, axellager, förbindningsstångslager och krängningshämmarens gummilager: Okulärkontroll (skador)",
              },
            ],
            afterRowId: "belt_check",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "chassi_check",
                text: "Styrstag: Kontrollera spel, fastsättning och damasker",
              },
            ],
            afterRowId: "brake_check",
            beforeRowId: "brake_check_leak",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "muffler_check",
                text: "Avgassystem: Okulärkontroll (läckage, fastsättning och skador)",
              },
            ],
            afterRowId: "brake_check_leak",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "under_check_all",
                text: "Underrede: Okulärkontroll av rostskydd, underredesinklädnad, ledningsdragning, pluggar",
              },
            ],
            afterRowId: "muffler_check",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "feather_check",
                text: "Skruvfjädrar och anslagsbuffertar fram och bak: Okulärkontroll (skador)",
              },
            ],
            afterRowId: "under_check_all",
          },
        ],
      },
      {
        id: "change_brake_fluid",
        label: "Bromssystem: Byt bromsvätska",
        add: [
          {
            sectionId: "under_check",
            rows: [
              {
                id: "brake_fluid_change",
                text: "Bromssystem: Byt bromsvätska (gör därefter en funktionskontroll under provkörningen)",
              },
            ],
            beforeRowId: "engine_check_under",
          },
        ],
      },
      {
        id: "pollen_filter_menu",
        label: "Kupefilter/Friskluftsfilter (lukt- och allergifilter)",
        add: [
          {
            sectionId: "engine_check",
            rows: [
              {
                id: "pollen_filter_change",
                text: "Friskluftsfilter (lukt- och allergifilter) med aktivtkolskikt: Rengöra huset och byta filterinsatsen",
              },
            ],
            beforeRowId: "air_filter_change",
            afterRowId: "wipers_check",
          },
        ],
      },
      {
        id: "air_filter_menu",
        label: "Luftfilter: Rengöra huset och byta filterinsatsen",
        add: [
          {
            sectionId: "engine_check",
            rows: [
              {
                id: "air_filter_change",
                text: "Luftfilter: Rengöra huset och byta filterinsatsen",
              },
            ],
            afterRowId: "pollen_filter_change",
          },
        ],
      },
      {
        id: "DSG-menu",
        label: "Direktväxellåda (DSG): Byta DSG-olja och filter",
        add: [
          {
            sectionId: "under_check",
            rows: [
              {
                id: "DSG_fluid_change",
                text: "Direktväxellåda (DSG): Byta DSG-olja och filter",
              },
            ],
            beforeRowId: "engine_check_under",
            afterRowId: "brake_fluid_change",
          },
        ],
      },
      {
        id: "fuel_filter_menu",
        label: "Byta dieselbränslefilter",
        add: [
          {
            sectionId: "engine_check",
            rows: [
              {
                id: "fuel_filter_change",
                text: "Byta dieselbränslefilter (dieselbränsle standard EN 590)",
              },
            ],
            afterRowId: "coolant_level_check",
            beforeRowId: "wipers_check",
          },
        ],
      },
      {
        id: "extra_exterior",
        label: "Panoramatak",
        sectionId: "exterior_check",
        rows: [
          {
            id: "panorama_check",
            text: "Panoramatak: Genomföra funktionskontroll med ljudkontroll samt rengöra vindavvisare",
          },
        ],
      },
      {
        id: "timing_belt",
        label: "Kamrem och spännrulle",
        sectionId: "engine_check",
        rows: [
          {
            id: "change_timing_belt",
            text: "Byt kuggrem och spännrulle",
          },
        ],
      },
      {
        id: "DPF_menu",
        label: "Kontrollera dieselpartikelfilter",
        add: [
          {
            sectionId: "final_check",
            rows: [
              {
                id: "DPF_check",
                text: "Dieselpartikelfilter: Kontrollera",
              },
            ],
            beforeRowId: "reset_service_light",
          },
        ],
      },
    ],
  },

  //

  //

  //

  //

  {
    id: "inspektion med oljebyte",
    name: "Inspektion med oljebyte",
    serviceTitle: "Inspektion med oljebyte (flexibel)",
    sections: [
      {
        id: "interior_check",
        title: "Bilen invändigt",
        rows: [
          { id: "horn_check", text: "Signalhorn: Kontrollera funktionen" },
        ],
      },
      {
        id: "exterior_check",
        title: "Bilen utvändigt",
        rows: [
          {
            id: "washer_check",
            text: "Strålkastarrengörare: Kontrollera funktionen",
          },
          {
            id: "lights_check",
            text: "Ljus fram - kontrollera funktionen: Parkeringsljus, halvljus, helljus, dimstrålkastare, blinkers, varningsblinkers",
          },
          {
            id: "light_check_curved",
            text: "Statiskt kurvljus (kurvljus för tvär sväng): Kontrollera",
          },
          {
            id: "auto_light_check",
            text: "Automatisk ljusstyrning: Kontrollera funktionen",
          },
          {
            id: "taillights_check",
            text: "Bakljus - kontrollera funktionen: Bromsljus (även extra bromsljus), baklyktor, backstrålkastare, dimbaklyktor, nummerbelysning, blinkers, varningsblinkers",
          },
          {
            id: "wipers_check",
            text: "Vindrutetorkare och -spolare: Kontrollera funktionen, munstycksinställningen och att de är hela, ställ in om nödvändigt",
          },
          {
            id: "wipers_check_rubber",
            text: "Torkarblad: Aktivera serviceläget och kontrollera om skadade, kontrollera ändläget",
          },
        ],
      },
      {
        id: "under_check",
        title: "Bilen underifrån",
        rows: [
          {
            id: "change_oil",
            text: "VARNING! MOTOROLJA: bara TÖMMA, ALDRIG suga upp (vid uppsugning blir det kvar för mycket olja i systemet); byta oljefilter",
          },
          {
            id: "engine_check_under",
            text: "Motor och komponenter i motorrummet (underifrån): Okulärkontroll (otätheter och skador)",
          },
          {
            id: "gearbox_check",
            text: "Växellåda, slutväxel och drivaxeldamasker: Okulärkontroll (läckage och skador)",
          },
          {
            id: "brake_check",
            text: "Bromsbeläggens tjocklek och bromsskivornas skick fram och bak: Kontrollera",
          },
          {
            id: "brake_check_leak",
            text: "Bromssystem och stötdämpare: Gör en visuell kontroll avseende läckage och skador",
          },
        ],
      },
      {
        id: "tires_check",
        title: "Däck",
        rows: [
          {
            id: "type_of_tires",
            text: "Sommardäck [1], vinterdäck [2], åretrunt-däck [3]: Notera däcktyp",
            valueBox: { width: 50 },
          },
          {
            id: "tire_pressure_front",
            text: "Däcktrycken i båda framdäcken: Kontrollera; Vid ändring ska dellastdäcktrycket på dekalen ställas in.",
            valueBox: { width: 60 },
          },
          {
            id: "tire_pressure_back",
            text: "Däcktrycken i båda bakdäcken: Kontrollera; Vid ändring ska dellastdäcktrycket på dekalen ställas in.",
            valueBox: { width: 60 },
          },
          {
            id: "tire_right_rear",
            text: "Däck höger bak: Kontrollera däcktryck, skick och slitagebild; notera mönsterdjupet",
            valueBox: { width: 60 },
          },

          {
            id: "tire_left_rear",
            text: "Däck vänster bak: Kontrollera däcktryck, skick och slitagebild; notera mönsterdjupet",
            valueBox: { width: 60 },
          },
          {
            id: "tire_left_front",
            text: "Däck vänster fram: Kontrollera däcktryck, skick och slitagebild; notera mönsterdjupet",
            valueBox: { width: 60 },
          },

          {
            id: "tire_right_front",
            text: "Däck höger fram: Kontrollera däcktryck, skick och slitagebild; notera mönsterdjupet",
            valueBox: { width: 60 },
          },

          {
            id: "spare_tire",
            text: "Punkteringssats: Kontrollera skador och förbrukning; kontrollera och fyll i punkteringsvätskans hållbarhetsdatum:",
            valueBox: { width: 60 },
          },
        ],
      },
      {
        id: "engine_check",
        title: "Motorrum",
        rows: [
          {
            id: "fill_oil",
            text: "Motorolja: Fylla på (VARNING! komplettera om nödvändigt till max-markeringen endast vid 80°C oljetemperatur), standard VW 507 00",
          },
          {
            id: "battery_check",
            text: "Batteri: Kontrollera med batteriprovaren (reparationshandboken måste följas)",
          },
          {
            id: "engine_bay_check",
            text: "Motor och komponenter i motorrummet (uppifrån): Okulärkontroll (otätheter och skador)",
          },
          {
            id: "brake_fluid_check",
            text: "Kontrollera bromsvätskenivå (beroende på beläggens slitage)",
          },
          {
            id: "coolant_level_check",
            text: "Kylsystem: Kontrollera frostskydd och kylvätskenivå/minst föreskrivet värde frostskydd: -25 °C (länder med arktiskt klimat -35 °C); för in är-värde (uppmätt värde):",
            valueBox: { width: 60 },
          },
          {
            id: "washer_fluid_check",
            text: "Vindrutetorkare/-spolare: Kontrollera frostskydd, spolarvätska, fylla på (endast enligt kundens önskemål)",
          },
        ],
      },
      {
        id: "final_check",
        title: "Avslutande arbeten",
        rows: [
          {
            id: "reset_service_light",
            text: "Serviceintervallsindikering: Återställa Oljebytesservice (flexibel). Observera PR-nummer i fordonsdatan.",
          },
          {
            id: "reset_inspektion_light",
            text: "Serviceintervallindikering: Nollställa Inspektion. Observera PR-nummer i fordonsdatan.",
          },
          {
            id: "light_check",
            text: "Strålkastarinställning: Kontrollera; En justering av inställningen sker mot särskild debitering.",
          },
          {
            id: "dim_light_check",
            text: "Dimstrålkastarinställning: Kontrollera; En justering av inställningen sker mot särskild debitering.",
          },
          {
            id: "TMPS_check",
            text: "Däcktrycksvarnare: Spara däcktryck",
          },
          {
            id: "test_drive",
            text: "Provkör",
          },
        ],
      },
    ],
    extraWorks: [
      {
        id: "extra_inspektion",
        label: "Utökad inspektionsomfattning",
        add: [
          {
            sectionId: "interior_check",
            rows: [
              {
                id: "interior_lights_check",
                text: "Innerbelysning i innertaket, bagagerums- och handskfacksbelysning: Kontrollera funktionen",
              },
            ],
            beforeRowId: "horn_check",
          },
          {
            sectionId: "exterior_check",
            rows: [
              {
                id: "windshield_check",
                text: "Vindruta: Okulär kontroll med avseende på skador",
              },
            ],
            afterRowId: "wipers_check",
            beforeRowId: "wipers_check_rubber",
          },
          {
            sectionId: "exterior_check",
            rows: [
              {
                id: "body_check",
                text: "Karossen utvändigt och invändigt: Okulärkontroll med avseende på rost vid öppna dörrar, huvar och luckor",
              },
            ],
            afterRowId: "wipers_check_rubber",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "belt_check",
                text: "Spårkilrem: Kontrollera skicket",
              },
            ],
            afterRowId: "gearbox_check",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "bearing_check",
                text: "Fjäderbenskulleder, axellager, förbindningsstångslager och krängningshämmarens gummilager: Okulärkontroll (skador)",
              },
            ],
            afterRowId: "belt_check",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "chassi_check",
                text: "Styrstag: Kontrollera spel, fastsättning och damasker",
              },
            ],
            afterRowId: "brake_check",
            beforeRowId: "brake_check_leak",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "muffler_check",
                text: "Avgassystem: Okulärkontroll (läckage, fastsättning och skador)",
              },
            ],
            afterRowId: "brake_check_leak",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "under_check_all",
                text: "Underrede: Okulärkontroll av rostskydd, underredesinklädnad, ledningsdragning, pluggar",
              },
            ],
            afterRowId: "muffler_check",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "feather_check",
                text: "Skruvfjädrar och anslagsbuffertar fram och bak: Okulärkontroll (skador)",
              },
            ],
            afterRowId: "under_check_all",
          },
        ],
      },
      {
        id: "change_brake_fluid",
        label: "Bromssystem: Byt bromsvätska",
        add: [
          {
            sectionId: "under_check",
            rows: [
              {
                id: "brake_fluid_change",
                text: "Bromssystem: Byt bromsvätska (gör därefter en funktionskontroll under provkörningen)",
              },
            ],
            beforeRowId: "engine_check_under",
          },
        ],
      },
      {
        id: "pollen_filter_menu",
        label: "Kupefilter/Friskluftsfilter (lukt- och allergifilter)",
        add: [
          {
            sectionId: "engine_check",
            rows: [
              {
                id: "pollen_filter_change",
                text: "Friskluftsfilter (lukt- och allergifilter) med aktivtkolskikt: Rengöra huset och byta filterinsatsen",
              },
            ],
            beforeRowId: "air_filter_change",
            afterRowId: "wipers_check",
          },
        ],
      },
      {
        id: "air_filter_menu",
        label: "Luftfilter: Rengöra huset och byta filterinsatsen",
        add: [
          {
            sectionId: "engine_check",
            rows: [
              {
                id: "air_filter_change",
                text: "Luftfilter: Rengöra huset och byta filterinsatsen",
              },
            ],
            afterRowId: "pollen_filter_change",
          },
        ],
      },
      {
        id: "DSG-menu",
        label: "Direktväxellåda (DSG): Byta DSG-olja och filter",
        add: [
          {
            sectionId: "under_check",
            rows: [
              {
                id: "DSG_fluid_change",
                text: "Direktväxellåda (DSG): Byta DSG-olja och filter",
              },
            ],
            beforeRowId: "engine_check_under",
            afterRowId: "brake_fluid_change",
          },
        ],
      },
      {
        id: "fuel_filter_menu",
        label: "Byta dieselbränslefilter",
        add: [
          {
            sectionId: "engine_check",
            rows: [
              {
                id: "fuel_filter_change",
                text: "Byta dieselbränslefilter (dieselbränsle standard EN 590)",
              },
            ],
            afterRowId: "coolant_level_check",
            beforeRowId: "wipers_check",
          },
        ],
      },
      {
        id: "extra_exterior",
        label: "Panoramatak",
        sectionId: "exterior_check",
        rows: [
          {
            id: "panorama_check",
            text: "Panoramatak: Genomföra funktionskontroll med ljudkontroll samt rengöra vindavvisare",
          },
        ],
      },
      {
        id: "timing_belt",
        label: "Kamrem och spännrulle",
        sectionId: "engine_check",
        rows: [
          {
            id: "change_timing_belt",
            text: "Byt kuggrem och spännrulle",
          },
        ],
      },
      {
        id: "DPF_menu",
        label: "Kontrollera dieselpartikelfilter",
        add: [
          {
            sectionId: "final_check",
            rows: [
              {
                id: "DPF_check",
                text: "Dieselpartikelfilter: Kontrollera",
              },
            ],
            beforeRowId: "reset_service_light",
          },
        ],
      },
    ],
  },

  //

  //

  //

  //

  {
    id: "oljebytesservice",
    name: "Oljebytesservice",
    serviceTitle: "Oljebytesservice (flexibel)",
    sections: [
      {
        id: "under_check",
        rows: [
          {
            id: "change_oil",
            text: "VARNING! MOTOROLJA: bara TÖMMA, ALDRIG suga upp (vid uppsugning blir det kvar för mycket olja i systemet); byta oljefilter",
          },
          {
            id: "brake_check",
            text: "Bromsbeläggens tjocklek och bromsskivornas skick fram och bak: Kontrollera",
          },
          {
            id: "fill_oil",
            text: "Motorolja: Fylla på (VARNING! komplettera om nödvändigt till max-markeringen endast vid 80°C oljetemperatur), standard VW 507 00",
          },
          {
            id: "reset_service_light",
            text: "Serviceintervallsindikering: Återställa Oljebytesservice (flexibel). Observera PR-nummer i fordonsdatan.",
          },
        ],
      },
    ],
    extraWorks: [
      {
        id: "change_brake_fluid",
        label: "Bromssystem: Byt bromsvätska",
        add: [
          {
            sectionId: "under_check",
            rows: [
              {
                id: "brake_fluid_change",
                text: "Bromssystem: Byt bromsvätska (gör därefter en funktionskontroll under provkörningen)",
              },
            ],
            beforeRowId: "fill_oil",
            afterRowId: "brake_check",
          },
        ],
      },
      {
        id: "pollen_filter_menu",
        label: "Kupefilter/Friskluftsfilter (lukt- och allergifilter)",
        add: [
          {
            sectionId: "under_check",
            rows: [
              {
                id: "pollen_filter_change",
                text: "Friskluftsfilter (lukt- och allergifilter) med aktivtkolskikt: Rengöra huset och byta filterinsatsen",
              },
            ],
            afterRowId: "reset_service_light",
            beforeRowId: "fuel_filter_change",
          },
        ],
      },
      {
        id: "air_filter_menu",
        label: "Luftfilter: Rengöra huset och byta filterinsatsen",
        add: [
          {
            sectionId: "under_check",
            rows: [
              {
                id: "air_filter_change",
                text: "Luftfilter: Rengöra huset och byta filterinsatsen",
              },
            ],
            afterRowId: "reset_service_light",
            beforeRowId: "fuel_filter_change",
          },
        ],
      },
      {
        id: "DSG-menu",
        label: "Direktväxellåda (DSG): Byta DSG-olja och filter",
        add: [
          {
            sectionId: "under_check",
            rows: [
              {
                id: "DSG_fluid_change",
                text: "Direktväxellåda (DSG): Byta DSG-olja och filter",
              },
            ],
            beforeRowId: "air_filter_change",
            afterRowId: "fuel_filter_change",
          },
        ],
      },
      {
        id: "fuel_filter_menu",
        label: "Byta dieselbränslefilter",
        add: [
          {
            sectionId: "under_check",
            rows: [
              {
                id: "fuel_filter_change",
                text: "Byta dieselbränslefilter (dieselbränsle standard EN 590)",
              },
            ],
            afterRowId: "air_filter_change",
            beforeRowId: "DSG_fluid_change",
          },
        ],
      },
      {
        id: "extra_inspektion",
        label: "Utökad inspektionsomfattning",
        add: [
          {
            sectionId: "under_check",
            rows: [
              {
                id: "interior_lights_check",
                text: "Innerbelysning i innertaket, bagagerums- och handskfacksbelysning: Kontrollera funktionen",
              },
            ],
            beforeRowId: "horn_check",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "body_check",
                text: "Karossen utvändigt och invändigt: Okulärkontroll med avseende på rost vid öppna dörrar, huvar och luckor",
              },
            ],
            afterRowId: "wipers_check_rubber",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "windshield_check",
                text: "Vindruta: Okulär kontroll med avseende på skador",
              },
            ],
            afterRowId: "wipers_check",
            beforeRowId: "wipers_check_rubber",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "bearing_check",
                text: "Fjäderbenskulleder, axellager, förbindningsstångslager och krängningshämmarens gummilager: Okulärkontroll (skador)",
              },
            ],
            afterRowId: "belt_check",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "chassi_check",
                text: "Styrstag: Kontrollera spel, fastsättning och damasker",
              },
            ],
            afterRowId: "brake_check",
            beforeRowId: "brake_check_leak",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "muffler_check",
                text: "Avgassystem: Okulärkontroll (läckage, fastsättning och skador)",
              },
            ],
            afterRowId: "brake_check_leak",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "under_check_all",
                text: "Underrede: Okulärkontroll av rostskydd, underredesinklädnad, ledningsdragning, pluggar",
              },
            ],
            afterRowId: "muffler_check",
          },
          {
            sectionId: "under_check",
            rows: [
              {
                id: "feather_check",
                text: "Skruvfjädrar och anslagsbuffertar fram och bak: Okulärkontroll (skador)",
              },
            ],
            afterRowId: "under_check_all",
          },
        ],
      },
      {
        id: "timing_belt",
        label: "Kamrem och spännrulle",
        sectionId: "under_check",
        rows: [
          {
            id: "change_timing_belt",
            text: "Byt kuggrem och spännrulle",
          },
        ],
      },
      {
        id: "DPF_menu",
        label: "Kontrollera dieselpartikelfilter",
        add: [
          {
            sectionId: "under_check",
            rows: [
              {
                id: "DPF_check",
                text: "Dieselpartikelfilter: Kontrollera",
              },
            ],
            beforeRowId: "reset_service_light",
          },
        ],
      },
    ],
  },
];
