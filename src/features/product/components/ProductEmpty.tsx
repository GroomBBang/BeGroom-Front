'use client';

export default function ProductEmpty() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-xl border border-border bg-background p-10 text-center text-muted-foreground">
        상품을 찾을 수 없어요.
      </div>
    </div>
  );
}
