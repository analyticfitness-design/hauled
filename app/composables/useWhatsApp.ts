export function useWhatsApp() {
  const adminNumber = '573124904720'

  type Template = 'order_inquiry' | 'encargo_inquiry' | 'product_inquiry' | 'support'

  function link(template: Template, params: Record<string, string> = {}): string {
    const templates: Record<Template, string> = {
      order_inquiry:   `Hola HAULED, quiero info sobre mi pedido ${params.reference ?? ''}`,
      encargo_inquiry: `Hola HAULED, quiero hacer un encargo: ${params.description ?? ''}`,
      product_inquiry: `Hola HAULED, info sobre ${params.product_title ?? ''}`,
      support:         `Hola HAULED, necesito ayuda con: ${params.issue ?? ''}`,
    }
    const text = templates[template].trim().slice(0, 1000)
    return `https://wa.me/${adminNumber}?text=${encodeURIComponent(text)}`
  }

  function openChat(template: Template, params: Record<string, string> = {}): void {
    window.open(link(template, params), '_blank', 'noopener,noreferrer')
  }

  return { link, openChat, adminNumber }
}
