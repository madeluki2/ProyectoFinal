<template>
  <div class="registro-box">
    <h2>Crea tu cuenta</h2>
    <form @submit.prevent="registrar">
      <label for="nombre">Nombre completo:</label>
      <input
        type="text"
        id="nombre"
        v-model="nombre"
        required
        placeholder="Solo letras, máximo 80 caracteres"
        maxlength="80"
      />
      <div v-if="errorNombre" class="mensaje-error">{{ errorNombre }}</div>

      <label for="correo">Correo electrónico:</label>
      <input
        type="email"
        id="correo"
        v-model="correo"
        required
        placeholder="ejemplo@gmail.com"
      />
      <div v-if="errorCorreo" class="mensaje-error">{{ errorCorreo }}</div>

      <label for="usuario">Nombre de usuario:</label>
      <input
        type="text"
        id="usuario-registro"
        v-model="usuario"
        required
        placeholder="Elige un nombre de usuario"
      />
      <div v-if="errorUsuario" class="mensaje-error">{{ errorUsuario }}</div>

      <label for="clave">Contraseña:</label>
      <input
        type="password"
        id="clave-registro"
        v-model="clave"
        required
        placeholder="Mínimo 10 caracteres"
        @input="evaluarSeguridad"
      />
      <div v-if="errorClave" class="mensaje-error">{{ errorClave }}</div>

      <!-- Indicador de seguridad de contraseña -->
      <div class="seguridad-contraseña">
        <div class="nivel-seguridad">
          <div class="barra-seguridad" :style="{ width: nivelSeguridad + '%' }"></div>
        </div>
        <span>Seguridad: {{ textoSeguridad }}</span>
      </div>

      <label for="confirmar-clave">Confirmar contraseña:</label>
      <input
        type="password"
        id="confirmar-clave"
        v-model="confirmarClave"
        required
        placeholder="Repite tu contraseña"
      />
      <div v-if="errorConfirmarClave" class="mensaje-error">{{ errorConfirmarClave }}</div>

      <label for="rol">Rol:</label>
      <select id="rol-registro" v-model="rol" required>
        <option value="">Selecciona tu rol</option>
        <option value="estudiante">Estudiante</option>
        <option value="profesor">Profesor</option>
      </select>
      <div v-if="errorRol" class="mensaje-error">{{ errorRol }}</div>

      <button type="submit" class="boton-registro">Registrarme</button>
    </form>

    <div class="mensaje">
      ¿Ya tienes cuenta?
      <RouterLink to="/login">Inicia sesión aquí</RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "Registro",
  data() {
    return {
      nombre: "",
      correo: "",
      usuario: "",
      clave: "",
      confirmarClave: "",
      rol: "",
      errorNombre: "",
      errorCorreo: "",
      errorUsuario: "",
      errorClave: "",
      errorConfirmarClave: "",
      errorRol: "",
      nivelSeguridad: 0,
      textoSeguridad: "Muy débil (mínimo 10 caracteres)",
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
    registrar() {
      this.errorNombre = this.nombre ? "" : "El nombre es obligatorio";
      this.errorCorreo = this.correo ? "" : "El correo es obligatorio";
      this.errorUsuario = this.usuario ? "" : "El usuario es obligatorio";
      this.errorClave = this.clave.length >= 10 ? "" : "La contraseña debe tener al menos 10 caracteres";
      this.errorConfirmarClave = this.clave === this.confirmarClave ? "" : "Las contraseñas no coinciden";
      this.errorRol = this.rol ? "" : "Debes seleccionar un rol";

      if (!this.errorNombre && !this.errorCorreo && !this.errorUsuario && !this.errorClave && !this.errorConfirmarClave && !this.errorRol) {
        console.log("Registro exitoso:", {
          nombre: this.nombre,
          correo: this.correo,
          usuario: this.usuario,
          rol: this.rol,
        });
        alert("✅ Registro exitoso");
        this.$router.push("/inicio");
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/styles.css";
</style>
