<template>
  <div id="app">
    <!-- Navbar global para todas las vistas -->
    <NavbarView />
    
    <!-- Aquí se renderizan las vistas según la ruta activa -->
    <router-view/>

    <!-- Footer global para todas las vistas -->
    <FooterView />
  </div>
</template>

<script>
import NavbarView from '@/components/NavbarView.vue';
import FooterView from '@/components/FooterView.vue';

export default {
  name: 'App',
  components: {
    NavbarView,
    FooterView
  }
}
</script>

<style>
body {
  margin: 0;
  background-color: #00205b;
  color: white;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>