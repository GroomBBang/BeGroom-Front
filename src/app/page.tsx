'use client';

import HomeContainer from '@/features/home/components/HomeContainer';

export default function HomePage() {
  // const [products, setProducts] = useState<ProductCardType[]>([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);

  //   productListAPI
  //     .searchProducts({
  //       page: 0,
  //       size: 8,
  //       sort: 'wishlistCount',
  //       direction: 'DESC',
  //     })
  //     .then((res) => {
  //       setProducts(res.content);
  //     })
  //     .catch(() => {
  //       setProducts([]);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  // if (isLoading) return;

  return (
    <>
      <HomeContainer />

      {/* <section className="bg-primary-500 py-20 text-center text-white">
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
          신선한 식재료,
          <br />
          내일 아침 문앞에서
        </h1>
        <p className="mt-4 text-sm text-white/80 md:text-base">샛별배송, 새벽 7시 전 도착</p>
      </section> */}

      {/* <FCFSCash /> */}

      {/* <main className="mx-auto max-w-6xl px-4 pb-16 pt-16"> */}
      {/* 인기상품 */}
      {/* <div className="flex flex-col gap-8">
          <div className="flex gap-2 flex-col items-center text-center w-full">
            <h2 className="flex items-center gap-2 text-[28px] font-semibold text-gray-900">
              <span className="text-2xl">🏆</span>
              실시간 인기 랭킹
              <span className="text-2xl">🏆</span>
            </h2>

            <p className="text-md font-semibold text-gray-400">
              지금 가장 인기 있는 상품만 모아보세요!
            </p>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product: ProductCardType) => (
              <ProductCard key={String(product.productId)} product={product} />
            ))}
          </div>
        </div> */}

      {/* 카테고리 */}
      {/* <InfiniteHomeSections />

        {products.length === 0 && (
          <div className=" rounded-xl border border-border bg-background p-12 text-center text-sm text-muted-foreground">
            상품이 없습니다.
          </div>
        )} */}
      {/* </main> */}
    </>
  );
}
