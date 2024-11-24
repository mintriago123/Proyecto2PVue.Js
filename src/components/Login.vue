<template>
  <div>
   
    <form @submit.prevent="login">
      <h2>Iniciar Sesión</h2>
      <label for="correo">Correo:</label>
      <br>
      <input v-model="correo" type="email" required />
      <br>
      <label for="contrasena">Contraseña:</label>
      <br>
      <input v-model="contrasena" type="password" required />
      <br>
      <button type="submit">Ingresar</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const correo = ref('');
    const contrasena = ref('');
    const error = ref('');
    const router = useRouter();

    const login = async () => {
      try {
        const response = await fetch('/usuarios.json');
        const usuarios = await response.json();
        const usuario = usuarios.find(
          (u) => u.correo === correo.value && u.contrasena === contrasena.value
        );

        if (usuario) {
          // Guardar el rol del usuario en localStorage
          localStorage.setItem('usuario', JSON.stringify(usuario));

          // Redirigir a la vista correspondiente según el rol
          if (usuario.rol === 'estudiante') {
            router.push({ name: 'Estudiante' });
          } else if (usuario.rol === 'personal') {
            router.push({ name: 'Personal' });
          }
        } else {
          error.value = 'Credenciales incorrectas';
        }
      } catch (e) {
        error.value = 'Error al cargar usuarios';
      }
    };

    return { correo, contrasena, login, error };
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
