// Fonction pour vérifier périodiquement le cookie de session
function pollSessionCookie() {
  // Remplacez 'nom_cookie' par le nom de votre cookie de session
  var sessionCookieValue = getCookie('cookies-Info-Hoax');
  console.log(sessionCookieValue);

  // Si le cookie de session a changé depuis la dernière vérification
  if (sessionCookieValue !== pollSessionCookie.lastValue) {
    // Mettez à jour les données côté client en fonction de la nouvelle valeur
    updateClientData(sessionCookieValue);

    // Stockez la nouvelle valeur du cookie pour la prochaine vérification
    pollSessionCookie.lastValue = sessionCookieValue;
  }

  // Planifiez la prochaine vérification dans 1 secondes (ajustez selon vos besoins)
  setTimeout(pollSessionCookie, 3000);
}

// Fonction pour obtenir la valeur d'un cookie par son nom
function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');
  
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

// Fonction pour mettre à jour les données côté client
function updateClientData(sessionCookieValue) {
  // Mettez à jour vos données côté client en fonction de sessionCookieValue
  // Par exemple, vous pouvez analyser la valeur JSON du cookie et mettre à jour l'affichage.
  console.log("Le cookie de session a changé : " + sessionCookieValue);
}

// Démarrez la vérification périodique du cookie de session
pollSessionCookie();
