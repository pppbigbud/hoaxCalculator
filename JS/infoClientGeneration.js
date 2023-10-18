document.addEventListener("DOMContentLoaded", function () {
  // Récupérez les données du localStorage
  var data1 = JSON.parse(localStorage.getItem("data1"));

  // Récupérez l'élément <dl> où vous ajouterez les données
  var dataList = document.getElementById("dataList");

  if (data1) {
    // Créez un tableau d'objets pour vos données
    var dataItems = [
      { label: "Nom", value: data1.name },
      { label: "Prénom", value: data1.surName },
      { label: "Adresse", value: data1.adress },
      { label: "Code Postal", value: data1.zip },
      { label: "Téléphone", value: data1.phone },
      { label: "Email", value: data1.email },
    ];

    // Parcourez les éléments du tableau et créez les éléments HTML
    dataItems.forEach(function (item) {
      var dt = document.createElement("dt");
      dt.className = "mb-1 text-gray-500 md:text-lg dark:text-gray-400";
      dt.textContent = item.label;

      var dd = document.createElement("dd");
      dd.className = "text-lg font-semibold";
      dd.textContent = item.value;

      var div = document.createElement("div");
      div.className = "flex flex-col py-3";
      div.appendChild(dt);
      div.appendChild(dd);

      dataList.appendChild(div);
    });
  } else {
    dataList.innerHTML = "<p>Aucune donnée disponible.</p>";
  }
});

