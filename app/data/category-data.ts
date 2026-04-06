import type { ICategory } from "@/types/category-type";

const category_data: ICategory[] = [
  {
    id: "gasp-cat-01",
    img: "/img/categories/camisetas.jpg",
    parent: "Tops & Camisetas",
    children: ["Camisetas", "Stringers", "Regatas"],
    productType: "fashion",
    products: ["gasp-006", "gasp-011", "gasp-017"],
    status: "Show",
  },
  {
    id: "gasp-cat-02",
    img: "/img/categories/shorts.jpg",
    parent: "Shorts",
    children: ["Iron Shorts", "Compresión", "Shorts Deportivos"],
    productType: "fashion",
    products: ["gasp-008", "gasp-009", "gasp-010", "gasp-012", "gasp-018", "gasp-019"],
    status: "Show",
  },
  {
    id: "gasp-cat-03",
    img: "/img/categories/pantalones.jpg",
    parent: "Pantalones",
    children: ["Pantalón de Entrenamiento", "Pantalón Estándar"],
    productType: "fashion",
    products: ["gasp-003"],
    status: "Show",
  },
  {
    id: "gasp-cat-04",
    img: "/img/categories/hoodies.jpg",
    parent: "Hoodies",
    children: ["Pullover", "Con Cierre"],
    productType: "fashion",
    products: ["gasp-005"],
    status: "Show",
  },
  {
    id: "gasp-cat-05",
    img: "/img/categories/accesorios.jpg",
    parent: "Accesorios",
    children: ["Bolsos", "Muñequeras", "Mochilas"],
    productType: "fashion",
    products: ["gasp-001", "gasp-002", "gasp-004", "gasp-020"],
    status: "Show",
  },
];

export default category_data;
