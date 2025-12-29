import { delay, HttpResponse } from 'msw';
import { api } from '../http';
import { USER_PROFILE } from './data/my';

export const myHandlers = [
  api.get('/my', async () => {
    await delay(1000);
    return HttpResponse.json(USER_PROFILE);
  }),

  api.post('/my', async () => {
    await delay(1000);
    return HttpResponse.json({});
  }),
];
