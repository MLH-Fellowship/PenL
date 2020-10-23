<template>
  <nav
    class="navbar navbar-expand-lg py-3  px-4 px-md-5 my-navbar mb-5 fixed-top "
    id="header"
  >
    <router-link :to="{ name: 'home' }" class="navbar-brand">
      <img src="@/assets/brand/logo-new.png" class="brand" alt="logo" />
      
    </router-link>

    <div class="ml-auto">
      <router-link :to="{ name: 'home' }" class="navbar-brand">
        PNL
      </router-link>
    </div>
    
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",

  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  }
};
</script>

<style scoped>
.my-navbar {
  font-size: 1.4rem;
  letter-spacing: 1px;
  color: white;
  background-color: #0a192f;
}

.navbar-brand {
  font-size: 2.5rem;
  color: #64ffda;
  font-family: 'Marko One', serif;
  letter-spacing: 3px;
}
</style>
