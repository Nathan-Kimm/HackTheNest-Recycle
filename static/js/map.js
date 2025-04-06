const current = location.pathname
document.querySelectorAll('.bottom-nav a').forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });

    const modal = document.getElementById("qrModal");
    const openButton = document.getElementById("openModalButton");
    const closeButton = document.getElementById("closeModalButton");

    openButton.onclick = function() {
      modal.style.display = "block";
    }

    closeButton.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }