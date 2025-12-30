'use client';

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-muted/60 ${className}`} />;
}

function CartItemSkeleton() {
  return (
    <div className="rounded-md border border-border bg-background p-4">
      <div className="flex gap-4">
        <Skeleton className="h-20 w-20 rounded-md" />

        <div className="flex-1 space-y-3">
          <div className="flex justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-8 w-8" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-10" />
              <Skeleton className="h-9 w-9" />
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartLoading() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
      {/* LEFT */}
      <section>
        {/* 상단 바 */}
        <div className="mb-4 rounded-md border border-border bg-background px-4 py-3">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-5 w-20" />
          </div>
        </div>

        {/* 아이템 목록 */}
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <CartItemSkeleton key={i} />
          ))}
        </div>
      </section>

      {/* RIGHT */}
      <aside className="h-fit rounded-md border border-border bg-background p-6">
        <Skeleton className="h-6 w-28" />

        <div className="mt-5 space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>

        <Skeleton className="mt-4 h-10 w-full rounded-md" />

        <div className="my-5 h-px bg-border" />

        <div className="flex justify-between items-end">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-28" />
        </div>

        <Skeleton className="mt-6 h-12 w-full rounded-sm" />

        <div className="mt-5 list-disc space-y-2 pl-5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </aside>
    </div>
  );
}
