// Manejo del formulario de entrega de tarea Python
document.addEventListener('DOMContentLoaded', function() {
    const formEntrega = document.getElementById('form-entrega-python');
    
    if (formEntrega) {
        formEntrega.addEventListener('submit', function(e) {
            e.preventDefault();
            entregarTareaPython();
        });
    }
    
    // Cargar borrador guardado si existe
    cargarBorradorPython();
});

function entregarTareaPython() {
    const archivo = document.getElementById('archivo-python').files[0];
    const descripcion = document.getElementById('descripcion-implementacion').value.trim();
    const enlaceRepositorio = document.getElementById('enlace-repositorio').value.trim();
    const dificultades = document.getElementById('dificultades').value.trim();
    
    if (!archivo) {
        alert('Por favor, selecciona un archivo .py para entregar.');
        return;
    }
    
    if (!descripcion) {
        alert('Por favor, describe tu implementación.');
        return;
    }
    
    // Validar extensión del archivo
    const extension = archivo.name.split('.').pop().toLowerCase();
    if (!['py', 'txt', 'zip'].includes(extension)) {
        alert('Por favor, sube un archivo .py, .txt o .zip');
        return;
    }
    
    // Guardar estado de entrega en localStorage
    const tareasEstado = JSON.parse(localStorage.getItem('tareasEstado') || '{}');
    tareasEstado['python'] = {
        estado: 'entregada',
        fecha: new Date().toISOString(),
        archivo: archivo.name,
        descripcion: descripcion,
        enlaceRepositorio: enlaceRepositorio,
        dificultades: dificultades
    };
    localStorage.setItem('tareasEstado', JSON.stringify(tareasEstado));
    
    // Limpiar borrador después de entrega exitosa
    localStorage.removeItem('borradorPython');
    
    // Simular subida de archivo
    alert(`¡Tarea de Python "${archivo.name}" entregada correctamente! 🐍\nEl profesor la revisará pronto.`);
    window.location.href = "tareas-estudiante.html";
}

function guardarBorradorPython() {
    const descripcion = document.getElementById('descripcion-implementacion').value;
    const dificultades = document.getElementById('dificultades').value;
    const enlaceRepositorio = document.getElementById('enlace-repositorio').value;
    
    const borrador = {
        descripcion: descripcion,
        dificultades: dificultades,
        enlaceRepositorio: enlaceRepositorio,
        fechaGuardado: new Date().toISOString()
    };
    
    localStorage.setItem('borradorPython', JSON.stringify(borrador));
    alert('📝 Borrador de Python guardado. Puedes continuar más tarde.');
}

function cancelarEntrega() {
    if (confirm('¿Estás seguro de que quieres cancelar? Los cambios no guardados se perderán.')) {
        window.location.href = "tareas-estudiante.html";
    }
}

function cargarBorradorPython() {
    const borrador = JSON.parse(localStorage.getItem('borradorPython'));
    if (borrador) {
        document.getElementById('descripcion-implementacion').value = borrador.descripcion || '';
        document.getElementById('dificultades').value = borrador.dificultades || '';
        document.getElementById('enlace-repositorio').value = borrador.enlaceRepositorio || '';
        console.log('Borrador cargado:', borrador.fechaGuardado);
    }
}