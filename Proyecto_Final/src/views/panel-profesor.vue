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
        <h3>Panel del Profesor</h3>
        <div class="info-usuario-header">
          <div>
            <strong>👤 {{ usuario.nombre }}</strong>
            <div style="font-size: 0.9em; color: #666;">{{ usuario.rol.toUpperCase() }}</div>
          </div>
        </div>
      </div>

      <section class="card">
        <h4>Mis Cursos Asignados</h4>
        <ul>
          <li v-for="curso in cursos" :key="curso.nombre">
            {{ curso.nombre }} – {{ curso.grupo }}
          </li>
        </ul>
      </section>

      <section class="card">
        <h4>Tareas por Revisar</h4>
        <ul>
          <li v-for="tarea in tareasPendientes" :key="tarea.titulo">
            {{ tarea.titulo }} – {{ tarea.entregasPendientes }} entregas pendientes
          </li>
        </ul>
      </section>

      <section class="card">
        <h4>Calificaciones por Asignar</h4>
        <ul>
          <li v-for="calificacion in calificacionesPendientes" :key="calificacion.curso">
            {{ calificacion.curso }}: {{ calificacion.tareasSinNota }} tareas sin nota
          </li>
        </ul>
      </section>

      <section class="card">
        <h4>Mi Perfil</h4>
        <p><strong>Nombre:</strong> {{ usuario.nombre }}</p>
        <p><strong>Correo:</strong> {{ usuario.correo }}</p>
        <p><strong>Rol:</strong> {{ usuario.rol }}</p>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "PanelProfesor",
  data() {
    return {
      usuario: {
        nombre: "Profesor Ejemplo",
        correo: "profesor@example.com",
        rol: "Profesor",
      },
      cursos: [
        { nombre: "JavaScript Básico", grupo: "Grupo A" },
        { nombre: "Python Avanzado", grupo: "Grupo B" },
      ],
      tareasPendientes: [
        { titulo: "Proyecto final de JavaScript", entregasPendientes: 12 },
        { titulo: "Ejercicio de clases en Python", entregasPendientes: 8 },
      ],
      calificacionesPendientes: [
        { curso: "JavaScript Básico", tareasSinNota: 5 },
        { curso: "Python Avanzado", tareasSinNota: 3 },
      ],
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
