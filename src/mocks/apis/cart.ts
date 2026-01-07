// @ts-nocheck
import { delay, HttpResponse } from 'msw';
import { api } from '../http';
import { CART_ITEMS } from './data/cart';

let cartStore = [...CART_ITEMS.items];

export const cartHandlers = [
  api.get('/cart', async () => {
    await delay(1000);
    return HttpResponse.json({ result: CART_ITEMS });
  }),

  api.patch('/cart/items/:id', async ({ request, params }) => {
    await delay(1000);

    const { id } = params as { id: string };
    const { quantity } = (await request.json()) as { quantity: number };

    const found = cartStore.find((item) => item.productDetailId === Number(id));
    if (!found) {
      return HttpResponse.json({ message: 'Cart item not found' }, { status: 404 });
    }

    found.quantity = quantity;
    return HttpResponse.json(null, { status: 204 });
  }),

  api.delete('/cart', async () => {
    await delay(1000);
    cartStore = [];
    return HttpResponse.json(null, { status: 204 });
  }),

  api.delete('/cart/items/:id', async ({ params }) => {
    await delay(1000);

    const { id } = params as { id: string };
    const found = cartStore.find((item) => item.productDetailId === Number(id));
    if (!found) {
      return HttpResponse.json({ message: 'Cart item not found' }, { status: 404 });
    }

    cartStore = cartStore.filter((item) => item.productDetailId !== Number(id));

    return HttpResponse.json(null, { status: 204 });
  }),
];
