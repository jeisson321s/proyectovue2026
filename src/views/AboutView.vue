<template>
  <div class="about-container">
    <h1>Acerca de PlayExpert</h1>
    <p>PlayExpert es una plataforma avanzada de pronósticos y apuestas deportivas desarrollada como proyecto académico en Vue 3.</p>
    
    <div class="info-card">
      <h3>Características de la Aplicación</h3>
      <ul>
        <li>Arquitectura modular basada en Componentes (Child Components).</li>
        <li>Renderizado dinámico de listas mediante la directiva <code>v-for</code>.</li>
        <li>Control de estados en tiempo real con condicionales <code>v-if</code> y <code>v-else</code>.</li>
        <li>Enrutamiento dinámico utilizando Vue Router.</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.about-container {
  padding: 40px;
  max-width: 700px;
  margin: 0 auto;
  color: white;
}
h1 {
  color: #00ff88;
  margin-bottom: 20px;
}
p {
  line-height: 1.6;
  color: #cccccc;
}
.info-card {
  background: #2a2a2a;
  padding: 20px;
  border-radius: 8px;
  margin-top: 25px;
  border-left: 5px solid #00ff88;
}
.info-card ul {
  margin-top: 10px;
  padding-left: 20px;
}
.info-card li {
  margin-bottom: 8px;
  color: #e0e0e0;
}
code {
  background: #1a1a1a;
  color: #00ff88;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>