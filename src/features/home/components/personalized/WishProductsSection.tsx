import myAPI from '@/features/user/apis/my.api';
import { MyWishResponseDTO } from '@/features/user/types/response';
import { useEffect, useState } from 'react';
import WishProductSkeleton from './WishProductSkeleton';
import WishProductsCarousel from './WishProductsCarousel';

export default function WishProductsSection() {
  const { fetchMyWish } = myAPI();

  const [data, setData] = useState<MyWishResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchMyWish()
      .then((res) => setData(res.result))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <WishProductSkeleton />;
  if (!data || data.wish.length === 0) return null;

  return <WishProductsCarousel wish={data.wish} />;
}
