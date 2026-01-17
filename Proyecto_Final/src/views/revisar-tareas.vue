<template>
  <div>
    <aside class="sidebar">
      <h1>Profesor</h1>
      <nav>
        <RouterLink to="/perfil-profesor">👤 Perfil</RouterLink>
        <RouterLink to="/cursos-profesor">Cursos Asignados</RouterLink>
        <RouterLink to="/tareas-profesor">Gestionar Tareas</RouterLink>
        <RouterLink to="/calificaciones-profesor">Calificaciones</RouterLink>
      </nav>
    </aside>

    <main class="contenido">
      <div class="header-con-sesion">
        <h3>📝 Revisar Tareas de Estudiantes</h3>
        <div class="info-usuario-header">
          <span>{{ profesor.nombre }}</span>
          <div class="acciones-sesion">
            <button class="btn-sesion-pequeno" @click="cambiarCuenta">🔄 Cambiar</button>
            <button class="btn-sesion-pequeno" @click="cerrarSesion">🚪 Salir</button>
          </div>
        </div>
      </div>

      <!-- Estadísticas rápidas -->
      <div class="estadisticas-tareas">
        <div class="estadistica-card">
          <h4>Tareas Pendientes</h4>
          <div class="numero">{{ estadisticas.pendientes }}</div>
        </div>
        <div class="estadistica-card">
          <h4>Por Revisar</h4>
          <div class="numero">{{ estadisticas.revision }}</div>
        </div>
        <div class="estadistica-card">
          <h4>Revisadas Hoy</h4>
          <div class="numero">{{ estadisticas.revisadasHoy }}</div>
        </div>
        <div class="estadistica-card">
          <h4>Promedio General</h4>
          <div class="numero">{{ estadisticas.promedioGeneral }}</div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="card">
        <h4>🔍 Filtros de Búsqueda</h4>
        <div class="filtros-tareas">
          <div class="filtro-item">
            <label>Curso:</label>
            <select v-model="filtros.curso">
              <option value="">Todos los cursos</option>
              <option value="javascript">JavaScript Básico</option>
              <option value="python">Python Avanzado</option>
              <option value="java">Java Professional</option>
            </select>
          </div>

          <div class="filtro-item">
            <label>Estado:</label>
            <select v-model="filtros.estado">
              <option value="">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="entregado">Entregado</option>
              <option value="revisado">Revisado</option>
            </select>
          </div>

          <div class="filtro-item">
            <label>Fecha:</label>
            <input type="date" v-model="filtros.fecha" />
          </div>

          <button class="btn-crear-tarea" @click="aplicarFiltros">Aplicar Filtros</button>
          <button class="btn-cancelar" @click="limpiarFiltros">Limpiar</button>
        </div>
      </div>

      <!-- Lista de tareas -->
      <div class="card">
        <h4>📋 Tareas Entregadas por Estudiantes</h4>

        <table class="tabla-tareas" v-if="tareasFiltradas.length > 0">
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Curso</th>
              <th>Tarea</th>
              <th>Fecha Entrega</th>
              <th>Estado</th>
              <th>Puntaje</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tarea in tareasFiltradas" :key="tarea.id">
              <td>{{ tarea.estudiante }}</td>
              <td>{{ tarea.curso }}</td>
              <td>{{ tarea.titulo }}</td>
              <td>{{ tarea.fechaEntrega }}</td>
              <td>{{ tarea.estado }}</td>
              <td>{{ tarea.puntaje || '-' }}</td>
              <td>
                <button @click="abrirModal(tarea)">👁️ Revisar</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="mensaje-sin-tareas">
          <h4>🎉 No hay tareas pendientes</h4>
          <p>Todas las tareas han sido revisadas.</p>
        </div>
      </div>
    </main>

    <!-- Modal -->
    <div v-if="mostrarModal" class="modal">
      <div class="modal-contenido modal-grande">
        <span class="cerrar" @click="cerrarModal">&times;</span>
        <div class="contenido-revision">
          <h4>Revisando: {{ tareaSeleccionada.titulo }}</h4>
          <p><strong>Estudiante:</strong> {{ tareaSeleccionada.estudiante }}</p>
          <p><strong>Curso:</strong> {{ tareaSeleccionada.curso }}</p>
          <textarea v-model="tareaSeleccionada.comentarios" placeholder="Escribe tus comentarios..."></textarea>
          <input type="number" v-model="tareaSeleccionada.puntaje" placeholder="Asignar puntaje" />
          <button @click="guardarRevision">💾 Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RevisarTareasProfesor",
  data() {
    return {
      profesor: { nombre: "Profesor Ejemplo" },
      estadisticas: {
        pendientes: 2,
        revision: 2,
        revisadasHoy: 1,
        promedioGeneral: 8.5,
      },
      filtros: { curso: "", estado: "", fecha: "" },
      tareas: [
        {
          id: 1,
          estudiante: "Eli",
          curso: "JavaScript Básico",
          titulo: "Proyecto final",
          fechaEntrega: "2026-01-15",
          estado: "entregado",
          puntaje: null,
          comentarios: "",
        },
        {
          id: 2,
          estudiante: "Ana",
          curso: "Python Avanzado",
          titulo: "Ejercicio de clases",
          fechaEntrega: "2026-01-14",
          estado: "pendiente",
          puntaje: null,
          comentarios: "",
        },
      ],
      mostrarModal: false,
      tareaSeleccionada: {},
    };
  },
  computed: {
    tareasFiltradas() {
      return this.tareas.filter((t) => {
        const cursoOk = this.filtros.curso ? t.curso.toLowerCase().includes(this.filtros.curso) : true;
        const estadoOk = this.filtros.estado ? t.estado === this.filtros.estado : true;
        const fechaOk = this.filtros.fecha ? t.fechaEntrega === this.filtros.fecha : true;
        return cursoOk && estadoOk && fechaOk;
      });
    },
  },
  methods: {
    cambiarCuenta() {
      console.log("Cambiar cuenta");
    },
    cerrarSesion() {
      console.log("Cerrar sesión");
    },
    aplicarFiltros() {
      console.log("Filtros aplicados:", this.filtros);
    },
    limpiarFiltros() {
      this.filtros = { curso: "", estado: "", fecha: "" };
    },
    abrirModal(tarea) {
      this.tareaSeleccionada = { ...tarea };
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
    },
    guardarRevision() {
      console.log("Revisión guardada:", this.tareaSeleccionada);
      this.cerrarModal();
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/panel.css";
@import "@/assets/css/estilos-revisar-tareas.css";
</style>
