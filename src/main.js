import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"

import "@ast/main.css"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount("#app")

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("[Restaurant - SW] registered"))
      .catch(err =>
        console.log(
          "[Restaurant - SW] not registered, see log for details",
          err
        )
      )
  })
}
