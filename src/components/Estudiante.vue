<template>
  <div>
    <button class="logout-button" @click="logout">Cerrar sesión</button>
    <div id="usuarioInfo">
      <div v-if="usuario" class="info">
        <h2 id="estd">Bienvenido, Estudiante</h2>
        <img id="perfil" src="../assets/img/perfil.png" />
        <p>
          <strong>Nombre:</strong> {{ usuario.nombre }} {{ usuario.apellido }}
        </p>
        <p><strong>Correo:</strong> {{ usuario.correo }}</p>
        <p><strong>Dirección:</strong> {{ usuario.direccion }}</p>
        <p><strong>Rol:</strong> {{ usuario.rol }}</p>
      </div>
    </div>

    <div id="estadoSolicitud" v-if="estadoSolicitud">
      <h3>Estado de tu solicitud:</h3>
      <p v-if="estadoSolicitud === 'aprobada'">
        ¡Tu solicitud ha sido aprobada!
      </p>
      <p v-else-if="estadoSolicitud === 'rechazada'">
        Tu solicitud ha sido rechazada.
      </p>
      <p v-else>Tu solicitud está pendiente de revisión.</p>
    </div>

    <div id="citasEstudiante">
      <h2>Agendar una cita</h2>
      <div v-if="citasDisponibles.length > 0">
        <ul>
          <li v-for="cita in citasDisponibles" :key="cita.id">
            <span>{{ cita.fecha }} - {{ cita.hora }}</span>
            <button @click="abrirModal(cita)" :disabled="!cita.disponible">
              Solicitar
            </button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No hay citas disponibles.</p>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal">
        <h3>Solicitar Cita</h3>
        <p><strong>Fecha:</strong> {{ citaSeleccionada.fecha }}</p>
        <p><strong>Hora:</strong> {{ citaSeleccionada.hora }}</p>
        <textarea
          v-model="motivos"
          placeholder="Describe los motivos"
        ></textarea>
        <textarea
          v-model="sintomas"
          placeholder="Describe los síntomas"
        ></textarea>
        <div class="modal-actions">
          <button @click="confirmarSolicitud">Confirmar</button>
          <button @click="cerrarModal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Estudiante",
  setup() {
    const usuario = ref(JSON.parse(localStorage.getItem("usuario")));
    const citasDisponibles = ref([]);
    const mostrarModal = ref(false);
    const citaSeleccionada = ref({});
    const motivos = ref("");
    const sintomas = ref("");
    const router = useRouter();


    const cargarCitas = async () => {
      // Verificar si ya hay citas en localStorage
      const citasGuardadas = JSON.parse(localStorage.getItem("citas"));

      if (citasGuardadas) {
        // Si las citas ya están en localStorage, usarlas directamente
        citasDisponibles.value = citasGuardadas.filter(cita => cita.disponible);
        return; // Salir de la función para no hacer la solicitud HTTP
      }

      // Si no hay citas en localStorage, hacer la solicitud al archivo XML
      try {
        const response = await fetch("/citas.xml");
        if (!response.ok) {
          throw new Error("No se pudo cargar el archivo XML.");
        }

        const xmlData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "application/xml");
        const errorNode = xmlDoc.querySelector("parsererror");

        if (errorNode) {
          console.error("Error al parsear el XML:", errorNode.textContent);
          return;
        }

        const citasElements = xmlDoc.getElementsByTagName("cita");
        const citas = Array.from(citasElements).map(cita => ({
          id: cita.getAttribute('id'),
          fecha: cita.getElementsByTagName("fecha")[0].textContent,
          hora: cita.getElementsByTagName("hora")[0].textContent,
          disponible: cita.getElementsByTagName("disponible")[0].textContent === 'true'
        }));

        // Guardar las citas en localStorage para uso futuro
        localStorage.setItem("citas", JSON.stringify(citas));

        // Filtrar las citas disponibles y asignarlas a la variable de citasDisponibles
        citasDisponibles.value = citas.filter(cita => cita.disponible);
      } catch (error) {
        console.error("Error al cargar las citas:", error);
      }
    };

    const abrirModal = (cita) => {
      mostrarModal.value = true;
      citaSeleccionada.value = cita;
    };

    const cerrarModal = () => {
      mostrarModal.value = false;
      motivos.value = "";
      sintomas.value = "";
    };

    const confirmarSolicitud = () => {
      const solicitud = {
        id: Date.now(),
        usuario: usuario.value.correo,
        citaId: citaSeleccionada.value.id,
        fecha: citaSeleccionada.value.fecha,
        hora: citaSeleccionada.value.hora,
        motivos: motivos.value,
        sintomas: sintomas.value,
        aprobada: false,
      };

      // Guarda la solicitud y cierra el modal
      let solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
      solicitudes.push(solicitud);
      localStorage.setItem("solicitudes", JSON.stringify(solicitudes));

      // Marcar la cita como no disponible
      citaSeleccionada.value.disponible = false;

      cerrarModal();
      alert("Cita solicitada con éxito.");
    };

    const logout = () => {
      localStorage.removeItem("usuario");
      router.push({ name: "Login" });
    };

    cargarCitas();

    return {
      usuario,
      citasDisponibles,
      mostrarModal,
      citaSeleccionada,
      motivos,
      sintomas,
      abrirModal,
      cerrarModal,
      confirmarSolicitud,
      logout,
    };
  },
};
</script>

<style scoped>
/* Estilos básicos */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
}

textarea {
  width: 100%;
  height: 80px;
  margin-bottom: 10px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}
</style>
