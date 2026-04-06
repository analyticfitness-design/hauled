import type { ICategory } from "@/types/category-type";

const category_data: ICategory[] = [
  {
    id: "gasp-cat-01",
    img: "/img/hero/hero-bodybuilder.jpg",
    parent: "Camisetas",
    children: ["Tee", "Tank Top"],
    productType: "fashion",
    products: ["gasp-007", "gasp-010", "gasp-011", "gasp-012", "gasp-014", "gasp-015", "gasp-017"],
    status: "Show",
  },
  {
    id: "gasp-cat-02",
    img: "/img/hero/hero-training.jpg",
    parent: "Pantalonetas",
    children: ["Shorts"],
    productType: "fashion",
    products: ["gasp-018", "gasp-019"],
    status: "Show",
  },
  {
    id: "gasp-cat-03",
    img: "/img/hero/hero-athlete.jpg",
    parent: "Pantalones",
    children: ["Baggy", "Track", "Sudadera", "Mesh"],
    productType: "fashion",
    products: ["gasp-004", "gasp-005", "gasp-006", "gasp-008", "gasp-009", "gasp-013"],
    status: "Show",
  },
  {
    id: "gasp-cat-04",
    img: "/img/hero/gasp-hero-1.jpg",
    parent: "Accesorios",
    children: ["Mochilas", "Bolsos", "Soporte"],
    productType: "fashion",
    products: ["gasp-001", "gasp-002", "gasp-016", "gasp-020"],
    status: "Show",
  },
  {
    id: "gasp-cat-05",
    img: "/img/hero/gasp-zz-1.jpg",
    parent: "Zapatos",
    children: ["Levantamiento"],
    productType: "fashion",
    products: ["gasp-003"],
    status: "Show",
  },
];

export default category_data;
