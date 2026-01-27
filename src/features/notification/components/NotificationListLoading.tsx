import { Skeleton } from '@/shared/components/common/skeleton';

export default function NotificationListLoading() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-[130px]" />
      ))}
    </div>
  );
}
