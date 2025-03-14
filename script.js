// Initialisation de la carte interactive avec un zoom de départ centré sur l'Europe 
var map = L.map('map').setView([30.8503, 4.3517], 4);

// Fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let csvData = [];
let headers = [];
let geoJsonLayer = null;  // Initialisation correcte
let decileClassification = {};  // 🔹 Assurer qu'il est bien global
let variableDescriptions = {
  "50% of the Net Average Production Workers Wage (in $PPP) - Annual taxable (gross) work income  (Model Family 1)":
    "Annual gross taxable work income of Model Family 1, earning 50% of the Net Average Production Workers Wage (APW), converted to $PPP.",
  
  "Model Family 1 : Total amount of non-repayable support (grants)":
    "Total amount of non-repayable financial support (such as grants and scholarships) received by Model Family 1 ($PPP).",
  
  "Model Family 1 : Total amount of tuition fees":
    "Total tuition fees paid by Model Family 1, after any applicable exemptions or discounts ($PPP).",
  
  "Model Family 1 : Total amount of family benefits - paid to parents of a student":
    "Total financial support given to parents of Model Family 1, including child allowances and tax benefits related to student support ($PPP).",
  
  "Model Family 1 : Total amount of student loans":
    "Total amount of repayable student loans taken by Model Family 1 ($PPP).",
  
  "Model Family 1 : sum of non-repayable support":
    "Total sum of non-repayable financial support (grants and indirect family benefits) for Model Family 1 ($PPP).",
  
  "Model Family 1 : sum of all types of support":
    "Total support received by Model Family 1, including grants, family benefits, and student loans ($PPP).",
  
  "Model Family 1 : sum of all types of support, minus tuition fees":
    "Total financial support received by Model Family 1, net of tuition fees ($PPP).",

  "100% of the Net Average Production Workers Wage (in $PPP) - Annual taxable (gross) work income  (Model Family 2)":
    "Annual gross taxable work income of Model Family 2, earning 100% of the Net Average Production Workers Wage (APW), converted to $PPP.",
  
  "Model Family 2 : Total amount of non-repayable support (grants)":
    "Total amount of non-repayable financial support (such as grants and scholarships) received by Model Family 2 ($PPP).",
  
  "Model Family 2 : Total amount of tuition fees":
    "Total tuition fees paid by Model Family 2, after any applicable exemptions or discounts ($PPP).",
  
  "Model Family 2 : Total amount of family benefits - paid to parents of a student":
    "Total financial support given to parents of Model Family 2, including child allowances and tax benefits related to student support ($PPP).",
  
  "Model Family 2 : Total amount of student loans":
    "Total amount of repayable student loans taken by Model Family 2 ($PPP).",
  
  "Model Family 2 : sum of non-repayable support":
    "Total sum of non-repayable financial support (grants and indirect family benefits) for Model Family 2 ($PPP).",
  
  "Model Family 2 : sum of all types of support":
    "Total support received by Model Family 2, including grants, family benefits, and student loans ($PPP).",
  
  "Model Family 2 : sum of all types of support, minus tuition fees":
    "Total financial support received by Model Family 2, net of tuition fees ($PPP).",

  "200% of the Net Average Production Workers Wage (in $PPP) - Annual taxable (gross) work income  (Model Family 3)":
    "Annual gross taxable work income of Model Family 3, earning 200% of the Net Average Production Workers Wage (APW), converted to $PPP.",
  
  "Model Family 3 : Total amount of non-repayable support (grants)":
    "Total amount of non-repayable financial support (such as grants and scholarships) received by Model Family 3 ($PPP).",
  
  "Model Family 3 : Total amount of tuition fees":
    "Total tuition fees paid by Model Family 3, after any applicable exemptions or discounts ($PPP).",
  
  "Model Family 3 : Total amount of family benefits - paid to parents of a student":
    "Total financial support given to parents of Model Family 3, including child allowances and tax benefits related to student support ($PPP).",
  
  "Model Family 3 : Total amount of student loans":
    "Total amount of repayable student loans taken by Model Family 3 ($PPP).",
  
  "Model Family 3 : sum of non-repayable support":
    "Total sum of non-repayable financial support (grants and indirect family benefits) for Model Family 3 ($PPP).",
  
  "Model Family 3 : sum of all types of support":
    "Total support received by Model Family 3, including grants, family benefits, and student loans ($PPP).",
  
  "Model Family 3 : sum of all types of support, minus tuition fees":
    "Total financial support received by Model Family 3, net of tuition fees ($PPP).",

  "Non-repayable student support as a percentage of net APW, an average for the three model families":
    "Average percentage of non-repayable student support relative to the Net Average Production Workers Wage (APW) across the three model families.",

  "Tuition fee as a percentage of net APW, an average for the three model families":
    "Average percentage of tuition fees relative to the Net Average Production Workers Wage (APW) across the three model families.",
  
  "Family benefits (indirect support) as a percentage of net APW, an average for the three model families":
    "Average percentage of family benefits (indirect student support) relative to the Net Average Production Workers Wage (APW) across the three model families.",
  
  "Repayable student loan as a percentage of net APW, an average for the three model families":
    "Average percentage of repayable student loans relative to the Net Average Production Workers Wage (APW) across the three model families.",
  
  "Non-repayable student support as a percentage of APW, an average for the three model families":
    "Alternative measure of non-repayable student support as a percentage of the APW, averaged across the three model families.",
  
  "Total support as a percentage of APW, an average for the three model families":
    "Total student financial support (including grants, family benefits, and loans) as a percentage of the APW, averaged across the three model families.",
  
  "Total support net of tuition fees as a percentage of net APW, an average for the three model families":
    "Total student support, excluding tuition fees, as a percentage of the APW, averaged across the three model families."
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

// 📌 Chargement du fichier classification_deciles.csv
fetch("classification_deciles.csv")
    .then(response => response.text())
    .then(data => {
        let lines = data.split("\n").map(line => line.trim()).filter(line => line.length > 0);
        let rows = lines.slice(1);

        rows.forEach(row => {
            let values = row.split(",");
            let countryName = values[1]?.trim().toLowerCase().replace(/\s+/g, ""); // Nom du pays (colonne 2)
            
            // Stocke les valeurs des déciles (colonnes 3, 4 et 5)
            if (countryName) {
                decileClassification[countryName] = {
                    "Family 1": values[2] ? values[2].trim() : "N/A",
                    "Family 2": values[3] ? values[3].trim() : "N/A",
                    "Family 3": values[4] ? values[4].trim() : "N/A"
                };
            }
        });

        console.log("✅ Decile classification data loaded:", decileClassification);
    })
    .catch(error => console.error("❌ Error loading classification_deciles.csv:", error));

// 📌 Chargement des données CSV principales
fetch("data_final.csv")
    .then(response => response.text())
    .then(data => {
        let lines = data.split("\n");
        headers = lines[0].split(";");
        csvData = lines.slice(1).map(line => line.split(";"));

        console.log("✅ Headers from CSV:", headers); // ➜ Affiche les variables disponibles
        console.log("🔍 Full list of headers:");
        headers.forEach((header, index) => {
           console.log(`Header ${index}:`, `"${header}"`);
        });

        // Ajout des options dans la liste déroulante
        headers.slice(1).forEach(header => {
            let option = document.createElement("option");
            option.value = header;
            option.textContent = header;
            document.getElementById("variableSelection").appendChild(option);
            console.log("🔹 Variable added to dropdown:", header.trim()); // ➜ Vérifie si elles sont bien ajoutées
        });

        console.log("✅ CSV data loaded.");
    })
    .catch(error => console.error("❌ Error loading data_final.csv:", error));

// 📌 Chargement du fichier GeoJSON et affichage sur la carte
fetch('countriesCoordinates.geojson')
    .then(response => response.json())
    .then(data => {
        geoJsonLayer = L.geoJSON(data, {
            style: feature => ({
                fillColor: "#D3D3D3", // Couleur par défaut
                weight: 2,
                opacity: 1,
                color: 'black',
                fillOpacity: 0.7
            }),
            onEachFeature: (feature, layer) => {
                layer.on('click', () => openTab(feature.properties.ADMIN)); // Récupère le pays
            }
        }).addTo(map);

        console.log("✅ GeoJSON loaded.");
        
        // 📌 Maintenant que geoJsonLayer est défini, on peut appeler updateMapColors()
        let firstVariable = headers[1];
        if (firstVariable) {
            updateMapColors(firstVariable);
        }
    })
    .catch(error => console.error("❌ Error loading countriesCoordinates.geojson:", error));

// 📌 Fonction pour mettre à jour la carte (MAJ : Empêcher l'exécution si `geoJsonLayer` est null)
function updateMapColors(selectedVariable) {
    if (!geoJsonLayer) {
        console.warn("⚠ updateMapColors() called but geoJsonLayer is not defined yet.");
        return;
    }

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

// 📌 Liste des variables pour lesquelles l'échelle des couleurs doit être inversée (ex: coûts)
const inverseColorVariables = [
  "Model Family 1 : Total amount of tuition fees",
  "Model Family 2 : Total amount of tuition fees",
  "Model Family 3 : Total amount of tuition fees",
];


// 📌 Fonction pour interpoler les couleurs entre rouge et vert (et inverser si nécessaire)
function getColor(value, min, max, selectedVariable) {
  if (value === null || isNaN(value)) return "#D3D3D3"; // Gris si aucune donnée

  // 🔹 Vérifier si la variable sélectionnée est dans la liste des coûts
  const isInverted = inverseColorVariables.includes(selectedVariable);

  // 🔹 Évite la division par zéro (si min == max)
  let ratio = (max !== min) ? (value - min) / (max - min) : 0.5;

  // 🔹 Empêcher le ratio de dépasser [0,1]
  ratio = Math.max(0, Math.min(1, ratio));

  // 🔹 Inverser la couleur si la variable est dans `inverseColorVariables`
  if (isInverted) {
    return `rgb(${Math.round(255 * ratio)}, ${Math.round(255 * (1 - ratio))}, 0)`; // 🟩 Vert → Rouge 🟥
  } else {
    return `rgb(${Math.round(255 * (1 - ratio))}, ${Math.round(255 * ratio)}, 0)`; // 🟥 Rouge → Vert 🟩
  }
}


// 📌 Fonction openTab() mise à jour avec affichage des déciles (MAJ : Vérification `decileClassification`)
function openTab(countryName) {
  console.log("🔹 Clicked country:", countryName);
  document.getElementById("country-name").textContent = countryName;

  const selectedVariable = document.getElementById("variableSelection").value;
  const index = headers.indexOf(selectedVariable);
  const dataRow = csvData.find(row => row[0] === countryName);
  let value = dataRow ? dataRow[index] : "Data not available";

  // Couper avant la virgule et ajouter $
  if (typeof value === "string" && value.includes(",")) {
    value = value.split(",")[0]; // Prendre uniquement la partie avant la virgule
}

// 📌 Vérifier si la variable sélectionnée contient "percentage" pour afficher "%" au lieu de "$"
if (selectedVariable.toLowerCase().includes("percentage")) {
    value += "%";
} else {
    value += "$";
}

  document.getElementById("variableValeur").textContent = value;

    let normalizedCountry = countryName.toLowerCase().replace(/\s+/g, "");

    console.log("🔍 Checking for:", normalizedCountry);

    if (Object.keys(decileClassification).length === 0) {
        console.warn("⚠ decileClassification is still empty!");
        return;
    }

    if (decileClassification[normalizedCountry]) {
        console.log("✅ Data found:", decileClassification[normalizedCountry]);
        document.getElementById("family1").textContent = `Family 1: Incomes decile - ${decileClassification[normalizedCountry]["Family 1"]}`;
        document.getElementById("family2").textContent = `Family 2: Incomes decile - ${decileClassification[normalizedCountry]["Family 2"]}`;
        document.getElementById("family3").textContent = `Family 3: Incomes decile - ${decileClassification[normalizedCountry]["Family 3"]}`;
    } else {
        console.log("❌ No data found for", normalizedCountry);
        document.getElementById("family1").textContent = "Family 1: Data not available";
        document.getElementById("family2").textContent = "Family 2: Data not available";
        document.getElementById("family3").textContent = "Family 3: Data not available";
    }
}

// 📌 Gestion de la sélection d'une variable (MAJ : Ajout de vérification `geoJsonLayer`)
document.getElementById("variableSelection").addEventListener("change", () => {
    if (geoJsonLayer) {
        updateMapColors(document.getElementById("variableSelection").value);
    } else {
        console.warn("⚠ GeoJSON is not loaded yet.");
    }
});

// 📌 Exécuter après le chargement complet de la page
window.addEventListener("load", function () {
    let variableSelection = document.getElementById("variableSelection");
    if (headers.length > 1) {
        let firstVariable = headers[1];
        variableSelection.value = firstVariable;
        variableSelection.dispatchEvent(new Event("change"));
        updateMapColors(firstVariable);
    }
});