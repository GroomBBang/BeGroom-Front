export type CategoryKey = 'all' | 'veg' | 'fruit' | 'dairy' | 'bakery';

export type Product = {
  id: string;
  category: CategoryKey;
  categoryLabel: string;
  title: string;
  stock: number;
  description: string;
  price: number;
  originalPrice?: number;
  discountRate?: number;
  likes: number;
  imageUrls: string[];
};

export type TabKey = 'desc' | 'info';
