'use client';

import FCFSCash from '@/features/event/component/FCFSCash';
import { productListAPI } from '@/features/product/api/productList.api';
import ProductCard from '@/features/product/components/ProductCard';
import { ProductCardType } from '@/features/product/types/model';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [products, setProducts] = useState<ProductCardType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    productListAPI
      .searchProducts({
        page: 0,
        size: 8,
        sort: 'wishlistCount',
        direction: 'DESC',
      })
      .then((res) => {
        setProducts(res.content);
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return;

  return (
    <>
      <section className="bg-primary-500 py-20 text-center text-white">
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
          신선한 식재료,
          <br />
          내일 아침 문앞에서
        </h1>
        <p className="mt-4 text-sm text-white/80 md:text-base">샛별배송, 새벽 7시 전 도착</p>
      </section>

      <FCFSCash />

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-12">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-foreground">이 상품 어때요?</h2>
          <p className="mt-2 text-sm text-muted-foreground">지금 가장 인기 있는 상품</p>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product: ProductCardType) => (
            <ProductCard key={String(product.productId)} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className=" rounded-xl border border-border bg-background p-12 text-center text-sm text-muted-foreground">
            상품이 없습니다.
          </div>
        )}
      </main>
    </>
  );
}
