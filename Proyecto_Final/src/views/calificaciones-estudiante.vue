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
      <h3>Calificaciones</h3>

      <!-- Curso JavaScript -->
      <section class="card curso-item" @click="toggleDetalle('js')">
        <h4>
          JavaScript Básico
          <span style="float:inline-end; color: var(--color-primario);">9.2</span>
        </h4>
        <div v-show="detallesVisibles.js" class="calificaciones-detalle subcard">
          <ul>
            <li><strong>P1 - Actuación:</strong> 9.0</li>
            <li><strong>P1 - Producción:</strong> 9.3</li>
            <li><strong>P2 - Evaluación Final:</strong> 9.2</li>
          </ul>
        </div>
      </section>

      <!-- Curso Python -->
      <section class="card curso-item" @click="toggleDetalle('py')">
        <h4>
          Python Avanzado
          <span style="float:inline-end; color: var(--color-primario);">8.5</span>
        </h4>
        <div v-show="detallesVisibles.py" class="calificaciones-detalle subcard">
          <ul>
            <li><strong>P1 - Actuación:</strong> 8.4</li>
            <li><strong>P1 - Producción:</strong> 8.6</li>
            <li><strong>P2 - Evaluación Final:</strong> 8.5</li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "Calificaciones",
  data() {
    return {
      detallesVisibles: {
        js: false,
        py: false,
      },
    };
  },
  methods: {
    toggleDetalle(curso) {
      this.detallesVisibles[curso] = !this.detallesVisibles[curso];
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/panel.css";
</style>
