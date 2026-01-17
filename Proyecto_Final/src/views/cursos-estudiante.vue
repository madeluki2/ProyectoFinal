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
      <h3>Mis Cursos</h3>
      <div class="grid-cursos">
        <!-- Cursos existentes -->
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

        <!-- Cursos recomendados -->
        <div
          v-for="curso in cursosRecomendados"
          :key="curso.nombre"
          class="curso-card curso-recomendado"
        >
          <div class="curso-logo">{{ curso.logo }}</div>
          <div class="curso-info">
            <h4>{{ curso.nombre }}</h4>
            <div class="curso-extra-info">
              <p><strong>Nivel:</strong> {{ curso.nivel }}</p>
            </div>
            <div class="estado-inscripcion">
              <button
                class="inscribirse-btn"
                @click="inscribir(curso)"
                v-if="!curso.inscrito"
              >
                Inscribirse
              </button>
              <span v-else class="texto-inscrito">Inscrito ✓</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal de confirmación -->
    <div v-if="mostrarModal" class="modal">
      <div class="modal-contenido">
        <span class="cerrar" @click="cerrarModal">&times;</span>
        <div class="confirmacion-inscripcion">
          <div class="icono-confirmacion">✅</div>
          <h3>¡Inscripción Exitosa!</h3>
          <p>Te has inscrito correctamente en el curso:</p>
          <p class="curso-nombre"><strong>{{ cursoSeleccionado.nombre }}</strong></p>
          <div class="detalles-curso">
            <p><strong>Nivel:</strong> {{ cursoSeleccionado.nivel }}</p>
            <p><strong>Duración:</strong> {{ cursoSeleccionado.duracion }}</p>
            <p><strong>Acceso:</strong> {{ cursoSeleccionado.acceso }}</p>
          </div>
          <button class="boton-primario">Ir al Curso</button>
          <button class="boton-secundario" @click="cerrarModal">Seguir Explorando</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MisCursos",
  data() {
    return {
      cursos: [
        { logo: "J5", nombre: "JavaScript Básico", progreso: 34, tareas: 7, tiempo: "27 min" },
        { logo: "Py", nombre: "Python Avanzado", progreso: 8, tareas: 2, tiempo: "11 min" },
        { logo: "C++", nombre: "C++ Intermedio", progreso: 40, tareas: 5, tiempo: "20 min" },
        { logo: "SQL", nombre: "SQL para BD", progreso: 70, tareas: 10, tiempo: "1 hora" },
      ],
      cursosRecomendados: [
        {
          logo: "Jv",
          nombre: "Java Professional",
          nivel: "Principiante",
          duracion: "35 minutos",
          acceso: "Inmediato",
          inscrito: false,
        },
        {
          logo: "Jv",
          nombre: "PHP",
          nivel: "Principiante",
          duracion: "30 minutos",
          acceso: "Inmediato",
          inscrito: false,
        },
      ],
      mostrarModal: false,
      cursoSeleccionado: {},
    };
  },
  methods: {
    inscribir(curso) {
      curso.inscrito = true;
      this.cursoSeleccionado = curso;
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/panel.css";
</style>
