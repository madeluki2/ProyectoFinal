// Manejo del formulario de entrega de tarea JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const formEntrega = document.getElementById('form-entrega-js');
    
    if (formEntrega) {
        formEntrega.addEventListener('submit', function(e) {
            e.preventDefault();
            entregarTareaJS();
        });
    }
    
    // Cargar borrador guardado si existe
    cargarBorradorJS();
});

function entregarTareaJS() {
    const archivos = document.getElementById('archivo-js').files;
    const descripcion = document.getElementById('descripcion-solucion').value.trim();
    const enlaceProyecto = document.getElementById('enlace-proyecto').value.trim();
    
    if (archivos.length === 0) {
        alert('Por favor, selecciona al menos un archivo para entregar.');
        return;
    }
    
    if (!descripcion) {
        alert('Por favor, describe tu solución.');
        return;
    }
    
    // Validar extensiones de archivos
    const extensionesPermitidas = ['js', 'html', 'css', 'zip', 'rar'];
    for (let archivo of archivos) {
        const extension = archivo.name.split('.').pop().toLowerCase();
        if (!extensionesPermitidas.includes(extension)) {
            alert(`El archivo "${archivo.name}" tiene una extensión no permitida. Solo se aceptan: .js, .html, .css, .zip, .rar`);
            return;
        }
    }
    
    // Guardar estado de entrega en localStorage
    const tareasEstado = JSON.parse(localStorage.getItem('tareasEstado') || '{}');
    tareasEstado['js'] = {
        estado: 'entregada',
        fecha: new Date().toISOString(),
        archivos: Array.from(archivos).map(archivo => archivo.name),
        descripcion: descripcion,
        enlaceProyecto: enlaceProyecto
    };
    localStorage.setItem('tareasEstado', JSON.stringify(tareasEstado));
    
    // Limpiar borrador después de entrega exitosa
    localStorage.removeItem('borradorJS');
    
    alert('¡Tarea de JavaScript entregada correctamente! El profesor la revisará pronto.');
    window.location.href = "tareas-estudiante.html";
}

function guardarBorrador() {
    const descripcion = document.getElementById('descripcion-solucion').value;
    const enlaceProyecto = document.getElementById('enlace-proyecto').value;
    
    const borrador = {
        descripcion: descripcion,
        enlaceProyecto: enlaceProyecto,
        fechaGuardado: new Date().toISOString()
    };
    
    localStorage.setItem('borradorJS', JSON.stringify(borrador));
    alert('📝 Borrador de JavaScript guardado. Puedes continuar más tarde.');
}

function cancelarEntrega() {
    if (confirm('¿Estás seguro de que quieres cancelar? Los cambios no guardados se perderán.')) {
        window.location.href = "tareas-estudiante.html";
    }
}

function cargarBorradorJS() {
    const borrador = JSON.parse(localStorage.getItem('borradorJS'));
    if (borrador) {
        document.getElementById('descripcion-solucion').value = borrador.descripcion || '';
        document.getElementById('enlace-proyecto').value = borrador.enlaceProyecto || '';
        console.log('Borrador de JS cargado:', borrador.fechaGuardado);
    }
}