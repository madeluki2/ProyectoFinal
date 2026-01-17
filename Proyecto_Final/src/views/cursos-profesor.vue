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
      <h3>Mis Cursos</h3>
      <div class="grid-cursos">
        <div v-for="curso in cursos" :key="curso.nombre" class="curso-card">
          <div class="curso-logo">{{ curso.logo }}</div>
          <div class="curso-info">
            <h4>{{ curso.nombre }}</h4>
            <div class="progreso">
              <div class="progreso-barra" :style="{ inlineSize: curso.progreso + '%' }"></div>
            </div>
            <div class="curso-detalles">
              {{ curso.progreso }}% completado • {{ curso.tareas }} tareas • {{ curso.tiempo }}
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "MisCursosProfesor",
  data() {
    return {
      cursos: [
        { logo: "JS", nombre: "JavaScript Básico", progreso: 34, tareas: 7, tiempo: "27 min" },
        { logo: "Py", nombre: "Python Avanzado", progreso: 8, tareas: 2, tiempo: "11 min" },
        { logo: "C++", nombre: "C++ Intermedio", progreso: 0, tareas: 0, tiempo: "0 min" },
        { logo: "SQL", nombre: "SQL para BD", progreso: 0, tareas: 0, tiempo: "0 min" },
      ],
    };
  },
};
</script>

<style scoped>
@import "@/assets/css/panel.css";
</style>
