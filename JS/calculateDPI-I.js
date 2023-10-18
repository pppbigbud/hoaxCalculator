document.addEventListener("DOMContentLoaded", function () {
  // Récupérez les éléments nécessaires
  const quantityInput = document.querySelector(".quantityDPI-I");
  const diameterSelect = document.getElementById("diameter");
  const sizeSelect = document.getElementById("size");
  const priceResultDPIi = document.getElementById("priceResultDPI-I");

  // Ajoutez des écouteurs d'événements "change" aux cases à cocher pour les diamètres
  diameterSelect.addEventListener("change", calculatePriceDPI_I);

  // Ajoutez des écouteurs d'événements "change" aux cases à cocher pour les tailles
  sizeSelect.addEventListener("change", calculatePriceDPI_I);

  // Ajoutez un écouteur d'événement "input" à l'élément de quantité
  if (quantityInput) {
    quantityInput.addEventListener("input", calculatePriceDPI_I);
  }

  function calculatePriceDPI_I() {
    let quantity = parseInt(quantityInput.value);
    // let quantity = parseInt(document.getElementById("quantityDPI-I").value);
    let excelFileInput = document.getElementById("excelFileInput");

    // console.log(document.querySelectorAll('[id^="diamDPI-I"]'));

    if (excelFileInput.files.length === 0) {
      alert("Veuillez sélectionner un fichier Excel.");
      return;
    }

    let file = excelFileInput.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
      let data = new Uint8Array(e.target.result);
      let workbook = XLSX.read(data, { type: "array" });

      // Récupérez le diamètre sélectionné en fonction des cases à cocher
      let selectedDiameter = parseInt(diameterSelect.value);
      let selectedSize = parseInt(sizeSelect.value);

      if (selectedDiameter === null) {
        alert("Veuillez sélectionner un diamètre et une taille.");

        return;
      }

      // Déterminez la cellule en fonction du diamètre sélectionné (par exemple, B3 pour diamètre 20 cm)
      let cellAddress = "B2"; // Changez cela en fonction de votre structure Excel
      if (selectedDiameter === 150 && selectedSize === 50) {
        cellAddress = "C2";
      } else if (selectedDiameter === 150 && selectedSize === 25) {
        cellAddress = "D2";
      }
      //DIAM 180
      else if (selectedDiameter === 180 && selectedSize === 100) {
        cellAddress = "B3";
      } else if (selectedDiameter === 180 && selectedSize === 50) {
        cellAddress = "C3";
      } else if (selectedDiameter === 180 && selectedSize === 25) {
        cellAddress = "D3";
      }
      //DIAM 200
      else if (selectedDiameter === 200 && selectedSize === 100) {
        cellAddress = "B4";
      } else if (selectedDiameter === 200 && selectedSize === 50) {
        cellAddress = "C4";
      } else if (selectedDiameter === 200 && selectedSize === 25) {
        cellAddress = "D4";
      }

      // Récupérez la valeur de la cellule correspondant au diamètre sélectionné
      let sheet = workbook.Sheets[workbook.SheetNames[2]];
      let cellValue = sheet[cellAddress].v;

      // Effectuez le calcul du prix en fonction de la quantité et du diamètre sélectionné
      let price = quantity * cellValue;

      // Affichez le résultat
      let priceResult = document.getElementById("priceResult");
      priceResultDPIi.textContent = "Ajouter " + price + " €";
    };

    reader.readAsArrayBuffer(file);
  }
});
