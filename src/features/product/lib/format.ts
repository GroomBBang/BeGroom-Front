import { FiltersType } from '../types/model';

// 필터 객체 -> 쿼리 스트링 변환
export function objectToQuery(filters: FiltersType) {
  const params = new URLSearchParams();

  // 브랜드
  if (filters.brandIds.length > 0) {
    filters.brandIds.forEach((id) => {
      params.append('brandIds', String(id));
    });
  }

  // 배송 타입
  if (filters.deliveryTypes.length > 0) {
    filters.deliveryTypes.forEach((type) => {
      params.append('deliveryTypes', type);
    });
  }

  // 포장 타입
  if (filters.packagingTypes.length > 0) {
    filters.packagingTypes.forEach((type) => {
      params.append('packagingTypes', type);
    });
  }

  // 품절 제외 여부
  if (filters.excludeSoldOut) {
    params.set('excludeSoldOut', String(filters.excludeSoldOut));
  }

  // 페이지
  params.set('page', String(filters.page));

  // 페이지 크기
  params.set('size', String(filters.size));

  // 정렬
  if (filters.sort) {
    params.set('sort', filters.sort);
  }

  // 정렬 방향
  if (filters.direction) {
    params.set('direction', filters.direction);
  }

  return params.toString();
}

// 쿼리 스트링 -> 필터 객체 변환
export function queryToObject(params: URLSearchParams): FiltersType {
  return {
    brandIds: params
      .getAll('brandIds')
      .map((v) => Number(v))
      .filter((v) => !Number.isNaN(v)),

    deliveryTypes: params.getAll('deliveryTypes'),

    packagingTypes: params.getAll('packagingTypes'),

    excludeSoldOut: params.get('excludeSoldOut') === 'true',

    page: Number(params.get('page')) || 0,
    size: Number(params.get('size')) || 30,
    sort: params.get('sort') || '',
    direction: params.get('direction') || '',
  };
}
