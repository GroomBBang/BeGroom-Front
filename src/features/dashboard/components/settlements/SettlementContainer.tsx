'use client';

import { Layers, List } from 'lucide-react';
import { useState } from 'react';
import SettlementItemList from './SettlementItemList';
import SettlementPeriodList from './SettlementPeriodList';

export type MainView = 'ITEM' | 'PERIOD';

export default function SellerSettlementContainer() {
  // 대분류(건별/기간별)
  const [view, setView] = useState<MainView>('ITEM');

  return (
    <>
      {/* 탭 버튼 */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setView('ITEM')}
          className={[
            'inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition cursor-pointer',
            view === 'ITEM'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50',
          ].join(' ')}
        >
          <List size={16} />
          건별 정산
        </button>

        <button
          type="button"
          onClick={() => setView('PERIOD')}
          className={[
            'inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition cursor-pointer',
            view === 'PERIOD'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50',
          ].join(' ')}
        >
          <Layers size={16} />
          기간별 정산
        </button>
      </div>

      {/* 건별/기간별 리스트 */}
      {view === 'ITEM' ? <SettlementItemList /> : <SettlementPeriodList />}
    </>
  );
}
