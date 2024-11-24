import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Estudiante from '../views/Estudiante.vue';
import Personal from '../views/Personal.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/estudiante', component: Estudiante },
  { path: '/personal', component: Personal },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
