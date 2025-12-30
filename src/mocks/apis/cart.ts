import { CartItemType } from '@/features/cart/types';
import { delay, HttpResponse } from 'msw';
import { api } from '../http';
import { CART_ITEMS } from './data/cart';
import { PRODUCTS } from './data/products';

let cartStore = [...CART_ITEMS];
let productStore = [...PRODUCTS];

type AddCartItemBody = {
  productId: string;
  quantity: number;
};

export const cartHandlers = [
  api.get('/cart', async () => {
    await delay(1000);
    return HttpResponse.json({ items: cartStore }, { status: 200 });
  }),

  api.post('/cart/items', async ({ request }) => {
    await delay(1000);
    console.log(request.body);

    const { productId, quantity } = (await request.json()) as AddCartItemBody;

    const product = productStore.find((p) => p.id === productId);
    if (!product) {
      return HttpResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    const found = cartStore.find((item) => item.id === productId);
    if (found) {
      found.quantity += Math.max(1, quantity);
    } else {
      const newItem: CartItemType = {
        ...product,
        quantity: Math.max(1, quantity),
        selected: true,
      };
      cartStore.push(newItem);
    }

    return HttpResponse.json(null, { status: 201 });
  }),

  api.patch('/cart/items/:id', async ({ request, params }) => {
    await delay(1000);

    const { id } = params as { id: string };
    const { quantity } = (await request.json()) as { quantity: number };

    const found = cartStore.find((item) => item.id === id);
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
    const found = cartStore.find((item) => item.id === id);
    if (!found) {
      return HttpResponse.json({ message: 'Cart item not found' }, { status: 404 });
    }

    cartStore = cartStore.filter((item) => item.id !== id);

    return HttpResponse.json(null, { status: 204 });
  }),
];
