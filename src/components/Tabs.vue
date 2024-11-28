<template>
    <div class="tabs">
      <!-- Navegación de pestañas -->
      <div class="tabs-navigation">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="{ active: tab === activeTab }"
          @click="selectTab(tab)"
        >
          {{ tab }}
        </button>
      </div>
  
      <!-- Contenido dinámico -->
      <div class="tabs-content">
        <slot :name="activeTab"></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Tabs",
    props: {
      tabs: {
        type: Array,
        required: true, // Array con los nombres de las pestañas
      },
    },
    data() {
      return {
        activeTab: this.tabs[0], // Por defecto, se selecciona la primera pestaña
      };
    },
    methods: {
      selectTab(tab) {
        this.activeTab = tab; // Cambia la pestaña activa
      },
    },
  };
  </script>
  
  <style scoped>
  /* Contenedor principal de las pestañas */
  .tabs-navigation {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e2e9e6;
    display: flex;
    flex-wrap: wrap; /* Ajuste para pantallas pequeñas */
    margin: 20px auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
  }
  
  /* Botones de las pestañas */
  .tabs-navigation button {
    background-color: #4caf50;
    color: white;
    border-radius: 8px 8px 0 0; /* Redondeo en la parte superior */
    border: none;
    outline: none;
    cursor: pointer;
    padding: 12px 20px;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    flex: 1; /* Distribuye uniformemente las pestañas */
    text-align: center;
  }
  
  .tabs-navigation button:hover {
    background-color: #316d33;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .tabs-navigation button.active {
    background-color: #255226;
    color: #fff;
    font-weight: bold; /* Resalta la pestaña activa */
  }
  
  /* Contenido de las pestañas */
  .tabs-content {
    background-color: #fff;
    border-radius: 0 0 8px 8px; /* Redondeo en la parte inferior */
    padding: 20px;
    border: 1px solid #e2e9e6;
    border-top: none; /* Evita borde doble entre navegación y contenido */
    animation: fadeEffect 1s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra uniforme con los formularios */
  }
  
  /* Transición para el contenido de las pestañas */
  @keyframes fadeEffect {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  /* Mejoras para móviles */
  @media (max-width: 768px) {
    .tabs-navigation button,
    .subtablink {
      flex: 1;
      padding: 10px;
      font-size: 0.9rem;
    }
  }
  </style>
  