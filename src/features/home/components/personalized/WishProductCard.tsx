import productAPI from '@/features/product/api/product.api';
import { useWishlistToggle } from '@/features/product/hooks/useWishlistToggle';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  product: {
    id: number;
    productId: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    description: string;
    likes: number;
  };
}

export default function WishProductCard({ product }: Props) {
  const { addWishList } = productAPI();

  const {
    liked,
    count: displayLikes,
    toggle: toggleLike,
  } = useWishlistToggle({
    initialLiked: true,
    initialCount: product.likes,
    onToggleRequest: () => addWishList(product.productId),
  });

  return (
    <>
      <Link
        href={`/products/${product.productId}`}
        data-testid={'wish-product-card'}
        className="group cursor-pointer"
      >
        {/* 이미지 */}
        <div className="relative mb-2 overflow-hidden rounded bg-gray-100 aspect-[5/6]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* 하트 버튼 (hover 노출) */}
          <button
            type="button"
            aria-label="좋아요"
            onClick={toggleLike}
            className={`
            absolute right-2 top-2
            flex h-9 w-9 items-center justify-center
            rounded-full
            bg-white/90
            shadow
            transition
            cursor-pointer
            ${liked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
          `}
          >
            <Heart
              className={`h-5 w-5 transition ${
                liked ? 'fill-orange-500 text-orange-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>

        {/* 텍스트 영역 */}
        <div className="flex flex-col gap-1">
          <h3 className="line-clamp-2 text-base leading-relaxed text-gray-900">{product.name}</h3>

          <p className="line-clamp-1 text-xs text-gray-400">{product.description}</p>

          {/* 가격 */}
          <div className="flex items-center gap-2">
            <span className="py-1 text-lg font-bold text-gray-900">
              {product.price.toLocaleString()}원
            </span>
          </div>

          {/* 좋아요 영역 */}
          <div className="flex items-center gap-1 text-xs">
            <Heart
              aria-hidden
              className={`h-4 w-4 ${liked ? 'fill-orange-500 text-orange-500' : 'text-gray-300'}`}
            />
            <span className={liked ? 'text-orange-500' : 'text-gray-400'}>{displayLikes}</span>
          </div>
        </div>
      </Link>
    </>
  );
}
