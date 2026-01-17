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
        <h3>✏️ Editar y Gestionar Tareas</h3>
        <div class="info-usuario-header">
          <span>{{ nombreProfesor }}</span>
          <div class="acciones-sesion">
            <button class="btn-sesion-pequeno" @click="cambiarCuenta">🔄 Cambiar</button>
            <button class="btn-sesion-pequeno" @click="cerrarSesion">🚪 Salir</button>
          </div>
        </div>
      </div>

      <!-- Lista de tareas creadas -->
      <div class="card">
        <h4>📝 Mis Tareas Creadas</h4>

        <div class="lista-tareas-editar">
          <div
            v-for="tarea in tareas"
            :key="tarea.id"
            class="tarea-item"
          >
            <h5>{{ tarea.titulo }}</h5>
            <p>{{ tarea.descripcion }}</p>
            <button class="btn-editar" @click="abrirModal(tarea)">✏️ Editar</button>
          </div>
        </div>

        <div v-if="tareas.length === 0" class="mensaje-sin-tareas">
          <h4>📚 No hay tareas creadas</h4>
          <p>Crea tu primera tarea para comenzar.</p>
          <RouterLink to="/tareas-profesor" class="btn-crear-tarea">
            ➕ Crear Primera Tarea
          </RouterLink>
        </div>
      </div>
    </main>

    <!-- Modal para editar tarea -->
    <div v-if="mostrarModal" class="modal">
      <div class="modal-contenido modal-grande">
        <span class="cerrar" @click="cerrarModal">&times;</span>
        <div class="contenido-edicion">
          <h4>Editando: {{ tareaSeleccionada.titulo }}</h4>
          <textarea v-model="tareaSeleccionada.descripcion"></textarea>
          <button class="btn-guardar" @click="guardarCambios">💾 Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditarTareasProfesor",
  data() {
    return {
      nombreProfesor: "Nombre del Profesor",
      tareas: [
        { id: 1, titulo: "Tarea 1", descripcion: "Descripción de la tarea 1" },
        { id: 2, titulo: "Tarea 2", descripcion: "Descripción de la tarea 2" },
      ],
      mostrarModal: false,
      tareaSeleccionada: {},
    };
  },
  methods: {
    cambiarCuenta() {
      // lógica para cambiar cuenta
      console.log("Cambiar cuenta");
    },
    cerrarSesion() {
      // lógica para cerrar sesión
      console.log("Cerrar sesión");
    },
    abrirModal(tarea) {
      this.tareaSeleccionada = { ...tarea };
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
    },
    guardarCambios() {
      // lógica para guardar cambios en la tarea
      console.log("Guardando cambios:", this.tareaSeleccionada);
      this.cerrarModal();
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/panel.css";
@import "@/assets/css/estilos-editar-tareas.css";
</style>
