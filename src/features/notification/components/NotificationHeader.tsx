import { Check } from 'lucide-react';

interface Props {
  handleMarkAllRead: () => void;
}

export default function NotificationHeader({ handleMarkAllRead }: Props) {
  return (
    <header className="mb-6 flex items-end justify-between">
      <h1 className="text-t8 font-bold text-gray-900">알림</h1>
      <button
        onClick={handleMarkAllRead}
        className="flex items-center gap-1 text-t3 text-gray-500 transition-colors hover:text-gray-800"
      >
        <Check size={14} />
        모두 읽음 표시
      </button>
    </header>
  );
}
