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
      <h3>Realizar Tarea: Proyecto final de JavaScript</h3>

      <div class="card">
        <h4>📋 Descripción de la Tarea</h4>
        <p><strong>Fecha límite:</strong> {{ tarea.fecha }}</p>
        <p><strong>Curso:</strong> {{ tarea.curso }}</p>
        <p><strong>Instrucciones:</strong> {{ tarea.instrucciones }}</p>

        <div class="requisitos">
          <h5>📝 Requisitos:</h5>
          <ul>
            <li v-for="req in tarea.requisitos" :key="req">✅ {{ req }}</li>
          </ul>
        </div>
      </div>

      <div class="card">
        <h4>📤 Entregar Tarea</h4>
        <form @submit.prevent="entregarTarea">
          <label for="archivo-js">Subir archivos (.js, .html, .zip):</label>
          <input
            type="file"
            id="archivo-js"
            accept=".js,.html,.css,.zip,.rar"
            multiple
            @change="subirArchivos"
            required
          />

          <label for="enlace-proyecto">Enlace al proyecto (opcional):</label>
          <input
            type="url"
            id="enlace-proyecto"
            v-model="entrega.enlace"
            placeholder="https://tu-proyecto.com"
          />

          <label for="descripcion-solucion">Explicación de tu solución:</label>
          <textarea
            id="descripcion-solucion"
            rows="4"
            v-model="entrega.descripcion"
            placeholder="Describe cómo implementaste la funcionalidad..."
          ></textarea>

          <div class="acciones-entrega">
            <button type="submit" class="btn-entregar">🚀 Entregar Tarea</button>
            <button type="button" class="btn-guardar" @click="guardarBorrador">💾 Guardar Borrador</button>
            <button type="button" class="btn-cancelar" @click="cancelarEntrega">❌ Cancelar</button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "RealizarTareaJS",
  data() {
    return {
      tarea: {
        fecha: "30 de octubre",
        curso: "JavaScript Básico",
        instrucciones: "Desarrolla una aplicación interactiva usando JavaScript puro.",
        requisitos: [
          "Manipulación del DOM",
          "Eventos y listeners",
          "Almacenamiento local",
          "Funciones y lógica de programación",
          "Interfaz responsive",
        ],
      },
      entrega: {
        archivos: [],
        enlace: "",
        descripcion: "",
      },
    };
  },
  methods: {
    subirArchivos(event) {
      this.entrega.archivos = Array.from(event.target.files);
    },
    entregarTarea() {
      console.log("Entrega realizada:", this.entrega);
      alert("🚀 Tarea entregada con éxito");
    },
    guardarBorrador() {
      console.log("Borrador guardado:", this.entrega);
      alert("💾 Borrador guardado");
    },
    cancelarEntrega() {
      this.entrega = { archivos: [], enlace: "", descripcion: "" };
      alert("❌ Entrega cancelada");
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/panel.css";
@import "@/assets/css/estilos-tareas.css";
</style>
