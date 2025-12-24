import { Heart, X } from 'lucide-react';
import { WISHLIST_ITEMS } from '../mocks/my';

export default function WishlistContent() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {WISHLIST_ITEMS.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
        >
          {/* 이미지 영역 */}
          <div className="relative h-48 bg-gray-100">
            <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
            {/* 닫기 버튼 */}
            <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-500 backdrop-blur-sm transition-colors hover:bg-white hover:text-gray-900">
              <X size={18} />
            </button>
          </div>

          {/* 텍스트 영역 */}
          <div className="p-5">
            <span className="mb-1 block text-sm text-gray-500">{item.category}</span>
            <h3 className="mb-2 text-lg font-bold text-gray-900">{item.name}</h3>
            <div className="mb-2 text-2xl font-bold text-primary-600">
              {item.price.toLocaleString()}원
            </div>
            <p className="mb-4 text-sm text-gray-500">{item.description}</p>

            {/* 찜 영역 */}
            <div className="flex items-center gap-1 text-sm font-medium text-primary-600">
              <Heart size={16} className="fill-primary-600" />
              <span>{item.likes}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
