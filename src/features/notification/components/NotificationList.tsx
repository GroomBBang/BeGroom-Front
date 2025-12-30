import { Bell, Gift, Truck } from 'lucide-react';
import { NotificationItem, NotificationType } from '../types/model';

interface Props {
  notifications: NotificationItem[];
}

export default function NotificationList({ notifications }: Props) {
  const renderIcon = (type: NotificationType) => {
    switch (type) {
      case 'delivery':
        return (
          <div className="rounded-full bg-info/10 p-3 text-info">
            <Truck size={24} />
          </div>
        );
      case 'coupon':
        return (
          <div className="rounded-full bg-primary-100 p-3 text-primary-600">
            <Gift size={24} />
          </div>
        );
      case 'event':
        return (
          <div className="rounded-full bg-success/10 p-3 text-success">
            <Bell size={24} />
          </div>
        );
      case 'system':
      default:
        return <div className="rounded-full bg-gray-100 p-3 text-gray-600"></div>;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {notifications.map((item) => (
        <div
          key={item.id}
          className={`relative flex gap-4 rounded-xl border border-gray-100 p-5 transition-all ${item.isRead ? 'bg-white' : 'bg-primary-50/30'} cursor-pointer hover:border-gray-200 hover:shadow-sm`}
        >
          <div className="shrink-0">{renderIcon(item.type)}</div>

          <div className="flex flex-1 flex-col justify-center">
            <div className="flex items-start justify-between">
              <h3
                className={`mb-1 text-t4 ${item.isRead ? 'font-medium text-gray-800' : 'font-bold text-black'}`}
              >
                {item.title}
              </h3>

              {!item.isRead && (
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary-600"></span>
              )}
            </div>
            <p className="mb-2 line-clamp-2 text-t3 leading-relaxed text-gray-500">
              {item.description}
            </p>
            <span className="text-t2 font-light text-gray-400">{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
