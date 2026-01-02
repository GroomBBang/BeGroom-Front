'use client';

import clsx from 'clsx';

type BadgeColor = 'gray' | 'blue' | 'emerald' | 'red' | 'yellow' | 'purple';

type Props = {
  label: string;
  color?: BadgeColor;
};

const colorMap: Record<BadgeColor, string> = {
  gray: 'bg-gray-100 text-gray-700',
  blue: 'bg-blue-50 text-blue-700',
  emerald: 'bg-emerald-50 text-emerald-700',
  red: 'bg-red-50 text-red-700',
  yellow: 'bg-yellow-50 text-yellow-700',
  purple: 'bg-purple-50 text-purple-700',
};

export default function Badge({ label, color = 'gray' }: Props) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
        colorMap[color],
      )}
    >
      {label}
    </span>
  );
}
