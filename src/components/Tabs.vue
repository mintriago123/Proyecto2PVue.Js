<script setup>
import { ref } from 'vue';

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
});

const activeTab = ref(props.tabs[0]);
</script>

<template>
  <div>
    <!-- Navegación de pestañas -->
    <div class="tabs-navigation">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Contenido de las pestañas -->
    <div class="tabs-content">
      <slot :name="activeTab.toLowerCase().replace(/\s+/g, '-')"></slot>
    </div>
  </div>
</template>

  <style scoped>
  /* Contenedor principal de las pestañas */
.tabs-navigation {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e0e0e0;
  display: flex;
  flex-wrap: wrap;
  margin: 20px auto;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Sombra más suave */
}

/* Botones de las pestañas */
.tabs-navigation button {
  background-color: #4caf50;
  color: white;
  border-radius: 12px 12px 0 0;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 22px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
  flex: 1;
  text-align: center;
  font-size: 1rem;
}

.tabs-navigation button:hover {
  background-color: #3b9142;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px); /* Efecto de elevación */
}

.tabs-navigation button.active {
  background-color: #255226;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Contenido de las pestañas */
.tabs-content {
  background-color: #ffffff;
  border-radius: 0 0 12px 12px;
  padding: 24px;
  border: 2px solid #e0e0e0;
  border-top: none;
  animation: fadeEffect 0.5s ease-in-out;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
}

/* Transición para el contenido de las pestañas */
@keyframes fadeEffect {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mejoras para móviles */
@media (max-width: 768px) {
  .tabs-navigation button {
    flex: 1;
    padding: 12px;
    font-size: 0.9rem;
  }
  .tabs-content {
    padding: 16px;
    font-size: 0.9rem;
  }
}
</style>