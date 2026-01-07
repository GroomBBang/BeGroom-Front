import { Gift, Percent, Timer, Zap } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

function TimeBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="w-[88px] rounded-2xl bg-white px-4 py-4 text-center shadow-sm">
      <div className="text-[10px] font-bold text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-extrabold text-gray-900">{value}</div>
    </div>
  );
}

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

export default function EventBanner() {
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

  return (
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
          <span className="text-purple-300">캐시 대방출</span>
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
            1000명 한정
          </span>
          <span className="inline-flex items-center gap-2">
            <Gift className="h-4 w-4 text-purple-300" />
            즉시 사용 가능
          </span>
        </div>
      </div>
    </section>
  );
}
