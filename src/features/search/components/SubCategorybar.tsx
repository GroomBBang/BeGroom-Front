import Link from 'next/link';

interface Props {
  categories: string[];
  main: string;
  sub: string;
}

export default function SubCategorybar({ categories, main, sub }: Props) {
  const total_categories = ['전체보기', ...categories];

  return (
    <div className="mx-auto max-w-screen-xl px-4 mb-10">
      <div className="w-full border border-gray-200 p-6 flex flex-wrap gap-x-8 gap-y-4 justify-center items-center bg-white">
        {total_categories.map((cat, idx) => (
          <Link
            key={idx}
            href={`/products?main=${main}&sub=${cat}`}
            className={`text-sm hover:text-primary-500 hover:font-bold ${sub === cat ? 'text-primary-500 font-bold' : ''}`}
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}
