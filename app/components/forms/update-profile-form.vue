<template>
  <form @submit="onSubmit">
    <div class="row">
      <div class="col-xxl-6 col-md-6">
        <div class="profile__input-box">
          <div class="profile__input">
            <input type="text" placeholder="Tu nombre" v-bind="name" />
            <span><svg-user-3/></span>
          </div>
          <err-message :msg="errors.name" />
        </div>
      </div>

      <div class="col-xxl-6 col-md-6">
        <div class="profile__input-box">
          <div class="profile__input">
            <input
              type="email"
              placeholder="Tu correo"
              :value="auth.user?.email"
              disabled
              readonly
            />
            <span><svg-email/></span>
          </div>
          <small class="hauled-help">El correo no se puede cambiar.</small>
        </div>
      </div>

      <div class="col-xxl-12">
        <div class="profile__input-box">
          <div class="profile__input">
            <input type="tel" placeholder="Teléfono (ej: 3001234567)" v-bind="phone" />
            <span><svg-phone-2/></span>
          </div>
          <err-message :msg="errors.phone" />
        </div>
      </div>

      <div class="col-xxl-12">
        <div class="profile__btn">
          <button type="submit" class="tp-btn" :disabled="loading">
            <span v-if="loading">Guardando...</span>
            <span v-else>Guardar cambios</span>
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toast } from 'vue3-toastify';
import { useAuthStore } from '@/pinia/useAuthStore';

const auth = useAuthStore();
const loading = ref(false);

interface FormValues {
  name?: string;
  phone?: string | null;
}

const { errors, handleSubmit, defineInputBinds, setValues } = useForm<FormValues>({
  validationSchema: yup.object({
    name: yup.string().required('El nombre es requerido').min(2, 'Mínimo 2 caracteres').max(255),
    phone: yup
      .string()
      .nullable()
      .matches(/^[0-9+\s-]{7,20}$/, {
        message: 'Teléfono inválido',
        excludeEmptyString: true,
      }),
  }),
  initialValues: {
    name: auth.user?.name ?? '',
    phone: auth.user?.phone ?? '',
  },
});

const name = defineInputBinds('name');
const phone = defineInputBinds('phone');

// Si el user llega async (tras fetchMe), poblamos el form
watch(
  () => auth.user,
  (u) => {
    if (u) setValues({ name: u.name, phone: u.phone ?? '' });
  },
  { immediate: true }
);

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    await auth.updateProfile({
      name: values.name,
      phone: values.phone || null,
    });
    toast.success('Perfil actualizado');
  } catch (e: unknown) {
    const err = e as { data?: { message?: string; errors?: Record<string, string[]> } };
    const msg = err?.data?.errors?.name?.[0]
      ?? err?.data?.errors?.phone?.[0]
      ?? err?.data?.message
      ?? 'No se pudo actualizar el perfil';
    toast.error(msg);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.hauled-help {
  display: block;
  margin-top: 4px;
  font-size: 0.75rem;
  color: #888;
}
</style>
