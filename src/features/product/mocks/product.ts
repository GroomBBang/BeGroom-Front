// app/_data/home.mock.ts
import type { Product } from '@/features/product/types';

export const products: Product[] = [
  {
    id: '1',
    category: 'veg',
    categoryLabel: '채소',
    title: '[KF365] 유기농 샐러드 믹스',
    price: 5900,
    originalPrice: 7900,
    discountRate: 25,
    likes: 342,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999',
  },
  {
    id: '2',
    category: 'bakery',
    categoryLabel: '베이커리',
    title: '수제 식빵',
    price: 4500,
    likes: 421,
    imageUrl: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec',
  },
  {
    id: '3',
    category: 'fruit',
    categoryLabel: '과일',
    title: '프리미엄 과일 모음',
    price: 29900,
    likes: 156,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999',
  },
  {
    id: '4',
    category: 'dairy',
    categoryLabel: '유제품',
    title: '[Kurly Only] 저지방 우유 1L',
    price: 3200,
    originalPrice: 3900,
    discountRate: 18,
    likes: 589,
    imageUrl: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec',
  },
];
