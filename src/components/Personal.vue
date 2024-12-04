<template>
  <div>
    <div>
      <button class="logout-button" @click="logout">Cerrar sesión</button>

      <button @click="reiniciarCitas" class="reset-button">
        Reiniciar todas las citas
      </button>
    </div>

    <div id="usuarioInfo">
      <div v-if="usuario" class="info">
        <h2 id="estd">Bienvenido, Personal</h2>
        <img id="perfil" src="../assets/img/perfil.png" />
        <p>
          <strong>Nombre:</strong> {{ usuario.nombre }} {{ usuario.apellido }}
        </p>
        <p><strong>Correo:</strong> {{ usuario.correo }}</p>
        <p><strong>Dirección:</strong> {{ usuario.direccion }}</p>
        <p><strong>Rol:</strong> {{ usuario.rol }}</p>
      </div>
    </div>
    <div id="citasPersonal">
      <h2>Solicitudes de citas pendientes</h2>
      <div v-if="solicitudesPendientes.length > 0">
        <ul>
          <li v-for="solicitud in solicitudesPendientes" :key="solicitud.id">
            <p><strong>Estudiante:</strong> {{ solicitud.usuario }}</p>
            <p>
              <strong>Cita:</strong> {{ solicitud.fecha }} -
              {{ solicitud.hora }}
            </p>
            <button @click="abrirModal(solicitud)">Visualizar Solicitud</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No hay solicitudes pendientes.</p>
      </div>
    </div>
    <!-- Modal -->
    <!-- Modal -->
    <div v-if="modalAbierto" class="modal">
      <div class="modal-content">
        <h3>Detalle de la Solicitud</h3>
        <p><strong>Estudiante:</strong> {{ solicitudSeleccionada.usuario }}</p>
        <p>
          <strong>Cita:</strong> {{ solicitudSeleccionada.fecha }} -
          {{ solicitudSeleccionada.hora }}
        </p>
        <p><strong>Motivo:</strong> {{ solicitudSeleccionada.motivo }}</p>

        <!-- Botones de Aprobar y Rechazar -->
        <button
          @click="aprobarSolicitud(solicitud)"
          :disabled="solicitud.aprobada || solicitud.rechazada"
        >
          Aprobar
        </button>

        <button
          @click="rechazarSolicitud(solicitud)"
          :disabled="solicitud.aprobada || solicitud.rechazada"
        >
          Rechazar
        </button>

        <button @click="cerrarModal">Cerrar</button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Personal",
  setup() {
    const usuario = ref(JSON.parse(localStorage.getItem("usuario")));
    const router = useRouter();
    const solicitudesPendientes = ref([]);
    const modalAbierto = ref(false);
    const solicitudSeleccionada = ref(null);

    const cargarSolicitudes = () => {
      const solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
      solicitudesPendientes.value = solicitudes.filter(
        (solicitud) => !solicitud.aprobada && !solicitud.rechazada
      );
    };

    const aprobarSolicitud = (solicitud) => {
      // Marca la solicitud como aprobada
      solicitud.aprobada = true;
      solicitud.rechazada = false; // Aseguramos que no esté rechazada al aprobarla

      // Actualiza el localStorage con la solicitud aprobada
      let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
      const index = solicitudes.findIndex((s) => s.id === solicitud.id);
      if (index !== -1) {
        solicitudes[index] = solicitud;
        localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
      }

      // Recargamos las solicitudes
      cargarSolicitudes();
      alert("Solicitud aprobada.");
      cerrarModal();
    };

    // Función para rechazar una solicitud
    const rechazarSolicitud = (solicitud) => {
      // Marca la solicitud como rechazada
      solicitud.rechazada = true;
      solicitud.aprobada = false; // Aseguramos que no esté aprobada al rechazarla

      // Actualiza el localStorage con la solicitud rechazada
      let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
      const index = solicitudes.findIndex((s) => s.id === solicitud.id);
      if (index !== -1) {
        solicitudes[index] = solicitud;
        localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
      }

      // Recargamos las solicitudes
      cargarSolicitudes();
      alert("Solicitud rechazada.");
      cerrarModal();
    };
    const abrirModal = (solicitud) => {
      solicitudSeleccionada.value = solicitud;
      modalAbierto.value = true;
    };

    const cerrarModal = () => {
      modalAbierto.value = false;
      solicitudSeleccionada.value = null;
    };

    const reiniciarCitas = () => {
      let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
      solicitudes = solicitudes.map((solicitud) => {
        solicitud.aprobada = false;
        solicitud.rechazada = false;
        return solicitud;
      });

      localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
      cargarSolicitudes();
      alert("Todas las citas han sido reiniciadas.");
    };

    const logout = () => {
      localStorage.removeItem("usuario");
      router.push({ name: "Home" });
    };

    cargarSolicitudes();

    return {
      usuario,
      solicitudesPendientes,
      modalAbierto,
      solicitudSeleccionada,
      abrirModal,
      cerrarModal,
      reiniciarCitas,
      logout,
    };
  },
};
</script>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
}

button {
  padding: 5px 10px;
  margin: 5px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.reset-button {
  padding: 10px 15px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
}

.reset-button:hover {
  background-color: #d32f2f;
}
</style>
