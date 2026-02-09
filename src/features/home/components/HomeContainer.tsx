import CategoryListSection from './catalog/CategoryListSection';
import CategoryNav from './hero/CategoryNav';
import EventBanner from './hero/EventBanner';
import HeroCarousel from './hero/HeroCarousel';
import NewProductsSection from './hero/NewProductsSection';
import PopularProductsSection from './hero/PopularProductsSection';
import WishProductsSection from './personalized/WishProductsSection';

export default function HomeContainer() {
  return (
    <main className="mx-auto max-w-[1200px] px-5 pt-12 flex flex-col gap-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] lg:gap-16 gap-8">
        {/* 왼쪽 메인 */}
        <div className="flex flex-col gap-8">
          {/* 슬라이드 배너 */}
          <HeroCarousel />
          {/* 카테고리 버튼 */}
          <CategoryNav />
          {/* 신상품 */}
          <NewProductsSection />
        </div>

        {/* 오른쪽 리스트 */}
        <div>
          {/* 인기순 */}
          <PopularProductsSection />
        </div>
      </div>

      {/* 이벤트(광고) 배너 */}
      <EventBanner />

      {/* 좋아요 한 상품 */}
      <WishProductsSection />

      {/* 카테고리 리스트 */}
      <CategoryListSection />
    </main>
  );
}
