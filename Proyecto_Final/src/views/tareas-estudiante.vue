<template>
  <div>
    <aside class="sidebar">
      <h1>Estudiante</h1>
      <nav>
        <RouterLink to="/perfil-estudiante">👤 Perfil</RouterLink>
        <RouterLink to="/cursos-estudiante">Mis Cursos</RouterLink>
        <RouterLink to="/tareas-estudiante">Tareas</RouterLink>
        <RouterLink to="/calificaciones-estudiante">Calificaciones</RouterLink>
      </nav>
    </aside>

    <main class="contenido">
      <h3>Tareas Pendientes</h3>

      <!-- TAREAS DEL SISTEMA (dinámicas) -->
      <div v-if="tareasSistema.length > 0">
        <div
          v-for="tarea in tareasSistema"
          :key="tarea.id"
          class="card tarea-card"
        >
          <h4>{{ tarea.titulo }}</h4>
          <p class="fecha-limite">📅 Fecha límite: {{ tarea.fecha }}</p>
          <p class="descripcion-tarea">{{ tarea.descripcion }}</p>
          <div class="acciones-tarea">
            <button class="btn-realizar" @click="realizarTarea(tarea.id)">✅ Realizar Tarea</button>
            <button class="btn-rechazar" @click="rechazarTarea(tarea.id)">❌ Rechazar</button>
          </div>
        </div>
      </div>

      <!-- TAREAS FIJAS -->
      <div v-for="tarea in tareasFijas" :key="tarea.id" class="card tarea-card">
        <h4>{{ tarea.titulo }}</h4>
        <p class="fecha-limite">📅 Fecha límite: {{ tarea.fecha }}</p>
        <p class="descripcion-tarea">{{ tarea.descripcion }}</p>
        <div class="acciones-tarea">
          <button class="btn-realizar" @click="realizarTarea(tarea.id)">✅ Realizar Tarea</button>
          <button class="btn-rechazar" @click="rechazarTarea(tarea.id)">❌ Rechazar</button>
        </div>
      </div>

      <!-- Mensaje cuando no hay tareas -->
      <div v-if="tareasPendientes.length === 0" class="card mensaje-sin-tareas">
        <h4>🎉 No tienes tareas pendientes</h4>
        <p>Todas las tareas han sido completadas o rechazadas.</p>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "TareasEstudiante",
  data() {
    return {
      tareasSistema: [
        // Aquí se pueden cargar dinámicamente desde un backend
        // { id: "sys1", titulo: "Nueva tarea", fecha: "2026-01-20", descripcion: "Descripción..." }
      ],
      tareasFijas: [
        {
          id: "js",
          titulo: "Proyecto final de JavaScript",
          fecha: "30 de octubre",
          descripcion: "Desarrolla una aplicación interactiva completando todos los criterios del curso.",
        },
        {
          id: "python",
          titulo: "Ejercicio de clases en Python",
          fecha: "2 de noviembre",
          descripcion: "Escribe un programa en Python que utilice clases y herencia para resolver un problema.",
        },
      ],
      completadas: [],
      rechazadas: [],
    };
  },
  computed: {
    tareasPendientes() {
      return [...this.tareasSistema, ...this.tareasFijas].filter(
        (t) => !this.completadas.includes(t.id) && !this.rechazadas.includes(t.id)
      );
    },
  },
  methods: {
    realizarTarea(id) {
      this.completadas.push(id);
      alert(`✅ Tarea ${id} realizada`);
    },
    rechazarTarea(id) {
      this.rechazadas.push(id);
      alert(`❌ Tarea ${id} rechazada`);
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/panel.css";
</style>
