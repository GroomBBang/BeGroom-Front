'use client';

export default function ProductDetailLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* TOP */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[480px_1fr]">
        {/* LEFT: image */}
        <section className="relative h-[550px] overflow-hidden rounded-xl border border-border bg-background">
          <Skel className="h-full w-full rounded-none" />
        </section>

        {/* RIGHT: info */}
        <section className="bg-background">
          {/* category + likes */}
          <div className="flex items-center">
            <Skel className="h-4 w-24" />
            <Skel className="h-4 w-40" />
          </div>

          {/* title */}
          <div className="mt-3 space-y-2">
            <Skel className="h-8 w-2/3" />
          </div>

          {/* price */}
          <div className="py-8">
            <div className="items-end mt-8 mb-2">
              <Skel className="h-10 w-40" />
            </div>
          </div>

          {/* meta rows */}
          <div className="border-t border-border">
            <div className="grid grid-cols-[120px_1fr] border-b border-border py-6">
              <Skel className="h-4 w-16" />
              <div className="space-y-2">
                <Skel className="h-4 w-36" />
              </div>
            </div>
            <div className="grid grid-cols-[120px_1fr] border-b border-border py-6">
              <Skel className="h-4 w-16" />
              <div className="space-y-2">
                <Skel className="h-4 w-36" />
              </div>
            </div>
            <div className="grid grid-cols-[120px_1fr] border-b border-border py-6">
              <Skel className="h-4 w-16" />
              <div className="space-y-2">
                <Skel className="h-4 w-36" />
              </div>
            </div>
            <div className="grid grid-cols-[120px_1fr] border-b border-border py-7">
              <Skel className="h-4 w-16" />
              <div className="space-y-3">
                <Skel className="h-10 w-36" />
              </div>
            </div>
          </div>

          {/* total */}
          <div className="mt-8 flex items-end justify-end gap-4">
            <Skel className="h-4 w-16" />
            <Skel className="h-7 w-28" />
          </div>

          {/* CTA */}
          <div className="mt-5 flex items-center gap-3">
            <Skel className="h-12 w-12 rounded-sm" />
            <Skel className="h-12 flex-1 rounded-sm" />
          </div>
        </section>
      </div>

      {/* BOTTOM: Tabs */}
      <section className="mt-11">
        <div className="border-b border-border">
          <div className="flex gap-4 py-4">
            <Skel className="h-6 w-16" />
            <Skel className="h-6 w-16" />
          </div>
        </div>

        <div className="py-8 space-y-4">
          <Skel className="h-[520px] w-full rounded-xl" />
          <Skel className="h-4 w-full" />
          <Skel className="h-4 w-11/12" />
          <Skel className="h-4 w-10/12" />
        </div>
      </section>
    </div>
  );
}

function Skel({ className = '' }: { className?: string }) {
  return <div className={['animate-pulse rounded-md bg-muted', className].join(' ')} />;
}
