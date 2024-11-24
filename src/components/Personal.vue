<template>
  <div>
    <div class="info">
      <button class="logout-button" @click="logout">Cerrar sesión</button>

      <h2 id="pers">Bienvenido miembro del Personal</h2>
      <img id="perfil" src="../assets/img/perfil.png" >

      <div v-if="usuario">
        <p><strong>Nombre:</strong> {{ usuario.nombre }} {{ usuario.apellido }}</p>
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
            <p><strong>Cita:</strong> {{ solicitud.fecha }} - {{ solicitud.hora }}</p>
            <button @click="aprobarSolicitud(solicitud)" :disabled="solicitud.aprobada || solicitud.rechazada">Aprobar</button>
            <button @click="rechazarSolicitud(solicitud)" :disabled="solicitud.aprobada || solicitud.rechazada">Rechazar</button>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Personal',
  setup() {
    const usuario = ref(JSON.parse(localStorage.getItem('usuario')));
    const router = useRouter();
    const solicitudesPendientes = ref([]);

    // Función para cargar las solicitudes pendientes
    const cargarSolicitudes = () => {
      const solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
      // Filtramos las solicitudes que no han sido aprobadas ni rechazadas
      solicitudesPendientes.value = solicitudes.filter(solicitud => !solicitud.aprobada && !solicitud.rechazada);
    };

    // Función para aprobar una solicitud
    const aprobarSolicitud = (solicitud) => {
      // Marca la solicitud como aprobada
      solicitud.aprobada = true;
      solicitud.rechazada = false; // Aseguramos que no esté rechazada al aprobarla

      // Actualiza el localStorage con la solicitud aprobada
      let solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
      const index = solicitudes.findIndex(s => s.id === solicitud.id);
      if (index !== -1) {
        solicitudes[index] = solicitud;
        localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
      }

      // Recargamos las solicitudes
      cargarSolicitudes();
      alert("Solicitud aprobada.");
    };

    // Función para rechazar una solicitud
    const rechazarSolicitud = (solicitud) => {
      // Marca la solicitud como rechazada
      solicitud.rechazada = true;
      solicitud.aprobada = false; // Aseguramos que no esté aprobada al rechazarla

      // Actualiza el localStorage con la solicitud rechazada
      let solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
      const index = solicitudes.findIndex(s => s.id === solicitud.id);
      if (index !== -1) {
        solicitudes[index] = solicitud;
        localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
      }

      // Recargamos las solicitudes
      cargarSolicitudes();
      alert("Solicitud rechazada.");
    };

    // Función para cerrar sesión
    const logout = () => {
      localStorage.removeItem('usuario');
      router.push({ name: 'Login' });
    };

    // Cargar las solicitudes pendientes al montar el componente
    cargarSolicitudes();

    return { usuario, solicitudesPendientes, aprobarSolicitud, rechazarSolicitud, logout };
  }
};
</script>

<style scoped>
button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}


</style>
