<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Correo electrónico:</label>
        <input 
          type="email" 
          v-model="email" 
          required 
          placeholder="tu@email.com" 
        />
      </div>

      <div class="form-group">
        <label>Contraseña:</label>
        <input 
          type="password" 
          v-model="password" 
          required 
          placeholder="Tu contraseña" 
        />
      </div>

      <button type="submit" class="btn-primary">Entrar</button>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    </form>

    <p class="switch-auth">
      ¿No tienes una cuenta? 
      <router-link to="/register">Regístrate aquí</router-link>
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { db } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMsg = ref('');
    const router = useRouter();

    const handleLogin = async () => {
      try {
        errorMsg.value = '';

        // Consultar directamente en la colección 'usuarios' de Firestore por correo
        const q = query(collection(db, "usuarios"), where("email", "==", email.value.trim()));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = { id: userDoc.id, ...userDoc.data() };

          // Validar que la contraseña coincida con la almacenada
          if (userData.password === password.value) {
            // Guardar los datos del usuario en el localStorage para la sesión
            localStorage.setItem('user', JSON.stringify(userData));

            // Redirigir dependiendo de si es administrador o un usuario normal
            if (userData.isAdmin) {
              router.push('/admin');
            } else {
              router.push('/apuestas');
            }
          } else {
            errorMsg.value = 'Contraseña incorrecta.';
          }
        } else {
          errorMsg.value = 'No se encontró ninguna cuenta registrada con este correo.';
        }
      } catch (error) {
        console.error("Error al iniciar sesión en Firestore:", error);
        errorMsg.value = 'Ocurrió un error al iniciar sesión. Inténtalo de nuevo.';
      }
    };

    return {
      email,
      password,
      errorMsg,
      handleLogin
    };
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 25px;
  background-color: #00153d;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
}

.btn-primary {
  width: 100%;
  padding: 10px;
  background-color: #f5c542;
  color: #00205b;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-primary:hover {
  background-color: #e0b030;
}

.error {
  color: #ff6b6b;
  margin-top: 10px;
  font-size: 0.9rem;
  font-weight: bold;
}

.switch-auth {
  margin-top: 15px;
  font-size: 0.9rem;
  text-align: center;
}

.switch-auth a {
  color: #f5c542;
  text-decoration: underline;
}
</style>