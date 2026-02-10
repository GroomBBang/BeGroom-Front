import ProductCardSkeleton from '@/features/product/components/ProductCardSkeleton';

export default function NewProductsSkeleton() {
  return (
    <section className="my-4 flex flex-col gap-6" aria-busy="true" aria-live="polite">
      <h2 className="text-xl font-bold tracking-tight">오늘 나온 새로운 제품</h2>

      <ul className="grid grid-cols-2 grid-rows-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <li key={idx}>
            <ProductCardSkeleton />
          </li>
        ))}
      </ul>
    </section>
  );
}
