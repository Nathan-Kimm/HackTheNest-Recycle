const current = location.pathname
document.querySelectorAll('.bottom-nav a').forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });