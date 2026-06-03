// app/composables/useReveal.ts
// IntersectionObserver que añade .is-in cuando el elemento entra en viewport.
// La visibilidad en reposo NO depende de esto: el CSS base ya es visible
// (ver _motion.scss). Esto solo dispara el gesto cuando se puede.
import { onMounted, onBeforeUnmount, type Ref } from 'vue';

export function useReveal(el: Ref<HTMLElement | null>, opts: { threshold?: number; once?: boolean } = {}) {
  const { threshold = 0.2, once = true } = opts;
  let io: IntersectionObserver | null = null;

  onMounted(() => {
    if (!el.value || typeof IntersectionObserver === 'undefined') {
      el.value?.classList.add('is-in');
      return;
    }
    io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          if (once) io?.unobserve(e.target);
        }
      }
    }, { threshold });
    io.observe(el.value);
  });

  onBeforeUnmount(() => io?.disconnect());
}
