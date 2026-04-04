import { type IMenuItem } from "@/types/menu-d-type";

export const menu_data: IMenuItem[] = [
  {
    id: 1,
    link: '/',
    title: 'Inicio',
    mega_menu: false,
  },
  {
    id: 2,
    link: '/shop',
    title: 'Tienda',
    has_dropdown: true,
    sub_menus: [
      { link: '/shop?hauledLine=originals', title: '🇺🇸 HAULED Originals' },
      { link: '/shop?hauledLine=basics', title: 'HAULED Basics' },
      { link: '/shop?hauledLine=encargo', title: '📦 Encargos USA' },
      { link: '/shop', title: 'Ver todo' },
    ],
  },
  {
    id: 3,
    link: '/shop?category=camisetas',
    title: 'Camisetas',
    has_dropdown: false,
  },
  {
    id: 4,
    link: '/shop?category=hoodies',
    title: 'Hoodies',
    has_dropdown: false,
  },
  {
    id: 5,
    link: '/shop?category=pantalones',
    title: 'Pantalones',
    has_dropdown: false,
  },
  {
    id: 6,
    link: '/blog',
    title: 'Blog',
    has_dropdown: false,
  },
  {
    id: 7,
    link: '/contact',
    title: 'Contacto',
    has_dropdown: false,
  },
];

export default menu_data;
