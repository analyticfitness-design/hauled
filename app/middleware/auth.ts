import { useAuthStore } from '@/pinia/useAuthStore';

// Route guard. Aplicar via `definePageMeta({ middleware: 'auth' })`.
// Si no hay token → redirige a /login con ?redirect=ruta-actual para volver post-login.
export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();

  if (!auth.isLoggedIn) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  }

  // Si hay token pero el user no se cargó aún (ej: navegación SSR fría),
  // intentamos rehidratar. Si fetchMe devuelve null → token inválido.
  if (!auth.user) {
    const me = await auth.fetchMe();
    if (!me) {
      return navigateTo({ path: '/login', query: { redirect: to.fullPath } });
    }
  }
});
