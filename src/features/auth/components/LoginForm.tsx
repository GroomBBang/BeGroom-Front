import TextInput from '@/shared/components/common/TextInput';

export default function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  return (
    <div className="w-full max-w-[400px] rounded-2xl bg-white p-8 shadow-lg md:p-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#5f0080]">BeGroom</h1>
        <p className="mt-2 text-gray-500">로그인</p>
      </div>

      <form className="flex flex-col gap-4">
        <TextInput label="이메일" placeholder="example@email.com" />
        <TextInput label="비밀번호" type="password" placeholder="비밀번호를 입력하세요" />

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
      </form>
    </div>
  );
}
