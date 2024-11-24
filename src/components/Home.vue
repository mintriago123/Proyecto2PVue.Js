<template>
    <div>
      <h1>Bienvenido, {{ usuario.nombre }} {{ usuario.apellido }}</h1>
      <p>Rol: {{ usuario.rol }}</p>
      <button @click="logout">Cerrar Sesión</button>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Home',
    setup() {
      const usuario = ref(null);
      const router = useRouter();
  
      onMounted(() => {
        const usuarioData = localStorage.getItem('usuario');
        if (!usuarioData) {
          router.push({ name: 'Login' });
        } else {
          usuario.value = JSON.parse(usuarioData);
        }
      });
  
      const logout = () => {
        localStorage.removeItem('usuario');
        router.push({ name: 'Login' });
      };
  
      return { usuario, logout };
    },
  };
  </script>
  