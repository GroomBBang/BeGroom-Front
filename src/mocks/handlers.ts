import { cartHandlers } from './apis/cart';
import { myHandlers } from './apis/my';
import { notificationHandlers } from './apis/notification';

export const handlers = [...myHandlers, ...notificationHandlers, ...cartHandlers];
