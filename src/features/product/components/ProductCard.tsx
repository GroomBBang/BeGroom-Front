'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import productAPI from '../api/product.api';
import { ProductCardType } from '../types/model';

interface Props {
  product: ProductCardType;
}

export default function ProductCard({ product }: Props) {
  const [liked, setLiked] = useState(product.isWishlisted);
  const { addWishList } = productAPI();
  const [displayLikes, setDisplayLikes] = useState(product.wishlistCount);

  const toggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setLiked((prev) => !prev);
    setDisplayLikes((prev) => (liked ? prev - 1 : prev + 1));

    try {
      await addWishList(product.productId);
    } catch (err) {
      console.log(err);
      setLiked((prev) => !prev);
    }
  };

  return (
    <Link href={`/products/${product.productId}`} className="group cursor-pointer">
      {/* 이미지 */}
      <div className="relative mb-2 overflow-hidden rounded bg-gray-100 aspect-[5/6]">
        <img
          src={product.mainImageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
        <div className="text-sm font-medium text-gray-400">{product.brand}</div>

        <h3 className="line-clamp-2 text-base leading-relaxed text-gray-900">{product.name}</h3>

        <p className="line-clamp-1 text-xs text-gray-400">{product.shortDescription}</p>

        {/* 가격 */}
        <div className="flex items-center gap-2">
          {product.discountRate !== 0 && (
            <span className="text-lg font-bold text-orange-500">{product.discountRate}%</span>
          )}
          <span className="py-1 text-lg font-bold text-gray-900">
            {(product.discountedPrice ?? product.salesPrice).toLocaleString()}원
          </span>
        </div>

        {/* ❤️ 좋아요 영역 */}
        <div className="flex items-center gap-1 text-xs">
          <Heart
            aria-hidden
            className={`h-4 w-4 ${liked ? 'fill-orange-500 text-orange-500' : 'text-gray-300'}`}
          />
          <span className={liked ? 'text-orange-500' : 'text-gray-400'}>{displayLikes}</span>
        </div>
      </div>
    </Link>
  );
}
