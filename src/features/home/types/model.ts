// types/category.ts
import type { LucideIcon } from 'lucide-react';

export type SubCategoryType = {
  id: string;
  label: string;
};

export type CategoryType = {
  id: string;
  label: string;
  icon: LucideIcon;
  subcategories: SubCategoryType[];
};

// types/product.ts
export type ProductType = {
  id: string | number;
  name: string;
  imageUrl: string;
  price: number; // 원 단위
  discountRate?: number; // 0~100
  discountedPrice?: number; // 있으면 이걸 우선 사용
  badge?: string; // "로켓", "내일" 같은 텍스트 있으면 사용
};
