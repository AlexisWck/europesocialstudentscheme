// Fonction pour afficher ou masquer la carte interactive
function showInteractiveMap() {
  // Masquer la carte de l'aide maximale et afficher la carte interactive
  document.getElementById("help-map-container").style.display = "none";
  document.getElementById("map-container").style.display = "block";
}

/*
// Fonction pour afficher ou masquer la carte de l'aide maximale
function showHelpMap() {
  // Masquer la carte interactive et afficher la carte de l'aide maximale
  document.getElementById("map-container").style.display = "none";
  document.getElementById("help-map-container").style.display = "block";
}
*/
// Initialisation de la carte interactive avec un zoom de départ centré sur l'Europe
var map = L.map('map').setView([50.8503, 4.3517], 4); // Coordonnées de l'Europe (Bruxelles)
var helpMap = L.map('help-map').setView([50.8503, 4.3517], 4); // Carte de l'aide maximale

// Fond de carte OpenStreetMap pour la carte interactive
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

/*
// Fond de carte OpenStreetMap pour la carte de l'aide maximale
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(helpMap);
*/
// Fonction pour déterminer la couleur de chaque pays dans la carte interactive
function getInteractiveColor(countryName) {
    switch (countryName) {
      case "Albania":
        return "#FF6347"; // Couleur de l'Albanie (Tomato)
    case "Andorra":
        return "#FFD700"; // Couleur de l'Andorre (Gold)
    case "Armenia":
        return "#32CD32"; // Couleur de l'Arménie (Lime Green)
    case "Austria":
        return "#1E90FF"; // Couleur de l'Autriche (Dodger Blue)
    case "Azerbaijan":
        return "#8A2BE2"; // Couleur de l'Azerbaïdjan (BlueViolet)
    case "Belarus":
        return "#FF8C00"; // Couleur du Bélarus (Dark Orange)
    case "Belgium":
        return "#FFD700"; // Couleur de la Belgique (Gold)
    case "Bosnia and Herzegovina":
        return "#228B22"; // Couleur de la Bosnie-Herzégovine (Forest Green)
    case "Bulgaria":
        return "#9932CC"; // Couleur de la Bulgarie (Dark Orchid)
    case "Croatia":
        return "#FF1493"; // Couleur de la Croatie (Deep Pink)
    case "Cyprus":
        return "#7FFF00"; // Couleur de Chypre (Chartreuse)
    case "Czech Republic":
        return "#D2691E"; // Couleur de la République tchèque (Chocolate)
    case "Denmark":
        return "#00BFFF"; // Couleur du Danemark (Deep Sky Blue)
    case "Estonia":
        return "#FF4500"; // Couleur de l'Estonie (OrangeRed)
    case "Finland":
        return "#00008B"; // Couleur de la Finlande (Dark Blue)
    case "France":
        return "#FF6347"; // Couleur de la France (Tomato)
    case "Georgia":
        return "#FF00FF"; // Couleur de la Géorgie (Magenta)
    case "Germany":
        return "#32CD32"; // Couleur de l'Allemagne (Lime Green)
    case "Greece":
        return "#0000CD"; // Couleur de la Grèce (Medium Blue)
    case "Hungary":
        return "#8B4513"; // Couleur de la Hongrie (SaddleBrown)
    case "Iceland":
        return "#FFD700"; // Couleur de l'Islande (Gold)
    case "Ireland":
        return "#006400"; // Couleur de l'Irlande (Dark Green)
    case "Italy":
        return "#1E90FF"; // Couleur de l'Italie (Dodger Blue)
    case "Kazakhstan":
        return "#A52A2A"; // Couleur du Kazakhstan (Brown)
    case "Kosovo":
        return "#C71585"; // Couleur du Kosovo (Medium Violet Red)
    case "Latvia":
        return "#2E8B57"; // Couleur de la Lettonie (Sea Green)
    case "Liechtenstein":
        return "#7B68EE"; // Couleur du Liechtenstein (Medium Slate Blue)
    case "Lithuania":
        return "#B22222"; // Couleur de la Lituanie (FireBrick)
    case "Luxembourg":
        return "#DC143C"; // Couleur du Luxembourg (Crimson)
    case "Malta":
        return "#0000CD"; // Couleur de Malte (Medium Blue)
    case "Moldova":
        return "#A9A9A9"; // Couleur de la Moldavie (Dark Gray)
    case "Monaco":
        return "#DAA520"; // Couleur de Monaco (Goldenrod)
    case "Montenegro":
        return "#B8860B"; // Couleur du Monténégro (Dark Goldenrod)
    case "Netherlands":
        return "#ADFF2F"; // Couleur des Pays-Bas (Green Yellow)
    case "Macedonia":
        return "#D2691E"; // Couleur de la Macédoine du Nord (Chocolate)
    case "Norway":
        return "#FF4500"; // Couleur de la Norvège (OrangeRed)
    case "Poland":
        return "#FF1493"; // Couleur de la Pologne (Deep Pink)
    case "Portugal":
        return "#228B22"; // Couleur du Portugal (Forest Green)
    case "Romania":
        return "#8A2BE2"; // Couleur de la Roumanie (BlueViolet)
    case "Russia":
        return "#FF6347"; // Couleur de la Russie (Tomato)
    case "San Marino":
        return "#00BFFF"; // Couleur de Saint-Marin (Deep Sky Blue)
    case "Republic of Serbia":
        return "#FFD700"; // Couleur de la Serbie (Gold)
    case "Slovakia":
        return "#D2691E"; // Couleur de la Slovaquie (Chocolate)
    case "Slovenia":
        return "#FF6347"; // Couleur de la Slovénie (Tomato)
    case "Spain":
        return "#FFD700"; // Couleur de l'Espagne (Gold)
    case "Sweden":
        return "#32CD32"; // Couleur de la Suède (Lime Green)
    case "Switzerland":
        return "#1E90FF"; // Couleur de la Suisse (Dodger Blue)
    case "Turkey":
        return "#FF8C00"; // Couleur de la Turquie (Dark Orange)
    case "Ukraine":
        return "#FF6347"; // Couleur de l'Ukraine (Tomato)
    case "United Kingdom":
        return "#00008B"; // Couleur du Royaume-Uni (Dark Blue)
    case "Vatican City":
        return "#FF4500"; // Couleur de la Cité du Vatican (OrangeRed)
    default:
        return "#D3D3D3"; // Couleur par défaut (Light Grey)
    }
}
/*
// Fonction pour déterminer la couleur de chaque pays dans la carte de l'aide maximale
function getHelpMapColor(countryName) {
    switch (countryName) {
        case "France":
            return "#8FBC8F"; // Aide maximale pour la France (Vert clair)
        case "Spain":
            return "#FFD700"; // Aide maximale pour l'Espagne (Jaune)
        case "Germany":
            return "#FF6347"; // Aide maximale pour l'Allemagne (Rouge)
        case "Italy":
            return "#1E90FF"; // Aide maximale pour l'Italie (Bleu)
        default:
            return "#D3D3D3"; // Couleur par défaut (Light Grey)
    }
}
*/
// Chargement des données GeoJSON depuis un fichier externe pour la carte interactive
fetch('countriesCoordinates.geojson')
  .then(response => response.json())
  .then(data => {
    // Ajout des données GeoJSON à la carte interactive
    L.geoJSON(data, {
      style: function (feature) {
        return {
          fillColor: getInteractiveColor(feature.properties.ADMIN),
          weight: 2,
          opacity: 1,
          color: 'black',
          fillOpacity: 0.7
        };
      },
      onEachFeature: function (feature, layer) {
        layer.on('click', function (e) {
          openTab(feature.properties.ADMIN, "interactive"); // Carte interactive
        });
      }
    }).addTo(map);
  })
  .catch(error => {
    console.error('Erreur lors du chargement du fichier GeoJSON :', error);
  });
  
  /*
    // Ajout des données GeoJSON à la carte de l'aide maximale
    L.geoJSON(data, {
      style: function (feature) {
        return {
          fillColor: getHelpMapColor(feature.properties.ADMIN),
          weight: 2,
          opacity: 1,
          color: 'black',
          fillOpacity: 0.7
        };
      },
      onEachFeature: function (feature, layer) {
        layer.on('click', function (e) {
          openTab(feature.properties.ADMIN, "help"); // Carte de l'aide maximale
        });
      }
    }).addTo(helpMap);


  .catch(error => {
    console.error('Erreur lors du chargement du fichier GeoJSON :', error);
  });
*/
// Fonction pour afficher les informations sur le pays dans l'encadré
function openTab(countryName, mapType) {
    document.getElementById("country-name").textContent = countryName;

    // Remplir les zones de texte avec des informations par défaut ou récupérées
    var countryInfo = document.getElementById("aidesDisponibles");
    var additionalInfo = document.getElementById("montantMaximalAide");

    var data;
    if (mapType === "help") {
        // Pour la carte de l'aide maximale
        data = getHelpMapData(countryName);
    } else {
        // Pour la carte interactive
        data = getCountryData(countryName);
    }

    // Insérer les informations dans les zones de texte
    countryInfo.value = data.aidesDisponibles || "Informations générales sur le pays...";
    additionalInfo.value = data.montantMaximalAide || "Informations supplémentaires...";

    // Afficher l'onglet avec les informations
    document.getElementById("info-tab").style.display = "block";
}

