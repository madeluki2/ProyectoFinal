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

      <!-- Información del usuario y controles de sesión -->
      <div class="user-info">
        <div class="user-details">
          <div class="user-name">👤 {{ usuario.nombre }}</div>
          <div class="user-email">{{ usuario.correo }}</div>
          <div class="user-role">{{ usuario.rol.toUpperCase() }}</div>
        </div>
        <div class="user-actions">
          <button class="btn-cambiar-cuenta" @click="cambiarCuenta">🔄 Cambiar Cuenta</button>
          <button class="btn-cerrar-sesion" @click="cerrarSesion">🚪 Cerrar Sesión</button>
        </div>
      </div>
    </aside>

    <main class="contenido">
      <div class="header-con-sesion">
        <h3>Panel del Estudiante</h3>
        <div class="info-usuario-header">
          <div>
            <strong>👤 {{ usuario.nombre }}</strong>
            <div style="font-size: 0.9em; color: #666;">{{ usuario.rol.toUpperCase() }}</div>
          </div>
        </div>
      </div>

      <section class="card">
        <h4>Mis Cursos</h4>
        <ul>
          <li v-for="curso in cursos" :key="curso.nombre">
            {{ curso.nombre }} – {{ curso.horario }}
          </li>
        </ul>
      </section>

      <section class="card">
        <h4>Tareas Pendientes</h4>
        <ul>
          <li v-for="tarea in tareas" :key="tarea.titulo">
            {{ tarea.titulo }} – Entrega: {{ tarea.fecha }}
          </li>
        </ul>
      </section>

      <section class="card">
        <h4>Calificaciones</h4>
        <ul>
          <li v-for="calificacion in calificaciones" :key="calificacion.curso">
            {{ calificacion.curso }}: {{ calificacion.nota }}
          </li>
        </ul>
      </section>

      <section class="card">
        <h4>Mi Perfil</h4>
        <p><strong>Nombre:</strong> {{ usuario.nombre }}</p>
        <p><strong>Correo:</strong> {{ usuario.correo }}</p>
        <p><strong>Rol:</strong> {{ usuario.rol }}</p>
      </section>

      <p><strong>Curso seleccionado:</strong> {{ cursoSeleccionado || "—" }}</p>
    </main>
  </div>
</template>

<script>
export default {
  name: "PanelEstudiante",
  data() {
    return {
      usuario: {
        nombre: "Eli",
        correo: "eli@example.com",
        rol: "Estudiante",
      },
      cursos: [
        { nombre: "JavaScript Básico", horario: "Lunes y Miércoles 10:00–11:30" },
        { nombre: "Python Avanzado", horario: "Martes y Jueves 14:00–15:30" },
      ],
      tareas: [
        { titulo: "Proyecto final de JavaScript", fecha: "30 de octubre" },
        { titulo: "Ejercicio de clases en Python", fecha: "2 de noviembre" },
      ],
      calificaciones: [
        { curso: "JavaScript Básico", nota: 9.2 },
        { curso: "Python Avanzado", nota: 8.5 },
      ],
      cursoSeleccionado: null,
    };
  },
  methods: {
  cambiarCuenta() {
    // Borrar sesión
    localStorage.removeItem("auth");
    localStorage.removeItem("usuario"); // opcional si lo usas

    // Redirigir al login
    this.$router.push("/");
  },

  cerrarSesion() {
    // Borrar todo rastro de sesión
    localStorage.clear();

    // Redirigir al login
    this.$router.push("/");
  },
},

};
</script>

<style scoped>
@import "@/assets/css/panel.css";
</style>
