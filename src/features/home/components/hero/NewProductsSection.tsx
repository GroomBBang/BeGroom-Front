import ProductCard from '@/features/product/components/ProductCard';
import { ProductCardType } from '@/features/product/types/model';
import { productSearchPresets } from '../../constants/fetchProductsPrestets';
import { useProductSearch } from '../../hooks/useFetchProducts';

export default function NewProductsSection() {
  const { data: products, isLoading } = useProductSearch(productSearchPresets.homeNew);

  if (isLoading || !products) return;

  return (
    <div className="flex flex-col gap-6 my-4">
      <h2 className="text-xl font-bold tracking-tight">오늘 나온 새로운 제품</h2>
      <div className="grid grid-cols-2 grid-rows-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product: ProductCardType) => (
          <ProductCard key={String(product.productId)} product={product} />
        ))}
      </div>
    </div>
  );
}
