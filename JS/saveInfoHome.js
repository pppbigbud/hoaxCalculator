function saveInfoHome() {
  // Collecter les données du formulaire
  const volumeLongueur = parseFloat(document.getElementById("longueur").value);
  const volumeLargeur = parseFloat(document.getElementById("largeur").value);
  const volumeHauteur = parseFloat(document.getElementById("hauteur").value);
  const conduitHauteur = parseFloat(
    document.getElementById("hauteurDuConduit").value
  );
  const natureConduit = document.getElementById("natureConduit").value;
  const debistrage = document.getElementById("debistrage-checkbox").checked;
  const airFrais = document.getElementById("freshAir-checkbox").checked;
  const altitude = parseFloat(document.getElementById("altitude").value);
  const typeDeTuiles = document.getElementById("typeDeTuiles").value;

  let infoPiece = {
    volumeLongueur,
    volumeLargeur,
    volumeHauteur,
    conduitHauteur,
    natureConduit,
    debistrage,
    airFrais,
    altitude,
    typeDeTuiles,
  };

  // Récupérez les données existantes depuis localStorage s'il existe
  let existingData1 = JSON.parse(localStorage.getItem("data1")) || {};

  // Assurez-vous que "infoMaison" est un tableau (tableau de toutes les informations ajoutées)
  if (!Array.isArray(existingData1.infoMaisonList)) {
    existingData1.infoMaisonList = [];
  }

  // Ajoutez les informations sur la maison à la liste existante
  existingData1.infoMaisonList.push(infoPiece);

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
