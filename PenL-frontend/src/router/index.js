import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home/Home.vue";
import Continue from "@/views/Join/Continue.vue"
import CreateRoom from "@/views/Join/CreateRoom.vue"
import RoomDetail from "@/views/Room/RoomDetail.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
        path: "/join-room",
        name: "join",
        component: Continue
    },
    {
        path: "/create-room",
        name: "create-room",
        component: CreateRoom
    },
    {
        path: "/room-detail/:room_slug",
        name: "room-detail",
        component: RoomDetail,
        props: true,
        meta: { hideFooter: true, hideNav: true }
    }
  ]
});
