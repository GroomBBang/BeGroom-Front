import { Store, User } from 'lucide-react';

interface Props {
  userType: 'USER' | 'SELLER';
  setUserType: (userType: 'USER' | 'SELLER') => void;
}

export default function MemberTypeSelector({ userType, setUserType }: Props) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-600">
        회원 유형 선택 <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setUserType('USER')}
          className={`flex-1 flex flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-all
                ${
                  userType === 'USER'
                    ? 'border-[#5f0080] bg-purple-50 text-[#5f0080]'
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
        >
          <User size={24} />
          <span className="text-sm font-medium">일반 회원</span>
          <span className="text-xs opacity-70">상품 구매</span>
        </button>
        <button
          type="button"
          onClick={() => setUserType('SELLER')}
          className={`flex-1 flex flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-all
                ${
                  userType === 'SELLER'
                    ? 'border-[#5f0080] bg-purple-50 text-[#5f0080]'
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
        >
          <Store size={24} />
          <span className="text-sm font-medium">판매자</span>
          <span className="text-xs opacity-70">상품 판매</span>
        </button>
      </div>
    </div>
  );
}
