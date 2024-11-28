<template>
  <div>
    <div class="bienvenida">
            <p>Bienvenidos a la Dirección de Bienestar, Admisión y Nivelación Universitaria:
                <br>
                Mensaje:
                <br>
                Comunidad Universitaria, la Dirección de Bienestar Universitario tiene como finalidad brindar una serie de servicios orientados a mejorar la estadía de quienes formamos la Universidad Laica Eloy Alfaro de Manabí mediante la participación profesional, activa, ética y responsable de cada uno de los funcionarios que laboran en este dependencia, convirtiéndose así en un apoyo disponible en beneficio de su salud, de su estado psicosocial y en la entrega de espacios de formación cultural.
                <br>
                <h4>Lic. Víctor Zambrano Cedeño, Mg. Sc.
                <br>
                DIRECTOR DE BIENESTAR UNIVERSITARIO
            </h4>
          </p>
        </div>   
        <div class="servicios">
          <h2>Nuestros Servicios</h2>

          <Tabs :tabs="['tab1', 'tab2', 'tab3']">
                  <template #tab1>
                    <p>Este es el contenido de la primera pestaña.</p>
                  </template>
                  <template #tab2>
                    <p>Este es el contenido de la segunda pestaña.</p>
                  </template>
                  <template #tab3>
                    <p>Este es el contenido de la tercera pestaña.</p>
                  </template>
          </Tabs>
          <router-link id="class" to="/login" class="logo-link">
            <h3>Iniciar sesion</h3>
          </router-link>
        </div>
  </div>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Tabs from './Tabs.vue';


export default {
name:'Home', 
components: {
    Tabs,
  }, 
}
</script>