'use client';

import { Eye, EyeOff, Store, User } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

// ==========================================
// 1. 공통 UI 컴포넌트 (인풋, 버튼 등)
// ==========================================

const InputField = ({ label, type = 'text', placeholder, required = false }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-600">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:border-[#5f0080] focus:outline-none"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 2. 로그인 폼 컴포넌트
// ==========================================

const LoginForm = ({ onSwitch }: { onSwitch: () => void }) => {
  return (
    <div className="w-full max-w-[400px] rounded-2xl bg-white p-8 shadow-lg md:p-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#5f0080]">BeGroom</h1>
        <p className="mt-2 text-gray-500">로그인</p>
      </div>

      <form className="flex flex-col gap-4">
        <InputField label="이메일" placeholder="example@email.com" />
        <InputField label="비밀번호" type="password" placeholder="비밀번호를 입력하세요" />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
            <input type="checkbox" className="accent-[#5f0080]" />
            로그인 상태 유지
          </label>
          <button type="button" className="text-gray-500 hover:text-gray-800">
            비밀번호 찾기
          </button>
        </div>

        <button className="mt-4 w-full rounded-md bg-[#5f0080] py-3.5 text-base font-bold text-white transition-colors hover:bg-[#4a0063]">
          로그인
        </button>

        <div className="text-center text-sm text-gray-500">
          아직 회원이 아니신가요?{' '}
          <button
            type="button"
            onClick={onSwitch}
            className="font-bold text-[#5f0080] hover:underline"
          >
            회원가입
          </button>
        </div>

        {/* 테스트 계정 안내 박스 */}
        <div className="mt-4 rounded-lg bg-purple-50 p-4 text-xs text-gray-600 border border-purple-100">
          <p className="font-bold text-[#5f0080] mb-1">테스트 계정</p>
          <p>관리자: admin@kurly.com / admin123</p>
          <p>일반 사용자: user@kurly.com / user123</p>
        </div>

        {/* 소셜 로그인 */}
        <div className="mt-6">
          <p className="mb-3 text-xs text-gray-400">간편 로그인</p>
          <div className="flex gap-2">
            {['카카오', '네이버', '구글'].map((sns) => (
              <button
                key={sns}
                type="button"
                className="flex-1 rounded-md border border-gray-200 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                {sns}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

// ==========================================
// 3. 회원가입 폼 컴포넌트
// ==========================================

const SignupForm = ({ onSwitch }: { onSwitch: () => void }) => {
  const [userType, setUserType] = useState<'general' | 'seller'>('general');

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

        <InputField label="이메일" placeholder="example@email.com" required />
        <InputField label="비밀번호" type="password" placeholder="8자 이상 입력하세요" required />
        <InputField
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          required
        />
        <InputField label="이름" placeholder="이름을 입력하세요" required />
        <InputField label="휴대폰 번호" placeholder="010-0000-0000" required />

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

        <button className="mt-4 w-full rounded-md bg-[#5f0080] py-3.5 text-base font-bold text-white transition-colors hover:bg-[#4a0063]">
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
};

// ==========================================
// 4. 메인 페이지 (컨테이너)
// ==========================================

function AuthPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get('mode');
  const view = mode === 'signup' ? 'signup' : 'login';

  const handleSwitchToSignup = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('mode', 'signup');
    router.replace(`?${params.toString()}`);
  };

  const handleSwitchToLogin = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('mode', 'login');
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="min-h-screen w-full bg-[#f2f2f2] flex items-center justify-center p-4">
      {view === 'login' ? (
        <LoginForm onSwitch={handleSwitchToSignup} />
      ) : (
        <SignupForm onSwitch={handleSwitchToLogin} />
      )}
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPageContent />
    </Suspense>
  );
}
