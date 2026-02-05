'use client';

import { HOME_CATEGORY_BUTTONS } from '@/features/home/constants/homeCategoryButtons';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoryNav() {
  return (
    <section aria-label="홈 카테고리 버튼" className="w-full">
      <ul className="grid grid-cols-4 gap-1 md:grid-cols-8 md:gap-4 ">
        {HOME_CATEGORY_BUTTONS.map((item) => (
          <li key={item.id}>
            <Link
              href={`/categories/${item.id}`}
              className="flex flex-col items-center gap-2 rounded-2xl p-2 transition hover:scale-[1.04] active:scale-[0.98]"
              aria-label={item.label}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100">
                <Image src={item.iconSrc} alt="" width={40} height={40} priority />
              </div>
              <span className="text-sm font-medium text-gray-800">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
