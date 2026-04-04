import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import type { IProduct } from "@/types/product-type";

export const useCartStore = defineStore("cart_product", () => {
  const route = useRoute();
  let cart_products = ref<IProduct[]>([]);
  let orderQuantity = ref<number>(1);
  let cartOffcanvas = ref<boolean>(false);

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
    localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
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
    localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
  };

  const removeCartProduct = (payload: IProduct) => {
    cart_products.value = cart_products.value.filter((p) => p.id !== payload.id);
    toast.info(`${payload.title} eliminado del carrito`);
    localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
  };

  const clear_cart = () => {
    if (window.confirm("¿Vaciar el carrito?")) {
      cart_products.value = [];
      localStorage.setItem("cart_products", JSON.stringify([]));
    }
  };

  const initialOrderQuantity = () => { orderQuantity.value = 1; };

  const initializeCartProducts = () => {
    const cartData = localStorage.getItem("cart_products");
    if (cartData) { cart_products.value = JSON.parse(cartData); }
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
