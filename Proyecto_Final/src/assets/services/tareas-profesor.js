// Datos de ejemplo para las tareas del profesor
const tareasProfesor = [
    {
        id: 'tarea_prof_001',
        titulo: 'Proyecto Java - Sistema de Gestión',
        curso: 'Java Professional',
        descripcion: 'Desarrollar un sistema de gestión usando POO en Java.',
        fechaLimite: '2025-10-27',
        puntos: 100,
        entregas: 0,
        estado: 'activa'
    }
];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    cargarTareasProfesor();
    actualizarEstadisticas();
    
    // Configurar formulario de crear tarea
    const formCrearTarea = document.getElementById('form-crear-tarea');
    if (formCrearTarea) {
        formCrearTarea.addEventListener('submit', function(e) {
            e.preventDefault();
            crearNuevaTarea();
        });
    }
});

// Función para cargar tareas del profesor
function cargarTareasProfesor() {
    const contenedor = document.getElementById('lista-tareas-profesor');
    if (!contenedor) return;
    
    const tareasGuardadas = localStorage.getItem('tareasProfesor');
    const tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : tareasProfesor;

    if (tareas.length === 0) {
        contenedor.innerHTML = `
            <div class="mensaje-sin-tareas">
                <p>📝 Aún no has creado ninguna tarea.</p>
                <p>¡Usa el botón "Crear Nueva Tarea" para comenzar!</p>
            </div>
        `;
        return;
    }

    let html = '';
    tareas.forEach(tarea => {
        html += `
            <div class="tarea-item-profesor">
                <div class="tarea-header">
                    <h5>${tarea.titulo}</h5>
                    <span class="badge-curso">${tarea.curso}</span>
                </div>
                
                <div class="tarea-info">
                    <div><strong>Fecha límite:</strong> ${formatearFecha(tarea.fechaLimite)}</div>
                    <div><strong>Entregas:</strong> ${tarea.entregas} estudiantes</div>
                    <div><strong>Puntaje:</strong> ${tarea.puntos} puntos</div>
                </div>
                
                <div class="tarea-descripcion">
                    <p>${tarea.descripcion}</p>
                </div>
                
                <div class="acciones-tarea-profesor">
                    <button class="btn-ver-entregas" onclick="verEntregasTarea('${tarea.id}')">
                        📋 Ver Entregas (${tarea.entregas})
                    </button>
                    <button class="btn-editar" onclick="editarTarea('${tarea.id}')">
                        ✏️ Editar Tarea
                    </button>
                    <button class="btn-eliminar" onclick="eliminarTarea('${tarea.id}')">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        `;
    });

    contenedor.innerHTML = html;
}

// FUNCIONES PARA REDIRIGIR A LAS NUEVAS INTERFACES
function verEntregasTarea(idTarea) {
    // Guardar la tarea seleccionada para usarla en la página de revisión
    localStorage.setItem('tareaSeleccionadaRevisar', idTarea);
    // Redirigir a la página de revisar tareas
    window.location.href = 'revisar-tareas.html';
}

function editarTarea(idTarea) {
    // Guardar la tarea seleccionada para usarla en la página de edición
    localStorage.setItem('tareaSeleccionadaEditar', idTarea);
    // Redirigir a la página de editar tareas
    window.location.href = 'editar-tareas.html';
}

function irARevisarTareas() {
    // Redirigir a la página de revisar tareas
    window.location.href = 'revisar-tareas.html';
}

// Funciones del modal
function mostrarModalCrearTarea() {
    const modal = document.getElementById('modal-crear-tarea');
    if (modal) modal.classList.remove('oculto');
}

function cerrarModalCrearTarea() {
    const modal = document.getElementById('modal-crear-tarea');
    if (modal) modal.classList.add('oculto');
}

// Función para eliminar tarea
function eliminarTarea(idTarea) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        return;
    }
    
    const tareasGuardadas = localStorage.getItem('tareasProfesor');
    const tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : tareasProfesor;
    const tareasFiltradas = tareas.filter(t => t.id !== idTarea);
    
    localStorage.setItem('tareasProfesor', JSON.stringify(tareasFiltradas));
    cargarTareasProfesor();
    actualizarEstadisticas();
    
    alert('Tarea eliminada correctamente');
}

// Función para crear nueva tarea
function crearNuevaTarea() {
    const titulo = document.getElementById('titulo-tarea').value;
    const curso = document.getElementById('curso-tarea').value;
    const fechaLimite = document.getElementById('fecha-limite').value;
    const descripcion = document.getElementById('descripcion-tarea').value;
    const puntos = parseInt(document.getElementById('puntaje-maximo').value);
    
    if (!titulo || !curso || !fechaLimite || !descripcion) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }
    
    const nuevaTarea = {
        id: 'tarea_prof_' + Date.now(),
        titulo: titulo,
        curso: document.querySelector(`#curso-tarea option[value="${curso}"]`).textContent,
        descripcion: descripcion,
        fechaLimite: fechaLimite,
        puntos: puntos,
        entregas: 0,
        estado: 'activa',
        fechaCreacion: new Date().toISOString()
    };
    
    const tareasGuardadas = localStorage.getItem('tareasProfesor');
    const tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : tareasProfesor;
    tareas.push(nuevaTarea);
    
    localStorage.setItem('tareasProfesor', JSON.stringify(tareas));
    
    cerrarModalCrearTarea();
    cargarTareasProfesor();
    actualizarEstadisticas();
    
    alert('✅ Tarea creada correctamente');
    
    // Limpiar formulario
    document.getElementById('form-crear-tarea').reset();
}

// Función para actualizar estadísticas
function actualizarEstadisticas() {
    const tareasGuardadas = localStorage.getItem('tareasProfesor');
    const tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : tareasProfesor;
    
    const totalTareas = document.getElementById('total-tareas');
    const tareasActivas = document.getElementById('tareas-activas');
    const entregasPendientes = document.getElementById('entregas-pendientes');
    const tareasRevisadas = document.getElementById('tareas-revisadas');
    
    if (totalTareas) totalTareas.textContent = tareas.length;
    if (tareasActivas) tareasActivas.textContent = tareas.filter(t => t.estado === 'activa').length;
    if (entregasPendientes) entregasPendientes.textContent = tareas.reduce((sum, t) => sum + t.entregas, 0);
    if (tareasRevisadas) tareasRevisadas.textContent = '0'; // Puedes ajustar esta lógica
}

// Función para formatear fechas
function formatearFecha(fecha) {
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES');
}