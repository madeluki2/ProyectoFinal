// Validación de registro (mantener como respaldo)
document.getElementById("form-registro")?.addEventListener("submit", function(e) {
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const clave = document.getElementById("clave").value.trim();

  if (!nombre || !correo || !clave) {
    e.preventDefault();
    alert("Por favor, completa todos los campos.");
  } else if (!correo.includes("@")) {
    e.preventDefault();
    alert("Correo electrónico inválido.");
  } else if (clave.length < 6) {
    e.preventDefault();
    alert("La contraseña debe tener al menos 6 caracteres.");
  }
});

// Validación de login (mantener como respaldo)
document.getElementById("form-login")?.addEventListener("submit", function(e) {
  const usuario = document.getElementById("usuario").value.trim();
  const clave = document.getElementById("clave").value.trim();

  if (!usuario || !clave) {
    e.preventDefault();
    alert("Por favor, ingresa tu usuario y contraseña.");
  }
});

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje) {
  const noti = document.getElementById("notificacion");
  if (noti) {
    noti.textContent = mensaje;
    noti.style.display = "block";
    
    setTimeout(() => {
      noti.style.display = "none";
    }, 2000);
  }

}





// Función para ver usuarios registrados (para debug)
function verUsuariosRegistrados() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    console.log("Usuarios registrados:", usuarios);
    alert("Usuarios en consola (F12)");
    return usuarios;
}

// Ejecutar en consola: verUsuariosRegistrados()