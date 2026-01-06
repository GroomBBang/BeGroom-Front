import { CategoryKey } from '../types/model';

export const categories: { key: CategoryKey; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'veg', label: '채소' },
  { key: 'fruit', label: '과일' },
  { key: 'dairy', label: '유제품' },
  { key: 'bakery', label: '베이커리' },
];
