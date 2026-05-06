import { defineStore } from 'pinia';
import { toast } from 'vue3-toastify';

interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string | null;
}

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig();
  const router = useRouter();

  const user = ref<AuthUser | null>(null);
  const authToken = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 30, // 30 días
    path: '/',
    sameSite: 'lax',
  });

  const isLoggedIn = computed(() => !!authToken.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  const apiBase = computed(() =>
    (config.public.apiBase as string) ?? 'https://api.hauled.shop'
  );

  async function login(email: string, password: string): Promise<void> {
    const res = await $fetch<{ user: AuthUser; token: string }>(
      `${apiBase.value}/api/v1/auth/login`,
      {
        method: 'POST',
        body: { email, password },
      }
    );
    authToken.value = res.token;
    user.value = res.user;
  }

  async function register(name: string, email: string, password: string): Promise<void> {
    const res = await $fetch<{ user: AuthUser; token: string }>(
      `${apiBase.value}/api/v1/auth/register`,
      {
        method: 'POST',
        body: { name, email, password, password_confirmation: password },
      }
    );
    authToken.value = res.token;
    user.value = res.user;
  }

  async function logout(): Promise<void> {
    try {
      if (authToken.value) {
        await $fetch(`${apiBase.value}/api/v1/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${authToken.value}` },
        });
      }
    } catch {
      // Ignorar errores de red al cerrar sesión
    } finally {
      authToken.value = null;
      user.value = null;
      toast.success('Sesión cerrada');
      router.push('/login');
    }
  }

  async function fetchMe(): Promise<void> {
    if (!authToken.value) return;
    try {
      const me = await $fetch<AuthUser>(`${apiBase.value}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${authToken.value}` },
      });
      user.value = me;
    } catch {
      authToken.value = null;
      user.value = null;
    }
  }

  return { user, authToken, isLoggedIn, isAdmin, login, register, logout, fetchMe };
});
