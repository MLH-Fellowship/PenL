import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index";
// import io from "socket.io-client";
// socket = io.connect("http://localhost:8000");

import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = false;

Vue.use(
    new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:8000')
    
  })
);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
