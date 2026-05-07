<template>
  <div class="profile__password">
    <form @submit="onSubmit">
      <div class="row">
        <div class="col-xxl-12">
          <div class="tp-profile-input-box">
            <div class="tp-profile-input">
              <input
                id="current_password"
                type="password"
                placeholder="Tu contraseña actual"
                v-bind="currentPassword"
              />
            </div>
            <div class="tp-profile-input-title">
              <label for="current_password">Contraseña actual</label>
            </div>
            <err-message :msg="errors.current_password" />
          </div>
        </div>

        <div class="col-xxl-6 col-md-6">
          <div class="tp-profile-input-box">
            <div class="tp-profile-input">
              <input
                id="new_password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                v-bind="password"
              />
            </div>
            <div class="tp-profile-input-title">
              <label for="new_password">Nueva contraseña</label>
            </div>
            <err-message :msg="errors.password" />
          </div>
        </div>

        <div class="col-xxl-6 col-md-6">
          <div class="tp-profile-input-box">
            <div class="tp-profile-input">
              <input
                id="password_confirmation"
                type="password"
                placeholder="Repite la nueva contraseña"
                v-bind="passwordConfirmation"
              />
            </div>
            <div class="tp-profile-input-title">
              <label for="password_confirmation">Confirmar contraseña</label>
            </div>
            <err-message :msg="errors.password_confirmation" />
          </div>
        </div>

        <div class="col-xxl-12">
          <div class="profile__btn">
            <button type="submit" class="tp-btn" :disabled="loading">
              <span v-if="loading">Actualizando...</span>
              <span v-else>Actualizar contraseña</span>
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
import { useAuthStore } from '@/pinia/useAuthStore';

const auth = useAuthStore();
const loading = ref(false);

interface FormValues {
  current_password?: string;
  password?: string;
  password_confirmation?: string;
}

const { errors, handleSubmit, defineInputBinds, resetForm } = useForm<FormValues>({
  validationSchema: yup.object({
    current_password: yup
      .string()
      .required('Ingresa tu contraseña actual'),
    password: yup
      .string()
      .required('Ingresa tu nueva contraseña')
      .min(8, 'Mínimo 8 caracteres'),
    password_confirmation: yup
      .string()
      .required('Confirma tu nueva contraseña')
      .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
  }),
});

const currentPassword = defineInputBinds('current_password');
const password = defineInputBinds('password');
const passwordConfirmation = defineInputBinds('password_confirmation');

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    await auth.changePassword({
      current_password: values.current_password!,
      password: values.password!,
      password_confirmation: values.password_confirmation!,
    });
    toast.success('Contraseña actualizada');
    resetForm();
  } catch (e: unknown) {
    const err = e as { data?: { message?: string; errors?: Record<string, string[]> } };
    const msg = err?.data?.errors?.current_password?.[0]
      ?? err?.data?.errors?.password?.[0]
      ?? err?.data?.message
      ?? 'No se pudo cambiar la contraseña';
    toast.error(msg);
  } finally {
    loading.value = false;
  }
});
</script>
