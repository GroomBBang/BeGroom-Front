import { CATEGORIES } from '@/features/search/constants/search';
import { useEffect, useRef, useState } from 'react';
import CategorySection from './CategorySection';

export default function CategoryListSection() {
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const visibleCountRef = useRef(visibleCount);

  const handleScroll = () => {
    const prevVisibleCount = visibleCountRef.current;
    if (prevVisibleCount >= CATEGORIES.length) {
      return;
    }

    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight < documentHeight - 200) return;

    setVisibleCount((prev) => prev + 3);
    visibleCountRef.current = prevVisibleCount + 3;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleCategories = CATEGORIES.slice(0, visibleCount);

  return (
    <section className="w-full flex flex-col gap-6">
      <h2 className="text-xl font-bold tracking-tight">
        카테고리 별 <span className="text-primary-300">추천 상품</span>
      </h2>

      <div className="flex flex-col gap-10">
        {visibleCategories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
