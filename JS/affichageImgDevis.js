document.addEventListener("DOMContentLoaded", function () {
  const jsonUserData = localStorage.getItem('data1');

  console.log(jsonUserData);

  if (jsonUserData) {
      try {
          const userData = JSON.parse(jsonUserData);
          const images = userData.images;

          // Sélectionner l'élément où nous afficherons les images
          const galleryElement = document.getElementById('imageGalleryDevis');

          // Parcourir les images et les ajouter à la galerie
          images.forEach(image => {
              const imageElement = document.createElement('img');
              imageElement.src = image.data;
              imageElement.alt = image.name;

              // Ajouter l'image à la galerie
              galleryElement.appendChild(imageElement);
          });
      } catch (error) {
          console.error('Erreur lors de la conversion du JSON :', error);
      }
  } else {
      console.warn('Aucune donnée JSON trouvée dans le local storage.');
  }
});
