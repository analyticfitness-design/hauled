import type { ICategory } from "@/types/category-type";

const category_data: ICategory[] = [
  {
    id: "hauled-cat-01",
    img: "/img/categories/camisetas.jpg",
    parent: "Camisetas",
    children: ["Oversize", "Básicas", "Gráficas"],
    productType: "fashion",
    products: ["hauled-001", "hauled-002", "hauled-003"],
    status: "Show",
  },
  {
    id: "hauled-cat-02",
    img: "/img/categories/hoodies.jpg",
    parent: "Hoodies",
    children: ["Pullover", "Zip-up", "Cropped"],
    productType: "fashion",
    products: ["hauled-004", "hauled-005"],
    status: "Show",
  },
  {
    id: "hauled-cat-03",
    img: "/img/categories/pantalones.jpg",
    parent: "Pantalones",
    children: ["Joggers", "Cargo", "Jeans"],
    productType: "fashion",
    products: ["hauled-006", "hauled-007"],
    status: "Show",
  },
  {
    id: "hauled-cat-04",
    img: "/img/categories/shorts.jpg",
    parent: "Shorts",
    children: ["Athletic", "Casual"],
    productType: "fashion",
    products: ["hauled-008"],
    status: "Show",
  },
  {
    id: "hauled-cat-05",
    img: "/img/categories/accesorios.jpg",
    parent: "Accesorios",
    children: ["Gorras", "Medias", "Bolsos"],
    productType: "fashion",
    products: ["hauled-009", "hauled-010"],
    status: "Show",
  },
];

export default category_data;
