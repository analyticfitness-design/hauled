<template>
  <form @submit="onSubmit">
    <div class="tp-login-input-wrapper">
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input
            id="email"
            type="email"
            placeholder="tu@correo.com"
            v-bind="email"
          />
        </div>
        <div class="tp-login-input-title">
          <label for="email">Correo electrónico</label>
        </div>
        <err-message :msg="errors.email" />
      </div>
      <div class="tp-login-input-box">
        <div class="p-relative">
          <div class="tp-login-input">
            <input
              id="tp_password"
              :type="showPass ? 'text' : 'password'"
              name="password"
              placeholder="Mínimo 6 caracteres"
              v-bind="password"
            />
          </div>
          <div class="tp-login-input-eye" id="password-show-toggle">
            <span class="open-eye" @click="togglePasswordVisibility">
              <template v-if="showPass">
                <svg-open-eye />
              </template>
              <template v-else>
                <svg-close-eye />
              </template>
            </span>
          </div>
          <div class="tp-login-input-title">
            <label for="tp_password">Contraseña</label>
          </div>
        </div>
        <err-message :msg="errors.password" />
      </div>
    </div>
    <div class="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">
      <div class="tp-login-remeber">
        <input id="remeber" type="checkbox" />
        <label for="remeber">Recuérdame</label>
      </div>
      <div class="tp-login-forgot">
        <nuxt-link href="/forgot">¿Olvidaste tu contraseña?</nuxt-link>
      </div>
    </div>
    <div class="tp-login-bottom">
      <button type="submit" class="tp-login-btn w-100" :disabled="loading">
        <span v-if="loading">Ingresando...</span>
        <span v-else>Ingresar</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/pinia/useAuthStore";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

let showPass = ref<boolean>(false);
let loading = ref<boolean>(false);

interface IFormValues {
  email?: string | null;
  password?: string | null;
}
const { errors, handleSubmit, defineInputBinds } = useForm<IFormValues>({
  validationSchema: yup.object({
    email: yup.string().required('El correo es requerido').email('Correo no válido').label("Email"),
    password: yup.string().required('La contraseña es requerida').min(6, 'Mínimo 6 caracteres').label("Password"),
  }),
});

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  try {
    await authStore.login(values.email!, values.password!);
    toast.success(`Bienvenido, ${authStore.user?.name}`);
    const redirect = route.query.redirect as string | undefined;
    router.push(redirect ?? '/profile');
  } catch (e: any) {
    const msg = e?.data?.errors?.email?.[0]
      ?? e?.data?.message
      ?? 'Correo o contraseña incorrectos';
    toast.error(msg);
  } finally {
    loading.value = false;
  }
});

const togglePasswordVisibility = () => { showPass.value = !showPass.value; };

const email = defineInputBinds("email");
const password = defineInputBinds("password");
</script>
