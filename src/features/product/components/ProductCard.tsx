'use client';

import { Product } from '@/features/product/types';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  product: Product;
  formatWon: (n: number) => string;
};

export default function ProductCard({ product: p, formatWon }: Props) {
  const [liked, setLiked] = useState(false);

  const toggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked((prev) => !prev);
  };

  return (
    <Link href={`/products/${p.id}`} className="block">
      <article
        className="
        h-full
        group relative overflow-hidden
        rounded-lg
        border border-border
        bg-background
        shadow-sm
        transition
        hover:shadow-md
      "
      >
        {/* 이미지 영역 */}
        <div className="relative flex aspect-[4/3] items-center justify-center bg-muted">
          {p.imageUrls.length > 0 ? (
            <img
              src={p.imageUrls[0]}
              alt={p.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="text-xs font-semibold text-muted-foreground">NO IMAGE</span>
          )}

          {/* ❤️ Hover 시 노출되는 버튼 */}
          <button
            type="button"
            aria-label="찜하기"
            onClick={toggleLike}
            className="
            absolute right-3 top-3
            grid h-9 w-9 place-items-center
            rounded-full
            bg-background/90
            shadow
            opacity-0
            transition
            group-hover:opacity-100 
            cursor-pointer
          "
          >
            <Heart
              className={`h-5 w-5 transition ${
                liked ? 'fill-orange-500 text-orange-500' : 'text-muted-foreground'
              }`}
            />
          </button>
        </div>

        {/* 콘텐츠 */}
        <div className="p-4">
          <div className="text-xs font-semibold text-muted-foreground">{p.categoryLabel}</div>

          <div className="mt-1 line-clamp-2 text-sm font-bold text-foreground">{p.title}</div>

          <div className="mt-3 flex items-end gap-2">
            {typeof p.discountRate === 'number' && (
              <span className="text-sm font-extrabold text-orange-500">{p.discountRate}%</span>
            )}
            <span className="text-base font-extrabold text-foreground">{formatWon(p.price)}</span>
          </div>

          {typeof p.originalPrice === 'number' && (
            <div className="mt-1 text-xs text-muted-foreground line-through">
              {formatWon(p.originalPrice)}
            </div>
          )}

          {/* 하단 좋아요 */}
          <div className="mt-3 flex items-center gap-1.5 text-xs">
            <Heart
              aria-hidden
              className={`h-4 w-4 ${
                liked ? 'fill-orange-500 text-orange-500' : 'text-muted-foreground'
              }`}
            />
            <span className={liked ? 'text-orange-500' : 'text-muted-foreground'}>
              {p.likes + (liked ? 1 : 0)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
