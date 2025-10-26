// Sistema de autenticación y gestión de sesiones

// Verificar si el usuario está logueado
function verificarSesion() {
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const rol = localStorage.getItem('rol');
    
    if (!usuarioLogueado || !rol) {
        // Si no hay sesión, redirigir al login
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// Cerrar sesión
function cerrarSesion() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        // Limpiar datos de sesión
        localStorage.removeItem('usuarioLogueado');
        localStorage.removeItem('rol');
        localStorage.removeItem('nombre');
        localStorage.removeItem('correo');
        
        // Redirigir al login
        window.location.href = 'login.html';
    }
}

// Cambiar de cuenta (cerrar y abrir login)
function cambiarCuenta() {
    if (confirm('¿Quieres cambiar de cuenta? Se cerrará la sesión actual.')) {
        cerrarSesion();
    }
}

// Mostrar información del usuario en el sidebar
function mostrarInfoUsuario() {
    const nombre = localStorage.getItem('nombre') || 'Usuario';
    const correo = localStorage.getItem('correo') || '';
    const rol = localStorage.getItem('rol') || '';
    
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        // Verificar si ya existe user-info y eliminarlo
        const existingUserInfo = sidebar.querySelector('.user-info');
        if (existingUserInfo) {
            existingUserInfo.remove();
        }
        
        // Crear nuevo user-info
        const userInfo = document.createElement('div');
        userInfo.className = 'user-info';
        userInfo.innerHTML = `
            <div class="user-details">
                <div class="user-name">👤 ${nombre}</div>
                <div class="user-email">${correo}</div>
                <div class="user-role">${rol.toUpperCase()}</div>
            </div>
            <div class="user-actions">
                <button class="btn-cambiar-cuenta" onclick="cambiarCuenta()">🔄 Cambiar Cuenta</button>
                <button class="btn-cerrar-sesion" onclick="cerrarSesion()">🚪 Cerrar Sesión</button>
            </div>
        `;
        
        // Insertar después del nav
        const nav = sidebar.querySelector('nav');
        if (nav) {
            sidebar.insertBefore(userInfo, nav.nextSibling);
        } else {
            // Si no hay nav, agregar al inicio del sidebar
            sidebar.prepend(userInfo);
        }
    }
}

// Verificar sesión al cargar páginas protegidas
document.addEventListener('DOMContentLoaded', function() {
    // Solo verificar sesión en páginas que no sean login/registro
    if (!window.location.pathname.includes('login.html') && 
        !window.location.pathname.includes('registro.html') &&
        !window.location.pathname.includes('index.html')) {
        
        if (verificarSesion()) {
            mostrarInfoUsuario();
        }
    }
    
    // En login/registro, redirigir si ya está logueado
    if (window.location.pathname.includes('login.html') || 
        window.location.pathname.includes('registro.html')) {
        
        const usuarioLogueado = localStorage.getItem('usuarioLogueado');
        if (usuarioLogueado) {
            // Ya está logueado, redirigir según su rol
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
    }
});