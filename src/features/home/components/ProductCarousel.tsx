import { productListAPI } from '@/features/product/api/productList.api';
import ProductCard from '@/features/product/components/ProductCard';
import { ProductCardType } from '@/features/product/types/model';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ProductCarouselSkeleton from './ProductCarouselSkeleton';

export default function ProductCarousel({ id }: { id: string }) {
  const [products, setProducts] = useState<ProductCardType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const trackRef = useRef<HTMLUListElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const [offset, setOffset] = useState(0);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const boundsRef = useRef<{ min: number; max: number }>({ min: 0, max: 0 });

  useEffect(() => {
    setIsLoading(true);

    productListAPI
      .searchProducts({
        categoryIds: Number(id),
        page: 0,
        size: 12,
        sort: 'wishlistCount',
        direction: 'DESC',
      })
      .then((res) => setProducts(res.content))
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  }, [id]);

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const updateBoundsAndButtons = () => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const max = 0;
    const min = Math.min(0, viewport.clientWidth - track.scrollWidth);

    boundsRef.current = { min, max };

    setOffset((prev) => clamp(prev, min, max));

    const current = clamp(offset, min, max);
    setCanPrev(current < max - 1);
    setCanNext(current > min + 1);
  };

  useEffect(() => {
    const { min, max } = boundsRef.current;
    setCanPrev(offset < max - 1);
    setCanNext(offset > min + 1);
  }, [offset]);

  useLayoutEffect(() => {
    updateBoundsAndButtons();

    const onResize = () => updateBoundsAndButtons();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [products.length]);

  const moveByPage = (dir: 'prev' | 'next') => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const step = viewport.clientWidth + 16;
    const { min, max } = boundsRef.current;

    setOffset((prev) => {
      const next = dir === 'next' ? prev - step : prev + step;
      return clamp(next, min, max);
    });
  };

  if (isLoading) return <ProductCarouselSkeleton />;

  return (
    <div className="relative w-full">
      {canPrev && (
        <button
          type="button"
          aria-label="이전 상품"
          onClick={() => moveByPage('prev')}
          className="
            absolute left-[-2rem] top-1/3 z-10
            flex h-16 w-16 items-center justify-center
            rounded-full bg-white shadow-sm hover:shadow-lg
            ring-1 ring-black/5 cursor-pointer
          "
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
      )}

      {canNext && (
        <button
          type="button"
          aria-label="다음 상품"
          onClick={() => moveByPage('next')}
          className="
            absolute right-[-2rem] top-1/3 z-10
            flex h-16 w-16 items-center justify-center
            rounded-full bg-white shadow-sm hover:shadow-lg
            ring-1 ring-black/5 cursor-pointer
          "
        >
          <ArrowRightIcon className="h-6 w-6" />
        </button>
      )}

      <div ref={viewportRef} className="overflow-hidden">
        <ul
          ref={trackRef}
          className="flex gap-4 pb-2 items-start transition-transform duration-300 ease-out will-change-transform"
          style={{ transform: `translateX(${offset}px)` }}
        >
          {products.map((product) => (
            <li key={product.productId} className="shrink-0 basis-[calc((100%-3rem)/4)]">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
