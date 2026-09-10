<template>
  <div class="partido-card">
    <h3>{{ deporte }}</h3>
    <p><strong>{{ equipoLocal }} vs {{ equipoVisitante }}</strong></p>
    
    <div v-if="enVivo" class="badge-vivo">
      🔴 EN VIVO - Minuto {{ minuto }}
    </div>
    <div v-else class="badge-no-iniciado">
      ⏰ Próximamente (Por iniciar)
    </div>

    <button @click="apostar" class="btn-apostar">Apostar Cuota: {{ cuota }}</button>
  </div>
</template>

<script>
export default {
  name: 'PartidoCard',
  props: {
    deporte: String,
    equipoLocal: String,
    equipoVisitante: String,
    enVivo: Boolean,
    minuto: Number,
    cuota: Number
  },
  methods: {
    apostar() {
      alert(`¡Apuesta seleccionada para ${this.equipoLocal} vs ${this.equipoVisitante}!`);
    }
  }
}
</script>

<style scoped>
.partido-card {
  background: #2a2a2a;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  border-left: 5px solid #00ff88;
}
.badge-vivo { color: #ff4444; font-weight: bold; }
.badge-no-iniciado { color: #ffbb00; font-weight: bold; }
.btn-apostar {
  background-color: #00ff88;
  border: none;
  padding: 8px 15px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 4px;
}
</style>