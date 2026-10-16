<template>
  <div class="partido-card">
    <div class="info-partido">
      <h3>{{ deporte }}</h3>
      <p class="equipos"><strong>{{ equipoLocal }}</strong> vs <strong>{{ equipoVisitante }}</strong></p>
      <p class="fecha" v-if="fecha">📅 Fecha: {{ fecha }}</p>
      
      <div v-if="enVivo" class="badge-vivo">
        🔴 EN VIVO - Minuto {{ minuto }}
      </div>
      <div v-else class="badge-no-iniciado">
        ⏰ Próximamente (Por iniciar)
      </div>
    </div>

    <!-- Botones de Cuotas 1X2 -->
    <div class="cuotas-container">
      <button 
        @click="seleccionarOpcion('Local (1)', cuotas?.local)" 
        :class="['btn-cuota', { active: opcionSeleccionada === 'Local (1)' }]"
      >
        <span>1 (Local)</span>
        <strong>{{ cuotas?.local || 'N/A' }}</strong>
      </button>

      <button 
        @click="seleccionarOpcion('Empate (X)', cuotas?.empate)" 
        :class="['btn-cuota', { active: opcionSeleccionada === 'Empate (X)' }]"
      >
        <span>X (Empate)</span>
        <strong>{{ cuotas?.empate || 'N/A' }}</strong>
      </button>

      <button 
        @click="seleccionarOpcion('Visitante (2)', cuotas?.visitante)" 
        :class="['btn-cuota', { active: opcionSeleccionada === 'Visitante (2)' }]"
      >
        <span>2 (Visitante)</span>
        <strong>{{ cuotas?.visitante || 'N/A' }}</strong>
      </button>
    </div>

    <!-- Panel para ingresar el monto a apostar -->
    <div v-if="opcionSeleccionada" class="apuesta-box">
      <p class="opcion-info">Seleccionado: <strong>{{ opcionSeleccionada }}</strong> (Cuota: {{ cuotaSeleccionada }})</p>
      
      <div class="input-group">
        <label>Monto a apostar ($): (Mínimo $5.000 COP)</label>
        <input 
          type="number" 
          v-model.number="montoApostar" 
          placeholder="Ej: 5000" 
          min="5000" 
        />
      </div>

      <p v-if="montoApostar >= 5000" class="ganancia-estimada">
        Ganancia Potencial: <strong>${{ (montoApostar * cuotaSeleccionada).toLocaleString() }} COP</strong>
      </p>

      <div class="acciones-apuesta">
        <button @click="confirmarApuesta" class="btn-confirmar">Confirmar Apuesta</button>
        <button @click="cancelarSeleccion" class="btn-cancelar">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';

