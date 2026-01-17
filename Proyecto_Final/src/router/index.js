import { createRouter, createWebHistory } from "vue-router";

// Públicas
import Index from "../views/index.vue";

import Login from "../views/login.vue";

import Registro from "../views/registro.vue";
import Course from "../views/course.vue";

// Paneles
import PanelEstudiante from "../views/panel-estudiante.vue";
import PanelProfesor from "../views/panel-profesor.vue";

// Estudiante
import PerfilEstudiante from "../views/perfil-estudiante.vue";
import TareasEstudiante from "../views/tareas-estudiante.vue";
import CursosEstudiante from "../views/cursos-estudiante.vue";
import CalificacionesEstudiante from "../views/calificaciones-estudiante.vue";
import RealizarTarea from "../views/realizartarea.vue";

// Profesor
import PerfilProfesor from "../views/perfil-profesor.vue";
import TareasProfesor from "../views/tareas-profesor.vue";
import CursosProfesor from "../views/cursos-profesor.vue";
import CalificacionesProfesor from "../views/calificaciones-profesor.vue";
import RevisarTareas from "../views/revisar-tareas.vue";
import EditarTareas from "../views/editar-tareas.vue";

// Otros
import Detalle from "../views/detalle.vue";

const routes = [
{ path: "/", name: "Index", component: Index },
{ path: "/login", name: "Login", component: Login },
  
  { path: "/registro", name: "Registro", component: Registro },

  { path: "/panel-estudiante", name: "PanelEstudiante", component: PanelEstudiante, meta: { requiresAuth: true } },
  { path: "/panel-profesor", name: "PanelProfesor", component: PanelProfesor, meta: { requiresAuth: true } },

  { path: "/perfil-estudiante", component: PerfilEstudiante, meta: { requiresAuth: true } },
  { path: "/tareas-estudiante", component: TareasEstudiante, meta: { requiresAuth: true } },
  { path: "/cursos-estudiante", component: CursosEstudiante, meta: { requiresAuth: true } },
  { path: "/calificaciones-estudiante", component: CalificacionesEstudiante, meta: { requiresAuth: true } },
  { path: "/realizar-tarea", component: RealizarTarea, meta: { requiresAuth: true } },

  { path: "/perfil-profesor", component: PerfilProfesor, meta: { requiresAuth: true } },
  { path: "/tareas-profesor", component: TareasProfesor, meta: { requiresAuth: true } },
  { path: "/cursos-profesor", component: CursosProfesor, meta: { requiresAuth: true } },
  { path: "/calificaciones-profesor", component: CalificacionesProfesor, meta: { requiresAuth: true } },
  { path: "/revisar-tareas", component: RevisarTareas, meta: { requiresAuth: true } },
  { path: "/editar-tareas", component: EditarTareas, meta: { requiresAuth: true } },

  { path: "/detalle", component: Detalle, meta: { requiresAuth: true } },

    { path: "/course", name: "Course", component: Course }, 
  ];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔐 GUARD BIEN HECHO
router.beforeEach((to, from, next) => {
  const autenticado = localStorage.getItem("auth");

  if (to.meta.requiresAuth && autenticado !== "true") {
    next("/");
  } else {
    next();
  }
});

export default router;
