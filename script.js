// Initialisation de la carte interactive avec un zoom de départ centré sur l'Europe
var map = L.map('map').setView([50.8503, 4.3517], 4); // Coordonnées de l'Europe (Bruxelles)

// Fond de carte OpenStreetMap pour la carte interactive
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Chargement des variables du fichier CSV
document.addEventListener("DOMContentLoaded", function () {
  fetch("data_final.csv")
    .then(response => response.text())
    .then(data => {
      let lines = data.split("\n");
      let headers = lines[0].split(";");
      let select = document.getElementById("variableSelection");

      headers.slice(1).forEach(header => {
        let option = document.createElement("option");
        option.value = header;
        option.textContent = header;
        select.appendChild(option);
      });
    });


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

  const variableSelection = document.getElementById("variableSelection");
  const variableValue = document.getElementById("variableValeur");
  const countryInfo = document.getElementById("aidesDisponibles");
  const additionalInfo = document.getElementById("montantMaximalAide");
  variableSelection.addEventListener("change", function () {
    const countryName = document.getElementById("country-name").textContent;
    const selectedVariable = variableSelection.value;
    fetch("data_final.csv")
      .then(response => response.text())
      .then(data => {
        let lines = data.split("\n");
        let headers = lines[0].split(";");
        let index = headers.indexOf(selectedVariable);
        let found = false;

        for (let i = 1; i < lines.length; i++) {
          let values = lines[i].split(";");
          if (values[0] === countryName) {
            countryInfo.value = "Données disponibles";
            additionalInfo.value = "Données disponibles";
            variableValue.value = index !== -1 ? values[index] : "Informations non disponibles";
            found = true;
            break;
          }
        }
        if (!found) {
          countryInfo.value = "Informations non disponibles";
          additionalInfo.value = "Informations non disponibles";
          variableValue.value = "Informations non disponibles";
        }
      });
  });
});

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


// Fonction pour afficher les informations sur le pays sélectionné
function openTab(countryName) {
  document.getElementById("country-name").textContent = countryName;
  var countryInfo = document.getElementById("aidesDisponibles");
  var additionalInfo = document.getElementById("montantMaximalAide");
  var variableValue = document.getElementById("variableValeur");
  var selectedVariable = document.getElementById("variableSelection").value;

  fetch("data_final.csv")
    .then(response => response.text())
    .then(data => {
      let lines = data.split("\n");
      let headers = lines[0].split(";");
      let index = headers.indexOf(selectedVariable);
      let found = false;

      for (let i = 1; i < lines.length; i++) {
        let values = lines[i].split(";");
        if (values[0] === countryName) {
          countryInfo.value = "Données disponibles";
          additionalInfo.value = "Données disponibles";
          variableValue.value = index !== -1 ? values[index] : "Informations non disponibles";
          found = true;
          break;
        }
      }
      if (!found) {
        countryInfo.value = "Informations non disponibles";
        additionalInfo.value = "Informations non disponibles";
        variableValue.value = "Informations non disponibles";
      }
    });
}


