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
        <li><router-link to="/login" class="btn-login">Iniciar Sesión</router-link></li>
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
  align-items: center;
  margin: 0;
  padding: 0;
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
.btn-login {
  background-color: #f5c542;
  color: #00205b !important;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;
}
.btn-login:hover {
  background-color: #e0b035;
}
</style>