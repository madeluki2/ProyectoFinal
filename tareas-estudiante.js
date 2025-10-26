// =============================================
// SISTEMA NUEVO: Tareas dinámicas del profesor
// =============================================

// Función para cargar las tareas del sistema (las que crea el profesor)
function cargarTareasSistema() {
    // Obtener las tareas que el profesor creó
    const tareasSistema = JSON.parse(localStorage.getItem('tareasSistema') || '[]');
    const tareasActivas = tareasSistema.filter(tarea => tarea.estado === 'activa');
    
    const contenedor = document.getElementById('tareas-sistema-container');
    
    // Si no hay tareas del sistema, no mostrar nada
    if (tareasActivas.length === 0) {
        contenedor.innerHTML = '';
        return;
    }
    
    // Crear HTML para cada tarea del sistema
    let tareasHTML = '';
    
    tareasActivas.forEach(tarea => {
        // Verificar si el estudiante ya entregó esta tarea
        const tareasEstado = JSON.parse(localStorage.getItem('tareasEstado') || '{}');
        const estadoTarea = tareasEstado[tarea.id];
        
        // Si la tarea fue rechazada, no mostrarla
        if (estadoTarea === 'rechazada') {
            return;
        }
        
        tareasHTML += `
            <div class="card tarea-card" id="tarea-sistema-${tarea.id}">
                <h4>${tarea.titulo} <span class="badge-curso">${tarea.cursoNombre}</span></h4>
                <p class="fecha-limite">📅 Fecha límite: ${formatearFecha(tarea.fechaLimite)}</p>
                <p class="descripcion-tarea">${tarea.descripcion}</p>
                
                ${tarea.requisitos && tarea.requisitos.length > 0 ? `
                    <div class="requisitos-tarea">
                        <strong>📋 Requisitos:</strong>
                        <ul>
                            ${tarea.requisitos.map(req => `<li>${req}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <p><strong>🏆 Puntaje máximo:</strong> ${tarea.puntajeMaximo} puntos</p>
                
                <div class="acciones-tarea">
                    ${estadoTarea === 'entregada' ? `
                        <button class="btn-entregada" disabled>✅ Ya entregada</button>
                        <span class="estado-entregada">Entregada - Esperando calificación</span>
                    ` : estadoTarea === 'en_progreso' ? `
                        <button class="btn-en-progreso" disabled>🔄 En progreso</button>
                    ` : `
                        <button class="btn-realizar" onclick="realizarTareaSistema('${tarea.id}')">
                            ✅ Realizar Tarea
                        </button>
                        <button class="btn-rechazar" onclick="rechazarTareaSistema('${tarea.id}')">
                            ❌ No puedo hacerla
                        </button>
                    `}
                </div>
            </div>
        `;
    });
    
    contenedor.innerHTML = tareasHTML;
}

// Función para realizar una tarea del sistema
function realizarTareaSistema(tareaId) {
    console.log("Realizando tarea del sistema:", tareaId);
    
    // Obtener información de la tarea
    const tareasSistema = JSON.parse(localStorage.getItem('tareasSistema') || '[]');
    const tarea = tareasSistema.find(t => t.id === tareaId);
    
    if (!tarea) {
        alert('Error: Tarea no encontrada');
        return;
    }
    
    // Guardar en localStorage que la tarea está en progreso
    const tareasEstado = JSON.parse(localStorage.getItem('tareasEstado') || '{}');
    tareasEstado[tareaId] = 'en_progreso';
    localStorage.setItem('tareasEstado', JSON.stringify(tareasEstado));
    
    // Redirigir a la interfaz de realizar tarea según el curso
    if (tarea.curso === 'javascript') {
        window.location.href = "realizartareajs.html?tarea=" + tareaId;
    } else if (tarea.curso === 'python') {
        window.location.href = "realizartarea.html?tarea=" + tareaId;
    } else {
        // Para otros cursos, redirigir a una página genérica
        window.location.href = "realizartarea-generico.html?tarea=" + tareaId;
    }
}

// Función para rechazar una tarea del sistema
function rechazarTareaSistema(tareaId) {
    if (confirm('¿Estás seguro de que no puedes realizar esta tarea? Esto notificará al profesor.')) {
        // Guardar en localStorage que la tarea fue rechazada
        const tareasEstado = JSON.parse(localStorage.getItem('tareasEstado') || '{}');
        tareasEstado[tareaId] = 'rechazada';
        localStorage.setItem('tareasEstado', JSON.stringify(tareasEstado));
        
        // Ocultar la tarea rechazada
        const tareaElement = document.getElementById(`tarea-sistema-${tareaId}`);
        if (tareaElement) {
            tareaElement.style.display = 'none';
        }
        
        // Aquí podrías agregar una notificación al profesor
        alert('El profesor ha sido notificado. Gracias por tu honestidad.');
        
        verificarTareasRestantes();
    }
}

// Función para formatear fechas
function formatearFecha(fechaString) {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fechaString).toLocaleDateString('es-ES', opciones);
}

// =============================================
// SISTEMA ORIGINAL: Tareas fijas
// =============================================

// Función para realizar tarea - CORREGIR RUTAS
function realizarTarea(tipoTarea) {
    console.log("Realizando tarea:", tipoTarea);
    
    // Guardar en localStorage que la tarea está en progreso
    const tareasEstado = JSON.parse(localStorage.getItem('tareasEstado') || '{}');
    tareasEstado[tipoTarea] = 'en_progreso';
    localStorage.setItem('tareasEstado', JSON.stringify(tareasEstado));
    
    // Redirigir a la interfaz de realizar tarea - RUTAS ACTUALIZADAS
    if (tipoTarea === 'js') {
        window.location.href = "realizartareajs.html";
    } else if (tipoTarea === 'python') {
        window.location.href = "realizartarea.html";
    }
}

// Función para rechazar tarea
function rechazarTarea(tipoTarea) {
    console.log("Rechazando tarea:", tipoTarea);
    
    // Guardar en localStorage que la tarea fue rechazada
    const tareasEstado = JSON.parse(localStorage.getItem('tareasEstado') || '{}');
    tareasEstado[tipoTarea] = 'rechazada';
    localStorage.setItem('tareasEstado', JSON.stringify(tareasEstado));
    
    // Ocultar la tarea rechazada
    const tareaElement = document.getElementById(`tarea-${tipoTarea}`);
    if (tareaElement) {
        tareaElement.style.display = 'none';
    }
    
    // Verificar si ya no hay tareas visibles
    verificarTareasRestantes();
}

// Función para verificar si quedan tareas
function verificarTareasRestantes() {
    const tareasVisibles = document.querySelectorAll('.tarea-card[style=""]');
    const tareasDisplay = document.querySelectorAll('.tarea-card:not([style*="display: none"])');
    
    if (tareasDisplay.length === 0) {
        document.getElementById('sin-tareas').classList.remove('oculto');
    } else {
        document.getElementById('sin-tareas').classList.add('oculto');
    }
}

// Al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar tareas del sistema (nuevas)
    cargarTareasSistema();
    
    const tareasEstado = JSON.parse(localStorage.getItem('tareasEstado') || '{}');
    
    // Ocultar tareas rechazadas (sistema original)
    Object.keys(tareasEstado).forEach(tarea => {
        if (tareasEstado[tarea] === 'rechazada') {
            const tareaElement = document.getElementById(`tarea-${tarea}`);
            if (tareaElement) {
                tareaElement.style.display = 'none';
            }
            
            const tareaSistemaElement = document.getElementById(`tarea-sistema-${tarea}`);
            if (tareaSistemaElement) {
                tareaSistemaElement.style.display = 'none';
            }
        }
    });
    
    // Verificar si hay tareas visibles
    verificarTareasRestantes();
});