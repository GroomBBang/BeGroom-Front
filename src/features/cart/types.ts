import { Product } from '../product/types';

export type CartItem = Product & {
  quantity: number;
  selected: boolean;
};
