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
    title: 'GASP',
    drop_down: true,
    dropdown_menus: [
      { link: '/shop?category=camisetas', title: 'Camisetas & Tanks' },
      { link: '/shop?category=pantalonetas', title: 'Pantalonetas' },
      { link: '/shop?category=pantalones', title: 'Pantalones' },
      { link: '/shop?category=accesorios', title: 'Accesorios' },
      { link: '/shop?category=zapatos', title: 'Zapatos' },
      { link: '/shop', title: 'Ver todo GASP →' },
    ],
  },
  {
    id: 3,
    link: '/encargos',
    title: 'Encargos',
    mega_menu: false,
  },
  {
    id: 4,
    link: '/contact',
    title: 'Contacto',
    mega_menu: false,
  },
];

export const mobile_menu = menu_data;
export default menu_data;
