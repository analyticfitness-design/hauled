<template>
  <section class="tp-login-area pb-140 p-relative z-index-1 fix">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-8">
          <div class="tp-login-wrapper">

            <!-- Header -->
            <div class="tp-login-top text-center mb-30">
              <div class="hauled-login-logo">HAULED</div>
              <h3 class="tp-login-title">Ingresar a tu cuenta</h3>
              <p>
                ¿No tienes cuenta?
                <span><nuxt-link href="/register">Créala gratis</nuxt-link></span>
              </p>
            </div>

            <div class="tp-login-option">
              <div class="tp-login-mail text-center mb-30">
                <p>Ingresa con tu correo electrónico</p>
              </div>
              <forms-login-form />
            </div>

            <!-- WhatsApp alt -->
            <div class="hauled-login-whatsapp">
              <p>¿Prefieres pedir sin cuenta?</p>
              <a
                href="https://wa.me/573000000000"
                target="_blank"
                class="hauled-wa-btn"
              >
                💬 Escribir por WhatsApp
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hauled-login-logo {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 2.2rem;
  letter-spacing: 8px;
  color: #111;
  margin-bottom: 8px;
}
.hauled-login-whatsapp {
  text-align: center;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}
.hauled-login-whatsapp p {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 10px;
}
.hauled-wa-btn {
  display: inline-block;
  background: #25D366;
  color: #fff;
  font-weight: 700;
  padding: 10px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
}
</style>
