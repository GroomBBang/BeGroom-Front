'use client';

import AlertModal from '@/shared/components/common/AlertModal';
import { useCart } from '../hooks/useCart';
import CartEmpty from './CartEmpty';
import CartLoading from './CartLoading';
import CartMain from './CartMain';

export default function CartContainer() {
  const cart = useCart();

  const isEmpty = cart.items.length === 0;

  if (cart.isLoading) return <CartLoading />;

  return (
    <>
      <AlertModal isOpen={!!cart.error} message={cart.error || ''} onClose={cart.clearError} />
      <div>{isEmpty ? <CartEmpty /> : <CartMain cart={cart} />}</div>
    </>
  );
}
