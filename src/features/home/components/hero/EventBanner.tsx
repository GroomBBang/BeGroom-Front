import { useRouter } from 'next/navigation';

export default function EventBanner() {
  const bannerUrl =
    'https://product-image.kurly.com/hdims/resize/%3E1050x%3E140/quality/85/src/banner/random-band/pc/img/8bc2965d-68ed-4cb0-a045-763e40508e25.png';
  const router = useRouter();

  return (
    <div
      className="h-40 cursor-pointer bg-cover bg-center"
      onClick={() => router.push('/event')}
      style={{
        backgroundImage: `url(${bannerUrl})`,
      }}
    ></div>
  );
}
