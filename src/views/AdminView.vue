<template>
  <div class="admin-container">
    <h2>Panel de Administrador - Crear Partido</h2>
    <form @submit.prevent="crearPartido">
      <div class="form-group">
        <label>Equipo Local:</label>
        <input type="text" v-model="equipoLocal" required placeholder="Ej: Boyacá Chicó" />
      </div>

      <div class="form-group">
        <label>Equipo Visitante:</label>
        <input type="text" v-model="equipoVisitante" required placeholder="Ej: Atlético Nacional" />
      </div>

      <div class="form-group">
        <label>Fecha del Partido:</label>
        <input type="date" v-model="fechaPartido" required />
      </div>

      <div class="cuotas-row">
        <div class="form-group">
          <label>Cuota Local (1):</label>
          <input type="number" step="0.01" v-model.number="cuotaLocal" required placeholder="Ej: 6.75" />
        </div>

        <div class="form-group">
          <label>Cuota Empate (X):</label>
          <input type="number" step="0.01" v-model.number="cuotaEmpate" required placeholder="Ej: 4.10" />
        </div>

        <div class="form-group">
          <label>Cuota Visitante (2):</label>
          <input type="number" step="0.01" v-model.number="cuotaVisitante" required placeholder="Ej: 1.55" />
        </div>
      </div>

      <button type="submit" class="btn-primary">Publicar Partido para Apuestas</button>
      <p v-if="mensaje" class="success">{{ mensaje }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default {
  name: 'AdminView',
  setup() {
    const equipoLocal = ref('');
    const equipoVisitante = ref('');
    const fechaPartido = ref('');
    const cuotaLocal = ref('');
    const cuotaEmpate = ref('');
    const cuotaVisitante = ref('');
    const mensaje = ref('');

    const crearPartido = async () => {
      try {
        await addDoc(collection(db, "partidos"), {
          equipoLocal: equipoLocal.value,
          equipoVisitante: equipoVisitante.value,
          fechaPartido: fechaPartido.value,
          cuotas: {
            local: cuotaLocal.value,
            empate: cuotaEmpate.value,
            visitante: cuotaVisitante.value
          },
          estado: 'Disponible',
          createdAt: new Date()
        });
        
        mensaje.value = '¡Partido creado y publicado con éxito!';
        
        // Limpiar formulario
        equipoLocal.value = '';
        equipoVisitante.value = '';
        fechaPartido.value = '';
        cuotaLocal.value = '';
        cuotaEmpate.value = '';
        cuotaVisitante.value = '';
      } catch (error) {
        console.error("Error al crear partido:", error);
        mensaje.value = 'Error al publicar el partido.';
      }
    };

    return { 
      equipoLocal, 
      equipoVisitante, 
      fechaPartido, 
      cuotaLocal, 
      cuotaEmpate, 
      cuotaVisitante, 
      mensaje, 
      crearPartido 
    };
  }
};
</script>

<style scoped>
.admin-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background-color: #00153d;
  color: white;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 15px;
  text-align: left;
}
.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ccc;
  color: #333;
}
.cuotas-row {
  display: flex;
  gap: 15px;
}
.btn-primary {
  width: 100%;
  padding: 12px;
  background-color: #f5c542;
  color: #00205b;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
.success {
  color: #00ff88;
  margin-top: 10px;
  font-weight: bold;
}
</style>