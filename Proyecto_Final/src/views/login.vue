<template>
  <div class="login-box">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="login">
      <label for="usuario">Usuario o Correo electrónico:</label>
      <input
        type="text"
        id="usuario"
        v-model="usuario"
        required
        placeholder="usuario o ejemplo@gmail.com"
      />
      <div v-if="errorUsuario" class="mensaje-error">{{ errorUsuario }}</div>

      <label for="clave">Contraseña:</label>
      <input
        type="password"
        id="clave"
        v-model="clave"
        required
        placeholder="Mínimo 10 caracteres"
        @input="evaluarSeguridad"
      />
      <div v-if="errorClave" class="mensaje-error">{{ errorClave }}</div>

      <!-- Indicador de seguridad de contraseña -->
      <div class="seguridad-contraseña">
        <div class="nivel-seguridad">
          <div
            class="barra-seguridad"
            :style="{ width: nivelSeguridad + '%' }"
          ></div>
        </div>
        <span>Seguridad: {{ textoSeguridad }}</span>
      </div>

      <label for="rol">Rol:</label>
      <select id="rol" v-model="rol" required>
        <option value="">Selecciona tu rol</option>
        <option value="estudiante">Estudiante</option>
        <option value="profesor">Profesor</option>
      </select>
      <div v-if="errorRol" class="mensaje-error">{{ errorRol }}</div>

      <button type="submit">Entrar</button>
    </form>

    <div class="mensaje">
      ¿No tienes cuenta?
      <RouterLink to="/registro">Regístrate aquí</RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      usuario: "",
      clave: "",
      rol: "",
      errorUsuario: "",
      errorClave: "",
      errorRol: "",
      nivelSeguridad: 0,
      textoSeguridad: "Muy débil",
    };
  },
  methods: {
    evaluarSeguridad() {
      const length = this.clave.length;
      if (length < 6) {
        this.nivelSeguridad = 20;
        this.textoSeguridad = "Muy débil";
      } else if (length < 10) {
        this.nivelSeguridad = 50;
        this.textoSeguridad = "Débil";
      } else if (/[A-Z]/.test(this.clave) && /\d/.test(this.clave)) {
        this.nivelSeguridad = 80;
        this.textoSeguridad = "Fuerte";
      } else {
        this.nivelSeguridad = 100;
        this.textoSeguridad = "Muy fuerte";
      }
    },
    login() {
  this.errorUsuario = this.usuario ? "" : "El usuario es obligatorio";
  this.errorClave =
    this.clave.length >= 10
      ? ""
      : "La contraseña debe tener al menos 10 caracteres";
  this.errorRol = this.rol ? "" : "Debes seleccionar un rol";

  if (!this.errorUsuario && !this.errorClave && !this.errorRol) {

    // ✅ GUARDAR SESIÓN CORRECTAMENTE
    localStorage.setItem("auth", "true");
    localStorage.setItem("rol", this.rol);
    localStorage.setItem("usuario", this.usuario);

    // ✅ REDIRECCIÓN SEGÚN ROL
    if (this.rol === "estudiante") {
      this.$router.push("/panel-estudiante");
    } else if (this.rol === "profesor") {
      this.$router.push("/panel-profesor");
    }
  }
}

  },
};
</script>

<style scoped>
@import "@/assets/css/estilos-tareas.css";
</style>
