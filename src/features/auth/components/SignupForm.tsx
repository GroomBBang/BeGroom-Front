import TextInput from '@/shared/components/common/TextInput';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import MemberTypeSelector from './MemberTypeSelector';

export default function SignupForm({ onSwitch }: { onSwitch: () => void }) {
  const { registerMember, registerSeller } = useAuth();
  const [userType, setUserType] = useState<'USER' | 'SELLER'>('USER');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegister = () => {
    if (password !== passwordConfirm) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (userType === 'SELLER') {
      registerSeller({
        email,
        password,
        name,
        phoneNumber,
        role: userType,
      });
    } else {
      registerMember({
        email,
        password,
        name,
        phoneNumber,
        role: userType,
      });
    }
  };

  return (
    <div className="w-full max-w-[500px] rounded-2xl bg-white p-8 shadow-lg md:p-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#5f0080]">BeGroom</h1>
        <p className="mt-2 text-gray-500">회원가입</p>
      </div>

      <form className="flex flex-col gap-5">
        <MemberTypeSelector userType={userType} setUserType={setUserType} />

        <TextInput
          label="이메일"
          placeholder="example@email.com"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextInput
          label="비밀번호"
          type="password"
          placeholder="8자 이상 입력하세요"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <TextInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          required
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
        />
        <TextInput
          label="이름"
          placeholder="이름을 입력하세요"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <TextInput
          label="휴대폰 번호"
          placeholder="010-0000-0000"
          required
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
        />

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
          onClick={handleRegister}
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
