'use client';

import CashCard from '@/features/event/component/CashCard';
import EventBanner from '@/features/event/component/EventBanner';
import EventNotice from '@/features/event/component/EventNotice';
import { CashCardItem } from '@/features/event/types/model';

const CASH_COUPON_DATA: CashCardItem = {
  id: 'cash-event-1',
  tagLabel: '매일 선착순 지급', // 상단 태그
  title: '3,000 구름 캐시', // 메인 타이틀
  condition: '매일 낮 12시 오픈', // 조건
  due: '당일 소진 시 마감', // 마감 기한
  claimed: 2405, // 현재 받은 사람 수
  total: 3000, // 전체 수량
  status: 'available', // 상태
};

export default function CouponsPage() {
  const onClaim = (c: CashCardItem) => {
    if (c.status === 'soldout') return alert('이미 품절된 쿠폰이에요.');
    if (c.status === 'soon') return alert('아직 오픈 전이에요. 조금만 기다려주세요!');
    alert(`쿠폰 받기: ${c.title}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <EventBanner />

      <main className="mx-auto max-w-6xl px-4 pb-14 pt-10">
        <div className="flex justify-center gap-6">
          <CashCard
            key={CASH_COUPON_DATA.id}
            c={CASH_COUPON_DATA}
            onClaim={() => onClaim(CASH_COUPON_DATA)}
          />
        </div>

        <EventNotice />
      </main>
    </div>
  );
}
