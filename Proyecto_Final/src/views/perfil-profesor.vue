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
  name: "PerfilProfesor",
  data() {
    return {
      usuario: {
        nombre: "Profesor Ejemplo",
        correo: "profesor@example.com",
        rol: "Profesor",
      },
    };
  },
};
</script>

<style scoped>
@import "@/assets/css/panel.css";
</style>
