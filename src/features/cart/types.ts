import { Product } from '../product/types';

export type CartItemType = Product & {
  quantity: number;
  selected: boolean;
};

export type CartTotalsType = {
  subtotal: number;
  shipping: number;
  total: number;
  selectedCount: number;
};

export type CartActionsType = {
  addToCart: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, nextQty: number) => void;
  toggleSelect: (id: string) => void;
  setAllSelected: (selected: boolean) => void;
  removeSelected: () => void;
};

export type CartStateType = { items: CartItemType[]; totals: CartTotalsType; allSelected: boolean };

export type CartContextType = CartStateType & CartActionsType;
