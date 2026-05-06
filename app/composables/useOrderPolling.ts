const FIBONACCI_INTERVALS_MS = [3000, 5000, 8000, 13000, 21000, 34000, 55000];

export type PaymentStatus = 'pending' | 'processing' | 'approved' | 'declined' | 'error' | 'refunded';

export interface PaymentStatusResponse {
  reference: string;
  status: PaymentStatus;
  amount_in_cents: number;
  currency: string;
  finalized_at: string | null;
}

export function useOrderPolling() {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase as string;

  const status = ref<PaymentStatus | 'loading'>('loading');
  const paymentData = ref<PaymentStatusResponse | null>(null);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const TERMINAL_STATUSES: PaymentStatus[] = ['approved', 'declined', 'error', 'refunded'];

  const pollStatus = async (reference: string, intervalIndex = 0): Promise<void> => {
    try {
      const res = await $fetch<PaymentStatusResponse>(
        `${apiBase}/api/v1/payments/${reference}/status`
      );
      paymentData.value = res;
      status.value = res.status;

      if (TERMINAL_STATUSES.includes(res.status)) return;

      if (intervalIndex < FIBONACCI_INTERVALS_MS.length) {
        timeoutId = setTimeout(
          () => pollStatus(reference, intervalIndex + 1),
          FIBONACCI_INTERVALS_MS[intervalIndex]
        );
      } else {
        // Agotados todos los intervalos (~2:19min total), dejar en pending
        status.value = 'pending';
      }
    } catch {
      status.value = 'error';
    }
  };

  const startPolling = (reference: string) => {
    status.value = 'loading';
    pollStatus(reference);
  };

  const stopPolling = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  onUnmounted(stopPolling);

  return { status, paymentData, startPolling, stopPolling };
}
