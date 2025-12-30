'use client';

import { useCart } from '../hooks/useCart';
import CartEmpty from './CartEmpty';
import CartLoading from './CartLoading';
import CartMain from './CartMain';

export default function CartContainer() {
  const cart = useCart();

  const isEmpty = cart.items.length === 0;

  if (cart.isLoading) return <CartLoading />;

  return <div>{isEmpty ? <CartEmpty /> : <CartMain cart={cart} />}</div>;
}
