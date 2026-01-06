'use client';

import { useAddToCart } from '@/features/cart/hooks/useAddToCart';
import { formatWon } from '@/shared/lib/format';
import { Heart, ShoppingCart } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ProductType } from '../types/model';

type SelectedDetail = {
  productDetailId: number;
  name: string;
  basePrice: number;
  discountedPrice?: number;
  quantity: number; // 재고
  isAvailable: boolean;
  qty: number; // 선택 수량
};

export default function ProductDetailMain({ product }: { product: ProductType }) {
  const { addToCart } = useAddToCart();

  const [liked, setLiked] = useState(false);

  // ✅ details 기반: 옵션 1개/여러개 판단
  const details = product.details ?? [];
  const hasOptions = details.length > 1;
  const singleDetail = details.length === 1 ? details[0] : null;

  // ✅ 선택된 옵션들(여러개일 수 있음)
  const [selected, setSelected] = useState<SelectedDetail[]>(() => {
    // 옵션이 1개면 처음부터 선택된 상태로 시작
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

  // ✅ 상품 단가 계산(옵션별)
  const getUnitPrice = (d: { discountedPrice?: number; basePrice: number }) =>
    typeof d.discountedPrice === 'number' ? d.discountedPrice : d.basePrice;

  // ✅ 총액
  const totalPrice = useMemo(() => {
    return selected.reduce((acc, cur) => acc + getUnitPrice(cur) * cur.qty, 0);
  }, [selected]);

  // ✅ (상단 표시용) 대표 가격 UI는 “상품 레벨” 가격 유지
  // - 네 DTO가 product.salesPrice / product.discountedPrice를 갖고 있으니 그걸 계속 사용
  // - 할인율 계산 로직은 현재 코드가 반대로 되어있어서 바로잡음
  const hasDiscount =
    typeof product.discountedPrice === 'number' &&
    typeof product.salesPrice === 'number' &&
    product.discountedPrice < product.salesPrice;

  const discountRate = useMemo(() => {
    if (!hasDiscount) return 0;
    return Math.round(((product.salesPrice - product.discountedPrice!) / product.salesPrice) * 100);
  }, [hasDiscount, product.salesPrice, product.discountedPrice]);

  // ✅ 옵션 선택(드롭다운)
  const onSelectOption = (productDetailId: number) => {
    const found = details.find((d) => d.productDetailId === productDetailId);
    if (!found) return;

    // 이미 선택돼있으면 qty +1 (원하면 "이미 선택됨" 처리로 바꿀 수 있음)
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

  // ✅ 옵션 qty 변경
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

  // ✅ 옵션 제거(X)
  const remove = (id: number) => {
    // 옵션 1개짜리는 제거 못하게(원하면 가능하게 바꿔도 됨)
    if (!hasOptions) return;
    setSelected((prev) => prev.filter((x) => x.productDetailId !== id));
  };

  // ✅ 장바구니 담기
  const onAddToCart = async () => {
    if (selected.length === 0) return;

    const totalQty = selected.reduce((acc, cur) => acc + cur.qty, 0);
    await addToCart(product.productId.toString(), totalQty);
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

            <button
              type="button"
              onClick={() => setLiked((v) => !v)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="좋아요"
            >
              <Heart
                className={liked ? 'fill-orange-500 text-orange-500' : 'text-muted-foreground'}
                size={18}
              />
              <span>2명이 좋아합니다</span>
            </button>
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

          {/* 정보 테이블 */}
          <div className="border-t border-border">
            <div className="grid grid-cols-[120px_1fr] border-b border-border py-6">
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

            {/* ✅ 옵션 UI (여기부터가 핵심 변경) */}
            <div className="grid grid-cols-[120px_1fr] border-b border-border py-6">
              <div className="text-sm font-medium text-muted-foreground">구매 수량</div>

              <div className="space-y-3">
                {/* 옵션이 여러개면 드롭다운 노출 */}
                {hasOptions && (
                  <select
                    className="h-12 w-full rounded-sm border border-border bg-background px-3 text-sm outline-none"
                    defaultValue=""
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (!v) return;
                      onSelectOption(v);
                      e.currentTarget.value = ''; // 선택 후 placeholder로 되돌리기
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

                {/* 선택된 옵션 리스트 (1개든 여러개든 동일 UI) */}
                {selected.map((s) => {
                  const unit = getUnitPrice(s);
                  return (
                    <div
                      key={s.productDetailId}
                      className="rounded-sm border border-border bg-background p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-sm font-medium text-foreground">{s.name}</div>

                        {/* 옵션이 여러개일 때만 제거 버튼 */}
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
                        {/* 수량 스텝퍼 */}
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

                        {/* 가격 */}
                        <div className="text-right">
                          <div className="text-sm font-bold text-foreground">
                            {formatWon(unit * s.qty)}원
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
              onClick={() => setLiked((v) => !v)}
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
