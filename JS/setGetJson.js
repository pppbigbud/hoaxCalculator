function saveInfoJson() {
  var nameValue = document.getElementById("nom").value;
  var surNameValue = document.getElementById("prenom").value;
  var adressValue = document.getElementById("adresse").value;
  var cityValue = document.getElementById("city").value;
  var zipValue = document.getElementById("codepostal").value;
  var phoneValue = document.getElementById("telephone").value;
  var emailValue = document.getElementById("email").value;

  // Créez un objet JSON avec la valeur du champ
  var dataInfoClient = {
    name: nameValue,
    surName: surNameValue,
    adress: adressValue,
    ville: cityValue,
    zip: zipValue,
    phone: phoneValue,
    email: emailValue,
  };

  // Convertissez l'objet JSON en une chaîne JSON
  var jsonData = JSON.stringify(dataInfoClient);

  //Création du cookie
  // document.cookie = "cookies-Info-Hoax=" + encodeURIComponent(jsonData) + "; expires=Wed, 01 Jan 2028 00:00:00 UTC; path=/";

  // Stockez la chaîne JSON dans localStorage
  localStorage.setItem("data1", jsonData);

  // Après avoir enregistré avec succès, affichez le message de succès
  const successMessage = document.getElementById("successMessage");
  successMessage.style.display = "block";

  // Ajoutez un délai pour masquer automatiquement le message après quelques secondes (par exemple, 3 secondes)
  setTimeout(function() {
    successMessage.style.display = "none";
  }, 3000); // 3000 millisecondes (3 secondes)

}
