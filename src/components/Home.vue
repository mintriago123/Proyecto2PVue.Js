<template>
  <div>
    <div class="bienvenida">
            <p>Bienvenidos a la Dirección de Bienestar, Admisión y Nivelación Universitaria:
                <br>
                Mensaje:
                <br>
                Comunidad Universitaria, la Dirección de Bienestar Universitario tiene como finalidad brindar una serie de servicios orientados a mejorar la estadía de quienes formamos la Universidad Laica Eloy Alfaro de Manabí mediante la participación profesional, activa, ética y responsable de cada uno de los funcionarios que laboran en este dependencia, convirtiéndose así en un apoyo disponible en beneficio de su salud, de su estado psicosocial y en la entrega de espacios de formación cultural.
                <br>
                <br>
                <b>Lic. Víctor Zambrano Cedeño, Mg. Sc.</b>
                <br>
                <br>
                <b>DIRECTOR DE BIENESTAR UNIVERSITARIO</b>
          </p>
        </div>   
        <div class="servicios">
          <h2>Nuestros Servicios</h2>

          <Tabs :tabs="['Quienes Somos', 'Becas y ayudas económicas', 'Salud','Servicios en linea','Contacto']">
                  <template #quienes-somos>
                    <h3>Quienes somos</h3>
                    <img src="../assets/img/cropped-LOGO-1-200x61.png" alt="Quienes somos">
                    <p>Bienestar Universitario Uleam es una organización que se dedica a brindar apoyo y recursos a los estudiantes de la Universidad Laica Eloy Alfaro de Manabí.</p>                
                    <p>Nuestro objetivo es mejorar la calidad de vida de los estudiantes, ofreciendo un espacio seguro y acogedor para que puedan estudiar, socializar y desarrollar sus habilidades.</p>                  </template>
                  
                    <template #becas-y-ayudas-económicas>
                      <Tabs :tabs="['Requisitos generales para becas y ayudas económicas', 'Tipos de Becas', 'Tipos de ayudas economicas']">
                        
                        <template #requisitos-generales-para-becas-y-ayudas-económicas>
                          <h3>Requisitos generales para becas y ayudas económicas</h3>
                          <ul>
                                <li>Ser estudiante regular;</li>
                                <li>No tener asignatura reprobada;</li>
                                <li>No haber sido sancionado disciplinariamente (Solicitará la Dirección de Bienestar Universitario);</li>
                                <li>Otros específicos de acuerdo con el tipo de beca solicitada.</li>
                            </ul>                        
                          </template>
                        <template #tipos-de-becas>
                          <Tabs :tabs="['Becas por situacion socioeconomica', 'Becas para estudiantes con discapacidad', 'Becas por alto rendimiento academico','Becas por meritos cientificos - tecnicos innovacion emprendimiento','Becas por alto rendimiento deportivo y cultural']">
                            <template #becas-por-situacion-socioeconomica>
                              <h3>Becas por situación socioeconomica</h3>
                              <ul>
                                    <li>Copia de cédula de ciudadanía/identidad;</li>
                                    <li>Certificado de estar matriculado. Asistencia a clases y disciplina (solicitar en secretaria de carrera);</li>
                                    <li>Certificado que no estar afiliado al IESS (descargar del siguiente enlace: <a href="https://www.iess.gob.ec/afiliado-web/pages/opcionesGenerales/seleccionCertificadoDeAfiliacion.jsf">Certificado de Afiliado</a>);</li>
                                    <li>Certificación de cuenta bancaria personal activa (puede ser una copia de la libreta de ahorros o la primera página del último estado de cuenta);</li>
                                    <li>Solicitud de beca firmada (se genera desde el aplicativo de postulación);</li>
                                    <li>Acta de compromiso firmada (se genera desde el aplicativo de postulación);</li>
                                    <li>Notas / Récord académico (2022-1 2022-2);</li>
                                </ul>                            
                              </template>
                            <template #becas-para-estudiantes-con-discapacidad>
                              <h3>Becas para estudiantes con discapacidad</h3>
                              <ul>
                                    <li>Copia a color de cedula y carnet de discapacidad emitido por el Conadis o MSP;</li>
                                    <li>Certificado de estar matriculado. Asistencia a clases y disciplina (solicitar en secretaria de carrera);</li>
                                    <li>Certificación de cuenta bancaria personal activa (puede ser una copia de la libreta de ahorros o la primera página del último estado de cuenta);</li>
                                    <li>Solicitud de beca firmada (se genera desde el aplicativo de postulación);</li>
                                    <li>Acta de compromiso firmada (se genera desde el aplicativo de postulación);</li>
                                    <li>Notas / Récord académico (2022-1 2022-2).</li>
                                </ul>                            
                              </template>
                            <template #becas-por-alto-rendimiento-academico>
                              <h3>Becas por alto rendimiento academico</h3>
                              <ul>
                                    <li>Copia de cédula de ciudadanía/identidad;</li>
                                    <li>Certificado de estar matriculado. Asistencia a clases, disciplina y de haber obtenido el más alto promedio de la carrera (solicitar en secretaria de carrera);</li>
                                    <li>Certificación de cuenta bancaria personal activa (puede ser una copia de la libreta de ahorros o la primera página del último estado de cuenta);</li>
                                    <li>Acta de compromiso firmada (se genera desde el aplicativo de postulación).</li>
                                    <li>Notas / Récord académico (2022-1 2022-2).</li>
                                </ul>                            
                              </template>
                            <template #becas-por-meritos-cientificos---tecnicos-innovacion-emprendimiento>
                              <h3>Becas por meritos cientificos - tecnicos innovacion emprendimiento</h3>
                              <ul>
                                    <li>Copia de cédula de ciudadanía/identidad;</li>
                                    <li>Certificado de estar matriculado. Asistencia a clases y disciplina (solicitar en secretaria de carrera);</li>
                                    <li>Certificación de cuenta bancaria personal activa (puede ser una copia de la libreta de ahorros o la primera página del último estado de cuenta);</li>
                                    <li>Informe del Decano de la Unidad Académica, sobre la relevancia de las actividades que realizó o está realizando incluyendo justificativos de soporte;</li>
                                    <li>Solicitud de beca firmada (se genera desde el aplicativo de postulación);</li>
                                    <li>Acta de compromiso firmada (se genera desde el aplicativo de postulación);</li>
                                    <li>Notas / Récord académico (2022-1 2022-2).</li>
                                </ul>
                            </template>
                            <template #becas-por-alto-rendimiento-deportivo-y-cultural>
                              <h3>Becas por alto rendimiento deportivo y cultural</h3>
                              <ul>
                                <li>Copia de cédula de ciudadanía/identidad;</li>
                                <li>Certificado de estar matriculado. Asistencia a clases y disciplina (solicitar en secretaria de carrera);</li>
                                <li>Certificación de cuenta bancaria personal activa (puede ser una copia de la libreta de ahorros o la primera página del último estado de cuenta);</li>
                                <li>Informe del Decano de la Unidad Académica, sobre la relevancia de las actividades que realizó o está realizando incluyendo justificativos de soporte;</li>
                                <li>Solicitud de beca firmada (se genera desde el aplicativo de postulación);</li>
                                <li>Acta de compromiso firmada (se genera desde el aplicativo de postulación);</li>
                                <li>Notas / Récord académico (2022-1 2022-2).</li>
                                </ul>                              
                              </template>
                          </Tabs>
                        </template>


                        <template #tipos-de-ayudas-economicas>
                          <h3>Tipos de ayudas economicas</h3>
                          <Tabs :tabs="['Ayuda por acciones positivas', 'Ayuda para movilidad académica (Postgrado)', 'Ayuda para asistir a seminarios, cursos de capacitación nacionales e internacionales']">
                            <template #ayuda-por-acciones-positivas>
                              <h3>Ayuda por acciones positivas</h3>
                              <ul>        
                                <li>Copia de cédula de ciudadanía/identidad;</li>
                                <li>Certificado de estar matriculado. Asistencia a clases y disciplina (solicitar en secretaria de carrera);</li>
                                <li>Solictud de acciones afirmaticas;</li>
                                <li>Certificado que avale que pertenece a grupos vulnerables, emitido por el IESS o el MSP (Si aplica por enfermedad catastrófica);</li>
                                <li>Informe socioeconómico del/de la trabajador(a) social;</li>
                                <li>Certificación de cuenta bancaria personal activa (puede ser una copia de la libreta de ahorros o la primera página del último estado de cuenta);</li>
                                <li>Solicitud de ayuda económica firmada (se genera desde el aplicativo de postulación);</li>
                                <li>Acta de compromiso firmada (se genera desde el aplicativo de postulación).</li>
                              </ul>
                            </template>
                            <template #ayuda-para-movilidad-académica-(postgrado)>
                              <h3>Ayuda para movilidad académica (Postgrado)</h3>
                              <ul>
                                <li>Copia de cédula de ciudadanía/identidad;</li>
                                <li>Certificado de estar matriculado. Asistencia a clases y disciplina (solicitar en secretaria de carrera);</li>
                                <li>Solicitud expresa a la Dirección de Bienestar Universitario para realizar capacitación, congreso y participación en concursos presentados por la Facultad;</li>
                                <li>Carta del Decano, proporcionando el permiso correspondiente;</li>
                                <li>Informe del/la Trabajador(a) Social;</li>
                                <li>Certificación de cuenta bancaria personal activa (puede ser una copia de la libreta de ahorros o la primera página del último estado de cuenta);</li>
                                <li>Solicitud de ayuda económica firmada (se genera desde el aplicativo de postulación);</li>
                                <li>Acta de compromiso firmada (se genera desde el aplicativo de postulación);</li>
                                <li>Notas / Récord académico (2022-1 2022-2).</li>  
                              </ul>
                            </template> 

                            <template #ayuda-para-asistir-a-seminarios,-cursos-de-capacitación-nacionales-e-internacionales>
                              <h3>Ayuda para asistir a seminarios, cursos de capacitación nacionales e internacionales</h3>
                              <ul>
                                <li>Copia de cédula de ciudadanía/identidad;</li>
                                <li>Certificado de estar matriculado. Asistencia a clases y disciplina (solicitar en secretaria de carrera);</li>
                                <li>Solicitud expresa a la Dirección de Bienestar Universitario para realizar capacitación, congreso y participación en concursos presentados por la Facultad;</li>
                                <li>Carta del Decano, proporcionando el permiso correspondiente;</li>
                                <li>Invitación personal a la capacitación, congreso y participación en concurso;</li>
                                <li>Certificación de cuenta bancaria personal activa (puede ser una copia de la libreta de ahorros o la primera página del último estado de cuenta);</li>
                                <li>Solicitud de ayuda económica firmada (se genera desde el aplicativo de postulación);</li>
                                <li>Acta de compromiso firmada (se genera desde el aplicativo de postulación);</li>
                                <li>Notas / Récord académico (2022-1 2022-2).</li>        
                              </ul>
                            </template>
                          </Tabs>
                          </template>

                      </Tabs>
                    </template>

                  <template #salud>
                    <h3>Salud</h3>
                    <Tabs :tabs="['Medicina General', 'Odontología','Laboratorio Clínico','Fisioterapia','Nutrición']">
                      <template #medicina-general>
                        <h3>Medicina General</h3>
                        <ul>
                            <li>Atención médica presencial.</li>
                            <li>Acompañamiento profesional por patologías virtual.</li>
                            <li>Emisión de documentos de validación de asistencia a consulta médica.</li>
                            <li>Validación de certificados médicos según atenciones en áreas de salud pública.</li>
                            <li>Intervención en procesos de derivación interna de patologías a especialidades que se brindan en el área de salud de Bienestar Universitario.</li>
                            <li>Promover campañas de salud preventivas.</li>
                            <li>Acompañamiento a estudiantes en estado de gestación.</li>
                        </ul>
                        </template>
                        <template #odontología>
                          <h3>Odontologia</h3>
                          <ul>
                            <li>Atención preventiva.</li>
                            <li>Diagnostico clínico odontológico.</li>
                            <li>Fluorizaciones.</li>
                            <li>Profilaxis.</li>                   
                          </ul>
                        </template>                        
                        <template #laboratorio-clínico>
                          <ul>
                            <li>Hematología</li>
                            <li>Serología</li>
                            <li>Bioquímica clínica</li>
                            <li>Sero inmunología</li>
                            <li>Uroanálisis</li>
                            <li>Parasitología</li>
                          </ul>
                        </template>                        
                        <template #fisioterapia>
                          <ul>
                            <li>Entrevista y valoración de casos.</li>
                            <li>Agendamiento de sesiones previo diagnóstico.</li>
                            <li>Terapias de medios físicos (compresas químicas calientes y frías).</li>
                            <li>Aplicación de equipos de rehabilitación (ultrasonido, magneto y corrientes terapéuticas).</li>
                            <li>Ejercicios de readactación al sobreesfuerzo.</li>
                            <li>Valoración final de sesiones.</li>                   
                          </ul>
                        </template>
                        <template #nutrición>
                          <ul>
                            <li>Charlas sobre alimentación saludable.</li>
                            <li>Supervisión de los comedores, bares y fotocopiadores dentro de los predios de la Uleam.</li>
                            <li>Evaluación de estado nutricional.</li>
                            <li>Planes alimenticios personalizados.</li>
                            <li>Seguimiento nutricional.</li>
                          </ul>
                        </template>
                    </Tabs>
                  </template>

                  <template #servicios-en-linea>
                    <h3>Acceso a los servicios en linea</h3>
                    <router-link id="class" to="/login" class="logo-link">
                      <img src="../assets/img/icon_4_661f6b5a9b.png" alt="Acceder al servicio de Agendamiento">
                    </router-link>
                  </template>

                  <template #contacto>
                    <p>
                      <ul>
                        <li>Dirección: Av. Eloy Alfaro de Manabí, Km 3.5, Manta, Ecuador</li>
                        <li>Teléfono: 04-2581200</li>
                        <li>Email: bienestar@uleam.edu.ec</li>
                      </ul>
                    </p>  
                  </template>
          </Tabs>

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