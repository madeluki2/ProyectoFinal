<template>
  <div>
    <header>
      <h1>Bienvenido a Capacitación de cursos en línea de Lenguajes de Programación</h1>
      <nav>
        <RouterLink to="/login">Iniciar sesión</RouterLink>
        <RouterLink to="/registro">Registrarse</RouterLink>
        <RouterLink to="/course">Cursos</RouterLink>
      </nav>
    </header>

    <main>
      <div class="contenedor-cursos">
        <div v-for="curso in cursos" :key="curso.nombre" class="curso">
          <h3>{{ curso.nombre }}</h3>
          <p>Inicio: {{ curso.inicio }}</p>
          <p>Nivel: {{ curso.nivel }}</p>
          <RouterLink to="/login" class="inscribirse-btn">Inscribirse</RouterLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Inicio",
  data() {
    return {
      cursos: [
        { nombre: "Curso de Python Avanzado", inicio: "30 de octubre", nivel: "Principiante" },
        { nombre: "Curso C++ Intermedio", inicio: "1 de noviembre", nivel: "Principiante" },
        { nombre: "Curso de JavaScript Básico", inicio: "3 de noviembre", nivel: "Intermedio" },
        { nombre: "Curso de Java Professional", inicio: "20 de noviembre", nivel: "Intermedio" },
        { nombre: "Curso de SQL para Bases de Datos", inicio: "3 de diciembre", nivel: "Intermedio" },
      ],
    };
  },
};
</script>

<style scoped>
@import "@/assets/css/styles.css";
</style>
