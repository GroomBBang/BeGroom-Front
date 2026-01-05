import NumberFlow from '@number-flow/react';
import { Coins, Plus } from 'lucide-react';

interface Props {
  balance: number;
}

export default function MyCurrentPoint({ balance }: Props) {
  const handleOpenPopup = () => {
    const popupUrl = '/popup/charge-cash';
    const popupName = 'cashChargePopup';
    const features =
      'width=420,height=600,resizable=no,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no';

    window.open(popupUrl, popupName, features);
  };

  return (
    <div className="relative flex flex-col items-center justify-center rounded-xl border border-primary-100 bg-purple-50 p-8">
      <button
        onClick={handleOpenPopup}
        className="absolute top-5 right-5 flex items-center gap-2 transition-colors hover:bg-primary-200 rounded-lg border border-primary-200 bg-primary-100 px-4 py-2 text-primary-800"
      >
        <Plus size={20} strokeWidth={3} />
        <span className="font-bold">구름 캐시 충전</span>
      </button>
      <div className="mb-2 flex items-center gap-2 text-primary-800">
        <Coins size={20} />
        <span className="font-bold">현재 보유 구름 캐시</span>
      </div>
      <div className="text-4xl font-bold text-primary-600">
        <NumberFlow value={balance} format={{ useGrouping: true }} />
        <span>원</span>
      </div>
      <p className="mt-4 text-xs text-gray-500">
        캐시는 충전 후에만 사용 가능하며,
        <br className="md:hidden" /> 잔액이 부족할 시 구매가 불가능합니다.
      </p>
    </div>
  );
}
