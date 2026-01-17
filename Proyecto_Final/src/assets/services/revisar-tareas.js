// Datos de ejemplo para las tareas
const tareasEstudiantes = [
    {
        id: 'tarea_001',
        estudiante: 'Ana García',
        curso: 'JavaScript Básico',
        tarea: 'Proyecto Final - Calculadora',
        fechaEntrega: '2024-01-25',
        estado: 'entregado',
        puntaje: null,
        archivo: 'calculadora.zip',
        descripcion: 'Implementé una calculadora con funciones básicas y validación de entrada.',
        comentarioProfesor: '',
        fechaRevisado: null
    },
    {
        id: 'tarea_002',
        estudiante: 'Carlos López',
        curso: 'Python Avanzado',
        tarea: 'Sistema de Gestión de Vehículos',
        fechaEntrega: '2024-01-24',
        estado: 'pendiente',
        puntaje: null,
        archivo: 'vehiculos.py',
        descripcion: 'Creé las clases Vehiculo, Automovil y Motocicleta con herencia.',
        comentarioProfesor: '',
        fechaRevisado: null
    },
    {
        id: 'tarea_003',
        estudiante: 'María Rodríguez',
        curso: 'Java Professional',
        tarea: 'API REST Básica',
        fechaEntrega: '2024-01-23',
        estado: 'revisado',
        puntaje: 85,
        archivo: 'api-rest.zip',
        descripcion: 'Desarrollé una API REST con Spring Boot para gestión de usuarios.',
        comentarioProfesor: 'Buen trabajo en la estructura, falta manejo de errores.',
        fechaRevisado: '2024-01-24'
    }
];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    cargarTareas();
    actualizarEstadisticas();
    document.getElementById('nombre-profesor').textContent = localStorage.getItem('nombre') || 'Profesor';
    
    // Cargar datos guardados al iniciar
    const tareasGuardadas = localStorage.getItem('tareasEstudiantes');
    if (tareasGuardadas) {
        const tareas = JSON.parse(tareasGuardadas);
        tareas.forEach(tareaGuardada => {
            const index = tareasEstudiantes.findIndex(t => t.id === tareaGuardada.id);
            if (index !== -1) {
                tareasEstudiantes[index] = { ...tareasEstudiantes[index], ...tareaGuardada };
            }
        });
    }
});

