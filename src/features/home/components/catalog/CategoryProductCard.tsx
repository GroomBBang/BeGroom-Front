import { ProductCardType } from '@/features/product/types/model';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoryProductCard({ product }: { product: ProductCardType }) {
  const price = product.discountedPrice ?? product.salesPrice;
  return (
    <Link href={`/products/${product.productId}`} prefetch={false} className="h-[250px]">
      {/* 썸네일 */}
      <div className="relative h-[180px] w-[180px] shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={product.mainImageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* 상품 설명 */}
      <div className="flex flex-col">
        <p className="flex-1 text-xs text-gray-900">{product.name}</p>

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
