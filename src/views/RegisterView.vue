<template>
  <div class="auth-container">
    <h2>Registro - PlayExpert</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label>Nombre Completo:</label>
        <input type="text" v-model="fullName" required placeholder="Tu nombre completo" />
      </div>

      <div class="form-group">
        <label>Cédula:</label>
        <input type="text" v-model="cedula" required placeholder="Número de cédula" />
      </div>

      <div class="form-group">
        <label>Número de Teléfono:</label>
        <input type="tel" v-model="phone" required placeholder="Ej: 3001234567" />
      </div>

      <div class="form-group">
        <label>Fecha de Nacimiento:</label>
        <input type="date" v-model="birthDate" required />
      </div>

      <div class="form-group">
        <label>Correo electrónico:</label>
        <input type="email" v-model="email" required placeholder="tu@email.com" />
      </div>

      <div class="form-group">
        <label>Contraseña:</label>
        <input type="password" v-model="password" required placeholder="Crea una contraseña" />
      </div>

      <button type="submit" class="btn-primary">Registrar Datos</button>
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      <p v-if="successMsg" class="success">{{ successMsg }}</p>
    </form>

    <p class="switch-auth">
      ¿Ya tienes una cuenta? 
      <router-link to="/login">Inicia sesión aquí</router-link>
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default {
  name: 'RegisterView',
  setup() {
    const fullName = ref('');
    const cedula = ref('');
    const phone = ref('');
    const birthDate = ref('');
    const email = ref('');
    const password = ref('');
    const errorMsg = ref('');
    const successMsg = ref('');

    const validateAge = (dateString) => {
      const today = new Date();
      const birthDateObj = new Date(dateString);
      let age = today.getFullYear() - birthDateObj.getFullYear();
      const monthDiff = today.getMonth() - birthDateObj.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
      }
      return age >= 18;
    };

    const handleRegister = async () => {
      try {
        errorMsg.value = '';
        successMsg.value = '';

        if (!validateAge(birthDate.value)) {
          errorMsg.value = 'Lo sentimos, debes ser mayor de edad (18 años) para registrarte.';
          return;
        }

        // Guardar en Firestore incluyendo contraseña, rol, saldo inicial y estado verificado
        await addDoc(collection(db, "usuarios"), {
          fullName: fullName.value,
          cedula: cedula.value,
          phone: phone.value,
          birthDate: birthDate.value,
          email: email.value,
          password: password.value, 
          isAdmin: false,          // Por defecto es un usuario normal
          saldo: 450000,           // Saldo inicial que aparecerá en Firebase
          cuentaVerificada: true,  // Estado de cuenta verificado por defecto
          createdAt: new Date()
        });

        successMsg.value = '¡Registro exitoso! Ya puedes iniciar sesión.';
        
        // Limpiar formulario
        fullName.value = '';
        cedula.value = '';
        phone.value = '';
        birthDate.value = '';
        email.value = '';
        password.value = '';

      } catch (error) {
        console.error("Error al guardar en Firestore: ", error);
        errorMsg.value = 'Ocurrió un error al registrar los datos.';
      }
    };

    return {
      fullName,
      cedula,
      phone,
      birthDate,
      email,
      password,
      errorMsg,
      successMsg,
      handleRegister
    };
  }
};
</script>

<style scoped>
.auth-container {
  max-width: 450px;
  margin: 40px auto;
  padding: 25px;
  background-color: #00153d;
  border-radius: 8px;
  color: white;
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
  border-radius: 4px;
  border: 1px solid #ccc;
  color: #333;
}
.btn-primary {
  width: 100%;
  padding: 10px;
  background-color: #f5c542;
  color: #00205b;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
.error {
  color: #ff6b6b;
  margin-top: 10px;
  font-weight: bold;
}
.success {
  color: #00ff88;
  margin-top: 10px;
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