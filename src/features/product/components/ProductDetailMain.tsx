'use client';

import { formatWon } from '@/shared/lib/format';
import { Heart, ShoppingCart } from 'lucide-react';
import { useMemo } from 'react';
import productAPI from '../api/product.api';
import { useAddToCart } from '../hooks/useAddToCart';
import { useProductOptions } from '../hooks/useProductOption';
import { useWishlistToggle } from '../hooks/useWishlistToggle';
import { ProductType } from '../types/model';
import ProductOptionsSection from './ProductOptionSection';

export default function ProductDetailMain({ product }: { product: ProductType }) {
  const { addWishList } = productAPI();

  //좋아요 훅
  const { liked, count, toggle } = useWishlistToggle({
    initialLiked: product.isWishlisted,
    initialCount: product.wishlistCount,
    onToggleRequest: () => addWishList(product.productId),
  });

  //옵션
  const options = useProductOptions(product.details);

  const hasDiscount =
    typeof product.discountedPrice === 'number' &&
    typeof product.salesPrice === 'number' &&
    product.discountedPrice < product.salesPrice;

  const discountRate = useMemo(() => {
    if (!hasDiscount) return 0;
    return Math.round(((product.salesPrice - product.discountedPrice!) / product.salesPrice) * 100);
  }, [hasDiscount, product.salesPrice, product.discountedPrice]);

  // 장바구니 담기
  const { addToCart } = useAddToCart();

  const onAddToCart = () => {
    addToCart(options.selected);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[480px_1fr]">
        {/* LEFT */}
        <section className="relative h-[550px] overflow-hidden rounded-xl border border-border bg-muted">
          {product.mainImageUrl ? (
            <img
              src={product.mainImageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              NO IMAGE
            </div>
          )}
        </section>

        {/* RIGHT */}
        <section className="bg-background">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">{product.brand}</div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart
                className={liked ? 'fill-orange-500 text-orange-500' : 'text-muted-foreground'}
                size={18}
              />
              <span>{count}명이 좋아합니다</span>
            </div>
          </div>

          <h1 className="mt-2 text-3xl font-bold text-foreground">{product.name}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{product.shortDescription}</p>

          {/* 가격 */}
          <div className="pt-8 pb-16">
            {hasDiscount ? (
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-orange-500">{discountRate}%</span>
                <span className="text-4xl font-bold text-foreground">
                  {formatWon(product.discountedPrice)}
                </span>
                <span className="pb-1 text-sm text-muted-foreground">원</span>

                <span className="ml-2 pb-1 text-sm text-muted-foreground line-through">
                  {formatWon(product.salesPrice)}
                </span>
              </div>
            ) : (
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-foreground">
                  {formatWon(product.salesPrice)}
                </span>
              </div>
            )}
          </div>

          {/* 상품 정보 요약 */}
          <div className="grid grid-cols-[120px_1fr] border-t border-b border-border py-6">
            <div className="text-sm font-medium text-muted-foreground">배송</div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">샛별배송</div>
            </div>
          </div>
          <div className="grid grid-cols-[120px_1fr] border-b border-border py-6">
            <div className="text-sm font-medium text-muted-foreground">판매자</div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">컬리</div>
            </div>
          </div>
          <div className="grid grid-cols-[120px_1fr] border-b border-border py-6">
            <div className="text-sm font-medium text-muted-foreground">포장타입</div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">상온 (종이포장)</div>
            </div>
          </div>

          {/* 옵션 UI */}
          <ProductOptionsSection
            hasOptions={options.hasOptions}
            details={options.details}
            selected={options.selected}
            onSelectOption={options.onSelectOption}
            dec={options.dec}
            inc={options.inc}
            remove={options.remove}
            getUnitPrice={options.getUnitPrice}
          />

          {/* 총액 */}
          <div className="mt-8 flex gap-4 items-end justify-end">
            <div className="text-sm font-medium text-muted-foreground">총 상품금액 :</div>
            <div className="text-2xl font-bold text-foreground">
              {formatWon(options.totalPrice)}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              className="grid h-12 w-12 place-items-center rounded-sm border border-border bg-background text-foreground hover:bg-muted cursor-pointer"
              aria-label="찜하기"
            >
              <Heart
                className={liked ? 'fill-orange-500 text-orange-500' : 'text-muted-foreground'}
              />
            </button>

            <button
              type="button"
              disabled={!options.hasOptions && options.selected.length === 0}
              onClick={onAddToCart}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-sm bg-primary-700 px-5 text-sm font-bold text-white transition-colors hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ShoppingCart size={18} />
              장바구니 담기
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
