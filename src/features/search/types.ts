import type { LucideIcon } from 'lucide-react';

export interface SubCategoryType {
  id: string;
  label: string;
}

export interface CategoryType {
  id: string;
  label: string;
  icon: LucideIcon;
  subcategories: SubCategoryType[];
}
