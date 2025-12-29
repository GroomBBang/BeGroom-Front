import { useEffect, useState } from 'react';
import myAPI from '../apis/my.api';
import { MyProfileResponseDTO } from '../types/response';

export default function ProfileContent() {
  const { fetchMyProfile } = myAPI();
  const [data, setData] = useState<MyProfileResponseDTO | null>(null);

  useEffect(() => {
    fetchMyProfile().then((response) => {
      setData(response);
    });
  }, []);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">이메일</label>
          <div className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900">
            {data?.email}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">이름</label>
          <div className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900">
            {data?.name}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">휴대폰 번호</label>
          <div className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900">
            {data?.phoneNumber}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">회원 등급</label>
          <div className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900">
            {data?.role}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">가입일</label>
          <div className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900">
            {data?.joinDate}
          </div>
        </div>
      </div>
    </div>
  );
}
