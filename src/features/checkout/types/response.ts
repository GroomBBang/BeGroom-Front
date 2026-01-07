export interface createOrderRequestDTO {
  orderProductList: {
    productDetailId: number;
    orderQuantity: number;
  }[];
}

export interface createOrderResponseDTO {
  orderId: number;
}

export interface orderInfoResponseDTO {
  memberName: string;
  phoneNumber: string;
  balance: number;
  orderAmount: number;
}

export interface paymentsRequestDTO {
  orderId: number;
  paymentMethod: 'POINT' | 'PG';
}

export interface paymentsResponseDTO {
  paymentId: number;
}

export interface checkoutRequestDTO {
  paymentMethod: 'POINT' | 'PG';
}

export interface checkoutResponseDTO {
  checkoutStatus: 'COMPLETED' | 'REDIRECT_REQUIRED' | 'FAILED';
  orderId: number;
  paymentId: number;
  redirectUrl?: string;
  failCode?: string;
  failMessage?: string;
}
