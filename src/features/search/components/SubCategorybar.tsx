import Link from 'next/link';
import { SubCategoryType } from '../types';

export default function SubCategorybar({
  subCategories,
  categoryId,
}: {
  subCategories: SubCategoryType[];
  categoryId: string;
}) {
  return (
    <div className="mx-auto max-w-screen-xl mb-10">
      <div className="w-full border border-gray-200 bg-white px-10 py-8 grid grid-cols-4 gap-5">
        {subCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.id}?sort=productId&direction=DESC`}
            className={`text-sm hover:text-primary-500 hover:font-bold ${categoryId === cat.id ? 'text-primary-500 font-bold' : ''}`}
          >
            {cat.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
