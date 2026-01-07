import { Coins, Timer } from 'lucide-react';
import { CashCardItem } from '../types/model';
import { triggerCoinExplosion } from '../utils/confetti';

function leftPercent(claimed: number, total: number) {
  if (total <= 0) return 0;
  return clamp(Math.round((claimed / total) * 100), 0, 100);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function InfoLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-block h-4 w-4 rounded-full bg-white/20" />
      <span>{children}</span>
    </div>
  );
}

export default function CashCard({ c, onClaim }: { c: CashCardItem; onClaim: () => void }) {
  const p = leftPercent(c.claimed, c.total);
  const isSoldOut = c.status === 'soldout';
  const isSoon = c.status === 'soon';

  const cardBase =
    'relative overflow-hidden rounded-3xl border border-border shadow-sm transition-transform active:scale-[0.98] min-w-md';
  const cardBg = isSoldOut ? 'bg-gray-900/95 text-white/80' : 'bg-primary-600 text-white';

  const handleClaimClick = () => {
    triggerCoinExplosion();
    onClaim();
  };

  return (
    <article className={[cardBase, cardBg].join(' ')}>
      {isSoldOut && (
        <span className="absolute right-4 top-4 rounded-full bg-orange-500/90 px-3 py-1 text-[10px] font-extrabold text-white shadow-sm">
          마감
        </span>
      )}

      <div className="p-6">
        <div
          className={[
            'flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-inner',
            isSoldOut ? 'opacity-20' : '',
          ].join(' ')}
        >
          <Coins className="h-8 w-8 text-orange-500" strokeWidth={2.5} />
        </div>

        <div className="mt-5">
          <div className="inline-flex items-center rounded-md bg-white/20 px-2 py-0.5 text-[11px] font-bold text-white/90">
            {c.tagLabel}
          </div>

          <div className="mt-2 text-2xl font-extrabold leading-tight tracking-tight">{c.title}</div>

          <div className="mt-4 space-y-1.5 text-xs text-white/75 font-medium">
            <InfoLine>{c.condition}</InfoLine>
            <InfoLine>{c.due}</InfoLine>
          </div>

          <div className="mt-6 flex items-end justify-between text-[11px] text-white/80">
            <div className="font-medium">
              <span className="text-white font-bold text-sm mr-1">
                {c.claimed.toLocaleString()}명
              </span>
              지급 완료
            </div>
            <div className="font-bold opacity-80">{isSoldOut ? '0%' : `${p}%`} 남음</div>
          </div>

          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-black/20">
            <div
              className={[
                'h-full rounded-full transition-all duration-500 ease-out',
                isSoldOut ? 'bg-white/10' : isSoon ? 'bg-orange-400' : 'bg-white',
              ].join(' ')}
              style={{ width: `${isSoldOut ? 100 : p}%` }}
            />
          </div>

          {isSoon && !isSoldOut && (
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-orange-300 animate-pulse">
              <Timer className="h-3.5 w-3.5" />곧 마감돼요! 서두르세요
            </div>
          )}

          <button
            type="button"
            onClick={handleClaimClick}
            disabled={isSoldOut || isSoon}
            className={[
              'mt-6 flex h-12 w-full items-center justify-center rounded-2xl text-sm font-extrabold transition-colors',
              isSoldOut
                ? 'bg-white/10 text-white/40 cursor-not-allowed'
                : 'bg-white text-primary-700 hover:bg-gray-50 shadow-lg',
            ].join(' ')}
          >
            {isSoldOut ? '오늘 수량이 모두 소진되었어요' : '3,000 캐시 받기'}
          </button>
        </div>
      </div>
    </article>
  );
}
