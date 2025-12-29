import { Coins } from 'lucide-react';

interface Props {
  balance: number;
}

export default function MyCurrentPoint({ balance }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-primary-100 bg-purple-50 p-8">
      <div className="mb-2 flex items-center gap-2 text-primary-800">
        <Coins size={20} />
        <span className="font-bold">현재 보유 구름 포인트</span>
      </div>
      <div className="text-4xl font-bold text-primary-600">{balance.toLocaleString()}원</div>
      <p className="mt-4 text-xs text-gray-500">
        포인트는 유효기간 내에만 사용 가능하며,
        <br className="md:hidden" /> 만료된 포인트는 자동 소멸됩니다.
      </p>
    </div>
  );
}
