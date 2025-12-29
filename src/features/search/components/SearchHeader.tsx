export default function SearchHeader() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-bold text-gray-900">총 582건</div>
        <div className="flex gap-4 text-xs text-gray-400">
          <button className="font-bold text-gray-900">추천순</button>
          <span className="w-px h-3 bg-gray-200"></span>
          <button className="hover:text-gray-600">신상품순</button>
          <span className="w-px h-3 bg-gray-200"></span>
          <button className="hover:text-gray-600">판매량순</button>
          <span className="w-px h-3 bg-gray-200"></span>
          <button className="hover:text-gray-600">혜택순</button>
          <span className="w-px h-3 bg-gray-200"></span>
          <button className="hover:text-gray-600">낮은 가격순</button>
          <span className="w-px h-3 bg-gray-200"></span>
          <button className="hover:text-gray-600">높은 가격순</button>
        </div>
      </div>
    </div>
  );
}
