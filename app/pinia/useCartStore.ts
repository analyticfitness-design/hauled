import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import type { IProduct } from "@/types/product-type";

export const useCartStore = defineStore("cart_product", () => {
  const route = useRoute();
  let cart_products = ref<IProduct[]>([]);
  let orderQuantity = ref<number>(1);
  let cartOffcanvas = ref<boolean>(false);

  const CART_TTL_MS = 24 * 60 * 60 * 1000;

  const saveCart = () => {
    localStorage.setItem('cart_products', JSON.stringify({
      items: cart_products.value,
      savedAt: Date.now(),
    }));
  };

  const addCartProduct = (payload: IProduct) => {
    const isExist = cart_products.value.some((i) => i.id === payload.id);
    if (payload.status === 'out-of-stock') {
      toast.error(`${payload.title} está agotado`);
    } else if (!isExist) {
      cart_products.value.push({ ...payload, orderQuantity: 1 });
      const msg = payload.hauledLine === 'encargo'
        ? `Encargo de ${payload.title} agregado`
        : `${payload.title} agregado al carrito`;
      toast.success(msg);
    } else {
      cart_products.value = cart_products.value.map((item) => {
        if (item.id === payload.id && typeof item.orderQuantity !== "undefined") {
          if (item.quantity >= item.orderQuantity + orderQuantity.value) {
            item.orderQuantity += orderQuantity.value !== 1 ? orderQuantity.value : 1;
            toast.success(`${item.title} actualizado`);
          } else {
            toast.error(`No hay más unidades disponibles`);
            orderQuantity.value = 1;
          }
        }
        return { ...item };
      });
    }
    saveCart();
  };

  const increment = () => { orderQuantity.value += 1; };
  const decrement = () => { orderQuantity.value = orderQuantity.value > 1 ? orderQuantity.value - 1 : 1; };

  const quantityDecrement = (payload: IProduct) => {
    cart_products.value = cart_products.value.map((item) => {
      if (item.id === payload.id && typeof item.orderQuantity !== "undefined" && item.orderQuantity > 1) {
        item.orderQuantity -= 1;
      }
      return { ...item };
    });
    saveCart();
  };

  const removeCartProduct = (payload: IProduct) => {
    cart_products.value = cart_products.value.filter((p) => p.id !== payload.id);
    toast.info(`${payload.title} eliminado del carrito`);
    saveCart();
  };

  const clear_cart = () => {
    cart_products.value = [];
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('cart_products');
    }
    toast.info('Carrito vaciado');
  };

  const initialOrderQuantity = () => { orderQuantity.value = 1; };

  const initializeCartProducts = () => {
    try {
      const raw = localStorage.getItem('cart_products');
      if (!raw) return;
      const parsed = JSON.parse(raw);
      // Formato antiguo (array plano) o nuevo ({ items, savedAt })
      const items = Array.isArray(parsed) ? parsed : parsed?.items;
      const savedAt: number = Array.isArray(parsed) ? 0 : (parsed?.savedAt ?? 0);
      if (items && Date.now() - savedAt < CART_TTL_MS) {
        cart_products.value = items;
      } else {
        localStorage.removeItem('cart_products');
      }
    } catch {
      localStorage.removeItem('cart_products');
    }
  };

  // Total separado: items de stock vs encargos (encargos no suman al total de pago)
  const totalPriceQuantity = computed(() => {
    return cart_products.value.reduce(
      (acc, item) => {
        const { price, orderQuantity, hauledLine } = item;
        if (typeof orderQuantity !== "undefined" && hauledLine !== 'encargo') {
          acc.total += price * orderQuantity;
          acc.quantity += orderQuantity;
        }
        if (hauledLine === 'encargo') {
          acc.encargos += orderQuantity ?? 1;
        }
        return acc;
      },
      { total: 0, quantity: 0, encargos: 0 }
    );
  });

  const handleCartOffcanvas = () => { cartOffcanvas.value = !cartOffcanvas.value; };

  onMounted(() => { initializeCartProducts(); });

  watch(() => route.path, () => { orderQuantity.value = 1; });

  return {
    addCartProduct,
    cart_products,
    quantityDecrement,
    removeCartProduct,
    clear_cart,
    initialOrderQuantity,
    totalPriceQuantity,
    handleCartOffcanvas,
    cartOffcanvas,
    orderQuantity,
    increment,
    decrement,
  };
});
