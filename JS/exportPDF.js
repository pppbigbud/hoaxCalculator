
document.addEventListener("DOMContentLoaded", function () {
  var boutonExportPdf = document.getElementById("exportPdf");

  boutonExportPdf.addEventListener("click", function () {
    // Fonction pour récupérer les données depuis le Local Storage
    function getDataFromLocalStorage(key) {
      const dataString = localStorage.getItem(key);
      if (dataString) {
        return JSON.parse(dataString);
      }
      return null;
    }

    // Récupérer les données JSON depuis le Local Storage avec la clé 'data1'
    const jsonData = getDataFromLocalStorage("data1");

    // Variable pour suivre l'état de l'opération
    let operationSuccess = false;

    // Fonction pour générer le PDF
    function generatePDF(data) {
      if (data) {
        // Création d'un document PDF
        const docDefinition = {
          content: [
            // Informations du client
            { text: "RELEVE DE CHANTIER", style: "headerDevis" },
            { text: "Information client", style: "header" },
            {
              table: {
                widths: ["*"],
                body: [
                  [
                    {
                      text: `Nom: ${data.name}`,
                      border: [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text: `Prénom: ${data.surName || "-"}`,
                      border: [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text: `Adresse: ${data.adress}`,
                      border: [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text: `Code postal: ${data.zip}`,
                      border: [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text: `Téléphone: ${data.phone}`,
                      border: [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text: `Email: ${data.email}`,
                      border: [false, false, false, false],
                    },
                  ],
                ],
              },
              layout: "noBorders", // Supprime les bordures du tableau
            },



            

            // Informations sur la maison
            {
              text: "Information Maison et Pièce d'installation",
              style: "header",
            },
            {
              table: {
                widths: ["*", "*"],
                body: [
                  [
                    { text: "Arrivée d'air frais", style: "tableHeader" },
                    {
                      text: `${jsonData.infoMaisonList[0].airFrais}`,
                      style: "tableHeader",
                    },
                  ],
                  [
                    { text: "Altitude", style: "tableHeader" },
                    {
                      text: `${jsonData.infoMaisonList[0].altitude}`,
                      style: "tableHeader",
                    },
                  ],
                  [
                    { text: "Hauteur du conduit", style: "tableHeader" },
                    {
                      text: `${jsonData.infoMaisonList[0].conduitHauteur} cm`,
                      style: "tableHeader",
                    },
                  ],
                  [
                    { text: "Nature du conduit", style: "tableHeader" },
                    {
                      text: `${jsonData.infoMaisonList[0].natureConduit}`,
                      style: "tableHeader",
                    },
                  ],
                  [
                    { text: "Besoin d'un débistrage", style: "tableHeader" },
                    {
                      text: `${jsonData.infoMaisonList[0].debistrage}`,
                      style: "tableHeader",
                    },
                  ],
                  [
                    { text: "Type de tuiles", style: "tableHeader" },
                    {
                      text: `${jsonData.infoMaisonList[0].typeDeTuiles}`,
                      style: "tableHeader",
                    },
                  ],
                  // Ajoutez d'autres informations sur la maison ici
                ],
              },
              layout: "lightHorizontalLines", // Ajoute des lignes horizontales légères
            },


            // Informations sur la maison
            { text: "Informations Conduit et Toiture", style: "header" },
            {
              table: {
                widths: ["*", "*"],
                body: [
                  [
                    { text: "Arrivée d'air frais", style: "tableHeader" },
                    {
                      text: `${jsonData.infoMaisonList[0].airFrais}`,
                      style: "tableHeader",
                    },
                  ],
                  [
                    { text: "Besoin d'un débistrage", style: "tableHeader" },
                    {
                      text: `${jsonData.infoMaisonList[0].debistrage}`,
                      style: "tableHeader",
                    },
                  ],
                  [
                    { text: "Type de tuiles", style: "tableHeader" },
                    {
                      text: `${jsonData.infoMaisonList[0].typeDeTuiles}`,
                      style: "tableHeader",
                    },
                  ],
                  // Ajoutez d'autres informations sur la maison ici
                ],
              },
              layout: "lightHorizontalLines", // Ajoute des lignes horizontales légères
            },

            // PageBreak avant le titre "DEVIS"
            {
              text: "", // Un élément vide sans contenu
              pageBreak: "before", // Déclenche un saut de page avant cet élément
            },

            { text: "DEVIS", style: "headerDevis" },

            // Détails DPI (Devis)
            { text: "Détails DPI:", style: "subheader" },
            {
              table: {
                widths: ["*", "auto", "auto", "auto"],
                body: [
                  [
                    { text: "Diamètre", style: "tableHeader" },
                    { text: "Prix unitaire (€)", style: "tableHeader" },
                    { text: "Quantité", style: "tableHeader" },
                    { text: "Sous-Total (€)", style: "tableHeader" },
                  ],
                  // Boucle pour ajouter les détails DPI
                  ...jsonData.detailsDPI_i.map((detail, index) => [
                    { text: detail.diamDpiI },
                    { text: detail.priceDPI },
                    { text: detail.quantityDPI_i },
                    { text: detail.priceDPI * detail.quantityDPI_i },
                  ]),
                ],
              },
              layout: "lightHorizontalLines", // Ajoute des lignes horizontales légères
            },

            // Détails Coude DPI (Devis)
            { text: "Détails Coude DPI:", style: "subheader" },
            {
              table: {
                widths: ["auto", "auto", "auto", "*", "*"],
                body: [
                  [
                    { text: "Diamètre (mm)", style: "tableHeader" },
                    { text: "Inclinaison (°)", style: "tableHeader" },
                    { text: "Prix unitaire (€)", style: "tableHeader" },
                    { text: "Quantité", style: "tableHeader" },
                    { text: "Sous-Total (€)", style: "tableHeader" },
                  ],
                  // Boucle pour ajouter les détails Coude DPI
                  ...jsonData.detailsCoudeDPI_i.map((detail, index) => [
                    { text: detail.diamCoudeDpiI_i },
                    { text: detail.coudeInclinaisonDpiI_i },
                    { text: detail.priceResultCoudeDPI_i },
                    { text: detail.quantityCoudeDpiI },
                    {
                      text:
                        detail.priceResultCoudeDPI_i * detail.quantityCoudeDpiI,
                    },
                  ]),
                ],
              },
              layout: "lightHorizontalLines", // Ajoute des lignes horizontales légères
            },
          ],
          styles: {
            headerDevis: {
              fontSize: 20,
              bold: true,
              margin: [0, 20, 0, 10],
              color: "black",
              alignment: "center",
            },
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 10, 0, 10], // Marge en bas
              color: "grey",
            },
            subheader: {
              fontSize: 16,
              bold: true,
              margin: [0, 10, 0, 5], // Marge en haut et en bas
            },
            tableHeader: {
              bold: true,
              fillColor: "#F5F5F5",
            },
          },
        };

        // Génération du PDF
        pdfMake.createPdf(docDefinition).download("informations_client.pdf");

        // Marquer l'opération comme réussie
        operationSuccess = true;
      }
    }

    // Appel de la fonction pour générer le PDF avec les données du Local Storage
    if (jsonData) {
      generatePDF(jsonData);
    }

    // Afficher le message approprié en fonction de l'état de l'opération
    const messageElement = document.getElementById("faildMessage");
    if (operationSuccess) {
      messageElement.textContent = "Votre PDF est généré !";
      messageElement.setAttribute(
        "class",
        "MessageSuccess hidden text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      );
    } else {
      messageElement.textContent =
        "Vous n'avez pas complété toutes les informations !";
      messageElement.setAttribute(
        "class",
        "faildMessage focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      );
    }

    // Afficher le message pendant quelques secondes (par exemple, 3 secondes)
    messageElement.style.display = "block";
    setTimeout(function () {
      messageElement.style.display = "none";
    }, 3000); // 3000 millisecondes (3 secondes)
  });
});
