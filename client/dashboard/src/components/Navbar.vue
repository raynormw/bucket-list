<template>
  <nav id="navbar">
    <nav class="navbar">
    <div class="navbar-brand">
      <div class="navbar-item">
        <img src="http://bulma.io/images/bulma-logo.png" alt="logo" width="112" height="28">
      </div>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/"> /api/stores </router-link>
        <router-link class="navbar-item" to="/goods"> /api/goods </router-link>
        <router-link class="navbar-item" to="/members"> /api/members </router-link>
        <router-link class="navbar-item" to="/baskets"> /api/basket </router-link>
        <router-link class="navbar-item" to=""> /api/carts </router-link>
      </div>
    </div>
    </nav>
  </nav>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
