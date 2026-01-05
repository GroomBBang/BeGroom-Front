import Spinner from '@/shared/components/common/Spinner';
import { useEffect, useState } from 'react';
import myAPI from '../apis/my.api';
import { MyProfileResponseDTO } from '../types/response';

const ProfileItem = ({ label, value }: { label: string; value: string | undefined }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-500">{label}</label>
      {value ? (
        <div className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900">
          {value}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900">
          <Spinner size="sm" />
        </div>
      )}
    </div>
  );
};

export default function ProfileContent() {
  const { fetchMyProfile } = myAPI();
  const [data, setData] = useState<MyProfileResponseDTO | null>(null);

  useEffect(() => {
    fetchMyProfile().then((response) => {
      setData(response.result);
    });
  }, []);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <ProfileItem label="이메일" value={data?.email} />
        <ProfileItem label="이름" value={data?.name} />
        <ProfileItem label="휴대폰 번호" value={data?.phoneNumber} />
        <ProfileItem label="회원 등급" value={data?.role} />
        <ProfileItem label="가입일" value={data?.joinDate} />
      </div>
    </div>
  );
}
