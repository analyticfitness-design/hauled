<template>
  <div class="profile__address">
    <h3 class="hauled-address-title">Mi dirección de envío</h3>
    <p class="hauled-address-sub">
      Esta dirección se autocompleta en el checkout. Puedes cambiarla en cualquier momento.
    </p>

    <form @submit="onSubmit">
      <div class="row">
        <div class="col-xxl-6 col-md-6">
          <div class="profile__input-box">
            <div class="profile__input">
              <input type="text" placeholder="Nombre del destinatario" v-bind="name" />
              <span><svg-user-3/></span>
            </div>
            <err-message :msg="errors.name" />
          </div>
        </div>

        <div class="col-xxl-6 col-md-6">
          <div class="profile__input-box">
            <div class="profile__input">
              <input type="tel" placeholder="Teléfono de contacto" v-bind="phone" />
              <span><svg-phone-2/></span>
            </div>
            <err-message :msg="errors.phone" />
          </div>
        </div>

        <div class="col-xxl-6 col-md-6">
          <div class="profile__input-box">
            <div class="profile__input">
              <input type="text" placeholder="Ciudad (ej: Medellín)" v-bind="city" />
            </div>
            <err-message :msg="errors.city" />
          </div>
        </div>

        <div class="col-xxl-6 col-md-6">
          <div class="profile__input-box">
            <div class="profile__input">
              <input type="text" placeholder="Barrio (opcional)" v-bind="neighborhood" />
            </div>
          </div>
        </div>

        <div class="col-xxl-12">
          <div class="profile__input-box">
            <div class="profile__input">
              <input type="text" placeholder="Dirección (calle, número, apto)" v-bind="address" />
              <span><svg-address/></span>
            </div>
            <err-message :msg="errors.address" />
          </div>
        </div>

        <div class="col-xxl-12">
          <div class="profile__input-box">
            <div class="profile__input">
              <textarea
                placeholder="Indicaciones adicionales (opcional): puerta, color, referencia"
                v-bind="notes"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="col-xxl-12">
          <div class="profile__btn">
            <button type="submit" class="tp-btn" :disabled="loading">
              <span v-if="loading">Guardando...</span>
              <span v-else>Guardar dirección</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toast } from 'vue3-toastify';
import { useAuthStore, type UserAddress } from '@/pinia/useAuthStore';

const auth = useAuthStore();
const loading = ref(false);

interface FormValues extends UserAddress {}

const { errors, handleSubmit, defineInputBinds, setValues } = useForm<FormValues>({
  validationSchema: yup.object({
    name: yup.string().required('Nombre del destinatario requerido').min(2, 'Mínimo 2 caracteres'),
    phone: yup
      .string()
      .required('Teléfono requerido')
      .matches(/^[0-9+\s-]{7,20}$/, 'Teléfono inválido'),
    city: yup.string().required('Ciudad requerida').min(2),
    address: yup.string().required('Dirección requerida').min(5, 'Dirección demasiado corta'),
    neighborhood: yup.string().nullable(),
    notes: yup.string().nullable().max(500),
  }),
  initialValues: {
    name: auth.user?.address?.name ?? auth.user?.name ?? '',
    phone: auth.user?.address?.phone ?? auth.user?.phone ?? '',
    city: auth.user?.address?.city ?? '',
    address: auth.user?.address?.address ?? '',
    neighborhood: auth.user?.address?.neighborhood ?? '',
    notes: auth.user?.address?.notes ?? '',
  },
});

const name = defineInputBinds('name');
const phone = defineInputBinds('phone');
const city = defineInputBinds('city');
const address = defineInputBinds('address');
const neighborhood = defineInputBinds('neighborhood');
const notes = defineInputBinds('notes');

watch(
  () => auth.user,
  (u) => {
    if (!u) return;
    const a = u.address ?? {};
    setValues({
      name: a.name ?? u.name ?? '',
      phone: a.phone ?? u.phone ?? '',
      city: a.city ?? '',
      address: a.address ?? '',
      neighborhood: a.neighborhood ?? '',
      notes: a.notes ?? '',
    });
  },
  { immediate: true }
);

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    await auth.updateProfile({
      address: {
        name: values.name,
        phone: values.phone,
        city: values.city,
        address: values.address,
        neighborhood: values.neighborhood || undefined,
        notes: values.notes || undefined,
      },
    });
    toast.success('Dirección guardada');
  } catch (e: unknown) {
    const err = e as { data?: { message?: string; errors?: Record<string, string[]> } };
    const firstErr = err?.data?.errors ? Object.values(err.data.errors)[0]?.[0] : undefined;
    toast.error(firstErr ?? err?.data?.message ?? 'No se pudo guardar la dirección');
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.hauled-address-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 1.3rem;
  color: #111;
  margin-bottom: 4px;
}
.hauled-address-sub {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 30px;
}
</style>
