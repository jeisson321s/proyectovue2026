<template>
  <div class="account-container">
    <h1>Mi Cuenta - PlayExpert</h1>
    
    <div class="account-card">
      <div class="user-info">
        <p><strong>Usuario:</strong> Estudiante PlayExpert</p>
        <p><strong>Correo:</strong> usuario@playexpert.com</p>
        <p><strong>Saldo Disponible:</strong> <span class="saldo">$450.000 COP</span></p>
      </div>

      <!-- REQUISITO: Condicional v-if / v-else para mostrar estado de cuenta -->
      <div v-if="cuentaVerificada" class="badge-verificado">
        ✅ Cuenta Verificada y Activa para Retiros
      </div>
      <div v-else class="badge-no-verificado">
        ⚠️ Cuenta Pendiente de Verificación de Identidad
      </div>

      <button @click="alternarVerificacion" class="btn-toggle">
        Cambiar Estado de Verificación
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountView',
  data() {
    return {
      cuentaVerificada: true
    }
  },
  methods: {
    alternarVerificacion() {
      this.cuentaVerificada = !this.cuentaVerificada;
    }
  }
}
</script>

<style scoped>
.account-container {
  padding: 40px;
  max-width: 700px;
  margin: 0 auto;
  color: white;
}
h1 {
  color: #00ff88;
  margin-bottom: 20px;
}
.account-card {
  background: #2a2a2a;
  padding: 25px;
  border-radius: 8px;
  border-left: 5px solid #00ff88;
}
.user-info p {
  font-size: 1.1rem;
  margin-bottom: 12px;
}
.saldo {
  color: #00ff88;
  font-weight: bold;
}
.badge-verificado {
  color: #00ff88;
  font-weight: bold;
  margin: 15px 0;
}
.badge-no-verificado {
  color: #ffbb00;
  font-weight: bold;
  margin: 15px 0;
}
.btn-toggle {
  background-color: #00ff88;
  border: none;
  padding: 8px 15px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  color: #121212;
  margin-top: 10px;
}
</style>