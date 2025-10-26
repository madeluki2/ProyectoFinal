// Datos de ejemplo de tareas creadas por el profesor
const tareasProfesor = [
    {
        id: 'tarea_prof_001',
        titulo: 'Proyecto Final - Calculadora Interactiva',
        curso: 'JavaScript Básico',
        descripcion: 'Crear una calculadora interactiva con JavaScript que realice operaciones básicas.',
        fechaLimite: '2024-02-10',
        puntos: 100,
        entregas: 15,
        instrucciones: `1. Implementar operaciones básicas (+, -, *, /)
2. Validar entrada del usuario
3. Manejar errores de división por cero
4. Interfaz responsive`,
        criterios: `- Funcionalidad: 40 puntos
- Código limpio: 30 puntos
- Interfaz de usuario: 20 puntos
- Documentación: 10 puntos`
    },
    {
        id: 'tarea_prof_002',
        titulo: 'Sistema POO - Gestión de Vehículos',
        curso: 'Python Avanzado',
        descripcion: 'Implementar un sistema de gestión de vehículos usando Programación Orientada a Objetos.',
        fechaLimite: '2024-02-15',
        puntos: 100,
        entregas: 12,
        instrucciones: `Crear las clases:
- Vehiculo (clase base)
- Automovil (hereda de Vehículo)
- Motocicleta (hereda de Vehículo)

Implementar métodos específicos para cada tipo.`,
        criterios: `- Herencia correcta: 30 puntos
- Polimorfismo: 25 puntos
- Encapsulamiento: 20 puntos
- Métodos adicionales: 25 puntos`
    }
];

function cargarTareasProfesor() {
    const contenedor = document.getElementById('lista-tareas-editar');
    const mensajeSinTareas = document.getElementById('mensaje-sin-tareas-creadas');
    
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    
    // Cargar tareas guardadas
    const tareasGuardadas = localStorage.getItem('tareasProfesor');
    const tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : tareasProfesor;
    
    if (tareas.length === 0) {
        if (mensajeSinTareas) mensajeSinTareas.classList.remove('oculto');
        return;
    }
    
    if (mensajeSinTareas) mensajeSinTareas.classList.add('oculto');
    
    tareas.forEach(tarea => {
        const elemento = document.createElement('div');
        elemento.className = 'tarea-item-editar';
        elemento.innerHTML = `
            <div class="tarea-header-editar">
                <h5>${tarea.titulo}</h5>
                <div>
                    <span class="badge-curso">${tarea.curso}</span>
                    <span class="badge-entregas">${tarea.entregas || 0} entregas</span>
                </div>
            </div>
            
            <div class="tarea-info-editar">
                <div><strong>Fecha límite:</strong> ${formatearFecha(tarea.fechaLimite)}</div>
                <div><strong>Puntaje máximo:</strong> ${tarea.puntos} puntos</div>
                <div><strong>Estado:</strong> <span class="estado-tarea estado-${tarea.entregas > 0 ? 'activo' : 'inactivo'}">${tarea.entregas > 0 ? 'ACTIVO' : 'INACTIVO'}</span></div>
            </div>
            
            <p class="tarea-descripcion">${tarea.descripcion}</p>
            
            <div class="acciones-tarea-profesor">
                <button class="btn-ver-entregas" onclick="verEntregas('${tarea.id}')">📋 Ver Entregas (${tarea.entregas || 0})</button>
                <button class="btn-editar" onclick="editarTarea('${tarea.id}')">✏️ Editar Tarea</button>
                <button class="btn-eliminar" onclick="eliminarTarea('${tarea.id}')">🗑️ Eliminar</button>
                <button class="btn-crear" onclick="duplicarTarea('${tarea.id}')">📋 Duplicar</button>
            </div>
        `;
        contenedor.appendChild(elemento);
    });
}

