document.addEventListener("DOMContentLoaded", () => {
  // Modal de inscripción en cursos
  const modalInscripcion = document.getElementById("modal-inscripcion");
  const cerrarModalInscripcion = document.getElementById("cerrar-modal-inscripcion");
  const btnInscribirJava = document.getElementById("btn-inscribir-java");
  const textoInscrito = document.getElementById("texto-inscrito");
  const btnIrCurso = document.getElementById("btn-ir-curso");
  const btnSeguirExplorando = document.getElementById("btn-seguir-explorando");

  // Función para inscribirse en curso
  if (btnInscribirJava) {
    btnInscribirJava.addEventListener("click", () => {
      // Mostrar modal de confirmación
      modalInscripcion.classList.remove("oculto");
      
      // Guardar en localStorage que está inscrito
      const cursosInscritos = JSON.parse(localStorage.getItem('cursosInscritos') || '[]');
      if (!cursosInscritos.includes('Java Professional')) {
        cursosInscritos.push('Java Professional');
        localStorage.setItem('cursosInscritos', JSON.stringify(cursosInscritos));
      }
    });
  }

  // Cerrar modal de inscripción
  if (cerrarModalInscripcion) {
    cerrarModalInscripcion.addEventListener("click", () => {
      modalInscripcion.classList.add("oculto");
    });
  }

  // Botón "Ir al Curso"
  if (btnIrCurso) {
    btnIrCurso.addEventListener("click", () => {
      // Actualizar el estado a "Inscrito" antes de redirigir
      actualizarEstadoInscrito();
      modalInscripcion.classList.add("oculto");
      alert("Redirigiendo al curso Java Professional...");
      // Aquí puedes redirigir a la página del curso
      // window.location.href = "curso-java.html";
    });
  }

  // Botón "Seguir Explorando"
  if (btnSeguirExplorando) {
    btnSeguirExplorando.addEventListener("click", () => {
      // Actualizar el estado a "Inscrito" y cerrar modal
      actualizarEstadoInscrito();
      modalInscripcion.classList.add("oculto");
    });
  }

  // Cerrar modal haciendo clic fuera del contenido
  if (modalInscripcion) {
    modalInscripcion.addEventListener("click", (e) => {
      if (e.target === modalInscripcion) {
        modalInscripcion.classList.add("oculto");
      }
    });
  }

  // Actualizar estado de los cursos al cargar la página
  actualizarEstadoCursos();

  // Funcionalidad original del modal principal (si existe)
  const botones = document.querySelectorAll(".inscribirse-btn");
  const modal = document.getElementById("modal");
  const cerrar = document.getElementById("cerrar-modal");
  
  if (botones && modal) {
    botones.forEach(btn => {
      btn.addEventListener("click", () => {
        modal.classList.remove("oculto");
      });
    });
    
    if (cerrar) {
      cerrar.addEventListener("click", () => {
        modal.classList.add("oculto");
      });
    }
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "panel-estudiante.html";
    });
  }
});

// Actualización de barras de progreso
document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".curso-card");
  cursos.forEach(curso => {
    const progreso = curso.getAttribute("data-progreso");
    const barra = curso.querySelector(".progreso-barra");
    if (barra && progreso !== null) {
      barra.style.width = progreso + "%";
    }
  });
});

// Función para actualizar el estado de "Inscrito"
function actualizarEstadoInscrito() {
  const btnInscribirJava = document.getElementById("btn-inscribir-java");
  const textoInscrito = document.getElementById("texto-inscrito");
  
  if (btnInscribirJava && textoInscrito) {
    // Ocultar botón y mostrar texto "Inscrito ✓"
    btnInscribirJava.classList.add("oculto");
    textoInscrito.classList.remove("oculto");
    
    // Guardar estado en localStorage
    const cursosInscritos = JSON.parse(localStorage.getItem('cursosInscritos') || '[]');
    if (!cursosInscritos.includes('Java Professional')) {
      cursosInscritos.push('Java Professional');
      localStorage.setItem('cursosInscritos', JSON.stringify(cursosInscritos));
    }
  }
}

// Función para actualizar el estado de los cursos al cargar la página
function actualizarEstadoCursos() {
  const cursosInscritos = JSON.parse(localStorage.getItem('cursosInscritos') || '[]');
  const btnInscribirJava = document.getElementById("btn-inscribir-java");
  const textoInscrito = document.getElementById("texto-inscrito");
  
  if (btnInscribirJava && textoInscrito && cursosInscritos.includes('Java Professional')) {
    // Si ya está inscrito, mostrar el estado "Inscrito ✓"
    btnInscribirJava.classList.add("oculto");
    textoInscrito.classList.remove("oculto");
  }
}