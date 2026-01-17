// Funciones para la gestión del profesor
function cambiarCuenta() {
    if (confirm('¿Quieres cambiar de cuenta?')) {
        window.location.href = 'login.html';
    }
}

function cerrarSesion() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        localStorage.removeItem('usuarioLogueado');
        localStorage.removeItem('nombre');
        localStorage.removeItem('correo');
        localStorage.removeItem('rol');
        window.location.href = 'login.html';
    }
}

// Funcionalidad de los botones de tareas
document.addEventListener('DOMContentLoaded', function() {
    // Botones de la tabla
    document.querySelectorAll('.btn-tabla').forEach(btn => {
        btn.addEventListener('click', function() {
            const textoBoton = this.textContent;
            const tituloTarea = this.closest('.tarea-item').querySelector('.tarea-titulo').textContent;
            
            if (textoBoton.includes('Ver Entregas')) {
                const entregas = textoBoton.match(/\((\d+)\)/)[1];
                alert(`Redirigiendo a ver ${entregas} entregas de: ${tituloTarea}`);
            } else if (textoBoton.includes('Editar Tarea')) {
                alert(`Abriendo editor para: ${tituloTarea}`);
            } else if (textoBoton.includes('Eliminar')) {
                if (confirm(`¿Estás seguro de que quieres eliminar la tarea: "${tituloTarea}"?`)) {
                    this.closest('.tarea-item').remove();
                    alert('Tarea eliminada correctamente');
                }
            } else if (textoBoton.includes('Duplicar')) {
                alert(`Duplicando tarea: ${tituloTarea}`);
            }
        });
    });
});

// Función para cargar datos del usuario desde localStorage
function cargarDatosUsuario() {
    const nombre = localStorage.getItem('nombre') || 'ejemploprof';
    const correo = localStorage.getItem('correo') || 'ejemploprof@gmail.com';
    
    const elementosNombre = document.querySelectorAll('.user-name-profesor');
    const elementosCorreo = document.querySelectorAll('.user-email-profesor');
    
    elementosNombre.forEach(elemento => {
        elemento.textContent = nombre;
    });
    
    elementosCorreo.forEach(elemento => {
        elemento.textContent = correo;
    });
}

// Cargar datos cuando la página esté lista
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarDatosUsuario);
} else {
    cargarDatosUsuario();
}