import { createRouter, createWebHistory } from "vue-router"
import DashboardView from "../views/DashboardView.vue"
import LoginView from "../views/LoginView.vue"
import ModalView from "../views/ModalView.vue"

import { useAuthActions } from "@/stores/auth"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
      children: [
        {
          path: ":type/:keyName",
          component: ModalView,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
})

router.beforeEach((to, _, next) => {
  const { checkIfLoggedIn, logout } = useAuthActions()
  const isLoggedIn = checkIfLoggedIn()

  if (!isLoggedIn && to.name !== "login") {
    logout()
    return next({ name: "login" })
  } else if (!!isLoggedIn && to.name === "login")
    return next({ name: "dashboard" })

  next()
})

export default router
