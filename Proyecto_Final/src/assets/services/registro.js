document.addEventListener("DOMContentLoaded", function() {
    const formRegistro = document.getElementById("form-registro");
    
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
    
    // Inicializar localStorage si no existe
    if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify([]));
    }

    formRegistro.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const usuario = document.getElementById("usuario-registro").value.trim();
        const clave = document.getElementById("clave-registro").value.trim();
        const confirmarClave = document.getElementById("confirmar-clave").value.trim();
        const rol = document.getElementById("rol-registro").value;
        
        console.log("Datos del formulario:", { nombre, correo, usuario, clave, confirmarClave, rol });
        
        let esValido = true;

        // Limpiar mensajes de error previos
        document.querySelectorAll('.mensaje-error').forEach(error => {
            error.textContent = "";
        });

        // Validar nombre (solo letras y espacios)
        const errorNombre = document.getElementById("error-nombre");
        const regexNombre = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/;
        if (!nombre) {
            errorNombre.textContent = "El nombre completo es obligatorio";
            esValido = false;
        } else if (!regexNombre.test(nombre)) {
            errorNombre.textContent = "El nombre solo puede contener letras y espacios";
            esValido = false;
        } else if (nombre.length > 80) {
            errorNombre.textContent = "El nombre no puede exceder 80 caracteres";
            esValido = false;
        } else {
            errorNombre.textContent = "";
        }

        // Validar correo
        const errorCorreo = document.getElementById("error-correo");
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correo) {
            errorCorreo.textContent = "El correo electrónico es obligatorio";
            esValido = false;
        } else if (!regexCorreo.test(correo)) {
            errorCorreo.textContent = "Formato de correo inválido (ejemplo: usuario@gmail.com)";
            esValido = false;
        } else {
            errorCorreo.textContent = "";
        }

        // Validar usuario
        const errorUsuario = document.getElementById("error-usuario-registro");
        if (!usuario) {
            errorUsuario.textContent = "El nombre de usuario es obligatorio";
            esValido = false;
        } else {
            errorUsuario.textContent = "";
        }

        // Validar contraseña (SOLO longitud mínima obligatoria)
        const errorClave = document.getElementById("error-clave-registro");
        if (!clave) {
            errorClave.textContent = "La contraseña es obligatoria";
            esValido = false;
        } else if (clave.length < 10) {
            errorClave.textContent = "La contraseña debe tener al menos 10 caracteres";
            esValido = false;
        } else {
            errorClave.textContent = "";
        }

        // Validar confirmación de contraseña
        const errorConfirmar = document.getElementById("error-confirmar-clave");
        if (!confirmarClave) {
            errorConfirmar.textContent = "Debes confirmar tu contraseña";
            esValido = false;
        } else if (clave !== confirmarClave) {
            errorConfirmar.textContent = "Las contraseñas no coinciden";
            esValido = false;
        } else {
            errorConfirmar.textContent = "";
        }

        // Validar rol
        const errorRol = document.getElementById("error-rol-registro");
        if (!rol) {
            errorRol.textContent = "Debes seleccionar un rol";
            esValido = false;
        } else {
            errorRol.textContent = "";
        }

        console.log("¿Formulario válido?", esValido);

        if (esValido) {
            try {
                // Guardar usuario en localStorage
                const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
                console.log("Usuarios existentes:", usuarios);
                
                // Verificar si el usuario o correo ya existen
                const usuarioExistente = usuarios.find(u => u.usuario === usuario || u.correo === correo);
                if (usuarioExistente) {
                    alert("El usuario o correo electrónico ya está registrado");
                    return;
                }

                const nuevoUsuario = {
                    nombre: nombre,
                    correo: correo,
                    usuario: usuario,
                    clave: clave,
                    rol: rol,
                    fechaRegistro: new Date().toISOString()
                };

                usuarios.push(nuevoUsuario);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                
                console.log("Usuario guardado:", nuevoUsuario);
                console.log("Todos los usuarios:", JSON.parse(localStorage.getItem('usuarios')));

                // INICIAR SESIÓN AUTOMÁTICAMENTE (NUEVO)
                localStorage.setItem("usuarioLogueado", "true");
                localStorage.setItem("nombre", nombre);
                localStorage.setItem("correo", correo);
                localStorage.setItem("rol", rol);

                // Mostrar mensaje de éxito
                alert("¡Registro exitoso! Serás redirigido a tu panel.");
                
                // Redirigir según el rol
                if (rol === "estudiante") {
                    window.location.href = "panel-estudiante.html";
                } else if (rol === "profesor") {
                    window.location.href = "panel-profesor.html";
                } else {
                    window.location.href = "panel-admin.html";
                }
                
            } catch (error) {
                console.error("Error al guardar usuario:", error);
                alert("Error al registrar usuario. Intenta nuevamente.");
            }
        } else {
            console.log("Formulario inválido, no se guarda");
        }
    });

    // Validar seguridad de contraseña en tiempo real para registro (solo informativo)
    document.getElementById("clave-registro").addEventListener("input", function() {
        validarSeguridadContraseñaRegistro(this.value);
    });

    function validarSeguridadContraseñaRegistro(contraseña) {
        const barraSeguridad = document.getElementById("barra-seguridad-registro");
        const textoSeguridad = document.getElementById("texto-seguridad-registro");
        
        let puntuacion = 0;
        let mensaje = "";
        let color = "";

        // Longitud mínima (obligatoria)
        if (contraseña.length >= 10) puntuacion += 25;
        
        // Mayúsculas y minúsculas (OPCIONAL - solo suma puntos)
        if (/[a-z]/.test(contraseña) && /[A-Z]/.test(contraseña)) puntuacion += 25;
        
        // Números (OPCIONAL - solo suma puntos)
        if (/\d/.test(contraseña)) puntuacion += 25;
        
        // Símbolos (OPCIONAL - solo suma puntos)
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

    // Validar nombre en tiempo real (solo letras)
    document.getElementById("nombre").addEventListener("input", function(e) {
        const regex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]*$/;
        if (!regex.test(e.target.value)) {
            e.target.value = e.target.value.slice(0, -1);
        }
    });
});