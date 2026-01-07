import { Info } from 'lucide-react';

export default function EventNotice() {
  return (
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
              선착순 캐시는 수량이 한정되어 있으며, 조기 소진될 수 있습니다.
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500" />
              1인당 1회 캐시만 받을 수 있습니다.
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500" />
              받은 캐시는 마이페이지에서 확인 가능합니다.
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500" />
              캐시 1개당 1회만 적용 가능합니다.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
