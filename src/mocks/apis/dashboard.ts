import { delay, HttpResponse } from 'msw';
import { api } from '../http';
import { DASHBOARD_DATA, DASHBOARD_PERIOD_DATA, DASHBOARD_PRODUCT_DATA } from './data/dashboard';

export const dashboardHandlers = [
  api.get('/settlement', async () => {
    await delay(1000);
    return HttpResponse.json(DASHBOARD_DATA);
  }),

  api.get('/settlement/product', async () => {
    await delay(1000);
    return HttpResponse.json(DASHBOARD_PRODUCT_DATA);
  }),

  api.get('/settlement/period', async ({ request }) => {
    await delay(1000);
    return HttpResponse.json(DASHBOARD_PERIOD_DATA);
  }),
];
