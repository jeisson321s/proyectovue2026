<template>
  <div class="apuestas-container">
    <h1>Panel de Apuestas en Vivo</h1>
    
    <!-- Bloque si no hay sesión activa -->
    <div v-if="!usuarioAutenticado" class="alert-box">
      <p>⚠️ Debes iniciar sesión para poder visualizar los partidos y realizar apuestas.</p>
      <router-link to="/login" class="btn-login">Ir a Iniciar Sesión</router-link>
    </div>

    <!-- Bloque si SÍ hay sesión activa -->
    <div v-else>
      <div v-if="listaPartidos.length === 0" class="no-data">
        No hay partidos disponibles en este momento. Vuelve más tarde o espera a que el administrador publique nuevos eventos.
      </div>

      <div v-else>
        <PartidoCard 
          v-for="partido in listaPartidos" 
          :key="partido.id"
          :deporte="'⚽ Fútbol'"
          :equipoLocal="partido.equipoLocal"
          :equipoVisitante="partido.equipoVisitante"
          :fecha="partido.fechaPartido"
          :cuotas="partido.cuotas"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import PartidoCard from '@/components/PartidoCard.vue';

export default {
  name: 'ApuestasView',
  components: {
    PartidoCard
  },
  setup() {
    const listaPartidos = ref([]);
    const usuarioAutenticado = ref(false);

    onMounted(async () => {
      // 1. Validar si existe una sesión activa en el localStorage
      const sessionUser = localStorage.getItem('user');

      if (sessionUser) {
        usuarioAutenticado.value = true;

        // 2. Si está autenticado, cargamos los partidos desde Firestore
        try {
          const querySnapshot = await getDocs(collection(db, "partidos"));
          listaPartidos.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
        } catch (error) {
          console.error("Error al cargar los partidos desde Firestore:", error);
        }
      } else {
        usuarioAutenticado.value = false;
      }
    });

    return {
      listaPartidos,
      usuarioAutenticado
    };
  }
}
</script>

<style scoped>
.apuestas-container {
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
  color: white;
}
h1 {
  color: #00ff88;
  margin-bottom: 20px;
}
.no-data {
  color: #ccc;
  font-style: italic;
  margin-top: 20px;
  text-align: center;
}
.alert-box {
  background-color: #00153d;
  padding: 30px;
  border-radius: 8px;
  border: 1px solid #ff6b6b;
  margin-top: 20px;
  text-align: center;
}
.btn-login {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #f5c542;
  color: #00205b;
  font-weight: bold;
  text-decoration: none;
  border-radius: 4px;
}
</style>