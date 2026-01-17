<template>
  <div class="detalle">
    <h2>Detalle del Curso</h2>
    <p id="infoCurso">
      {{ curso.descripcion }}
    </p>
    <button class="boton-inscribir" @click="inscribirme">
      Inscribirme
    </button>
  </div>
</template>

<script>
export default {
  name: "DetalleCurso",
  data() {
    return {
      curso: {
        nombre: "JavaScript Básico",
        descripcion: "Curso de JavaScript Básico: Aprende desde cero.",
      },
    };
  },
  methods: {
    inscribirme() {
      // Aquí puedes redirigir al login o manejar la inscripción
      // Ejemplo con Vue Router:
      this.$router.push({ path: "/login", query: { curso: this.curso.nombre } });
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/styles.css";
@import "@/assets/css/estilos-detalle.css";
</style>
