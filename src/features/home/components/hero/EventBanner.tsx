'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function EventBanner() {
  const bannerUrl =
    'https://product-image.kurly.com/hdims/resize/%3E1050x%3E140/quality/85/src/banner/random-band/pc/img/8bc2965d-68ed-4cb0-a045-763e40508e25.png';

  const router = useRouter();

  return (
    <div
      className="relative h-40 cursor-pointer overflow-hidden"
      onClick={() => router.push('/event')}
    >
      <Image
        src={bannerUrl}
        alt="event-banner"
        fill
        sizes="(max-width: 1160px) 100vw, 1160px"
        className="object-cover"
      />
    </div>
  );
}
