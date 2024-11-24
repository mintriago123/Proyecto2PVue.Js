import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Estudiante from '../components/Estudiante.vue';
import Personal from '../components/Personal.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/estudiante', name: 'Estudiante', component: Estudiante },
  { path: '/personal', name: 'Personal', component: Personal },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
