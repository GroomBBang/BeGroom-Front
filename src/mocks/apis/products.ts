import { delay, HttpResponse } from 'msw';
import { api } from '../http';
import { PRODUCTS } from './data/products';

let productStore = [...PRODUCTS];

export const productsHandlers = [
  api.get('/products/:id', async ({ params }) => {
    await delay(1000);

    const { id } = params as { id: string };
    const productId = Number(id);

    const result = productStore.find((p) => p.productId === productId);

    if (!result) {
      return HttpResponse.json(
        {
          statusCode: 404,
          message: '상품을 찾을 수 없습니다.',
          result: null,
        },
        { status: 404 },
      );
    }

    return HttpResponse.json(
      {
        statusCode: 200,
        message: '요청이 성공적으로 처리되었습니다.',
        result,
      },
      { status: 200 },
    );
  }),
];