export default {
  name: 'PartidoCard',
  props: {
    deporte: String,
    equipoLocal: String,
    equipoVisitante: String,
    fecha: String,
    enVivo: Boolean,
    minuto: Number,
    cuotas: Object
  },
  data() {
    return {
      opcionSeleccionada: null,
      cuotaSeleccionada: 0,
      montoApostar: 5000 // Valor por defecto sugerido
    };
  },
  methods: {
    seleccionarOpcion(opcion, cuota) {
      if (!cuota) {
        alert("Esta cuota no está disponible.");
        return;
      }
      this.opcionSeleccionada = opcion;
      this.cuotaSeleccionada = cuota;
    },
    cancelarSeleccion() {
      this.opcionSeleccionada = null;
      this.cuotaSeleccionada = 0;
      this.montoApostar = 5000;
    },
    async confirmarApuesta() {
      if (!this.montoApostar || this.montoApostar < 5000) {
        alert("El monto mínimo para apostar es de $5.000 COP.");
        return;
      }

      // Obtener el usuario autenticado desde el localStorage
      const sessionUser = JSON.parse(localStorage.getItem('user'));
      if (!sessionUser || !sessionUser.id) {
        alert("Debes iniciar sesión para poder apostar.");
        return;
      }

      try {
        // 1. Consultar el saldo actual directamente desde Firestore
        const userRef = doc(db, "usuarios", sessionUser.id);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          alert("No se encontró el usuario en la base de datos.");
          return;
        }

        const userData = userSnap.data();
        const saldoActual = userData.saldo !== undefined ? userData.saldo : 450000;

        // 2. Validar que tenga suficiente dinero disponible
        if (saldoActual < this.montoApostar) {
          alert(`Saldo insuficiente. Tu saldo actual es de $${saldoActual.toLocaleString()} COP.`);
          return;
        }

        // 3. Calcular nuevo saldo y descontar en Firestore
        const nuevoSaldo = saldoActual - this.montoApostar;

        await updateDoc(userRef, {
          saldo: nuevoSaldo
        });

        // 4. Guardar el registro de la apuesta realizada en la colección 'apuestas'
        await addDoc(collection(db, "apuestas"), {
          usuarioId: sessionUser.id,
          partido: `${this.equipoLocal} vs ${this.equipoVisitante}`,
          opcion: this.opcionSeleccionada,
          cuota: this.cuotaSeleccionada,
          monto: this.montoApostar,
          gananciaPotencial: this.montoApostar * this.cuotaSeleccionada,
          estado: 'Pendiente',
          createdAt: new Date()
        });

        // 5. Actualizar el saldo local para sincronizar la sesión en el navegador
        sessionUser.saldo = nuevoSaldo;
        localStorage.setItem('user', JSON.stringify(sessionUser));

        const gananciaFormatted = (this.montoApostar * this.cuotaSeleccionada).toLocaleString();
        alert(`¡Apuesta realizada con éxito!\n\nSe han descontado $${this.montoApostar.toLocaleString()} COP de tu cuenta.\nTu nuevo saldo es: $${nuevoSaldo.toLocaleString()} COP\nGanancia Potencial: $${gananciaFormatted} COP`);

        this.cancelarSeleccion();

      } catch (error) {
        console.error("Error al procesar la apuesta:", error);
        alert("Ocurrió un error al procesar tu apuesta. Inténtalo de nuevo.");
      }
    }
  }
}
</script>

<style scoped>
.partido-card {
  background: #00153d;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 5px solid #f5c542;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
}
.equipos {
  font-size: 1.2rem;
  margin: 8px 0;
}
.fecha {
  color: #a0c4ff;
  font-size: 0.9rem;
  margin-bottom: 8px;
}
.badge-vivo { color: #ff4d4d; font-weight: bold; margin-bottom: 15px; }
.badge-no-iniciado { color: #ffbb00; font-weight: bold; margin-bottom: 15px; }

.cuotas-container {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}
.btn-cuota {
  flex: 1;
  background-color: #002b66;
  border: 1px solid #f5c542;
  color: white;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s;
}
.btn-cuota:hover, .btn-cuota.active {
  background-color: #f5c542;
  color: #00205b;
}
.btn-cuota span {
  font-size: 0.85rem;
  opacity: 0.8;
}
.btn-cuota strong {
  font-size: 1.1rem;
  margin-top: 4px;
}

/* Caja de Apuesta */
.apuesta-box {
  margin-top: 15px;
  padding: 15px;
  background: #000c24;
  border-radius: 6px;
  border: 1px solid #00ff88;
}
.opcion-info {
  margin-bottom: 10px;
  color: #a0c4ff;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: left;
  margin-bottom: 10px;
}
.input-group input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  color: #333;
  font-size: 1rem;
}
.ganancia-estimada {
  color: #00ff88;
  margin-bottom: 12px;
}
.acciones-apuesta {
  display: flex;
  gap: 10px;
}
.btn-confirmar {
  flex: 2;
  background-color: #00ff88;
  color: #00153d;
  border: none;
  padding: 8px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
}
.btn-cancelar {
  flex: 1;
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
}
</style>