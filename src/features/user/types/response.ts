import { ORDER_STATUS_LABEL } from '../constants/order';

export interface MyProfileResponseDTO {
  email: string;
  name: string;
  phoneNumber: string;
  role: string;
  joinDate: string;
}

export interface SellerProfileResponseDTO {
  email: string;
  name: string;
  phoneNumber: string;
  role: string;
  createAt: string;
}

export interface TransactionDto {
  id: number;
  tx_type: 'CHARGE' | 'CHARGE';
  amount: number;
  balance_after: number;
  created_at: string;
  description: string | null;
}

export interface TransactionPageDto {
  content: TransactionDto[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export interface MyPointsResponseDTO {
  wallet: {
    id: number;
    balance: number;
  };
  transactions: TransactionPageDto;
}

export interface OrderItemDTO {
  imageUrl: string;
  productName: string;
  price: number;
  quantity: number;
}

type ORDER_STATUS_LABEL_ITEM = keyof typeof ORDER_STATUS_LABEL;

export interface OrderDTO {
  order_number: number;
  created_at: string;
  status: ORDER_STATUS_LABEL_ITEM;
  total_amount: number;
  items: OrderItemDTO[];
}

export interface MyOrdersResponseDTO {
  orders: OrderDTO[];
}

export interface MyWishResponseDTO {
  wish: {
    id: number;
    productId: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    description: string;
    likes: number;
  }[];
}

export interface FetchWalletDTO {
  balance: number;
}

export interface ChargeCashtDTO {
  pointChargeId: number;
  balance: number;
}

export interface RefundOrderResponseDTO {
  orderId: number;
}
