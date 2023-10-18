document.addEventListener("DOMContentLoaded", function () {
  // Récupérer le contenu JSON du local storage avec la clé "data1"
  const jsonUserData = localStorage.getItem("data1");

  if (jsonUserData) {
      try {
          const userData = JSON.parse(jsonUserData);
          const infoMaison = userData.infoMaisonList[0]; // Sélectionner le premier élément de la liste

          // Sélectionner l'élément ul où nous afficherons les détails de l'habitation
          const ulElement = document.getElementById("habitationDetails");

          // Parcourir les propriétés de l'objet infoMaison
          for (const key in infoMaison) {
              if (infoMaison.hasOwnProperty(key)) {
                  const liElement = document.createElement("li");
                  liElement.classList.add("py-2");

                  // Afficher la propriété et sa valeur
                  liElement.innerHTML = `<span class="font-semibold">${key}:</span> ${infoMaison[key]}`;

                  ulElement.appendChild(liElement);
              }
          }
      } catch (error) {
          console.error("Erreur lors de la conversion du JSON :", error);
      }
  } else {
      console.warn("Aucune donnée JSON trouvée dans le local storage.");
  }
});
