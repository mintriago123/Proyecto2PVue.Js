<template>
  <div>
    <button class="logout-button" @click="logout">Cerrar sesión</button>
    <button @click="reiniciarCitas" class="reset-button">
      Reiniciar todas las citas
    </button>
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
            <p><strong>Motivo:</strong> {{ solicitud.motivo }}</p>
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
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No hay solicitudes pendientes.</p>
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

    // Función para cargar las solicitudes pendientes
    const cargarSolicitudes = () => {
      const solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
      // Filtramos las solicitudes que no han sido aprobadas ni rechazadas
      solicitudesPendientes.value = solicitudes.filter(
        (solicitud) => !solicitud.aprobada && !solicitud.rechazada
      );
    };

    // Función para aprobar una solicitud
    const aprobarSolicitud = (solicitud) => {
      solicitud.aprobada = true;
      solicitud.rechazada = false;

      let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
      const index = solicitudes.findIndex((s) => s.id === solicitud.id);
      if (index !== -1) {
        solicitudes[index] = solicitud;
        localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
      }

      cargarSolicitudes();
      alert("Solicitud aprobada.");
      alert(`Estudiante ${solicitud.usuario} ha sido notificado que su solicitud ha sido aprobada.`);

    };

    // Función para rechazar una solicitud
    const rechazarSolicitud = (solicitud) => {
      solicitud.rechazada = true;
      solicitud.aprobada = false;

      let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
      const index = solicitudes.findIndex((s) => s.id === solicitud.id);
      if (index !== -1) {
        solicitudes[index] = solicitud;
        localStorage.setItem("solicitudes", JSON.stringify(solicitudes));
      }

      cargarSolicitudes();
      alert("Solicitud rechazada.");
      alert(`Estudiante ${solicitud.usuario} ha sido notificado que su solicitud ha sido rechazada.`);

    };

    // Función para cerrar sesión
    const logout = () => {
      localStorage.removeItem("usuario");
      router.push({ name: "Home" });
    };

    
    const reiniciarCitas = () => {
      // Reiniciar todas las solicitudes de citas
      let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
      solicitudes = solicitudes.map((solicitud) => {
        solicitud.aprobada = false;
        solicitud.rechazada = false;
        return solicitud;
      });
      localStorage.setItem("solicitudes", JSON.stringify(solicitudes));

      // Reiniciar las citas de los estudiantes: hacer todas disponibles nuevamente
      const xmlData = localStorage.getItem("citas");
      if (xmlData) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "application/xml");
        const citasElements = xmlDoc.getElementsByTagName("cita");

        // Reestablecer todas las citas como disponibles
        Array.from(citasElements).forEach((cita) => {
          cita.getElementsByTagName("disponible")[0].textContent = "true";
        });

        // Guardar el XML actualizado nuevamente en localStorage
        const serializer = new XMLSerializer();
        const updatedXml = serializer.serializeToString(xmlDoc);
        localStorage.setItem("citas", updatedXml);
      }

      // Recargar las solicitudes y citas
      cargarSolicitudes();
      alert("Todas las citas y solicitudes han sido reiniciadas.");
    };
    cargarSolicitudes();

    return {
      usuario,
      solicitudesPendientes,
      aprobarSolicitud,
      rechazarSolicitud,
      logout,
      reiniciarCitas,
    };
  },
};
</script>

<style scoped>
button {
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #45a049;
}
reset-button {
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
