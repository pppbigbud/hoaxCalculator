function showSection(sectionId) {
    // Masquez toutes les sections
    var sections = document.querySelectorAll('[id^="section"]');
    sections.forEach(function (section) {
      section.style.display = "none";
    });

    // Affichez la section spécifiée
    var selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
      selectedSection.style.display = "block";
    }
  }



