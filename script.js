// Initialisation de la carte interactive avec un zoom de départ centré sur l'Europe
var map = L.map('map').setView([50.8503, 4.3517], 4);

// Fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let csvData = [];
let headers = [];
let geoJsonLayer;

// Fonction pour interpoler les couleurs entre rouge et vert
function getColor(value, min, max) {
  if (value === null) return "#D3D3D3"; // Gris si aucune donnée
  let ratio = (value - min) / (max - min);
  let r = Math.round(255 * (1 - ratio));
  let g = Math.round(255 * ratio);
  return `rgb(${r},${g},0)`;
}

// Chargement des données CSV
fetch("data_final.csv")
  .then(response => response.text())
  .then(data => {
    let lines = data.split("\n");
    headers = lines[0].split(";");
    csvData = lines.slice(1).map(line => line.split(";"));

    // Ajout des options dans la liste déroulante
    headers.slice(1).forEach(header => {
      let option = document.createElement("option");
      option.value = header;
      option.textContent = header;
      document.getElementById("variableSelection").appendChild(option);
    });
  });

// Chargement du GeoJSON
fetch('countriesCoordinates.geojson')
  .then(response => response.json())
  .then(data => {
    geoJsonLayer = L.geoJSON(data, {
      style: feature => ({
        fillColor: "#D3D3D3", // Gris par défaut
        weight: 2,
        opacity: 1,
        color: 'black',
        fillOpacity: 0.7
      }),
      onEachFeature: (feature, layer) => {
        layer.on('click', () => openTab(feature.properties.ADMIN));
      }
    }).addTo(map);
  });

// Fonction pour mettre à jour la carte avec les couleurs dynamiques
function updateMapColors(selectedVariable) {
  let index = headers.indexOf(selectedVariable);
  if (index === -1) return;

  let values = csvData.map(row => parseFloat(row[index])).filter(val => !isNaN(val));
  let minVal = Math.min(...values);
  let maxVal = Math.max(...values);

  geoJsonLayer.eachLayer(layer => {
    let countryName = layer.feature.properties.ADMIN;
    let dataRow = csvData.find(row => row[0] === countryName);
    let value = dataRow ? parseFloat(dataRow[index]) : null;
    let color = getColor(value, minVal, maxVal);
    layer.setStyle({ fillColor: color });
  });
}

// Gestion de la sélection d'une variable
const variableSelection = document.getElementById("variableSelection");
variableSelection.addEventListener("change", () => {
  updateMapColors(variableSelection.value);
});

// Fonction d'affichage des valeurs lors du clic sur un pays
function openTab(countryName) {
  document.getElementById("country-name").textContent = countryName;
  let selectedVariable = variableSelection.value;
  let index = headers.indexOf(selectedVariable);
  let dataRow = csvData.find(row => row[0] === countryName);
  let value = dataRow ? dataRow[index] : "Informations non disponibles";
  document.getElementById("variableValeur").value = value;
}