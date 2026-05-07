import { defineStore } from 'pinia';
import { toast } from 'vue3-toastify';

export interface UserAddress {
  name?: string;
  phone?: string;
  city?: string;
  address?: string;
  neighborhood?: string;
  zip?: string;
  notes?: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string | null;
  address?: UserAddress | null;
  notification_preferences?: Record<string, boolean> | null;
  email_verified_at?: string | null;
  created_at?: string;
}

export interface UpdateProfilePayload {
  name?: string;
  phone?: string | null;
  address?: UserAddress | null;
  notification_preferences?: Record<string, boolean> | null;
}

export interface ChangePasswordPayload {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig();
  const router = useRouter();

  const user = ref<AuthUser | null>(null);
  const authToken = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'lax',
  });

  const isLoggedIn = computed(() => !!authToken.value);
  const isAdmin = computed(() => user.value?.role === 'admin');
  const isProvider = computed(() => user.value?.role === 'provider');
  const displayName = computed(() => user.value?.name?.split(' ')[0] ?? '');

  const apiBase = computed(() =>
    (config.public.apiBase as string) ?? 'https://api.hauled.shop'
  );

  function authHeaders(): Record<string, string> {
    return authToken.value ? { Authorization: `Bearer ${authToken.value}` } : {};
  }

  async function login(email: string, password: string): Promise<void> {
    const res = await $fetch<{ user: AuthUser; token: string }>(
      `${apiBase.value}/api/v1/auth/login`,
      { method: 'POST', body: { email, password } }
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
          headers: authHeaders(),
        });
      }
    } catch {
      // Errores de red al cerrar sesión: limpiamos local de todos modos
    } finally {
      authToken.value = null;
      user.value = null;
      toast.success('Sesión cerrada');
      router.push('/login');
    }
  }

  async function fetchMe(): Promise<AuthUser | null> {
    if (!authToken.value) return null;
    try {
      const me = await $fetch<AuthUser>(`${apiBase.value}/api/v1/auth/me`, {
        headers: authHeaders(),
      });
      user.value = me;
      return me;
    } catch (e: unknown) {
      const status = (e as { status?: number; statusCode?: number })?.status
        ?? (e as { statusCode?: number })?.statusCode;
      if (status === 401) {
        authToken.value = null;
        user.value = null;
      }
      return null;
    }
  }

  async function updateProfile(payload: UpdateProfilePayload): Promise<AuthUser> {
    const updated = await $fetch<AuthUser>(`${apiBase.value}/api/v1/profile`, {
      method: 'PUT',
      headers: authHeaders(),
      body: payload,
    });
    user.value = updated;
    return updated;
  }

  async function changePassword(payload: ChangePasswordPayload): Promise<void> {
    await $fetch<{ message: string }>(`${apiBase.value}/api/v1/profile/password`, {
      method: 'PUT',
      headers: authHeaders(),
      body: payload,
    });
  }

  return {
    user,
    authToken,
    isLoggedIn,
    isAdmin,
    isProvider,
    displayName,
    apiBase,
    authHeaders,
    login,
    register,
    logout,
    fetchMe,
    updateProfile,
    changePassword,
  };
});
