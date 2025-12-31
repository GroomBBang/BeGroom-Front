import { delay, HttpResponse } from 'msw';
import { api } from '../http';
import { PRODUCTS } from './data/products';

let productStore = [...PRODUCTS];

export const productsHandlers = [
  api.get('/products/:id', async ({ params }) => {
    await delay(1000);

    const { id } = params as { id: string };
    const product = productStore.find((product) => product.id === id);

    if (!product) {
      return HttpResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return HttpResponse.json({ product }, { status: 200 });
  }),
];
