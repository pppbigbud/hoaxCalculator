function savePriceToLocalStorage() {
  // Obtenez le contenu de la div priceResultDPI
  let priceResultDPI = document.getElementById("priceResultDPI-I").textContent;
  let sizeDpiI = document.getElementById("size").value;
  let diameterDpiI = document.getElementById("diameter").value;
  let quantityDPI_i = document.getElementById("quantityDPI-I").value;

  // Divisez la chaîne en mots en utilisant l'espace comme séparateur
  let words = priceResultDPI.split(" ");

  // Recherchez le montant dans les mots
  let justPriceDpiI = null;
  for (let i = 0; i < words.length; i++) {
    // Vérifiez si le mot est un nombre (utilisez parseFloat pour les nombres décimaux)
    let number = parseFloat(words[i]);
    if (!isNaN(number)) {
      justPriceDpiI = number;
      break; // Sortez de la boucle si vous avez trouvé un nombre
    }
  }

  // Récupérez les données existantes de "data1" depuis localStorage s'il existe
  let existingData1 = JSON.parse(localStorage.getItem("data1")) || {};

  // Créez un tableau pour stocker les détails DPI_i s'ils existent déjà, ou créez un nouveau tableau
  let detailsDPI_i = existingData1.detailsDPI_i || [];

  // Créez un nouvel objet pour stocker les informations actuelles
  let DPI_i = {
    priceDPI: justPriceDpiI,
    sizDpiI: sizeDpiI,
    diamDpiI: diameterDpiI,
    quantityDPI_i: quantityDPI_i,
  };

  // Ajoutez le nouvel objet au tableau de détails
  detailsDPI_i.push(DPI_i);

  // Mettez à jour les détails DPI_i dans l'objet existant
  existingData1.detailsDPI_i = detailsDPI_i;

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
  }, 1500); // 1500 millisecondes (1.5 secondes)
}
