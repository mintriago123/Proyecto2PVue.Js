<template>
  <div>
    <button class="logout-button" @click="logout">Cerrar sesión</button>

    <div id="usuarioInfo">
      <div v-if="usuario" class="info">
        <h2 id="estd" >Bienvenido, Estudiante</h2>
        <img id="perfil" src="../assets/img/perfil.png" >
        <p><strong>Nombre:</strong> {{ usuario.nombre }} {{ usuario.apellido }}</p>
        <p><strong>Correo:</strong> {{ usuario.correo }}</p>
        <p><strong>Dirección:</strong> {{ usuario.direccion }}</p>
        <p><strong>Rol:</strong> {{ usuario.rol }}</p>
      </div>
    </div>

    <div id="citasEstudiante">
      <h2>Agendar una cita</h2>
      <div v-if="citasDisponibles.length > 0">
        <ul>
          <li v-for="cita in citasDisponibles" :key="cita.id">
            <span>{{ cita.fecha }} - {{ cita.hora }}</span>
            <button @click="solicitarCita(cita)" :disabled="!cita.disponible">Solicitar</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No hay citas disponibles.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Estudiante',
  setup() {
    const usuario = ref(JSON.parse(localStorage.getItem('usuario')));
    const citasDisponibles = ref([]);
    const router = useRouter();

    // Función para cargar las citas disponibles desde XML
    const cargarCitas = () => {
      const xmlData = localStorage.getItem('citas'); // Obtenemos el XML desde localStorage
      if (!xmlData) {
        console.log("No se encontraron citas en localStorage.");
        return;
      }

      // Parseamos el XML a un objeto JavaScript
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, "application/xml");

      // Extraemos las citas disponibles
      const citasElements = xmlDoc.getElementsByTagName("cita");
      const citas = Array.from(citasElements).map(cita => ({
        id: cita.getAttribute('id'),
        fecha: cita.getElementsByTagName("fecha")[0].textContent,
        hora: cita.getElementsByTagName("hora")[0].textContent,
        disponible: cita.getElementsByTagName("disponible")[0].textContent === 'true'
      }));

      // Filtramos las citas disponibles
      citasDisponibles.value = citas.filter(cita => cita.disponible);
    };

    // Función para solicitar una cita
    const solicitarCita = (cita) => {
      const solicitud = {
        id: Date.now(),  // Un ID único para cada solicitud
        usuario: usuario.value.correo,
        citaId: cita.id,
        fecha: cita.fecha,
        hora: cita.hora,
        aprobada: false,
      };

      // Guardar la solicitud en el localStorage (en formato XML)
      let solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
      solicitudes.push(solicitud);
      localStorage.setItem('solicitudes', JSON.stringify(solicitudes));

      // Marcar la cita como no disponible
      cita.disponible = false;

      // Volver a guardar las citas en el localStorage en formato XML
      const xmlDoc = new DOMParser().parseFromString(localStorage.getItem('citas'), 'application/xml');
      const citasElements = xmlDoc.getElementsByTagName('cita');
      for (let citaElement of citasElements) {
        if (citaElement.getAttribute('id') === cita.id.toString()) {
          citaElement.getElementsByTagName('disponible')[0].textContent = 'false';
        }
      }

      const xmlSerializer = new XMLSerializer();
      const updatedXmlData = xmlSerializer.serializeToString(xmlDoc);
      localStorage.setItem('citas', updatedXmlData);

      alert("Cita solicitada con éxito");
    };

    // Función para cerrar sesión
    const logout = () => {
      localStorage.removeItem('usuario');
      router.push({ name: 'Login' });
    };

    // Cargar citas cuando el componente se monte
    cargarCitas();

    return { usuario, citasDisponibles, solicitarCita, logout };
  },
};
</script>

<style scoped>
/* Estilos para las citas */
#citasEstudiante ul {
  list-style: none;
  padding: 0;
}

#citasEstudiante li {
  margin-bottom: 10px;
}

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
</style>
