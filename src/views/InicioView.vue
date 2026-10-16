<template>
  <div class="inicio-container">
    <!-- Sección de video de fondo en pantalla entera -->
    <div class="hero-video">
      <video class="bg-video" autoplay muted loop playsinline>
        <source src="@/assets/Videos/VIDEO.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>
      <div class="hero-content">
        <h1>¡Las Mejores Apuestas Deportivas!</h1>
        <p>Gana grande con PlayExpert. Las mejores cuotas en fútbol, baloncesto, tenis y más. ¡Regístrate ahora y obtén un bono de bienvenida de hasta $500.000!</p>
        <router-link to="/apuestas" class="btn">Regístrate y Gana</router-link>
      </div>
    </div>

    <!-- Sección de Apuestas en Vivo -->
    <section class="apuestas-live">
      <h2>Apuestas en Vivo</h2>
      <div class="live-contenido">
        <div v-for="(live, index) in apuestasEnVivo" :key="index" class="live-item">
          <div class="component-img">
            <img :src="live.imagen" :alt="live.titulo">
            <div class="live-badge">EN VIVO</div>
          </div>
          <div class="contenido">
            <h3>{{ live.titulo }}</h3>
            <p>{{ live.descripcion }}</p>
            <router-link to="/apuestas" class="btn">Apuesta Ahora</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'InicioView',
  data() {
    return {
      apuestasEnVivo: [
        { 
          titulo: "Liga PlayExpert", 
          descripcion: "Sigue el partido en tiempo real y apuesta mientras se desarrolla la acción. Millonarios vs Nacional.",
          imagen: require('@/assets/imagenes/Millonarios_vs_Nacional.jpg')
        },
        { 
          titulo: "NBA Basketball", 
          descripcion: "No te pierdas la emocionante temporada de la NBA. Apuesta en vivo con las mejores cuotas.",
          imagen: require('@/assets/imagenes/Warriors_vs_Lakers_envivo.jpg')
        },
        { 
          titulo: "Clásico Sudamericano de Clubes", 
          descripcion: "Sigue la acción punto a punto. Apuesta en directo al ganador del set o del partido. Power Arregoces vs. U. Católica",
          imagen: require('@/assets/imagenes/Power_Arregoces_vs_U_Católica.jpg')
        },
        { 
          titulo: "US Open - Cuartos de Final", 
          descripcion: "Apuesta al próximo juego, al ganador del set o al resultado final del partido. Alcaraz vs. Sinner",
          
        }
      ]
    }
  }
}
</script>

<style scoped>
.inicio-container {
  color: white;
  width: 100%;
}

.hero-video {
  position: relative;
  width: 100vw;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  margin-bottom: 40px;
}

.bg-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: 1;
  filter: brightness(0.4);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 20px;
  text-align: center;
}

.hero-content h1 {
  font-size: 2.8rem;
  margin-bottom: 15px;
  color: #f5c542;
}

.hero-content p {
  font-size: 1.1rem;
  color: #dddddd;
  margin-bottom: 25px;
  line-height: 1.5;
}

.btn {
  background-color: #f5c542;
  color: #00205b;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  transition: background 0.3s;
}

.btn:hover {
  background-color: #e5b532;
}

.apuestas-live {
  max-width: 1100px;
  margin: 0 auto 40px auto;
  padding: 0 20px;
}

.apuestas-live h2 {
  color: #f5c542;
  margin-bottom: 20px;
  text-align: center;
  font-size: 2rem;
}

.live-contenido {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.live-item {
  background: #1a2a40;
  border: 1px solid #f5c542;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.component-img {
  position: relative;
  width: 100%;
  height: 150px;
}

.component-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.live-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff3333;
  color: white;
  padding: 3px 8px;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 4px;
}

.contenido {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}

.live-item h3 {
  color: #f5c542;
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.live-item p {
  color: #cccccc;
  font-size: 0.85rem;
  margin-bottom: 15px;
}
</style>