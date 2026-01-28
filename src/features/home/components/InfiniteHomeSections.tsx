import { HOME_CATEGORY } from '@/features/product/constants/homeCategories';
import { HomeCategory } from '@/features/product/types/model';
import { useEffect, useRef, useState } from 'react';
import HomeCategorySection from './HomeCategorySection';

export default function InfiniteHomeSections() {
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const visibleCountRef = useRef(visibleCount);

  const handleScroll = () => {
    const prevVisibleCount = visibleCountRef.current;
    if (prevVisibleCount >= HOME_CATEGORY.length) {
      window.removeEventListener('scroll', handleScroll);
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

  const visibleCategories = HOME_CATEGORY.slice(0, visibleCount);

  return (
    <div className="mt-24 flex flex-col gap-28">
      {visibleCategories.map((category: HomeCategory) => (
        <HomeCategorySection key={category.id} {...category} />
      ))}
    </div>
  );
}
