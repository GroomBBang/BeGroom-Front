import { Skeleton } from '@/shared/components/common/skeleton';
import { Heart } from 'lucide-react';
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
      setData(response.result);
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
      ) : (data?.wish || []).length === 0 ? (
        <div className="flex h-[200px] flex-col items-center justify-center text-gray-400">
          <Heart size={40} className="mb-2 text-gray-300" strokeWidth={1.5} />
          <p className="text-lg">위시 리스트에 담긴 상품이 없습니다.</p>
        </div>
      ) : (
        <MyWishlist wish={data?.wish || []} />
      )}
    </div>
  );
}
