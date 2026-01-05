import { delay, HttpResponse } from 'msw';
import { api } from '../http';
import { USER_ORDERS, USER_POINTS, USER_PROFILE, USER_WISHLIST } from './data/my';

export const myHandlers = [
  api.get('/members/profile', async () => {
    await delay(1000);
    return HttpResponse.json(USER_PROFILE);
  }),

  api.get('/members/points', async () => {
    await delay(1000);
    return HttpResponse.json(USER_POINTS);
  }),

  api.get('/members/orders', async () => {
    await delay(2000);
    return HttpResponse.json(USER_ORDERS);
  }),

  api.get('/members/wish', async () => {
    await delay(2000);
    return HttpResponse.json(USER_WISHLIST);
  }),
];
