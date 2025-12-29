export interface MyProfileResponseDTO {
  email: string;
  name: string;
  phoneNumber: string;
  role: string;
  joinDate: string;
}

export interface MyPointsResponseDTO {
  wallet: {
    id: number;
    balance: number;
  };
  transactions: {
    id: number;
    tx_type: string;
    amount: number;
    balance_after: number;
    reference_type: string;
    reference_id: number;
    created_at: string;
    description: string;
  }[];
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
