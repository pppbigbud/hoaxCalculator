let db;
let request = indexedDB.open("ImagesDB", 1);

request.onupgradeneeded = function (event) {
  db = event.target.result;
  db.createObjectStore("ImagesStore", { autoIncrement: true });
};

request.onsuccess = function (event) {
  db = event.target.result;
};

request.onerror = function (event) {
  console.error(
    "Erreur lors de l'ouverture de la base de données IndexedDB",
    event.target.error
  );
};

function addImageToDB(imageObject) {
  let transaction = db.transaction(["ImagesStore"], "readwrite");
  let store = transaction.objectStore("ImagesStore");

  // Ajoutez l'objet JavaScript à la base de données
  let request = store.add(imageObject);

  return new Promise((resolve, reject) => {
    request.onsuccess = function (event) {
      console.log("Image ajoutée à la base de données.");
      resolve();
    };

    request.onerror = function (event) {
      console.error(
        "Erreur lors de l'ajout de l'image à la base de données.",
        event.target.error
      );
      reject();
    };
  });
}

function getImagesFromDB() {
  return new Promise((resolve, reject) => {
    var transaction = db.transaction(["ImagesStore"], "readonly");
    var store = transaction.objectStore("ImagesStore");
    var images = [];

    store.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        images.push(cursor.value);
        cursor.continue();
      } else {
        resolve(images);
      }
    };

    transaction.onerror = function (event) {
      console.error(
        "Erreur lors de la récupération des images depuis la base de données.",
        event.target.error
      );
      reject();
    };
  });
}

// Fonction pour mettre à jour le JSON dans le local storage avec les données de l'image
function updateJsonWithImage(imageObject) {
  return new Promise((resolve, reject) => {
    // Récupérez le JSON actuel du local storage
    var currentJson = localStorage.getItem("data1");

    if (currentJson) {
      try {
        // Analysez le JSON en un objet JavaScript
        var jsonData = JSON.parse(currentJson);

        // Ajoutez les données de l'image à l'objet JSON
        if (!jsonData.images) {
          jsonData.images = [];
        }
        jsonData.images.push({
          name: imageObject.name,
          data: imageObject.data,
        });

        // Convertissez l'objet JavaScript mis à jour en JSON
        var updatedJson = JSON.stringify(jsonData);

        // Mettez à jour le JSON dans le local storage
        localStorage.setItem("data1", updatedJson);

        console.log("JSON mis à jour avec les données de l'image.");
        resolve();
      } catch (error) {
        console.error("Erreur lors de la mise à jour du JSON avec les données de l'image.", error);
        reject(error);
      }
    } else {
      console.error("Le JSON dans le local storage n'existe pas ou est invalide.");
      reject();
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var imageInput = document.getElementById("imageInput");
  var previewImage = document.getElementById("previewImage");
  var validateButton = document.getElementById("validateButton");

  validateButton.addEventListener("click", function () {
    // Obtenez le fichier sélectionné depuis l'élément input
    var file = imageInput.files[0];

    console.log(file);

    if (file) {
      // Lorsqu'un fichier est sélectionné, lisez-le en tant que Data URL
      var reader = new FileReader();

      reader.onload = function (e) {
        var imageData = e.target.result; // Obtenez les données de l'image au format Data URL

        // Créez un élément d'image pour afficher l'image dans la balise previewImage
        var imgElement = document.createElement("img");
        imgElement.src = imageData;
        imgElement.alt = "Image";

        // Créez ici l'objet JavaScript représentant l'image
        var imageObject = {
          name: file.name,
          data: "", // Laissez cela vide pour le moment
          // Vous pouvez ajouter d'autres propriétés d'image ici
        };

        // Ajoutez ici la logique pour redimensionner l'image
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.onload = function () {
          // Redimensionnez l'image au format 400x300px
          canvas.width = 400;
          canvas.height = 300;
          ctx.drawImage(img, 0, 0, 400, 300);
          // Obtenez la représentation de l'image redimensionnée sous forme de Data URL
          imageObject.data = canvas.toDataURL("image/jpeg");

          // Ajoutez ici la logique pour ajouter l'objet JavaScript à la base de données IndexedDB
          // Vous pouvez utiliser la fonction addImageToDB(imageObject) que nous avons définie précédemment
          addImageToDB(imageObject)
            .then(() => {
              // Après avoir ajouté l'image à la base de données, affichez la galerie à jour
              displayImages();

              // Maintenant, appelez la fonction pour mettre à jour le JSON dans le local storage
              updateJsonWithImage(imageObject)
                .catch((error) => {
                  console.error("Erreur lors de la mise à jour du JSON avec les données de l'image.", error);
                });
            })
            .catch((error) => {
              console.error("Erreur lors de l'ajout de l'image.", error);
            });
        };
        img.src = imageData;
      };

      // Lisez le fichier en tant que Data URL
      reader.readAsDataURL(file);
    }
  });
});

function displayImages() {
  var imageGallery = document.getElementById("imageGallery");

  // Récupérez les images depuis IndexedDB et affichez-les dans la galerie
  getImagesFromDB()
    .then(function (images) {
      // Effacez la galerie actuelle
      imageGallery.innerHTML = "";

      // Parcourez les données des images et affichez-les dans la galerie
      images.forEach(function (imageObject) {
        // console.log(imageObject);
        if (imageObject.data) {
          var imgElement = document.createElement("img");
          imgElement.src = imageObject.data; // Utilisez la propriété 'data' de l'objet pour afficher l'image
          imgElement.alt = "Image";
          imageGallery.appendChild(imgElement);
        }
      });
    })
    .catch(function (error) {
      console.error(
        "Erreur lors de la récupération des images depuis la base de données.",
        error
      );
    });
}

// Chargez les images depuis IndexedDB et affichez-les dans la galerie lorsque la page est chargée
window.addEventListener("load", function () {
  displayImages();
});