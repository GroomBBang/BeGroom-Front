import { ChevronRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProductCarousel from './ProductCarousel';

interface Props {
  emoji: string;
  title: string;
  subtitle: string;
  id: string;
}

export default function HomeCategorySection({ title, subtitle, id, emoji }: Props) {
  const router = useRouter();

  return (
    <div className="flex gap-8 flex-col items-start">
      {/* 텍스트 영역 */}
      <div className="flex gap-2 flex-col items-center text-center w-full">
        <h2
          onClick={() => router.push(`/categories/${id}`)}
          className="flex items-center gap-2 text-[28px] font-semibold text-gray-900 cursor-pointer"
        >
          {emoji && <span className="text-2xl">{emoji}</span>}
          {title}
          <ChevronRightIcon className="h-8 w-8" />
        </h2>

        <p className="text-md font-semibold text-gray-400">{subtitle}</p>
      </div>

      {/* 이미지 영역 */}
      <ProductCarousel id={id} />
    </div>
  );
}
