import { ChevronRight, Timer } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FCFSCash() {
  const router = useRouter();
  return (
    <div className="relative z-10 mx-auto -mt-10 max-w-6xl px-4">
      <button
        onClick={() => router.push('/event')}
        className="group relative w-full overflow-hidden rounded-3xl bg-[#1e1e2e] shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(60%_200%_at_0%_0%,rgba(168,85,247,0.4),transparent_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.2),transparent)]" />

        <div className="relative flex items-center justify-between px-6 py-5 sm:px-10 sm:py-7">
          <div className="text-left">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-orange-500/90 px-2.5 py-1 text-[10px] font-extrabold text-white shadow-sm">
              <Timer className="h-3 w-3" />
              LIMITED OFFER
            </div>

            <h2 className="text-xl font-bold text-white sm:text-2xl">
              선착순 <span className="text-purple-300">구름 캐시 </span> 지급 이벤트!
            </h2>
            <p className="mt-1 text-xs text-white/70 sm:text-sm">
              매일 낮 12시, 3000 구름 캐시 지급!
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
            <ChevronRight className="h-5 w-5 text-white" />
          </div>
        </div>
      </button>
    </div>
  );
}
