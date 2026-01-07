export type DeliveryMemoKey = 'door' | 'security' | 'call' | 'custom';

export type CheckoutFormState = {
  receiver: string;
  phone: string;
  addressSearch: string;
  addressDetail: string;
  memo: DeliveryMemoKey;
};
