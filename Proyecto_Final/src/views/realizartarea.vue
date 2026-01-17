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
      <h3>Realizar Tarea: Ejercicio de clases en Python</h3>

      <div class="card">
        <h4>📋 Descripción de la Tarea</h4>
        <p><strong>Fecha límite:</strong> {{ tarea.fecha }}</p>
        <p><strong>Curso:</strong> {{ tarea.curso }}</p>
        <p><strong>Instrucciones:</strong> {{ tarea.instrucciones }}</p>

        <div class="requisitos">
          <h5>📝 Requisitos Técnicos:</h5>
          <ul>
            <li v-for="req in tarea.requisitos" :key="req">✅ {{ req }}</li>
          </ul>
        </div>

        <div class="ejemplo-codigo">
          <h5>💡 Ejemplo de Estructura:</h5>
          <pre><code>{{ tarea.ejemplo }}</code></pre>
        </div>
      </div>

      <div class="card">
        <h4>🧪 Casos de Prueba</h4>
        <p>Tu programa debe poder manejar estos escenarios:</p>
        <ul>
          <li v-for="caso in tarea.casosPrueba" :key="caso">{{ caso }}</li>
        </ul>
      </div>

      <div class="card">
        <h4>📤 Entregar Tarea</h4>
        <form @submit.prevent="entregarTarea">
          <label for="archivo-python">Subir archivo de código (.py):</label>
          <input type="file" id="archivo-python" accept=".py,.txt,.zip" @change="subirArchivo" required>

          <label for="enlace-repositorio">Enlace a repositorio (GitHub/GitLab):</label>
          <input type="url" id="enlace-repositorio" v-model="entrega.repositorio" placeholder="https://github.com/tuusuario/proyecto-python">

          <label for="descripcion-implementacion">Explicación de tu implementación:</label>
          <textarea id="descripcion-implementacion" v-model="entrega.descripcion" rows="5"></textarea>

          <label for="dificultades">¿Qué dificultades encontraste?</label>
          <textarea id="dificultades" v-model="entrega.dificultades" rows="3"></textarea>

          <div class="acciones-entrega">
            <button type="submit" class="btn-entregar">🚀 Entregar Tarea Python</button>
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
  name: "RealizarTareaPython",
  data() {
    return {
      tarea: {
        fecha: "2 de noviembre",
        curso: "Python Avanzado",
        instrucciones: "Crea un sistema de gestión de vehículos usando Programación Orientada a Objetos en Python.",
        requisitos: [
          "Clase base Vehiculo con atributos comunes",
          "Clases derivadas Automovil y Motocicleta",
          "Herencia y polimorfismo",
          "Métodos específicos para cada tipo de vehículo",
          "Validación de datos en propiedades",
          "Método __str__ para representación",
        ],
        ejemplo: `class Vehiculo:
    def __init__(self, marca, modelo, año):
        self.marca = marca
        self.modelo = modelo
        self.año = año
    
    def mostrar_info(self):
        return f"{self.marca} {self.modelo} ({self.año})"

class Automovil(Vehiculo):
    def __init__(self, marca, modelo, año, puertas):
        super().__init__(marca, modelo, año)
        self.puertas = puertas`,
        casosPrueba: [
          "Crear automóvil: Toyota Corolla 2023, 4 puertas",
          "Crear motocicleta: Honda CBR 2024, cilindrada 600cc",
          "Mostrar información de cada vehículo",
          "Calcular costo de mantenimiento según tipo",
        ],
      },
      entrega: {
        archivo: null,
        repositorio: "",
        descripcion: "",
        dificultades: "",
      },
    };
  },
  methods: {
    subirArchivo(event) {
      this.entrega.archivo = event.target.files[0];
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
      this.entrega = { archivo: null, repositorio: "", descripcion: "", dificultades: "" };
      alert("❌ Entrega cancelada");
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/panel.css";
@import "@/assets/css/estilos-tareas.css";
</style>
