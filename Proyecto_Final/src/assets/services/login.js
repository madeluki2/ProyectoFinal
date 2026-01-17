// Función para mostrar/ocultar contraseña
function togglePassword(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    const button = passwordInput.nextElementSibling;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.textContent = '🔒';
        button.innerHTML = '<span id="' + iconId + '">🔒</span> Ocultar';
    } else {
        passwordInput.type = 'password';
        icon.textContent = '👁️';
        button.innerHTML = '<span id="' + iconId + '">👁️</span> Mostrar';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const formLogin = document.getElementById("form-login");
    
    // Verificar si ya está logueado y redirigir
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
        const rol = localStorage.getItem('rol');
        switch(rol) {
            case 'estudiante':
                window.location.href = 'panel-estudiante.html';
                break;
            case 'profesor':
                window.location.href = 'panel-profesor.html';
                break;
            case 'administrador':
                window.location.href = 'panel-admin.html';
                break;
        }
    }
    
    // Verificar usuarios en localStorage (para debug)
    console.log("Usuarios registrados:", JSON.parse(localStorage.getItem('usuarios') || '[]'));
    
    formLogin.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const usuario = document.getElementById("usuario").value.trim();
        const clave = document.getElementById("clave").value.trim();
        const rol = document.getElementById("rol").value;
        
        console.log("Intento de login:", { usuario, clave, rol });
        
        let esValido = true;

        // Limpiar mensajes de error previos
        document.querySelectorAll('.mensaje-error').forEach(error => {
            error.textContent = "";
        });

        // Validar usuario/correo
        const errorUsuario = document.getElementById("error-usuario");
        if (!usuario) {
            errorUsuario.textContent = "El usuario o correo es obligatorio";
            esValido = false;
        } else {
            errorUsuario.textContent = "";
        }

        // Validar contraseña
        const errorClave = document.getElementById("error-clave");
        if (!clave) {
            errorClave.textContent = "La contraseña es obligatoria";
            esValido = false;
        } else if (clave.length < 10) {
            errorClave.textContent = "La contraseña debe tener al menos 10 caracteres";
            esValido = false;
        } else {
            errorClave.textContent = "";
        }

        // Validar rol
        const errorRol = document.getElementById("error-rol");
        if (!rol) {
            errorRol.textContent = "Debes seleccionar un rol";
            esValido = false;
        } else {
            errorRol.textContent = "";
        }

        if (esValido) {
            try {
                // Verificación de usuario existente
                const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios') || '[]');
                console.log("Buscando usuario en:", usuariosRegistrados);
                
                const usuarioEncontrado = usuariosRegistrados.find(u => 
                    (u.usuario === usuario || u.correo === usuario) && u.clave === clave
                );

                if (usuarioEncontrado) {
                    console.log("Usuario encontrado:", usuarioEncontrado);
                    
                    // GUARDAR SESIÓN (NUEVO)
                    localStorage.setItem("usuarioLogueado", "true");
                    localStorage.setItem("nombre", usuarioEncontrado.nombre);
                    localStorage.setItem("correo", usuarioEncontrado.correo);
                    localStorage.setItem("rol", usuarioEncontrado.rol);

                    if (usuarioEncontrado.rol === "estudiante") {
                        window.location.href = "panel-estudiante.html";
                    } else if (usuarioEncontrado.rol === "profesor") {
                        window.location.href = "panel-profesor.html";
                    } else {
                        window.location.href = "panel-admin.html";
                    }
                } else {
                    console.log("Usuario NO encontrado");
                    alert("Usuario no encontrado o contraseña incorrecta. Por favor regístrate.");
                    window.location.href = "registro.html";
                }
            } catch (error) {
                console.error("Error en login:", error);
                alert("Error al iniciar sesión. Intenta nuevamente.");
            }
        }
    });

    // Validar seguridad de contraseña en tiempo real
    document.getElementById("clave").addEventListener("input", function() {
        validarSeguridadContraseña(this.value);
    });

    function validarSeguridadContraseña(contraseña) {
        const barraSeguridad = document.getElementById("barra-seguridad");
        const textoSeguridad = document.getElementById("texto-seguridad");
        
        let puntuacion = 0;
        let mensaje = "";
        let color = "";

        // Longitud mínima (obligatoria)
        if (contraseña.length >= 10) puntuacion += 25;
        
        // Mayúsculas y minúsculas (OPCIONAL)
        if (/[a-z]/.test(contraseña) && /[A-Z]/.test(contraseña)) puntuacion += 25;
        
        // Números (OPCIONAL)
        if (/\d/.test(contraseña)) puntuacion += 25;
        
        // Símbolos (OPCIONAL)
        if (/[!@#$%^&*(),.?":{}|<>]/.test(contraseña)) puntuacion += 25;

        // Determinar nivel de seguridad (solo informativo)
        if (puntuacion >= 90) {
            mensaje = "Muy segura ✓";
            color = "#4CAF50";
        } else if (puntuacion >= 70) {
            mensaje = "Segura ✓";
            color = "#8BC34A";
        } else if (puntuacion >= 50) {
            mensaje = "Moderada";
            color = "#FFC107";
        } else if (puntuacion >= 25) {
            mensaje = "Débil";
            color = "#FF9800";
        } else {
            mensaje = "Muy débil (mínimo 10 caracteres)";
            color = "#F44336";
        }

        if (barraSeguridad && textoSeguridad) {
            barraSeguridad.style.width = puntuacion + "%";
            barraSeguridad.style.backgroundColor = color;
            textoSeguridad.textContent = "Seguridad: " + mensaje;
            textoSeguridad.style.color = color;
        }
    }
});