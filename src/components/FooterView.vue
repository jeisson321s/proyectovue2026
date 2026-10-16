<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="logo-social">
        <div class="logo-container">
          <img :src="logoImg" alt="PlayExpert Logo" class="footer-logo">
          <div class="logo-text">PlayExpert</div>
        </div>
        <p>¡Síguenos!</p>
        <div class="redes-sociales">
          <a href="https://www.facebook.com" target="_blank">
            <img :src="facebookImg" alt="Facebook">
          </a>
          <a href="https://twitter.com" target="_blank">
            <img :src="twitterImg" alt="Twitter">
          </a>
          <a href="https://www.instagram.com/playexpert_" target="_blank">
            <img :src="instagramImg" alt="Instagram">
          </a>
        </div>
      </div>
      <div class="newsletter">
        <h2>¿Buscas Ofertas Exclusivas?</h2>
        <p>Suscríbete para recibir promociones especiales en tu correo.</p>
        <div class="subscribe">
          <input type="email" placeholder="correo@mail.com">
          <button>Suscribirme</button>
        </div>
      </div>
    </div>
  
    <div class="footer-links">
      <div>
        <h3>Deportes</h3>
        <p>Fútbol</p>
        <p>Baloncesto</p>
        <p>Tenis</p>
        <p>Boxeo</p>
      </div>
      <div>
        <h3>Apuestas</h3>
        <p>Apuestas en Vivo</p>
        <p>Apuestas Virtuales</p>
        <p>Promociones</p>
        <p>Resultados</p>
      </div>
      <div>
        <h3>Soporte</h3>
        <p>Ayuda</p>
        <p>Preguntas Frecuentes</p>
        <p>Contacto</p>
        <p>Juego Responsable</p>
      </div>
    </div>
  
    <div class="footer-bottom">
      <p>© 2026 PlayExpert Colombia. Juego responsable. Prohibida la participación de menores de edad.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterView',
  data() {
    return {
      logoImg: require('@/assets/imagenes/logo.png'),
      facebookImg: require('@/assets/imagenes/Facebook_Logo_2023.png'),
      twitterImg: require('@/assets/imagenes/Logo_of_Twitter.svg.png'),
      instagramImg: require('@/assets/imagenes/Instagram-Icon.png')
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: #001538;
  color: white;
  padding: 40px 30px 20px 30px;
  border-top: 2px solid #f5c542;
  margin-top: 50px;
}
.footer-top {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 30px;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}
.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}
.footer-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
.logo-text {
  font-size: 1.5rem;
  color: #f5c542;
  font-weight: bold;
}
.logo-social p {
  margin: 10px 0;
  color: #cccccc;
}
.redes-sociales {
  display: flex;
  gap: 15px;
  align-items: center;
}
.redes-sociales img {
  width: 28px;
  height: 28px;
  object-fit: contain;
  transition: transform 0.2s;
}
.redes-sociales img:hover {
  transform: scale(1.1);
}
.newsletter h2 {
  color: #f5c542;
  font-size: 1.3rem;
  margin-bottom: 8px;
}
.newsletter p {
  color: #cccccc;
  margin-bottom: 12px;
}
.subscribe {
  display: flex;
  gap: 10px;
}
.subscribe input {
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  outline: none;
}
.subscribe button {
  background-color: #f5c542;
  color: #00205b;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
.footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 30px;
  max-width: 1100px;
  margin: 0 auto 30px auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 30px;
}
.footer-links h3 {
  color: #f5c542;
  margin-bottom: 12px;
  font-size: 1.1rem;
}
.footer-links p {
  color: #aaaaaa;
  font-size: 0.9rem;
  margin-bottom: 6px;
}
.footer-bottom {
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  color: #888888;
  font-size: 0.85rem;
}
</style>