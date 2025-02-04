// Initialisation de la carte interactive avec un zoom de départ centré sur l'Europe
var map = L.map('map').setView([50.8503, 4.3517], 4); // Coordonnées de l'Europe (Bruxelles)

// Fond de carte OpenStreetMap pour la carte interactive
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

document.addEventListener("DOMContentLoaded", function () {
  const variableSelection = document.getElementById("variableSelection");
  const variableValue = document.getElementById("variableValeur");
  const countryInfo = document.getElementById("aidesDisponibles");
  const additionalInfo = document.getElementById("montantMaximalAide");
  const countryNameElement = document.getElementById("country-name");

  let csvData = [];
  let headers = [];

  // Fetch CSV once and store data
  fetch("data_final.csv")
    .then(response => response.text())
    .then(data => {
      let lines = data.split("\n");
      headers = lines[0].split(";");
      csvData = lines.slice(1).map(line => line.split(";"));

      // Populate dropdown options
      headers.slice(1).forEach(header => {
        let option = document.createElement("option");
        option.value = header;
        option.textContent = header;
        variableSelection.appendChild(option);
      });
    });

  // Load GeoJSON and set interactivity
  fetch('countriesCoordinates.geojson')
    .then(response => response.json())
    .then(data => {
      L.geoJSON(data, {
        style: feature => ({
          fillColor: getInteractiveColor(feature.properties.ADMIN),
          weight: 2,
          opacity: 1,
          color: 'black',
          fillOpacity: 0.7
        }),
        onEachFeature: (feature, layer) => {
          layer.on('click', () => openTab(feature.properties.ADMIN));
        }
      }).addTo(map);
    })
    .catch(error => console.error('Erreur lors du chargement du fichier GeoJSON :', error));

  // Function to update variable values
  function updateVariableValues(countryName) {
    const selectedVariable = variableSelection.value;
    const index = headers.indexOf(selectedVariable);

    let found = false;
    for (let values of csvData) {
      if (values[0] === countryName) {
        countryInfo.value = additionalInfo.value = "Données disponibles";
        variableValue.value = index !== -1 ? values[index] : "Informations non disponibles";
        found = true;
        break;
      }
    }

    if (!found) {
      countryInfo.value = additionalInfo.value = variableValue.value = "Informations non disponibles";
    }
  }

  // Function to handle country selection
  function openTab(countryName) {
    countryNameElement.textContent = countryName;
    updateVariableValues(countryName);
  }

  // Listen for variable selection changes
  variableSelection.addEventListener("change", () => {
    updateVariableValues(countryNameElement.textContent);
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