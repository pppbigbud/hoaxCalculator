document.addEventListener("DOMContentLoaded", function () {
  function calculateCost(hours, minutes) {
    // Vous pouvez mettre en place votre propre logique de calcul du coût ici
    // Par exemple, calculer le coût en fonction du temps passé
    const costPerHour = 10; // Coût par heure en euros
    const costPerMinute = costPerHour / 60; // Coût par minute en euros

    const totalCost = hours * costPerHour + minutes * costPerMinute;
    return totalCost.toFixed(2); // Renvoyer le coût arrondi à deux décimales
  }

  function initMap() {
    // Récupérer l'adresse du client depuis le local storage (extrait de votre JSON)
    const jsonUserData = localStorage.getItem("data1");
    if (!jsonUserData) {
      console.error("Aucune donnée JSON trouvée dans le local storage.");
      return;
    }

    const userData = JSON.parse(jsonUserData);
    const clientAddress = userData.adress; // Adresse du client

    // Coordonnées GPS de votre dépôt (par exemple, Thiers, France)
    const depotCoordinates = { lat: 45.852596, lng: 3.54034 };

    // Initialiser la carte
    const map = new google.maps.Map(document.getElementById("map"), {
      center: depotCoordinates,
      zoom: 12, // Niveau de zoom initial
    });

    // Créer un marqueur pour votre dépôt
    new google.maps.Marker({
      position: depotCoordinates,
      map: map,
      title: "Dépôt",
    });

    // Utilisez Geocoding pour convertir l'adresse du client en coordonnées GPS
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: clientAddress }, function (results, status) {
      if (status === "OK" && results[0]) {
        const clientCoordinates = results[0].geometry.location;

        // Créez un marqueur pour l'adresse du client
        new google.maps.Marker({
          position: clientCoordinates,
          map: map,
          title: "Adresse du client",
        });

        // Créez un trajet entre le dépôt et l'adresse du client
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({
          map: map,
        });

        const request = {
          origin: depotCoordinates,
          destination: clientCoordinates,
          travelMode: google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, function (result, status) {
          if (status === "OK") {
            directionsRenderer.setDirections(result);

            // Mettez à jour la div avec les détails du trajet
            const route = result.routes[0];
            const trajetDetailElement =
              document.getElementById("trajet-detail");

            // Récupérez la durée totale du trajet
            const totalDuration = route.legs.reduce(
              (acc, leg) => acc + leg.duration.value,
              0
            );
            const totalDurationHours = Math.floor(totalDuration / 3600);
            const totalDurationMinutes = Math.floor(
              (totalDuration % 3600) / 60
            );

            // Récupérez le coût du trajet (si vous avez des données sur les tarifs)
            const coutTrajet = calculateCost(
              totalDurationHours,
              totalDurationMinutes
            );

            // Générez les détails du trajet
            let trajetDetailHTML = "<h2>Détails du trajet</h2>";
            trajetDetailHTML += `<p>Durée totale du trajet : ${totalDurationHours} heures ${totalDurationMinutes} minutes</p>`;
            trajetDetailHTML += `<p>Coût du trajet : ${coutTrajet} €</p>`;

            // Mettez à jour le contenu de la div
            trajetDetailElement.innerHTML = trajetDetailHTML;
          } else {
            console.error("Impossible de calculer le trajet :", status);
          }
        });
      } else {
        console.error("Impossible de géocoder l'adresse du client :", status);
      }
    });
  }
  initMap(); // Appelez votre fonction d'initialisation ici
});
