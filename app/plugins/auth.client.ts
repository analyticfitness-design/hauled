import { useAuthStore } from '@/pinia/useAuthStore';

// Rehidrata el usuario al cargar la app si hay cookie con token.
// .client.ts → solo corre en el navegador (la cookie con el token está en navegador).
export default defineNuxtPlugin(async () => {
  const auth = useAuthStore();

  // Si hay token pero no hay user en memoria → llamar GET /auth/me
  if (auth.isLoggedIn && !auth.user) {
    await auth.fetchMe();
  }
});
