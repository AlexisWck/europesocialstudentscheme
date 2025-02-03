// Fonction pour afficher la carte interactive 
function showInteractiveMap() {
    document.getElementById("map-container").style.display = "block";
  }
  
  // Initialisation de la carte interactive avec un zoom de départ centré sur l'Europe
  var map = L.map('map').setView([50.8503, 4.3517], 4); // Coordonnées de l'Europe (Bruxelles)
  
  // Fond de carte OpenStreetMap pour la carte interactive
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  
  // Fonction pour déterminer la couleur de chaque pays dans la carte interactive
  function getInteractiveColor(countryName) {
      switch (countryName) {
        case "Albania": return "#FF6347";
        case "Andorra": return "#FFD700";
        case "Armenia": return "#32CD32";
        case "Austria": return "#1E90FF";
        case "Azerbaijan": return "#8A2BE2";
        case "Belarus": return "#FF8C00";
        case "Belgium": return "#FFD700";
        case "Bosnia and Herzegovina": return "#228B22";
        case "Bulgaria": return "#9932CC";
        case "Croatia": return "#FF1493";
        case "Cyprus": return "#7FFF00";
        case "Czech Republic": return "#D2691E";
        case "Denmark": return "#00BFFF";
        case "Estonia": return "#FF4500";
        case "Finland": return "#00008B";
        case "France": return "#FF6347";
        case "Germany": return "#32CD32";
        case "Greece": return "#0000CD";
        case "Hungary": return "#8B4513";
        case "Ireland": return "#006400";
        case "Italy": return "#1E90FF";
        case "Netherlands": return "#ADFF2F";
        case "Norway": return "#FF4500";
        case "Poland": return "#FF1493";
        case "Portugal": return "#228B22";
        case "Spain": return "#FFD700";
        case "Sweden": return "#32CD32";
        case "Switzerland": return "#1E90FF";
        case "United Kingdom": return "#00008B";
        default: return "#D3D3D3";
      }
  }
  
  // Chargement des données GeoJSON depuis un fichier externe
  fetch('countriesCoordinates.geojson')
    .then(response => response.json())
    .then(data => {
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
            openTab(feature.properties.ADMIN);
          });
        }
      }).addTo(map);
    })
    .catch(error => {
      console.error('Erreur lors du chargement du fichier GeoJSON :', error);
    });
  
  // Fonction pour afficher les informations sur le pays sélectionné
  function openTab(countryName) {
      document.getElementById("country-name").textContent = countryName;
      var countryInfo = document.getElementById("aidesDisponibles");
      var additionalInfo = document.getElementById("montantMaximalAide");
      var data = getCountryData(countryName);
      countryInfo.value = data.aidesDisponibles || "Informations générales sur le pays...";
      additionalInfo.value = data.montantMaximalAide || "Informations supplémentaires...";
      document.getElementById("info-tab").style.display = "block";
  }
  
  // Fonction qui récupère les données d'un pays
  function getCountryData(countryName) {
    var countryData = {
        "France": { aidesDisponibles: "Bourses du CROUS, APL, Prêts étudiants", montantMaximalAide: "5 000 € par an" },
        "Spain": { aidesDisponibles: "Bourses, APL, Prêts étudiants", montantMaximalAide: "3 000 € par an" },
        "Germany": { aidesDisponibles: "BAföG, APL, Prêts étudiants", montantMaximalAide: "861 € par mois" },
        "Italy": { aidesDisponibles: "Bourses, APL", montantMaximalAide: "2 500 € par an" },
        "United Kingdom": { aidesDisponibles: "Prêts étudiants, Bourses, APL", montantMaximalAide: "9 000 £ par an" },
        "Netherlands": { aidesDisponibles: "Bourses, APL, Prêts étudiants", montantMaximalAide: "1 000 € par mois" },
        "Belgium": { aidesDisponibles: "Bourses, APL", montantMaximalAide: "2 000 € par an" },
        "Sweden": { aidesDisponibles: "Prêts étudiants, Bourses, APL", montantMaximalAide: "8 000 SEK par mois" },
        "Finland": { aidesDisponibles: "Prêts étudiants, Bourses, APL", montantMaximalAide: "650 € par mois" },
        "Denmark": { aidesDisponibles: "Bourses, APL, Prêts étudiants", montantMaximalAide: "6 000 DKK par mois" }
    };
    return countryData[countryName] || { aidesDisponibles: "Aucune donnée disponible", montantMaximalAide: "Aucune donnée disponible" };
  }
  