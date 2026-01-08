'use client';

import cartAPI from '@/features/cart/apis/cart.api';
import { useCartStore } from '@/features/cart/stores/useCartStore';
import { formatWon } from '@/shared/lib/format';
import { Heart, ShoppingCart } from 'lucide-react';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import productAPI from '../api/product.api';
import { ProductType } from '../types/model';

type SelectedDetail = {
  productDetailId: number;
  name: string;
  basePrice: number;
  discountedPrice?: number;
  quantity: number;
  isAvailable: boolean;
  qty: number;
};

export default function ProductDetailMain({ product }: { product: ProductType }) {
  const api = cartAPI();
  const fetchCartCount = useCartStore((s) => s.fetchCartCount);
  const [liked, setLiked] = useState(product.isWishlisted);
  const { addWishList } = productAPI();

  const toggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setLiked((prev) => !prev);

    try {
      await addWishList(product.productId);
    } catch (err) {
      setLiked((prev) => !prev);
    }
  };

  const displayLikes = product.wishlistCount + (liked ? 1 : 0);

  // details 기반: 옵션 1개/여러개 판단
  const details = product.details ?? [];
  const hasOptions = details.length > 1;
  const singleDetail = details.length === 1 ? details[0] : null;

  // 선택된 옵션들(여러개일 수 있음)
  const [selected, setSelected] = useState<SelectedDetail[]>(() => {
    if (singleDetail) {
      return [
        {
          productDetailId: singleDetail.productDetailId,
          name: singleDetail.name,
          basePrice: singleDetail.basePrice,
          discountedPrice: singleDetail.discountedPrice,
          quantity: singleDetail.quantity,
          isAvailable: singleDetail.isAvailable,
          qty: 1,
        },
      ];
    }
    return [];
  });

  // 상품 단가 계산(옵션별)
  const getUnitPrice = (d: { discountedPrice?: number; basePrice: number }) =>
    typeof d.discountedPrice === 'number' ? d.discountedPrice : d.basePrice;

  // 총액
  const totalPrice = useMemo(() => {
    return selected.reduce((acc, cur) => acc + getUnitPrice(cur) * cur.qty, 0);
  }, [selected]);

  const hasDiscount =
    typeof product.discountedPrice === 'number' &&
    typeof product.salesPrice === 'number' &&
    product.discountedPrice < product.salesPrice;

  const discountRate = useMemo(() => {
    if (!hasDiscount) return 0;
    return Math.round(((product.salesPrice - product.discountedPrice!) / product.salesPrice) * 100);
  }, [hasDiscount, product.salesPrice, product.discountedPrice]);

  // 옵션 선택(드롭다운)
  const onSelectOption = (productDetailId: number) => {
    const found = details.find((d) => d.productDetailId === productDetailId);
    if (!found) return;

    setSelected((prev) => {
      const exists = prev.find((x) => x.productDetailId === productDetailId);
      if (exists) {
        return prev.map((x) =>
          x.productDetailId === productDetailId
            ? { ...x, qty: Math.min(x.quantity, x.qty + 1) }
            : x,
        );
      }

      return [
        ...prev,
        {
          productDetailId: found.productDetailId,
          name: found.name,
          basePrice: found.basePrice,
          discountedPrice: found.discountedPrice,
          quantity: found.quantity,
          isAvailable: found.isAvailable,
          qty: 1,
        },
      ];
    });
  };

  const dec = (id: number) => {
    setSelected((prev) =>
      prev.map((x) => (x.productDetailId === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x)),
    );
  };
  const inc = (id: number) => {
    setSelected((prev) =>
      prev.map((x) =>
        x.productDetailId === id ? { ...x, qty: Math.min(x.quantity, x.qty + 1) } : x,
      ),
    );
  };

  const remove = (id: number) => {
    if (!hasOptions) return;
    setSelected((prev) => prev.filter((x) => x.productDetailId !== id));
  };

  // 장바구니 담기
  const onAddToCart = async () => {
    if (selected.length === 0) return;

    const payload = {
      items: selected.map((s) => ({
        productDetailId: s.productDetailId,
        quantity: s.qty,
      })),
    };

    try {
      await api.addCartItem(payload);
      toast.success('상품이 장바구니에 추가되었습니다');
      fetchCartCount();
    } catch (e) {
      console.error(e);
    }
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
              <span>{displayLikes}명이 좋아합니다</span>
            </div>
          </div>

          <h1 className="mt-2 text-3xl font-bold text-foreground">{product.name}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{product.shortDescription}</p>

          {/* 가격 */}
          <div className="py-8">
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

          {/* ✅ 옵션 UI */}
          <div className="border-t border-border">
            <div className="grid grid-cols-[120px_1fr] border-b border-border py-6">
              <div className="text-sm font-medium text-muted-foreground">구매 수량</div>

              <div className="space-y-3">
                {hasOptions && (
                  <select
                    className="h-12 w-full rounded-sm border border-border bg-background px-3 text-sm outline-none"
                    defaultValue=""
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (!v) return;
                      onSelectOption(v);
                      e.currentTarget.value = '';
                    }}
                  >
                    <option value="" disabled>
                      상품을 선택해주세요
                    </option>
                    {details.map((d) => (
                      <option
                        key={d.productDetailId}
                        value={d.productDetailId}
                        disabled={!d.isAvailable}
                      >
                        {d.name}
                      </option>
                    ))}
                  </select>
                )}

                {selected.map((s) => {
                  const unit = getUnitPrice(s);
                  return (
                    <div
                      key={s.productDetailId}
                      className="rounded-sm border border-border bg-background p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-sm font-medium text-foreground">{s.name}</div>

                        {hasOptions && (
                          <button
                            type="button"
                            onClick={() => remove(s.productDetailId)}
                            className="text-muted-foreground hover:text-foreground"
                            aria-label="옵션 제거"
                          >
                            ×
                          </button>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center overflow-hidden rounded-sm border border-border bg-background">
                          <button
                            type="button"
                            onClick={() => dec(s.productDetailId)}
                            className="grid h-10 w-12 place-items-center text-foreground hover:bg-muted cursor-pointer"
                            aria-label="수량 감소"
                          >
                            −
                          </button>
                          <div className="grid h-10 w-12 place-items-center text-sm font-bold text-foreground">
                            {s.qty}
                          </div>
                          <button
                            type="button"
                            onClick={() => inc(s.productDetailId)}
                            className="grid h-10 w-12 place-items-center text-foreground hover:bg-muted cursor-pointer"
                            aria-label="수량 증가"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-bold text-foreground">
                            {formatWon(unit * s.qty)}
                          </div>
                          {typeof s.discountedPrice === 'number' &&
                            s.discountedPrice < s.basePrice && (
                              <div className="text-xs text-muted-foreground line-through">
                                {formatWon(s.basePrice * s.qty)}원
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="mt-2 text-xs text-muted-foreground">재고: {s.quantity}개</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 총액 */}
          <div className="mt-8 flex gap-4 items-end justify-end">
            <div className="text-sm font-medium text-muted-foreground">총 상품금액 :</div>
            <div className="text-2xl font-bold text-foreground">{formatWon(totalPrice)}</div>
          </div>

          {/* CTA */}
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLike}
              className="grid h-12 w-12 place-items-center rounded-sm border border-border bg-background text-foreground hover:bg-muted cursor-pointer"
              aria-label="찜하기"
            >
              <Heart
                className={liked ? 'fill-orange-500 text-orange-500' : 'text-muted-foreground'}
              />
            </button>

            <button
              type="button"
              disabled={hasOptions && selected.length === 0}
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
