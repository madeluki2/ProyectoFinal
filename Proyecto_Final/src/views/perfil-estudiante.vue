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
      <h3>Mi Perfil</h3>
      <div class="card perfil-card">
        <p><strong>Nombre:</strong> {{ usuario.nombre }}</p>
        <p><strong>Correo:</strong> {{ usuario.correo }}</p>
        <p><strong>Rol:</strong> {{ usuario.rol }}</p>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "PerfilEstudiante",
  data() {
    return {
      usuario: {
        nombre: "Eli",
        correo: "eli@example.com",
        rol: "Estudiante",
      },
    };
  },
};
</script>

<style scoped>
@import "@/assets/css/panel.css";
</style>
