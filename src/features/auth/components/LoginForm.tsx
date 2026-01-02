import { useAuth } from '@/features/auth/hooks/useAuth';
import TextInput from '@/shared/components/common/TextInput';
import { useState } from 'react';
import MemberTypeSelector from './MemberTypeSelector';

export default function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const { login } = useAuth();
  const [userType, setUserType] = useState<'USER' | 'SELLER'>('USER');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login({
      email,
      password,
      role: userType,
    });
  };

  return (
    <div className="w-full max-w-[400px] rounded-2xl bg-white p-8 shadow-lg md:p-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary-500">BeGroom</h1>
        <p className="mt-2 text-gray-500">로그인</p>
      </div>

      <form className="flex flex-col gap-4">
        <MemberTypeSelector userType={userType} setUserType={setUserType} />
        <TextInput
          label="이메일"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
            <input type="checkbox" className="accent-primary-500" />
            로그인 상태 유지
          </label>
          <button type="button" className="text-gray-500 hover:text-gray-800">
            비밀번호 찾기
          </button>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          className="mt-4 w-full rounded-md bg-primary-500 py-3.5 text-base font-bold text-white transition-colors hover:bg-primary-600"
        >
          로그인
        </button>

        <div className="text-center text-sm text-gray-500">
          아직 회원이 아니신가요?{' '}
          <button
            type="button"
            onClick={onSwitch}
            className="font-bold text-primary-500 hover:underline"
          >
            회원가입
          </button>
        </div>

        {/* 테스트 계정 안내 박스 */}
        <div className="mt-4 rounded-lg bg-primary-50 p-4 text-xs text-gray-600 border border-primary-100">
          <p className="font-bold text-primary-500 mb-1">테스트 계정</p>
          <p>관리자: admin@begroom.com / 1234</p>
          <p>일반 사용자: user@begroom.com / 1234</p>
        </div>
      </form>
    </div>
  );
}
