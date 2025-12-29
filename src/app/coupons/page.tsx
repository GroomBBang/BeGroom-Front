// src/app/coupons/page.tsx
'use client';

import { Gift, Info, Percent, Timer, Zap } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

/* ======================
   Types
====================== */
type CouponStatus = 'available' | 'soon' | 'soldout';

type Coupon = {
  id: string;
  tagLabel: string; // ✅ 화면에 표시될 라벨(신규/주말/첫구매 등)
  title: string;
  condition: string;
  due: string;
  claimed: number;
  total: number;
  status: CouponStatus;
};

/* ======================
   Mock Data
====================== */
const COUPONS: Coupon[] = [
  {
    id: 'c1',
    tagLabel: '신규',
    title: '신규 회원 특별 할인',
    condition: '최소 50K 이상 구매',
    due: '2026. 1. 23.까지',
    claimed: 47,
    total: 100,
    status: 'available',
  },
  {
    id: 'c2',
    tagLabel: '주말',
    title: '주말 특가 20% 할인',
    condition: '최소 30K 이상 구매',
    due: '2026. 1. 7.까지',
    claimed: 123,
    total: 200,
    status: 'available',
  },
  {
    id: 'c3',
    tagLabel: '첫구매',
    title: '첫 구매 15,000원 할인',
    condition: '최소 70K 이상 구매',
    due: '2026. 1. 23.까지',
    claimed: 5,
    total: 50,
    status: 'soon',
  },
  {
    id: 'c4',
    tagLabel: '신선',
    title: '신선식품 30% 할인',
    condition: '최소 20K 이상 구매',
    due: '2025. 12. 31.까지',
    claimed: 0,
    total: 150,
    status: 'soldout',
  },
  {
    id: 'c5',
    tagLabel: '베이커리',
    title: '베이커리 5,000원 할인',
    condition: '최소 15K 이상 구매',
    due: '2026. 1. 7.까지',
    claimed: 267,
    total: 300,
    status: 'available',
  },
  {
    id: 'c6',
    tagLabel: '생활',
    title: '생활용품 25% 할인',
    condition: '최소 40K 이상 구매',
    due: '2026. 1. 14.까지',
    claimed: 12,
    total: 80,
    status: 'soon',
  },
];

/* ======================
   Utils
====================== */
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function leftPercent(claimed: number, total: number) {
  if (total <= 0) return 0;
  return clamp(Math.round((claimed / total) * 100), 0, 100);
}

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

