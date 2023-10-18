function savePriceCoudeToLocalStorage() {
  // Obtenez le contenu de la div priceResultDPI
  let priceResultCoudeDPI = document.getElementById(
    "priceResultCoudeDPI-I"
  ).textContent;
  let diamCoudeDpiI = document.getElementById("diamCoudeDpiI").value;
  let coudeInclinaisonDpiI = document.getElementById(
    "coudeInclinaisonDpiI"
  ).value;
  let quantityCoudeDPI_i = document.getElementById("quantityCoudeDPI-I").value;

// Divisez la chaîne en mots en utilisant l'espace comme séparateur
let words = priceResultCoudeDPI.split(" ");

// Recherchez le montant dans les mots
let montant = null;
for (let i = 0; i < words.length; i++) {
  // Vérifiez si le mot est un nombre (utilisez parseFloat pour les nombres décimaux)
  let number = parseFloat(words[i]);
  if (!isNaN(number)) {
    montant = number;
    break; // Sortez de la boucle si vous avez trouvé un nombre
  }
}

  // Récupérez les données existantes de "data1" depuis localStorage s'il existe
  let existingData1 = JSON.parse(localStorage.getItem("data1")) || {};

  // Créez un tableau pour stocker les détails DPI_i s'ils existent déjà, ou créez un nouveau tableau
  let detailsCoudeDPI_i = existingData1.detailsCoudeDPI_i || [];

  // Créez un nouvel objet pour stocker les informations actuelles
  let coudeDPI_i = {
    priceResultCoudeDPI_i: montant,
    diamCoudeDpiI_i: diamCoudeDpiI,
    coudeInclinaisonDpiI_i: coudeInclinaisonDpiI,
    quantityCoudeDpiI: quantityCoudeDPI_i,
  };

  // Ajoutez le nouvel objet au tableau de détails
  detailsCoudeDPI_i.push(coudeDPI_i);

  // Mettez à jour les détails DPI_i dans l'objet existant
  existingData1.detailsCoudeDPI_i = detailsCoudeDPI_i;

  // Convertissez l'objet JSON mis à jour en une chaîne JSON
  let updatedData1 = JSON.stringify(existingData1);

  // Stockez la chaîne JSON mise à jour dans localStorage
  localStorage.setItem("data1", updatedData1);

  // Après avoir enregistré avec succès, affichez le message de succès
  const successMessage = document.getElementById("successMessage");
  successMessage.style.display = "block";

  // Ajoutez un délai pour masquer automatiquement le message après quelques secondes (par exemple, 3 secondes)
  setTimeout(function () {
    successMessage.style.display = "none";
  }, 3000); // 1500 millisecondes (1.5 secondes)
}
