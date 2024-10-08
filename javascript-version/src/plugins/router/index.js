import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("Authorization") !== null;

  const publicPages = ["/login", "/register", "/findId", "/findPassword"];

  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !isAuthenticated) {
    return next({ path: "/login" });
  }

  if (!authRequired && isAuthenticated) {
    return next({ path: "/home" });
  }

  next();
});

export default function (app) {
  app.use(router)
}
export { router }