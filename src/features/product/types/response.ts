import { ProductCardType, ProductType } from './model';

export type ProductDetailResponseDTO = ProductType;

export type ProductSearchResponseDTO = {
  content: ProductCardType[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
};
