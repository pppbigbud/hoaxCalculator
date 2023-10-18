document.addEventListener("DOMContentLoaded", function () {
  // Récupérez l'élément "devisContainer" où vous souhaitez afficher les détails
  let devisContainer = document.getElementById("devisContainer");

  // Récupérez les données du localStorage
  let data1 = JSON.parse(localStorage.getItem("data1"));

  // Sélectionnez le bouton de mise à jour du devis par son identifiant
  // let updateDevisButton = document.getElementById("updateDevisButton");

  // updateDevisButton.addEventListener("click", function () {

  if (data1) {
    if (data1 && data1.detailsCoudeDPI_i) {
      // Récupérez l'élément <ul> pour la liste des produits
      let productList = devisContainer.querySelector("ul");

      // Parcourez les éléments de detailsCoudeDPI_i
      for (let i = 0; i < data1.detailsCoudeDPI_i.length; i++) {
        let coude = data1.detailsCoudeDPI_i[i];
        let listItem = document.createElement("li");
        listItem.className = "py-2";

        // Créez une structure pour afficher les détails du produit
        let productDetails = `
            <div class="flex justify-between">
              <span class="text-lg font-semibold">COUDE <span class="text-blue-600 text-xs font-semibold text-gray-900 dark:text-white">DPI-I : </span> ${coude.diamCoudeDpiI_i} mm // ${coude.coudeInclinaisonDpiI_i} °</span>
              <span>Quantité : ${coude.quantityCoudeDpiI} ex</span>
            </div>
            <div class="flex justify-between">
              <span class="text-xs text-gray-900 dark:text-white">Coude de ${coude.diamCoudeDpiI_i}mm de diamètre en Inox-304 double paroi isolé permet de dévier le conduit de fumé d'un angle de ${coude.coudeInclinaisonDpiI_i}°.</span>
              <span class="text-lg font-semibold">${coude.priceResultCoudeDPI_i} €</span>
            </div>
          `;

        listItem.innerHTML = productDetails;
        productList.appendChild(listItem);
      }
    } else {
      devisContainer.innerHTML = "<p>Aucune donnée disponible.</p>";
    }

    if (data1 && data1.detailsDPI_i) {
      // Récupérez l'élément <ul> pour la liste des produits
      let productList = devisContainer.querySelector("ul");

      // Parcourez les éléments de detailsDPI_i
      for (let j = 0; j < data1.detailsDPI_i.length; j++) {
        let dpi = data1.detailsDPI_i[j];
        let listItem = document.createElement("li");
        listItem.className = "py-2";

        // Créez une structure pour afficher les détails du produit
        let productDetails = `
            <div class="flex justify-between bg-gray-50">
              <span class="text-lg font-semibold">LONGUEUR <span class="text-blue-600 text-xs font-semibold text-gray-900 dark:text-white">DPI-I : </span> ${dpi.diamDpiI} mm // ${dpi.sizDpiI} cm</span>
              <span>Quantité : ${dpi.quantityDPI_i} ex</span>
            </div>
            <div class="flex justify-between bg-gray-50">
              <span class="text-xs text-gray-900 dark:text-white">Longueur de ${dpi.diamDpiI}mm de diamètre en Inox-304 double paroi isolé d'une taille de ${dpi.sizDpiI} cm.</span>
              <span class="text-lg font-semibold">${dpi.priceDPI} €</span>
            </div>
          `;

        listItem.innerHTML = productDetails;
        productList.appendChild(listItem);
      }
    } else {
      devisContainer.innerHTML = "<p>Aucune donnée disponible.</p>";
    }

    // Initialisez une variable pour stocker la somme
    let totalDpiI = 0;
    let totalCoudeDpiI = 0;

    // Vérifiez si data1.detailsDPI_i est défini et n'est pas vide
    if (data1.detailsDPI_i && data1.detailsDPI_i.length > 0) {
      // Parcourez le tableau et ajoutez chaque élément au total
      for (let i = 0; i < data1.detailsDPI_i.length; i++) {
        totalDpiI += data1.detailsDPI_i[i].priceDPI;
      }
    }

    if (data1.detailsCoudeDPI_i && data1.detailsCoudeDPI_i.length > 0) {
      // Parcourez le tableau et ajoutez chaque élément au total
      for (let i = 0; i < data1.detailsCoudeDPI_i.length; i++) {
        totalCoudeDpiI += data1.detailsCoudeDPI_i[i].priceResultCoudeDPI_i;
      }
    }



    
    let total = totalDpiI + totalCoudeDpiI;
    let taxes = "20%";
    let variablePrix = total * 0.2;
    let globalTotal = total + variablePrix;

    // Mettez à jour l'élément HTML avec l'ID "sousTotal" avec la valeur calculée
    document.getElementById("sousTotal").textContent = total + " €";
    document.getElementById("taxes").textContent = taxes ;
    document.getElementById("total").textContent = globalTotal + " €";
  } else {
    devisContainer.innerHTML = "<p>Aucune donnée disponible.</p>";
  }

});
