function calculatePriceGaineInox() {
  let quantity = parseInt(document.getElementById("quantityMlGaineInox").value);
  let excelFileInput = document.getElementById("excelFileInput");

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
    let selectedDiameter = getSelectedDiameterGaineInox();

    if (selectedDiameter === null) {
      alert("Veuillez sélectionner un diamètre.");
      return;
    }

    // Déterminez la cellule en fonction du diamètre sélectionné (par exemple, B3 pour diamètre 20 cm)
    let cellAddress = "B2"; // Changez cela en fonction de votre structure Excel
    if (selectedDiameter === 150) {
      cellAddress = "B3";
    } else if (selectedDiameter === 180) {
      cellAddress = "B4";
    } else if (selectedDiameter === 200) {
      cellAddress = "B5";
    }

    // Récupérez la valeur de la cellule correspondant au diamètre sélectionné
    let sheet = workbook.Sheets[workbook.SheetNames[0]];
    let cellValue = sheet[cellAddress].v;

    // Effectuez le calcul du prix en fonction de la quantité et du diamètre sélectionné
    let price = quantity * cellValue;

    // Affichez le résultat
    let priceResult = document.getElementById("priceResult");
    priceResult.textContent = "Prix total : " + price;
  };

  reader.readAsArrayBuffer(file);
}

function getSelectedDiameterGaineInox() {
  // Récupérez toutes les cases à cocher pour les diamètres
  let checkboxes = document.querySelectorAll('input[type="checkbox"]');
  let selectedDiameter = null;

  // Parcourez les cases à cocher pour déterminer laquelle est cochée
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      selectedDiameter = parseInt(checkboxes[i].value);
      break; // Sortez de la boucle dès qu'une case à cocher cochée est trouvée
    }
  }

  return selectedDiameter;
}
