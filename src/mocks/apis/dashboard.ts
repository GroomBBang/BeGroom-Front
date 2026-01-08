// @ts-nocheck
import { DashboardPeriodType } from '@/features/dashboard/types/response';
import { delay, HttpResponse } from 'msw';
import { api } from '../http';
import { DASHBOARD_DATA, DASHBOARD_PERIOD_DATA, DASHBOARD_PRODUCT_DATA } from './data/dashboard';

const isDashboardPeriodType = (v: string | null): v is DashboardPeriodType =>
  v === 'DAILY' || v === 'WEEKLY' || v === 'MONTHLY' || v === 'YEARLY';

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

    const url = new URL(request.url);
    const type = url.searchParams.get('type');

    if (!isDashboardPeriodType(type)) {
      return HttpResponse.json(
        { statusCode: 400, message: 'type 파라미터가 올바르지 않습니다.', result: [] },
        { status: 400 },
      );
    }

    return HttpResponse.json(DASHBOARD_PERIOD_DATA[type]);
  }),
];
