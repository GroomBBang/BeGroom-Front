import { Skeleton } from '@/shared/components/common/skeleton';
import { useEffect, useState } from 'react';
import myAPI from '../apis/my.api';
import { MyWishResponseDTO } from '../types/response';
import MyWishlist from './MyWishlist';

export default function WishlistContent() {
  const { fetchMyWish } = myAPI();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<MyWishResponseDTO | null>(null);

  useEffect(() => {
    fetchMyWish().then((response) => {
      setData(response);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-[280px]" />
          ))}
        </div>
      ) : (
        <MyWishlist wish={data?.wish || []} />
      )}
    </div>
  );
}
