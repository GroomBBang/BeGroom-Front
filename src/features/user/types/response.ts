export interface MyProfileResponseDTO {
  email: string;
  name: string;
  phoneNumber: string;
  role: string;
  joinDate: string;
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

export interface MyOrdersResponseDTO {
  orders: {
    id: number;
    order_number: string;
    total_amount: number;
    status: string;
    created_at: string;
    imageUrl: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
}

export interface MyWishResponseDTO {
  wish: {
    id: number;
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
