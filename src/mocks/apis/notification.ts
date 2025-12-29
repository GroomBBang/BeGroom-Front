import { http, HttpResponse } from 'msw';

export const notificationHandlers = [
  http.get('/api/notification', () => {
    return HttpResponse.json({});
  }),

  http.post('/api/notification', () => {
    return HttpResponse.json({});
  }),
];
