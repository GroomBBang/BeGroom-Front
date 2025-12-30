import { delay, HttpResponse } from 'msw';
import { api } from '../http';
import { USER_NOTIFICATIONS } from './data/notification';

export const notificationHandlers = [
  api.get('/noti', async () => {
    await delay(1000);
    return HttpResponse.json(USER_NOTIFICATIONS);
  }),
];
