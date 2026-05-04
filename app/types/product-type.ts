export type IReview = {
  user?:string;
  name:string;
  email:string;
  rating:number;
  review:string;
  date:string;
}

export interface IProduct {
  id: string;
  sku: string;
  img: string;
  title: string;
  slug: string;
  unit: string;
  imageURLs: {
    color?: {
      name: string;
      clrCode: string;
    };
    img: string;
  }[];
  parent: string;
  children: string;
  price: number;
  discount: number;
  quantity: number;
  brand: {
    name: string;
  };
  category: {
    name: string;
  };
  status: string;
  reviews?: IReview[];
  productType: string;
  description: string;
  orderQuantity?: number;
  additionalInformation: {
    key: string;
    value: string;
  }[];
  featured?: boolean;
  sellCount: number;
  offerDate?:{
    startDate:string;
    endDate:string;
  }
  tags?: string[];
  videoId?:string;
  sizes?:string[];
  // HAULED custom fields
  hauledLine?: 'originals' | 'basics' | 'encargo';
  deliveryDays?: string;
  advancePercent?: number;
  priceUsd?: number; // precio retail USD original
  priceUsdSale?: number; // precio de venta USD ya con -15% (ej: 84.15)
  priceCopSale?: number; // precio de venta COP en pesos enteros (ej: 307148)
}