import { createRouter, createWebHistory } from "vue-router"
import DashboardView from "../views/DashboardView.vue"
import LoginView from "../views/LoginView.vue"

import { useUserActions } from "@/stores/auth"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
})

router.beforeEach((to, _, next) => {
  const { checkIfLoggedIn, logout } = useUserActions()
  const isLoggedIn = checkIfLoggedIn()

  if (!isLoggedIn && to.name !== "login") {
    logout()
    return next({ name: "login" })
  } else if (!!isLoggedIn && to.name === "login")
    return next({ name: "dashboard" })

  next()
})

export default router