// Función para cargar tareas en la tabla
function cargarTareas() {
    const tbody = document.getElementById('lista-tareas-revisar');
    const mensajeSinTareas = document.getElementById('mensaje-sin-tareas');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const tareasFiltradas = filtrarTareas();
    
    if (tareasFiltradas.length === 0) {
        if (mensajeSinTareas) mensajeSinTareas.classList.remove('oculto');
        return;
    }
    
    if (mensajeSinTareas) mensajeSinTareas.classList.add('oculto');
    
    tareasFiltradas.forEach(tarea => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><strong>${tarea.estudiante}</strong></td>
            <td>${tarea.curso}</td>
            <td>${tarea.tarea}</td>
            <td>${formatearFecha(tarea.fechaEntrega)}</td>
            <td><span class="estado-tarea estado-${tarea.estado}">${tarea.estado.toUpperCase()}</span></td>
            <td>${tarea.puntaje ? `${tarea.puntaje}/100` : '--'}</td>
            <td>
                <div class="acciones-rapidas">
                    <button class="btn-accion btn-revisar" onclick="revisarTarea('${tarea.id}')">📝 Revisar</button>
                    <button class="btn-accion btn-editar" onclick="editarCalificacion('${tarea.id}')">✏️ Editar</button>
                    <button class="btn-accion btn-descargar" onclick="descargarArchivo('${tarea.archivo}')">📥 Descargar</button>
                </div>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

// Función para filtrar tareas
function filtrarTareas() {
    const filtroCurso = document.getElementById('filtro-curso').value;
    const filtroEstado = document.getElementById('filtro-estado').value;
    const filtroFecha = document.getElementById('filtro-fecha').value;
    
    return tareasEstudiantes.filter(tarea => {
        const coincideCurso = !filtroCurso || tarea.curso.toLowerCase().includes(filtroCurso);
        const coincideEstado = !filtroEstado || tarea.estado === filtroEstado;
        const coincideFecha = !filtroFecha || tarea.fechaEntrega === filtroFecha;
        
        return coincideCurso && coincideEstado && coincideFecha;
    });
}

// Función para aplicar filtros
function aplicarFiltros() {
    cargarTareas();
    actualizarEstadisticas();
}

// Función para limpiar filtros
function limpiarFiltros() {
    document.getElementById('filtro-curso').value = '';
    document.getElementById('filtro-estado').value = '';
    document.getElementById('filtro-fecha').value = '';
    cargarTareas();
    actualizarEstadisticas();
}

// Función para revisar tarea (modal)
function revisarTarea(idTarea) {
    const tarea = tareasEstudiantes.find(t => t.id === idTarea);
    if (!tarea) return;
    
    const modal = document.getElementById('modal-revisar');
    const contenido = document.getElementById('contenido-revision');
    
    if (!modal || !contenido) return;
    
    contenido.innerHTML = `
        <h3>📋 Revisar Tarea: ${tarea.tarea}</h3>
        <div class="card">
            <h4>Información del Estudiante</h4>
            <p><strong>Estudiante:</strong> ${tarea.estudiante}</p>
            <p><strong>Curso:</strong> ${tarea.curso}</p>
            <p><strong>Fecha de entrega:</strong> ${formatearFecha(tarea.fechaEntrega)}</p>
            <p><strong>Archivo:</strong> ${tarea.archivo} <button class="btn-accion btn-descargar" onclick="descargarArchivo('${tarea.archivo}')">Descargar</button></p>
        </div>
        
        <div class="card">
            <h4>Descripción del Estudiante</h4>
            <p>${tarea.descripcion}</p>
        </div>
        
        <div class="card">
            <h4>Evaluación</h4>
            <div class="form-group">
                <label for="puntaje-tarea">Puntaje (0-100):</label>
                <input type="number" id="puntaje-tarea" class="puntaje-input" min="0" max="100" value="${tarea.puntaje || ''}" placeholder="Ej: 85">
            </div>
            
            <div class="form-group">
                <label for="comentario-tarea">Comentarios y retroalimentación:</label>
                <textarea id="comentario-tarea" class="comentario-profesor" placeholder="Proporciona comentarios constructivos...">${tarea.comentarioProfesor}</textarea>
            </div>
            
            <div class="acciones-formulario">
                <button class="btn-crear" onclick="guardarRevision('${tarea.id}')">💾 Guardar Evaluación</button>
                <button class="btn-cancelar" onclick="cerrarModalRevisar()">Cancelar</button>
            </div>
        </div>
    `;
    
    modal.classList.remove('oculto');
}

// Función para editar calificación rápida
function editarCalificacion(idTarea) {
    const tarea = tareasEstudiantes.find(t => t.id === idTarea);
    if (!tarea) return;
    
    const nuevoPuntaje = prompt(`Editar puntaje para ${tarea.estudiante} (0-100):`, tarea.puntaje || '');
    
    if (nuevoPuntaje !== null) {
        const puntajeNum = parseInt(nuevoPuntaje);
        if (!isNaN(puntajeNum) && puntajeNum >= 0 && puntajeNum <= 100) {
            tarea.puntaje = puntajeNum;
            tarea.estado = 'revisado';
            tarea.fechaRevisado = new Date().toISOString().split('T')[0];
            guardarEnLocalStorage();
            cargarTareas();
            actualizarEstadisticas();
            alert('✅ Puntaje actualizado correctamente');
        } else {
            alert('❌ El puntaje debe ser un número entre 0 y 100');
        }
    }
}

// Función para guardar revisión completa
function guardarRevision(idTarea) {
    const tarea = tareasEstudiantes.find(t => t.id === idTarea);
    if (!tarea) return;
    
    const puntaje = document.getElementById('puntaje-tarea').value;
    const comentario = document.getElementById('comentario-tarea').value;
    
    if (!puntaje) {
        alert('⚠️ Por favor, asigna un puntaje');
        return;
    }
    
    const puntajeNum = parseInt(puntaje);
    if (isNaN(puntajeNum) || puntajeNum < 0 || puntajeNum > 100) {
        alert('❌ El puntaje debe ser un número entre 0 y 100');
        return;
    }
    
    tarea.puntaje = puntajeNum;
    tarea.comentarioProfesor = comentario;
    tarea.estado = 'revisado';
    tarea.fechaRevisado = new Date().toISOString().split('T')[0];
    
    guardarEnLocalStorage();
    cerrarModalRevisar();
    cargarTareas();
    actualizarEstadisticas();
    
    alert('✅ Evaluación guardada correctamente');
}

// Función para cerrar modal de revisión
function cerrarModalRevisar() {
    const modal = document.getElementById('modal-revisar');
    if (modal) modal.classList.add('oculto');
}

// Función para simular descarga de archivo
function descargarArchivo(nombreArchivo) {
    alert(`📥 Descargando archivo: ${nombreArchivo}\n(En un sistema real, esto descargaría el archivo)`);
    // En una implementación real, aquí iría la lógica para descargar el archivo
}

// Función para formatear fechas
function formatearFecha(fecha) {
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES');
}

// Función para actualizar estadísticas
function actualizarEstadisticas() {
    const tareasFiltradas = filtrarTareas();
    const pendientes = tareasFiltradas.filter(t => t.estado === 'pendiente').length;
    const porRevisar = tareasFiltradas.filter(t => t.estado === 'entregado').length;
    const revisadasHoy = tareasFiltradas.filter(t => t.fechaRevisado === new Date().toISOString().split('T')[0]).length;
    
    const tareasCalificadas = tareasFiltradas.filter(t => t.puntaje !== null);
    const promedio = tareasCalificadas.length > 0 
        ? (tareasCalificadas.reduce((sum, t) => sum + t.puntaje, 0) / tareasCalificadas.length).toFixed(1)
        : '0.0';
    
    const contadorPendientes = document.getElementById('contador-pendientes');
    const contadorRevision = document.getElementById('contador-revision');
    const contadorRevisadas = document.getElementById('contador-revisadas');
    const promedioGeneral = document.getElementById('promedio-general');
    
    if (contadorPendientes) contadorPendientes.textContent = pendientes;
    if (contadorRevision) contadorRevision.textContent = porRevisar;
    if (contadorRevisadas) contadorRevisadas.textContent = revisadasHoy;
    if (promedioGeneral) promedioGeneral.textContent = promedio;
}

// Función para guardar en localStorage
function guardarEnLocalStorage() {
    localStorage.setItem('tareasEstudiantes', JSON.stringify(tareasEstudiantes));
}