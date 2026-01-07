export type CartItemType = {
  cartItemId: number;
  productDetailId: number;

  productName: string;
  productDetailName: string;
  mainImageUrl: string;

  basePrice: number;
  discountedPrice: number | null;

  quantity: number;
  stockQuantity: number;

  isSelected: boolean;
  isSoldOut: boolean;

  deliveryType: string;
};

export type CartGroupItemType = {
  deliveryType: string;
  deliveryTypeName: string;
  items: CartItemType[];
};

export type CartTotalsType = {
  subtotal: number;
  shipping: number;
  total: number;
  selectedCount: number;
};

export type CartActionsType = {
  removeItem: (id: number) => void;
  updateQty: (id: number, nextQty: number) => void;
  toggleSelect: (id: number) => void;
  setAllSelected: (selected: boolean) => void;
  removeSelected: () => void;
};

export type CartStateType = {
  items: CartItemType[];
  isLoading: boolean;
  totals: CartTotalsType;
  allSelected: boolean;
};

export type CartContextType = CartStateType & CartActionsType;
