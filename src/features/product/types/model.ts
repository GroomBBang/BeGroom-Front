export type CategoryKey = 'all' | 'veg' | 'fruit' | 'dairy' | 'bakery';

export type TabKey = 'desc' | 'info';

export type ProductStatus = 'WAIT' | 'SALE' | 'SOLD_OUT' | 'STOP';
export type ProductDetailOption = {
  productDetailId: number;
  name: string;
  basePrice: number;
  discountedPrice: number;
  quantity: number;
  isAvailable: boolean;
};

export type ProductType = {
  productId: number;
  productNo: number;
  brand: string;
  name: string;
  shortDescription: string;

  salesPrice: number;
  discountedPrice: number;
  discountRate: number;

  expirationDate: string;
  guides: string[];

  productDetail: string;
  productNotice: string;

  mainImageUrl: string;
  detailImageUrls: string[];

  isSoldOut: boolean;
  productStatus: ProductStatus;

  details: ProductDetailOption[];
};

export type ProductCardType = {
  productId: number;
  productNo: number;
  brand: string;
  name: string;
  shortDescription: string;
  salesPrice: number;
  discountedPrice?: number;
  discountRate?: number;
  mainImageUrl: string;
  isSoldOut: boolean;
  wishlistCount: number;
  productStatus: ProductStatus;
};

// 상품 필터 상태 타입
export type FiltersType = {
  brandIds: number[];
  deliveryTypes: string[];
  packagingTypes: string[];
  excludeSoldOut: boolean;
  page: number;
  size: number;
  sort: string;
  direction: string;
};
