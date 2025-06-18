// Loader
window.addEventListener("load", function() {
  setTimeout(function() {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    setTimeout(function() {
      loader.style.display = "none";
    }, 500);
  }, 1500);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Animation for accordion icons
document.querySelectorAll('.accordion-button').forEach(button => {
  button.addEventListener('click', function() {
    const icon = this.querySelector('span');
    if (icon) {
      icon.classList.toggle('fa-plus');
      icon.classList.toggle('fa-minus');
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const horarios = {
    1: ["09:00", "16:00"], // Lunes
    2: ["09:00", "16:00"], // Martes
    3: ["09:00", "16:00"], // Miércoles
    4: ["09:00", "16:00"], // Jueves
    5: ["09:00", "16:00"], // Viernes
    6: ["10:00", "14:00"], // Sábado
    0: null // Domingo cerrado
  };

  const ahora = new Date();
  const diaSemana = ahora.getDay();
  const horaActual = ahora.getHours();
  const minutoActual = ahora.getMinutes();
  const estadoElemento = document.getElementById("estado-actual");

  // Marcar día actual
  const items = document.querySelectorAll(".horario-item");
  items.forEach(item => {
    if (parseInt(item.dataset.dia) === diaSemana) {
      item.classList.add("current-day");
    }
  });

  if (horarios[diaSemana]) {
    const [inicio, fin] = horarios[diaSemana];
    const [inicioH, inicioM] = inicio.split(":").map(Number);
    const [finH, finM] = fin.split(":").map(Number);

    const desde = new Date();
    desde.setHours(inicioH, inicioM, 0);
    const hasta = new Date();
    hasta.setHours(finH, finM, 0);

    const ahoraMs = ahora.getTime();

    if (ahoraMs >= desde.getTime() && ahoraMs <= hasta.getTime()) {
      estadoElemento.textContent = "¡Estamos abiertos ahora!";
      estadoElemento.classList.add("abierto");
    } else {
      estadoElemento.textContent = "Cerrado ahora";
      estadoElemento.classList.add("cerrado");
    }
  } else {
    estadoElemento.textContent = "Cerrado hoy";
    estadoElemento.classList.add("cerrado");
  }
});