function editarTarea(idTarea) {
    const tareasGuardadas = localStorage.getItem('tareasProfesor');
    const tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : tareasProfesor;
    const tarea = tareas.find(t => t.id === idTarea);
    
    if (!tarea) return;
    
    const modal = document.getElementById('modal-editar-tarea');
    const contenido = document.getElementById('contenido-edicion');
    
    contenido.innerHTML = `
        <h3>✏️ Editar Tarea: ${tarea.titulo}</h3>
        
        <div class="formulario-edicion">
            <div class="form-group">
                <label for="editar-titulo">Título de la tarea:</label>
                <input type="text" id="editar-titulo" value="${tarea.titulo}" required>
            </div>
            
            <div class="form-group">
                <label for="editar-curso">Curso:</label>
                <select id="editar-curso" required>
                    <option value="JavaScript Básico" ${tarea.curso === 'JavaScript Básico' ? 'selected' : ''}>JavaScript Básico</option>
                    <option value="Python Avanzado" ${tarea.curso === 'Python Avanzado' ? 'selected' : ''}>Python Avanzado</option>
                    <option value="Java Professional" ${tarea.curso === 'Java Professional' ? 'selected' : ''}>Java Professional</option>
                    <option value="C++ Intermedio" ${tarea.curso === 'C++ Intermedio' ? 'selected' : ''}>C++ Intermedio</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="editar-descripcion">Descripción:</label>
                <textarea id="editar-descripcion" required>${tarea.descripcion}</textarea>
            </div>
            
            <div class="form-group">
                <label for="editar-fecha">Fecha límite:</label>
                <input type="date" id="editar-fecha" value="${tarea.fechaLimite}" required>
            </div>
            
            <div class="form-group">
                <label for="editar-puntos">Puntaje máximo:</label>
                <input type="number" id="editar-puntos" value="${tarea.puntos}" min="1" max="1000" required>
            </div>
            
            <div class="form-group">
                <label for="editar-instrucciones">Instrucciones detalladas:</label>
                <textarea id="editar-instrucciones" rows="4">${tarea.instrucciones || ''}</textarea>
            </div>
            
            <div class="form-group">
                <label for="editar-criterios">Criterios de evaluación:</label>
                <textarea id="editar-criterios" rows="4">${tarea.criterios || ''}</textarea>
            </div>
            
            <div class="acciones-formulario">
                <button class="btn-crear" onclick="guardarEdicion('${tarea.id}')">💾 Guardar Cambios</button>
                <button class="btn-cancelar" onclick="cerrarModalEditar()">Cancelar</button>
            </div>
        </div>
    `;
    
    modal.classList.remove('oculto');
}

function guardarEdicion(idTarea) {
    const tareasGuardadas = localStorage.getItem('tareasProfesor');
    const tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : tareasProfesor;
    const index = tareas.findIndex(t => t.id === idTarea);
    
    if (index === -1) return;
    
    const titulo = document.getElementById('editar-titulo').value;
    const curso = document.getElementById('editar-curso').value;
    const descripcion = document.getElementById('editar-descripcion').value;
    const fechaLimite = document.getElementById('editar-fecha').value;
    const puntos = parseInt(document.getElementById('editar-puntos').value);
    const instrucciones = document.getElementById('editar-instrucciones').value;
    const criterios = document.getElementById('editar-criterios').value;
    
    if (!titulo || !curso || !descripcion || !fechaLimite || isNaN(puntos)) {
        alert('⚠️ Por favor, completa todos los campos obligatorios');
        return;
    }
    
    // Actualizar la tarea
    tareas[index] = {
        ...tareas[index],
        titulo,
        curso,
        descripcion,
        fechaLimite,
        puntos,
        instrucciones,
        criterios
    };
    
    // Guardar en localStorage
    localStorage.setItem('tareasProfesor', JSON.stringify(tareas));
    
    cerrarModalEditar();
    cargarTareasProfesor();
    
    alert('✅ Tarea actualizada correctamente');
}

function eliminarTarea(idTarea) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer.')) {
        return;
    }
    
    const tareasGuardadas = localStorage.getItem('tareasProfesor');
    const tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : tareasProfesor;
    const tareasFiltradas = tareas.filter(t => t.id !== idTarea);
    
    localStorage.setItem('tareasProfesor', JSON.stringify(tareasFiltradas));
    cargarTareasProfesor();
    
    alert('🗑️ Tarea eliminada correctamente');
}

function duplicarTarea(idTarea) {
    const tareasGuardadas = localStorage.getItem('tareasProfesor');
    const tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : tareasProfesor;
    const tareaOriginal = tareas.find(t => t.id === idTarea);
    
    if (!tareaOriginal) return;
    
    const nuevaTarea = {
        ...tareaOriginal,
        id: 'tarea_prof_' + Date.now(),
        titulo: tareaOriginal.titulo + ' (Copia)',
        entregas: 0
    };
    
    tareas.push(nuevaTarea);
    localStorage.setItem('tareasProfesor', JSON.stringify(tareas));
    cargarTareasProfesor();
    
    alert('📋 Tarea duplicada correctamente');
}

function verEntregas(idTarea) {
    alert('🔍 Redirigiendo a la página de entregas...');
    // En una implementación real, redirigiría a la página de entregas específica
}

function cerrarModalEditar() {
    const modal = document.getElementById('modal-editar-tarea');
    if (modal) modal.classList.add('oculto');
}

function formatearFecha(fecha) {
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('lista-tareas-editar')) {
        cargarTareasProfesor();
    }
});