interface Props {
  search: string;
}

export default function SearchBanner({ search }: Props) {
  return (
    <div className="py-12 text-center">
      <h1 className="text-3xl font-bold text-gray-900">{search}의 검색 결과</h1>
    </div>
  );
}
