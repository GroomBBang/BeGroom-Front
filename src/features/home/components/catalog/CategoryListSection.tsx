import { CATEGORIES } from '@/features/search/constants/search';
import CategorySection from './CategorySection';

export default function CategoryListSection() {
  return (
    <section className="w-full flex flex-col gap-6">
      <h2 className="text-xl font-bold tracking-tight">
        카테고리 별 <span className="text-primary-300">추천 상품</span>
      </h2>

      <div className="flex flex-col gap-10">
        {CATEGORIES.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
