/**
 * useWompi — Integración con Wompi para pagos en Colombia.
 *
 * Fase 1: Link de pago directo (sin backend) — el link se genera en el dashboard Wompi
 * Fase 2: Checkout nativo con firma de integridad y webhook (requiere backend Laravel)
 *
 * Documentación: https://docs.wompi.co
 */

export interface WompiOrderData {
  referencia: string;       // ID único del pedido (ej: HAULED-20260404-001)
  montoEnCentavos: number;  // Precio en centavos COP (ej: $120.000 = 12000000)
  moneda: 'COP';
  emailCliente: string;
  nombreCliente: string;
  telefonoCliente?: string;
  descripcion?: string;
}

/**
 * Genera la URL del widget de Wompi para redirigir al cliente al pago.
 * Requiere la PUBLIC_KEY configurada en runtimeConfig.
 */
export function useWompi() {
  const config = useRuntimeConfig();
  const publicKey = config.public.wompiPublicKey as string;
  const redirectUrl = config.public.appUrl as string;

  /**
   * Genera referencia única de pedido con timestamp
   */
  const generarReferencia = (prefijo = 'HAULED') => {
    const ts = Date.now();
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefijo}-${ts}-${rand}`;
  };

  /**
   * Construye la URL del checkout de Wompi.
   * El cliente es redirigido a Wompi y regresa a redirectUrl con el estado del pago.
   *
   * IMPORTANTE: En producción, la firma de integridad debe generarse en el backend
   * (Laravel) para no exponer el secreto. En Fase 1 se usa sin firma (modo sandbox/test).
   */
  const buildCheckoutUrl = (order: WompiOrderData): string => {
    const params = new URLSearchParams({
      'public-key': publicKey,
      currency: order.moneda,
      'amount-in-cents': String(order.montoEnCentavos),
      reference: order.referencia,
      'redirect-url': `${redirectUrl}/checkout/confirmacion?ref=${order.referencia}`,
      'customer-data:email': order.emailCliente,
      'customer-data:full-name': order.nombreCliente,
      ...(order.telefonoCliente && { 'customer-data:phone-number': order.telefonoCliente }),
    });

    return `https://checkout.wompi.co/p/?${params.toString()}`;
  };

  /**
   * Redirige al usuario al checkout de Wompi.
   */
  const redirigirAPago = (order: WompiOrderData) => {
    const url = buildCheckoutUrl(order);
    window.location.href = url;
  };

  /**
   * Consulta el estado de una transacción por referencia.
   * Usa la API pública de Wompi (no requiere secret).
   */
  const consultarTransaccion = async (referencia: string) => {
    try {
      const res = await fetch(
        `https://production.wompi.co/v1/transactions?reference=${referencia}`,
        { headers: { Authorization: `Bearer ${publicKey}` } }
      );
      const data = await res.json();
      return data?.data?.[0] ?? null;
    } catch {
      return null;
    }
  };

  return {
    generarReferencia,
    buildCheckoutUrl,
    redirigirAPago,
    consultarTransaccion,
  };
}
