<template>
  <header class="header">
    <div class="logo">
      <span class="logo-text">PlayExpert</span>
    </div>
    <nav class="nav">
      <ul>
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/apuestas">Apuestas</router-link></li>
        <li><router-link to="/about">Acerca de</router-link></li>
        <li><router-link to="/account">Mi Cuenta</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NavbarView'
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00205b;
  padding: 15px 30px;
  border-bottom: 2px solid #f5c542;
}
.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #f5c542;
}
.nav ul {
  display: flex;
  list-style: none;
  gap: 20px;
}
.nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
.nav a:hover,
.nav a.router-link-exact-active {
  color: #f5c542;
}
</style>