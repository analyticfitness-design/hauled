<template>
  <section class="hauled-lines">
    <div class="container">
      <div class="hauled-lines-header">
        <h2 class="hauled-lines-title">Nuestras Líneas</h2>
        <p class="hauled-lines-sub">Tres formas de vestir desde USA</p>
      </div>
      <div class="hauled-lines-grid">

        <!-- Originals -->
        <nuxt-link to="/shop?hauledLine=originals" class="hauled-line-card hauled-line-originals">
          <div class="hauled-line-icon">🇺🇸</div>
          <h3 class="hauled-line-name">Originals</h3>
          <p class="hauled-line-desc">Stock real comprado en outlets de USA. Nike, Gap, Tommy, Jordan, Adidas — prendas auténticas con etiquetas originales.</p>
          <div class="hauled-line-cta">Ver colección →</div>
        </nuxt-link>

        <!-- Basics -->
        <nuxt-link to="/shop?hauledLine=basics" class="hauled-line-card hauled-line-basics">
          <div class="hauled-line-icon">✦</div>
          <h3 class="hauled-line-name">Basics</h3>
          <p class="hauled-line-desc">Prendas premium de marca propia HAULED. Oversize, streetwear minimalista. Calidad de exportación a precios directos.</p>
          <div class="hauled-line-cta">Ver basics →</div>
        </nuxt-link>

        <!-- Encargos -->
        <nuxt-link to="/shop?hauledLine=encargo" class="hauled-line-card hauled-line-encargo">
          <div class="hauled-line-icon">📦</div>
          <h3 class="hauled-line-name">Encargos</h3>
          <p class="hauled-line-desc">¿Quieres algo que no tenemos en stock? Dinos qué y lo traemos. Tallas, colores, modelos especiales. 15–25 días.</p>
          <div class="hauled-line-cta">Hacer encargo →</div>
        </nuxt-link>

      </div>
    </div>
  </section>
</template>

<style scoped>
.hauled-lines {
  padding: 80px 0;
  background: #fff;
}
.hauled-lines-header {
  text-align: center;
  margin-bottom: 48px;
}
.hauled-lines-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 2rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #111;
  margin-bottom: 8px;
}
.hauled-lines-sub {
  font-family: 'Inter', sans-serif;
  color: #888;
  font-size: 0.95rem;
}
.hauled-lines-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media (max-width: 768px) {
  .hauled-lines-grid { grid-template-columns: 1fr; }
}
.hauled-line-card {
  padding: 40px 32px;
  border-radius: 8px;
  text-decoration: none;
  display: block;
  transition: transform 0.2s, box-shadow 0.2s;
}
.hauled-line-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.1); }
.hauled-line-originals {
  background: #0d2233;
  color: #fff;
}
.hauled-line-basics {
  background: #f4f4f4;
  color: #111;
}
.hauled-line-encargo {
  background: #111;
  color: #fff;
  border: 1px solid #4cc9f0;
}
.hauled-line-icon {
  font-size: 2rem;
  margin-bottom: 16px;
}
.hauled-line-name {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 1.4rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.hauled-line-originals .hauled-line-name { color: #4cc9f0; }
.hauled-line-basics .hauled-line-name { color: #111; }
.hauled-line-encargo .hauled-line-name { color: #4cc9f0; }
.hauled-line-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 24px;
  opacity: 0.85;
}
.hauled-line-cta {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.hauled-line-originals .hauled-line-cta { color: #4cc9f0; }
.hauled-line-basics .hauled-line-cta { color: #4cc9f0; }
.hauled-line-encargo .hauled-line-cta { color: #4cc9f0; }
</style>