// Fonction qui récupère les données d'un pays pour la carte interactive
function getCountryData(countryName) {
  var countryData = {
      "France": {
          aidesDisponibles: "Bourses du CROUS, Aides au logement (APL, ALS), Prêts étudiants",
          montantMaximalAide: "5 000 € par an pour les bourses, jusqu’à 200 € par mois pour les aides au logement"
      },
      "Spain": {
          aidesDisponibles: "Bourses pour étudiants à revenus faibles, Aides au logement, Prêts étudiants",
          montantMaximalAide: "3 000 € par an pour les bourses, jusqu’à 300 € par mois pour les aides au logement"
      },
      "Germany": {
          aidesDisponibles: "BAföG (aide fédérale pour étudiants), Aides au logement, Prêts étudiants",
          montantMaximalAide: "861 € par mois pour les étudiants vivant chez leurs parents, 1 000 € pour ceux vivant seuls"
      },
      "Italy": {
          aidesDisponibles: "Bourses d'études, Aides au logement",
          montantMaximalAide: "2 500 € par an pour les bourses, jusqu'à 500 € par mois pour les aides au logement"
      },
      "United Kingdom": {
          aidesDisponibles: "Prêts étudiants pour frais de scolarité et entretien, Bourses d'études, Aides au logement",
          montantMaximalAide: "9 000 £ par an pour les frais de scolarité, jusqu’à 11 000 £ par an pour la maintenance"
      },
      "Netherlands": {
          aidesDisponibles: "Bourses pour étudiants, Aides au logement, Prêts étudiants",
          montantMaximalAide: "1 000 € par mois pour les bourses, jusqu’à 500 € par mois pour l’aide au logement"
      },
      "Belgium": {
          aidesDisponibles: "Bourses d'études pour étudiants boursiers, Aides au logement",
          montantMaximalAide: "2 000 € par an pour les bourses, jusqu’à 400 € par mois pour les aides au logement"
      },
      "Sweden": {
          aidesDisponibles: "Prêts étudiants, Bourses d'études, Aides au logement",
          montantMaximalAide: "8 000 SEK par mois pour l'entretien, jusqu’à 3 000 SEK par mois pour l’aide au logement"
      },
      "Finland": {
          aidesDisponibles: "Prêts étudiants, Bourses d'études, Aides au logement",
          montantMaximalAide: "650 € par mois pour l'entretien, jusqu’à 200 € par mois pour les aides au logement"
      },
      "Denmark": {
          aidesDisponibles: "Bourses d’études, Aides au logement, Prêts étudiants",
          montantMaximalAide: "6 000 DKK par mois pour les bourses, jusqu’à 4 000 DKK par mois pour les aides au logement"
      },
      // Ajoute d'autres pays ici
  };

  return countryData[countryName] || { aidesDisponibles: "Aucune donnée disponible", montantMaximalAide: "Aucune donnée disponible" };
}



/*
// Fonction qui récupère les données d'un pays pour la carte de l'aide maximale
function getHelpMapData(countryName) {
    var helpMapData = {
        "France": {
            info: "L'aide maximale en France varie de 10 000 € à 15 000 €.",
            additionalInfo: "Les régions plus éloignées bénéficient de plus d'aide."
        },
        "Espagne": {
            info: "L'Espagne reçoit des aides pour l'agriculture et les infrastructures.",
            additionalInfo: "Les montants varient selon les zones rurales."
        },
        // Ajoute d'autres pays ici
    };

    return helpMapData[countryName] || { info: "", additionalInfo: "" };
}
*/