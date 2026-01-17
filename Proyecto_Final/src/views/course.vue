<template>
  <div>
    <h2>Listado de Cursos</h2>
    <div class="tarjetas">
      <div 
        v-for="curso in cursos" 
        :key="curso.id" 
        class="tarjeta"
      >
        <RouterLink :to="`/detalle?curso=${curso.id}`">
          {{ curso.nombre }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListadoCursos",
  data() {
    return {
      cursos: [
        { id: "javascript", nombre: "JavaScript Básico" },
        { id: "python", nombre: "Python Avanzado" },
        { id: "cpp", nombre: "C++ Intermedio" },
        { id: "java", nombre: "Java Profesional" },
        { id: "sql", nombre: "SQL para Bases de Datos" },
      ],
    };
  },
};
</script>

<style scoped>
@import "@/assets/css/styles.css";
</style>
