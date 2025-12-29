import { ShoppingCart } from 'lucide-react';

interface Props {
  product: any;
}

export default function ProductCard({ product }: Props) {
  return (
    <div key={product.id} className="group cursor-pointer">
      <div className="relative mb-3 overflow-hidden rounded bg-gray-100 aspect-[3/4]">
        <img
          src={product.img}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <button className="flex w-full items-center mb-3 justify-center gap-2 bg-white/90 py-2 text-sm font-bold text-primary-500 rounded transition-colors hover:bg-white shadow-sm border border-gray-100">
        <ShoppingCart size={16} />
        담기
      </button>

      <div className="flex flex-col gap-1.5">
        <div className="text-xs text-gray-400 mb-0.5">{product.delivery}</div>
        <h3 className="text-base text-gray-900 line-clamp-2 leading-relaxed">{product.title}</h3>
        {product.desc && <p className="text-xs text-gray-400 line-clamp-1">{product.desc}</p>}

        <div className="flex items-center gap-2 mt-1">
          {product.discount > 0 && (
            <span className="text-lg font-bold text-orange-500">{product.discount}%</span>
          )}
          <span className="text-lg font-bold text-gray-900">
            {(product.salePrice || product.price).toLocaleString()}원
          </span>
          {product.discount > 0 && (
            <span className="text-xs text-gray-400 line-through decoration-gray-300">
              {product.price.toLocaleString()}원
            </span>
          )}
        </div>

        {product.reviews > 0 && (
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <div className="flex items-center">
              <svg className="w-3 h-3 text-purple-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg className="w-3 h-3 text-purple-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <span className="ml-1 text-[#5f0080] font-bold">999+</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