/* ======================
   Page
====================== */
export default function CouponsPage() {
  // 시안처럼 시간 제한 느낌(3:12:08)
  const [remainSec, setRemainSec] = useState(3 * 60 * 60 + 12 * 60 + 8);

  useEffect(() => {
    const t = setInterval(() => setRemainSec((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const time = useMemo(() => {
    const h = Math.floor(remainSec / 3600);
    const m = Math.floor((remainSec % 3600) / 60);
    const s = remainSec % 60;
    return { h, m, s };
  }, [remainSec]);

  const onClaim = (c: Coupon) => {
    if (c.status === 'soldout') return alert('이미 품절된 쿠폰이에요.');
    if (c.status === 'soon') return alert('아직 오픈 전이에요. 조금만 기다려주세요!');
    alert(`쿠폰 받기: ${c.title}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ======================
          HERO
      ====================== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_10%,rgba(168,85,247,0.55),transparent_60%),radial-gradient(45%_45%_at_80%_30%,rgba(34,15,51,0.9),transparent_55%),linear-gradient(180deg,rgba(3,2,19,1),rgba(3,2,19,1))]" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-orange-500/90 px-4 py-2 text-xs font-extrabold text-white shadow">
            <Timer className="h-4 w-4" />
            LIMITED TIME OFFER
          </div>

          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
            선착순
            <br />
            <span className="text-purple-300">쿠폰 대방출</span>
          </h1>

          <p className="mt-4 text-sm text-white/70 md:text-base">
            지금이 아니면 늦습니다. 서둘러 받아가세요.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <TimeBox label="HOURS" value={pad2(time.h)} />
            <TimeBox label="MINUTES" value={pad2(time.m)} />
            <TimeBox label="SECONDS" value={pad2(time.s)} />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-white/75">
            <span className="inline-flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              빠른 선착순
            </span>
            <span className="inline-flex items-center gap-2">
              <Percent className="h-4 w-4 text-white/80" />
              최대 35% 할인
            </span>
            <span className="inline-flex items-center gap-2">
              <Gift className="h-4 w-4 text-purple-300" />
              즉시 사용 가능
            </span>
          </div>
        </div>
      </section>

      {/* ======================
          COUPONS
      ====================== */}
      <main className="mx-auto max-w-6xl px-4 pb-14 pt-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {COUPONS.map((c) => (
            <CouponCard key={c.id} c={c} onClaim={() => onClaim(c)} />
          ))}
        </div>

        {/* ======================
            INFO
        ====================== */}
        <section className="mt-10 rounded-2xl border border-border bg-background p-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl bg-primary-50 text-primary-700">
              <Info className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <div className="text-sm font-bold text-foreground">안내</div>
              <ul className="mt-3 grid gap-2 text-xs text-muted-foreground md:grid-cols-2">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500" />
                  선착순 쿠폰은 수량이 한정되어 있으며, 조기 소진될 수 있습니다.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500" />
                  1인당 1회 쿠폰만 받을 수 있습니다.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500" />
                  받은 쿠폰은 마이페이지에서 확인 가능합니다.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500" />
                  최소 주문금액 이상 구매 시 사용 가능합니다.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500" />
                  유효기간 내에만 사용 가능하며, 기간 경과 시 자동 소멸됩니다.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500" />
                  쿠폰 1개당 1회만 적용 가능합니다.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ======================
   UI (same file)
====================== */
function TimeBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="w-[88px] rounded-2xl bg-white px-4 py-4 text-center shadow-sm">
      <div className="text-[10px] font-bold text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-extrabold text-gray-900">{value}</div>
    </div>
  );
}

function CouponCard({ c, onClaim }: { c: Coupon; onClaim: () => void }) {
  const p = leftPercent(c.claimed, c.total);
  const isSoldOut = c.status === 'soldout';
  const isSoon = c.status === 'soon';

  const cardBase = 'relative overflow-hidden rounded-3xl border border-border shadow-sm';
  const cardBg = isSoldOut ? 'bg-gray-900/95 text-white/80' : 'bg-primary-700 text-white';

  return (
    <article className={[cardBase, cardBg].join(' ')}>
      {isSoldOut && (
        <span className="absolute right-4 top-4 rounded-full bg-orange-500/80 px-3 py-1 text-[10px] font-extrabold text-white">
          SOLD OUT
        </span>
      )}

      <div className="p-6">
        {/* 썸네일(더미 박스) */}
        <div
          className={['h-16 w-24 rounded-2xl bg-white/95', isSoldOut ? 'opacity-20' : ''].join(' ')}
        />

        <div className="mt-6">
          <div className="text-sm font-semibold text-white/80">{c.tagLabel}</div>
          <div className="mt-2 text-xl font-extrabold leading-snug">{c.title}</div>

          <div className="mt-4 space-y-2 text-xs text-white/75">
            <InfoLine>{c.condition}</InfoLine>
            <InfoLine>{c.due}</InfoLine>
          </div>

          <div className="mt-6 flex items-center justify-between text-[11px] text-white/80">
            <div>
              {c.claimed} / {c.total}
            </div>
            <div className="font-bold">{p}% 남음</div>
          </div>

          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className={[
                'h-full rounded-full',
                isSoldOut ? 'bg-white/15' : isSoon ? 'bg-orange-500/80' : 'bg-white',
              ].join(' ')}
              style={{ width: `${isSoldOut ? 100 : p}%` }}
            />
          </div>

          {isSoon && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-orange-500/25 px-3 py-2 text-xs font-bold text-white">
              <Timer className="h-4 w-4" />
              거의 마감! 서둘러 받으세요
            </div>
          )}

          <button
            type="button"
            onClick={onClaim}
            disabled={isSoldOut}
            className={[
              'mt-6 h-11 w-full rounded-2xl text-sm font-extrabold transition',
              isSoldOut
                ? 'bg-white/10 text-white/40 cursor-not-allowed'
                : 'bg-white text-primary-700 hover:bg-white/90',
            ].join(' ')}
          >
            지금 받기
          </button>

          {isSoldOut && (
            <button
              type="button"
              disabled
              className="mt-3 h-11 w-full rounded-2xl bg-white/10 text-sm font-extrabold text-white/40"
            >
              품절
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function InfoLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-block h-4 w-4 rounded-full bg-white/20" />
      <span>{children}</span>
    </div>
  );
}
