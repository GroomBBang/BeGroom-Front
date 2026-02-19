'use client';

import { ProductCardType } from '@/features/product/types/model';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  product: ProductCardType;
  rank: number;
}

export default function PopularProductCard({ product, rank }: Props) {
  const price = product.discountedPrice ?? product.salesPrice;
  const isTopRank = rank <= 3;

  return (
    <Link
      href={`/products/${product.productId}`}
      className="group flex gap-3 rounded-2xl p-1"
      prefetch={isTopRank}
      aria-label={`${rank}위 ${product.name} 상세로 이동`}
    >
      {/* 썸네일 */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={product.mainImageUrl}
          alt={product.name}
          fill
          sizes="96px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* 랭킹 */}
      <div
        className={`w-4 shrink-0 text-center text-sm font-semibold ${isTopRank ? 'text-orange-500' : 'text-gray-900'}`}
      >
        {rank}
      </div>

      {/* 텍스트 */}
      <div className="min-w-0 flex-1 flex flex-col">
        <p className="text-xs font-medium text-gray-400">{product.brand}</p>
        <p className="mt-1 flex-1 line-clamp-2 text-sm text-gray-900">{product.name}</p>

        {/* 원가 */}
        {product.discountRate !== 0 && (
          <span className="text-xs text-gray-300 line-through">
            {product.salesPrice.toLocaleString()}원
          </span>
        )}

        {/* 가격 */}
        <div className="flex items-baseline gap-2">
          {/* 할인율 */}
          {product.discountRate !== 0 && (
            <span className="text-xs font-bold text-orange-500">{product.discountRate}%</span>
          )}
          {/* 현재가 */}
          <span className="text-sm font-extrabold text-gray-900">{price.toLocaleString()}원</span>
        </div>
      </div>
    </Link>
  );
}
