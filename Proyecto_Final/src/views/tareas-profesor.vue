<template>
  <div>
    <aside class="sidebar">
      <h1>Profesor</h1>
      <nav>
        <RouterLink to="/perfil-profesor">👤 Perfil</RouterLink>
        <RouterLink to="/cursos-profesor">Cursos Asignados</RouterLink>
        <RouterLink to="/tareas-profesor" class="active">Gestionar Tareas</RouterLink>
        <RouterLink to="/calificaciones-profesor">Calificaciones</RouterLink>
      </nav>
    </aside>

    <main class="contenido">
      <div class="header-tareas">
        <h3>Gestión de Tareas</h3>
        <button class="btn-crear-tarea" @click="mostrarModalCrearTarea">➕ Crear Nueva Tarea</button>
      </div>

      <!-- Estadísticas -->
      <div class="estadisticas-tareas">
        <div class="estadistica-card">
          <h4>📚 Total Tareas</h4>
          <span class="numero">{{ estadisticas.total }}</span>
        </div>
        <div class="estadistica-card">
          <h4>⏰ Activas</h4>
          <span class="numero">{{ estadisticas.activas }}</span>
        </div>
        <div class="estadistica-card">
          <h4>📤 Entregas Pendientes</h4>
          <span class="numero">{{ estadisticas.pendientes }}</span>
        </div>
        <div class="estadistica-card">
          <h4>✅ Revisadas</h4>
          <span class="numero">{{ estadisticas.revisadas }}</span>
        </div>
      </div>

      <!-- Lista de Tareas -->
      <div class="card">
        <h4>📋 Mis Tareas Creadas</h4>
        <div v-if="tareas.length > 0">
          <ul>
            <li v-for="t in tareas" :key="t.id">
              <strong>{{ t.titulo }}</strong> – {{ t.curso }} – Fecha límite: {{ t.fecha }}
            </li>
          </ul>
        </div>
        <div v-else class="mensaje-sin-tareas">
          <p>📝 Aún no has creado ninguna tarea.</p>
          <p>¡Usa el botón "Crear Nueva Tarea" para comenzar!</p>
        </div>
      </div>

      <!-- Tareas Pendientes de Revisión -->
      <div class="card">
        <h4>📝 Tareas para Revisar</h4>
        <div v-if="entregasPendientes.length > 0">
          <ul>
            <li v-for="e in entregasPendientes" :key="e.id">
              {{ e.estudiante }} – {{ e.titulo }} – Estado: {{ e.estado }}
            </li>
          </ul>
        </div>
        <div v-else class="mensaje-sin-entregas">
          <p>🎉 No hay entregas pendientes de revisión.</p>
          <button class="btn-ver-entregas-grande" @click="irARevisarTareas">Ir a Revisar Tareas</button>
        </div>
      </div>
    </main>

    <!-- Modal Crear Tarea -->
    <div v-if="mostrarModal" class="modal">
      <div class="modal-contenido modal-grande">
        <span class="cerrar" @click="cerrarModalCrearTarea">&times;</span>
        <h3>➕ Crear Nueva Tarea</h3>

        <form @submit.prevent="crearTarea">
          <div class="form-group">
            <label for="titulo-tarea">Título de la Tarea:</label>
            <input type="text" v-model="nuevaTarea.titulo" required />
          </div>

          <div class="form-group">
            <label for="curso-tarea">Curso:</label>
            <select v-model="nuevaTarea.curso" required>
              <option value="">Seleccionar curso</option>
              <option value="JavaScript Básico">JavaScript Básico</option>
              <option value="Python Avanzado">Python Avanzado</option>
              <option value="C++ Intermedio">C++ Intermedio</option>
              <option value="Java Professional">Java Professional</option>
              <option value="SQL para BD">SQL para BD</option>
            </select>
          </div>

          <div class="form-group">
            <label for="fecha-limite">Fecha Límite:</label>
            <input type="date" v-model="nuevaTarea.fecha" required />
          </div>

          <div class="form-group">
            <label for="descripcion-tarea">Descripción Detallada:</label>
            <textarea v-model="nuevaTarea.descripcion" rows="4" required></textarea>
          </div>

          <div class="form-group">
            <label for="requisitos-tarea">Requisitos Técnicos:</label>
            <textarea v-model="nuevaTarea.requisitos" rows="3"></textarea>
          </div>

          <div class="form-group">
            <label for="tipo-entrega">Tipo de Entrega:</label>
            <select v-model="nuevaTarea.tipoEntrega">
              <option value="archivo">Subir archivo</option>
              <option value="enlace">Enlace externo</option>
              <option value="texto">Texto/Descripción</option>
              <option value="mixto">Mixto</option>
            </select>
          </div>

          <div class="form-group">
            <label for="puntaje-maximo">Puntaje Máximo:</label>
            <input type="number" v-model="nuevaTarea.puntajeMaximo" min="1" max="100" required />
          </div>

          <div class="acciones-formulario">
            <button type="submit" class="btn-crear">🚀 Crear Tarea</button>
            <button type="button" class="btn-cancelar" @click="cerrarModalCrearTarea">❌ Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GestionTareasProfesor",
  data() {
    return {
      estadisticas: { total: 0, activas: 0, pendientes: 0, revisadas: 0 },
      tareas: [],
      entregasPendientes: [],
      mostrarModal: false,
      nuevaTarea: {
        titulo: "",
        curso: "",
        fecha: "",
        descripcion: "",
        requisitos: "",
        tipoEntrega: "archivo",
        puntajeMaximo: 100,
      },
    };
  },
  methods: {
    mostrarModalCrearTarea() {
      this.mostrarModal = true;
    },
    cerrarModalCrearTarea() {
      this.mostrarModal = false;
    },
    crearTarea() {
      const nueva = { ...this.nuevaTarea, id: Date.now() };
      this.tareas.push(nueva);
      this.estadisticas.total++;
      this.estadisticas.activas++;
      this.cerrarModalCrearTarea();
      alert("🚀 Tarea creada con éxito");
    },
    irARevisarTareas() {
      this.$router.push("/revisar-tareas");
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/panel.css";
@import "@/assets/css/estilos-tareas-profesor.css";
</style>
