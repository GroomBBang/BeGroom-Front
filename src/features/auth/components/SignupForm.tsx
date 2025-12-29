import TextInput from '@/shared/components/common/TextInput';
import { Store, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SignupForm({ onSwitch }: { onSwitch: () => void }) {
  const [userType, setUserType] = useState<'general' | 'seller'>('general');
  const router = useRouter();

  return (
    <div className="w-full max-w-[500px] rounded-2xl bg-white p-8 shadow-lg md:p-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#5f0080]">BeGroom</h1>
        <p className="mt-2 text-gray-500">회원가입</p>
      </div>

      <form className="flex flex-col gap-5">
        {/* 회원 유형 선택 */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            회원 유형 선택 <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setUserType('general')}
              className={`flex-1 flex flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-all
                ${
                  userType === 'general'
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
              onClick={() => setUserType('seller')}
              className={`flex-1 flex flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-all
                ${
                  userType === 'seller'
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

        <TextInput label="이메일" placeholder="example@email.com" required />
        <TextInput label="비밀번호" type="password" placeholder="8자 이상 입력하세요" required />
        <TextInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          required
        />
        <TextInput label="이름" placeholder="이름을 입력하세요" required />
        <TextInput label="휴대폰 번호" placeholder="010-0000-0000" required />

        {/* 약관 동의 */}
        <div className="mt-2 flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" className="accent-[#5f0080]" />
            [필수] 이용약관 동의
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" className="accent-[#5f0080]" />
            [필수] 개인정보 수집·이용 동의
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" className="accent-[#5f0080]" />
            [선택] 마케팅 수신 동의
          </label>
        </div>

        <button
          type="button"
          onClick={() => {
            toast.success('회원가입 성공');
            router.push('/auth?mode=login');
          }}
          className="mt-4 w-full rounded-md bg-[#5f0080] py-3.5 text-base font-bold text-white transition-colors hover:bg-[#4a0063]"
        >
          회원가입
        </button>

        <div className="text-center text-sm text-gray-500">
          이미 회원이신가요?{' '}
          <button
            type="button"
            onClick={onSwitch}
            className="font-bold text-[#5f0080] hover:underline"
          >
            로그인
          </button>
        </div>
      </form>
    </div>
  );
}
