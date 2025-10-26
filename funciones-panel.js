// Funciones comunes para los paneles de estudiante y profesor
function cargarInformacionUsuario() {
    const nombre = localStorage.getItem('nombre') || 'Usuario';
    const correo = localStorage.getItem('correo') || 'No disponible';
    const rol = localStorage.getItem('rol') || 'usuario';
    
    // Actualizar todos los elementos con la información del usuario
    const elementosNombre = document.querySelectorAll('#nombre-usuario, #nombre-header, #perfil-nombre, #nombre-profesor');
    const elementosCorreo = document.querySelectorAll('#correo-usuario, #perfil-correo');
    const elementosRol = document.querySelectorAll('#perfil-rol');
    
    elementosNombre.forEach(elemento => {
        elemento.textContent = nombre;
    });
    
    elementosCorreo.forEach(elemento => {
        elemento.textContent = correo;
    });
    
    elementosRol.forEach(elemento => {
        elemento.textContent = rol.charAt(0).toUpperCase() + rol.slice(1);
    });
    
    // Actualizar curso si existe
    const elementoCurso = document.getElementById('curso');
    if (elementoCurso) {
        elementoCurso.textContent = localStorage.getItem('curso') || '—';
    }
}

function cerrarSesion() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        localStorage.removeItem('usuarioLogueado');
        localStorage.removeItem('nombre');
        localStorage.removeItem('correo');
        localStorage.removeItem('rol');
        localStorage.removeItem('curso');
        window.location.href = 'login.html';
    }
}

function cambiarCuenta() {
    if (confirm('¿Quieres cambiar de cuenta? Se cerrará la sesión actual.')) {
        cerrarSesion();
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    cargarInformacionUsuario();
});