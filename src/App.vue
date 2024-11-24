<template>
  <header>
    <router-link id="class" to="/" class="logo-link">
      <img src="./assets/img/cropped-LOGO-1-200x61.png" alt="Bienestar Universitario Uleam">
    </router-link>
  </header>
  <router-view />
  <br>
  <footer>
    <p>Derechos reservados © 2024</p>
    <p>Michael Agustin Intriago Benitez</p>
    <p>Programacion Web 1</p>
    <p>Proyecto Gestion de Bienestar Universitario</p>
  </footer>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>
