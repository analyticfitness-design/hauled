<template>
  <div class="tp-checkout-bill-form">
    <div class="tp-checkout-bill-inner">
      <div class="row">
        <div class="col-md-6">
          <div class="tp-checkout-input">
            <label>Nombre <span>*</span></label>
            <input type="text" placeholder="Tu nombre" v-model="form.nombre" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="tp-checkout-input">
            <label>Apellido <span>*</span></label>
            <input type="text" placeholder="Tu apellido" v-model="form.apellido" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="tp-checkout-input">
            <label>Ciudad <span>*</span></label>
            <ui-nice-select
              :options="ciudades"
              name="Selecciona tu ciudad"
              :default-current="0"
              @onChange="(e: any) => form.ciudad = e.value"
            />
          </div>
        </div>
        <div class="col-md-12">
          <div class="tp-checkout-input">
            <label>Dirección de envío <span>*</span></label>
            <input type="text" placeholder="Calle, barrio, número" v-model="form.direccion" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="tp-checkout-input">
            <label>Datos adicionales (apto, torre, etc.)</label>
            <input type="text" placeholder="Opcional" v-model="form.direccion2" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="tp-checkout-input">
            <label>Teléfono / WhatsApp <span>*</span></label>
            <input type="tel" placeholder="300 000 0000" v-model="form.telefono" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="tp-checkout-input">
            <label>Correo electrónico <span>*</span></label>
            <input type="email" placeholder="tu@correo.com" v-model="form.email" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="tp-checkout-input">
            <label>Notas del pedido (opcional)</label>
            <textarea
              placeholder="Instrucciones especiales para tu pedido o entrega."
              v-model="form.notas"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  nombre: '',
  apellido: '',
  ciudad: '',
  direccion: '',
  direccion2: '',
  telefono: '',
  email: '',
  notas: '',
});

const ciudades = [
  { value: 'bucaramanga', text: 'Bucaramanga (envío gratis)' },
  { value: 'bogota', text: 'Bogotá' },
  { value: 'medellin', text: 'Medellín' },
  { value: 'cali', text: 'Cali' },
  { value: 'barranquilla', text: 'Barranquilla' },
  { value: 'cartagena', text: 'Cartagena' },
  { value: 'pereira', text: 'Pereira' },
  { value: 'manizales', text: 'Manizales' },
  { value: 'cucuta', text: 'Cúcuta' },
  { value: 'otra', text: 'Otra ciudad' },
];

defineExpose({ form });
</script>
