<template>
  <div id="app">
    <NavbarComponent v-if="show_nav" />
    <router-view />

    <div v-if="connected" class="text-center">
        <h1>I got this response: {{ message }}-- from the server</h1>
    </div>
    <Footer v-if="show_footer" />
  </div>
</template>

<script>
import NavbarComponent from "@/components/Navigation/Navbar.vue";
import Footer from "@/components/Navigation/Footer.vue";


export default {
  name: "App",
  components: {
    NavbarComponent,
    Footer
  },

  sockets: {
    connect: function () {
        console.log('socket connected to server')
    }
  },

  data() {
    return {
      show_footer: true,
      connected: false,
      show_nav: true,
      message: null,
      
    };
  },

  watch: {
    $route: function(value) {
      if (value.meta.hideFooter) {
        this.show_footer = false;
      } else {
        this.show_footer = true;
      }

      if (value.meta.hideNav) {
        this.show_nav = false;
      } else {
        this.show_nav = true;
      }
    }
  },

  mounted() {
    this.sockets.subscribe("success", data => {
        this.connected = true;
        this.message = data.message;
    });

    this.$socket.emit("users");
  }
};
</script>

<style></style>
