import { USER_PROFILE } from '../mocks/my';

export default function ProfileContent() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">이메일</label>
          <div className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900">
            {USER_PROFILE.email}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">이름</label>
          <div className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900">
            {USER_PROFILE.name}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">휴대폰 번호</label>
          <div className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900">
            {USER_PROFILE.phoneNumber}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">회원 등급</label>
          <div className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900">
            {USER_PROFILE.grade}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">가입일</label>
          <div className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900">
            {USER_PROFILE.joinDate}
          </div>
        </div>
      </div>
    </div>
  );
}
