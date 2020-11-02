import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index";
import { API_URL } from "@/common/api.service.js";

import SocketIO from "socket.io-client";
import VueSocketIO from "vue-socket.io";

Vue.config.productionTip = false;

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO(API_URL)
  })
);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
