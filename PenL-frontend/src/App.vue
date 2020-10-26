<template>
  <div id="app">
    <NavbarComponent v-if="show_nav" />
    <router-view />
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
    connect: function() {
      console.log("socket connected to server");
      this.$socket.emit("users");
    }
  },

  data() {
    return {
      show_footer: true,
      show_nav: true
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
  }
};
</script>

<style></style>
