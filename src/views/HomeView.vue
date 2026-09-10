<template>
  <div class="home-container">
    <h1>PlayExpert - Partidos en Vivo</h1>
    
    <!-- REQUISITO: Componentes repetitivos mediante array y v-for -->
    <PartidoCard 
      v-for="(partido, index) in listaPartidos" 
      :key="index"
      :deporte="partido.deporte"
      :equipoLocal="partido.local"
      :equipoVisitante="partido.visitante"
      :enVivo="partido.enVivo"
      :minuto="partido.minuto"
      :cuota="partido.cuota"
    />
  </div>
</template>

<script>
import PartidoCard from '@/components/PartidoCard.vue';

export default {
  name: 'HomeView',
  components: {
    PartidoCard
  },
  data() {
    return {
      listaPartidos: [
        { deporte: '⚽ Fútbol', local: 'Real Madrid', visitante: 'Barcelona', enVivo: true, minuto: 78, cuota: 1.85 },
        { deporte: '🏀 Baloncesto', local: 'Lakers', visitante: 'Chicago Bulls', enVivo: false, minuto: 0, cuota: 2.10 },
        { deporte: '🎾 Tenis', local: 'Alcaraz', visitante: 'Djokovic', enVivo: true, minuto: 34, cuota: 1.95 }
      ]
    }
  }
}
</script>

<style>
body {
  background-color: #121212;
  color: white;
  font-family: Arial, sans-serif;
}
.home-container {
  padding: 30px;
  max-width: 700px;
  margin: 0 auto;
}
</style>