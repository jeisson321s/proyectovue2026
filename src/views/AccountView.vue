<template>
  <div class="account-container">
    <h2>Mi Cuenta - PlayExpert</h2>
    
    <div v-if="loading" class="loading">
      <p>Cargando información de tu cuenta...</p>
    </div>

    <div v-else-if="userData" class="account-card">
      <div class="user-info">
        <p><strong>Nombre Completo:</strong> {{ userData.fullName }}</p>
        <p><strong>Cédula:</strong> {{ userData.cedula }}</p>
        <p><strong>Teléfono:</strong> {{ userData.phone }}</p>
        <p><strong>Fecha de Nacimiento:</strong> {{ userData.birthDate }}</p>
        <p><strong>Correo Electrónico:</strong> {{ userData.email }}</p>
        <p><strong>Rol:</strong> {{ userData.isAdmin ? 'Administrador 👑' : 'Usuario Normal ⚽' }}</p>
        <p><strong>Saldo Disponible:</strong> <span class="saldo">${{ userData.saldo || 450000 }} COP</span></p>
      </div>

      <!-- Condicional para mostrar estado de cuenta desde Firestore -->
      <div v-if="userData.cuentaVerificada" class="badge-verificado">
        ✅ Cuenta Verificada y Activa para Retiros
      </div>
      <div v-else class="badge-no-verificado">
        ⚠️ Cuenta Pendiente de Verificación de Identidad
      </div>

      <button @click="alternarVerificacion" class="btn-toggle">
        Cambiar Estado de Verificación
      </button>

      <button @click="handleLogout" class="btn-logout">
        Cerrar Sesión
      </button>
    </div>

    <div v-else class="no-auth">
      <p>No has iniciado sesión.</p>
      <router-link to="/login" class="btn-link">Iniciar Sesión</router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

export default {
  name: 'AccountView',
  setup() {
    const userData = ref(null);
    const loading = ref(true);
    const router = useRouter();
    let userId = null;

    onMounted(async () => {
      try {
        // Obtenemos el usuario guardado en la sesión local para saber su ID en Firestore
        const sessionUser = JSON.parse(localStorage.getItem('user'));
        
        if (sessionUser && sessionUser.id) {
          userId = sessionUser.id;

          // Consultamos directamente el documento más reciente en Firestore
          const docRef = doc(db, "usuarios", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            userData.value = { id: docSnap.id, ...docSnap.data() };
          } else {
            console.log("No se encontró el usuario en Firestore.");
          }
        }
      } catch (error) {
        console.error("Error al obtener datos de Firestore:", error);
      } finally {
        loading.value = false;
      }
    });

    const alternarVerificacion = async () => {
      try {
        if (!userId) return;

        // Invertir el estado actual
        const nuevoEstado = !userData.value.cuentaVerificada;

        // Actualizar directamente en Firestore
        const docRef = doc(db, "usuarios", userId);
        await updateDoc(docRef, {
          cuentaVerificada: nuevoEstado
        });

        // Reflejar el cambio en pantalla
        userData.value.cuentaVerificada = nuevoEstado;

        // Actualizar también en el localStorage para sincronizar la sesión
        const sessionUser = JSON.parse(localStorage.getItem('user'));
        sessionUser.cuentaVerificada = nuevoEstado;
        localStorage.setItem('user', JSON.stringify(sessionUser));

      } catch (error) {
        console.error("Error al actualizar la verificación en Firestore:", error);
      }
    };

    const handleLogout = () => {
      try {
        localStorage.removeItem('user');
        router.push('/login');
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };

    return {
      userData,
      loading,
      alternarVerificacion,
      handleLogout
    };
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
h2 {
  color: #f5c542;
  margin-bottom: 20px;
  text-align: center;
}
.account-card {
  background: #00153d;
  padding: 25px;
  border-radius: 8px;
  border-left: 5px solid #f5c542;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
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
  background-color: #f5c542;
  border: none;
  padding: 8px 15px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  color: #00205b;
  margin-top: 10px;
  margin-right: 10px;
}
.btn-toggle:hover {
  background-color: #e0b035;
}
.btn-logout {
  background-color: #ff4d4d;
  border: none;
  padding: 8px 15px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  color: white;
  margin-top: 10px;
}
.btn-logout:hover {
  background-color: #e03b3b;
}
.no-auth {
  text-align: center;
  background: #00153d;
  padding: 30px;
  border-radius: 8px;
}
.btn-link {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #f5c542;
  color: #00205b;
  text-decoration: none;
  font-weight: bold;
  border-radius: 4px;
}
.loading {
  text-align: center;
  font-size: 1.1rem;
  color: #a0c4ff;
}
</style>