function toggleDetalle(id) {
  const detalle = document.getElementById(id);
  detalle.style.display = detalle.style.display === "block" ? "none" : "block";
}

// Script para detalle.html
function inicializarDetalle() {
  const params = new URLSearchParams(window.location.search);
  const curso = params.get('curso');
  const info = {
    javascript: "Curso de JavaScript Básico: Aprende desde cero.",
    python: "Curso de Python Avanzado: Domina proyectos grandes.",
    cpp: "Curso de C++ Intermedio: Desarrolla aplicaciones con alto rendimiento.",
    java: "Curso de Java Profesional: Construye sistemas robustos y escalables.",
    sql: "Curso de SQL: Domina consultas y gestión de bases de datos."
  };

  const infoCurso = document.getElementById("infoCurso");
  if (infoCurso) {
    infoCurso.textContent = info[curso] || "Curso no encontrado.";
  }

  const botonInscribir = document.querySelector(".boton-inscribir");
  if (botonInscribir) {
    botonInscribir.addEventListener("click", function() {
      if (info[curso]) {
        alert("¡Inscripción exitosa en " + info[curso].split(":")[0] + "!");
      } else {
        alert("No se puede inscribir en un curso no válido.");
      }
    });
  }
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarDetalle);
} else {
  inicializarDetalle();
}