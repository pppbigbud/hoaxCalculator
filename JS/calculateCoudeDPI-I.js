document.addEventListener("DOMContentLoaded", function () {
  // Récupérez les éléments nécessaires
  const quantityInput = document.querySelector(".quantityCoudeDPI-input");
  const diameterSelect = document.getElementById("diamCoudeDpiI");
  const inclinaisonSelect = document.getElementById("coudeInclinaisonDpiI");
  // const priceResultCoudeDPIi = document.getElementById("priceResultCoudeDPI-I");

  // Ajoutez des écouteurs d'événements "change" aux listes déroulantes
  diameterSelect.addEventListener("change", calculatePriceCoudeDPI_I);
  inclinaisonSelect.addEventListener("change", calculatePriceCoudeDPI_I);

  // Ajoutez un écouteur d'événement "input" à l'élément de quantité
  quantityInput.addEventListener("input", calculatePriceCoudeDPI_I);

  function calculatePriceCoudeDPI_I() {
    var quantity = parseInt(quantityInput.value);

    if (excelFileInput.files.length === 0) {
      alert("Veuillez sélectionner un fichier Excel.");
      return;
    }

    var file = excelFileInput.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, { type: "array" });

      // Récupérez le diamètre sélectionné en fonction des cases à cocher
      var selectedDiameter = parseInt(diameterSelect.value);
      var selectedInclinaison = parseInt(inclinaisonSelect.value);

      if (selectedDiameter === null) {
        alert("Veuillez sélectionner un diamètre et une taille.");

        return;
      }

      // Déterminez la cellule en fonction du diamètre sélectionné (par exemple, B3 pour diamètre 20 cm)
      var cellAddress = "B7"; // Changez cela en fonction de votre structure Excel
      if (selectedDiameter === 80 && selectedInclinaison === 30) {
        cellAddress = "B8";
      } else if (selectedDiameter === 80 && selectedInclinaison === 45) {
        cellAddress = "B9";
      } else if (selectedDiameter === 80 && selectedInclinaison === 90) {
        cellAddress = "B10";
      }
      //DIAM 100
      else if (selectedDiameter === 100 && selectedInclinaison === 15) {
        cellAddress = "C7";
      } else if (selectedDiameter === 100 && selectedInclinaison === 30) {
        cellAddress = "C8";
      } else if (selectedDiameter === 100 && selectedInclinaison === 45) {
        cellAddress = "C9";
      } else if (selectedDiameter === 100 && selectedInclinaison === 90) {
        cellAddress = "C10";
      }
      //DIAM 130
      else if (selectedDiameter === 130 && selectedInclinaison === 15) {
        cellAddress = "D7";
      } else if (selectedDiameter === 130 && selectedInclinaison === 30) {
        cellAddress = "D8";
      } else if (selectedDiameter === 130 && selectedInclinaison === 45) {
        cellAddress = "D9";
      } else if (selectedDiameter === 130 && selectedInclinaison === 90) {
        cellAddress = "D10";
      }
      //DIAM 150
      else if (selectedDiameter === 150 && selectedInclinaison === 15) {
        cellAddress = "E7";
      } else if (selectedDiameter === 150 && selectedInclinaison === 30) {
        cellAddress = "E8";
      } else if (selectedDiameter === 150 && selectedInclinaison === 45) {
        cellAddress = "E9";
      } else if (selectedDiameter === 150 && selectedInclinaison === 90) {
        cellAddress = "E10";
      }
      //DIAM 180
      else if (selectedDiameter === 180 && selectedInclinaison === 15) {
        cellAddress = "F7";
      } else if (selectedDiameter === 180 && selectedInclinaison === 30) {
        cellAddress = "F8";
      } else if (selectedDiameter === 180 && selectedInclinaison === 45) {
        cellAddress = "F9";
      } else if (selectedDiameter === 180 && selectedInclinaison === 90) {
        cellAddress = "F10";
      }
      //DIAM 200
      else if (selectedDiameter === 200 && selectedInclinaison === 15) {
        cellAddress = "G7";
      } else if (selectedDiameter === 200 && selectedInclinaison === 30) {
        cellAddress = "G8";
      } else if (selectedDiameter === 200 && selectedInclinaison === 45) {
        cellAddress = "G9";
      } else if (selectedDiameter === 200 && selectedInclinaison === 90) {
        cellAddress = "G10";
      }

      // Récupérez la valeur de la cellule correspondant au diamètre sélectionné
      var sheet = workbook.Sheets[workbook.SheetNames[2]];
      var cellValue = sheet[cellAddress].v;

      // Effectuez le calcul du prix en fonction de la quantité et du diamètre sélectionné
      var price = quantity * cellValue;

      // Affichez le résultat
      var priceResult = document.getElementById("priceResultCoudeDPI-I");
      priceResult.textContent = "Ajouter " + price + ' €';
    };

    reader.readAsArrayBuffer(file);
  }
});
