import { Bell, Gift, Truck } from 'lucide-react';
import { NotificationType } from '../types/model';

export const renderIcon = (type: NotificationType) => {
  switch (type) {
    case 'ORDER':
      return (
        <div className="rounded-full bg-info/10 p-3 text-info">
          <Truck size={24} />
        </div>
      );
    case 'AD':
      return (
        <div className="rounded-full bg-primary-100 p-3 text-primary-600">
          <Gift size={24} />
        </div>
      );
    case 'NOTICE':
      return (
        <div className="rounded-full bg-success/10 p-3 text-success">
          <Bell size={24} />
        </div>
      );
    default:
      return <div className="rounded-full bg-gray-100 p-3 text-gray-600"></div>;
  }
};
