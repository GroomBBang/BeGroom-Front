import { NotificationItem } from '../types/model';
import { renderIcon } from '../utils/NotificationUtils';

interface Props {
  item: NotificationItem;
  index: number;
  handleNoticeClick: (id: number) => void;
}

export default function NotificationListItem({ item, index, handleNoticeClick }: Props) {
  return (
    <div
      key={item.id || index}
      onClick={item.read ? undefined : () => handleNoticeClick(item.id)}
      className={`relative flex gap-4 rounded-xl border border-gray-100 p-5 transition-all ${item.read ? 'bg-white' : 'bg-primary-50/30'} cursor-pointer hover:border-gray-200 hover:shadow-sm`}
    >
      <div className="shrink-0">{renderIcon(item.type)}</div>

      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-start justify-between">
          <h3
            className={`mb-1 text-t4 ${item.read ? 'font-medium text-gray-800' : 'font-bold text-black'}`}
          >
            {item.title}
          </h3>

          {!item.read && (
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary-600"></span>
          )}
        </div>
        <p className="mb-2 line-clamp-2 text-t3 leading-relaxed text-gray-500">{item.message}</p>
        <span className="text-t2 font-light text-gray-400">{item.time}</span>
      </div>
    </div>
  );
}
