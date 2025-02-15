// Initialisation de la carte interactive avec un zoom de départ centré sur l'Europe 
var map = L.map('map').setView([50.8503, 4.3517], 4);

// Fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let csvData = [];
let headers = [];
let geoJsonLayer;
let variableDescriptions = {
  "50% of the Net Average Production Workers Wage (in $PPP) - Annual taxable (gross) work income  (Model Family 1)": "Net Average Production Workers Wage (APW) of the model family 1 (national currency)",
  "100% of the Net Average Production Workers Wage (in $PPP) - Annual taxable (gross) work income  (Model Family 2)": "Net Average Production Workers Wage (APW) of the model family 2 (national currency)",
  "200% of the Net Average Production Workers Wage (in $PPP) - Annual taxable (gross) work income  (Model Family 3)": "Net Average Production Workers Wage (APW) of the model family 3 (national currency)",
  "Model Family 1 : Total amount of non-repayable support (grants)" : "Total amount of non-repayable support (grants) of the model family 1 (national currency)",
  "Model Family 2 : Total amount of non-repayable support (grants)" : "Total amount of non-repayable support (grants) of the model family 2 (national currency)",
  "Model Family 3 : Total amount of non-repayable support (grants)" : "Total amount of non-repayable support (grants) of the model family 1 (national currency)",
  "Total amount of tuition fees paid by students or parents (minus discounts/exemptions)" : "Total amount of tuition fees paid by students or parents of model family 1 (minus discounts/exemptions)",
  "Total amount of tuition fees paid by students or parents (minus discounts/exemptions)" : "Total amount of tuition fees paid by students or parents of model family 2 (minus discounts/exemptions)",
  "Total amount of tuition fees paid by students or parents (minus discounts/exemptions)" : "Total amount of tuition fees paid by students or parents of model family 3 (minus discounts/exemptions)",
  "fam26": "Total amount of family benefits paid to parents (tax credits and family allowances)",
  "fam52": "Total amount of family benefits paid to parents (tax credits and family allowances)",
  "fam104": "Total amount of family benefits paid to parents (tax credits and family allowances)",
  "loan26": "Total amount of student loans of different model families (national currency)",
  "loan52": "Total amount of student loans of different model families (national currency)",
  "loan104": "Total amount of student loans of different model families (national currency)",
};

//country;50% of the Net Average Production Workers Wage (in $PPP) - Annual taxable (gross) work income  (Model Family 1);Model Family 1 : Total amount of non-repayable support (grants);Model Family 1 : Total amount of tuition fees;Model Family 1 : Total amount of family benefits - paid to parents of a student;Model Family 1 : Total amount of student loans ;Model Family 1 : sum of non-repayable support ;Model Family 1 : sum of all types of support ;Model Family 1 : sum of all types of support, minus tuition fees;100% of the Net Average Production Workers Wage (in $PPP) - Annual taxable (gross) work income  (Model Family 2);Model Family 12 : Total amount of non-repayable support (grants);Model Family 2 : Total amount of tuition fees;Model Family 2 : Total amount of family benefits - paid to parents of a student;Model Family 2 : Total amount of student loans ;Model Family 2 : sum of non-repayable support ;Model Family 2 : sum of all types of support ;Model Family 2 : sum of all types of support, minus tuition fees;200% of the Net Average Production Workers Wage (in $PPP) - Annual taxable (gross) work income  (Model Family 3);Model Family 3 : Total amount of non-repayable support (grants);Model Family 3 : Total amount of tuition fees;Model Family 3 : Total amount of family benefits - paid to parents of a student;Model Family 3 : Total amount of student loans ;Model Family 3 : sum of non-repayable support ;Model Family 3 : sum of all types of support ;Model Family 3 : sum of all types of support, minus tuition fees;"Non-repayable student support as a percentage of net 
//APW, an average for the three model families ";"Tuition fee as a percentage of net APW, an average 
//for the three model families ";"Family benefits (indirect support) as a percentage of 
//net APW, an average for the three model families ";"Repayable student loan as a percentage of net APW, 
//an average for the three model families ";"Non-repayable student support as a percentage of 
//APW, an average for the three model families";"Total support as a percentage of APW, an average for 
//the three model families ";"Total support net of tuition fees as a percentage of net 
//APW, an average for the three model families "


// Mise à jour de la description de la variable sélectionnée
document.getElementById("variableSelection").addEventListener("change", function () {
    let selectedVariable = this.value;
    let description = variableDescriptions[selectedVariable] || "Ni";
    document.getElementById("descriptionVariable").textContent = description;
});

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

    // Sélection automatique de la première variable et déclenchement de l'événement change
    let firstVariable = headers[1];
    let variableSelection = document.getElementById("variableSelection");
    variableSelection.value = firstVariable;
    variableSelection.dispatchEvent(new Event("change"));
    updateMapColors(firstVariable);
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

// Fonction d'interpolation de couleurs entre rouge et vert
function getColor(value, min, max) {
  if (value === null) return "#D3D3D3"; // Gris si aucune donnée
  let ratio = (value - min) / (max - min);
  let r = Math.round(255 * (1 - ratio));
  let g = Math.round(255 * ratio);
  return `rgb(${r},${g},0)`;
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

// Exécuter après le chargement de toutes les fonctions
window.onload = function () {
  let variableSelection = document.getElementById("variableSelection");
  let firstVariable = headers[1];
  variableSelection.value = firstVariable;
  variableSelection.dispatchEvent(new Event("change"));
  updateMapColors(firstVariable);
};
