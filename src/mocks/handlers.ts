import { cartHandlers } from './apis/cart';
import { dashboardHandlers } from './apis/dashboard';
import { myHandlers } from './apis/my';
import { notificationHandlers } from './apis/notification';
import { productsHandlers } from './apis/products';

export const handlers = [
  ...myHandlers,
  ...notificationHandlers,
  ...cartHandlers,
  ...productsHandlers,
  ...dashboardHandlers,
];
