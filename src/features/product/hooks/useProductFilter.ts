'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { objectToQuery, queryToObject } from '../lib/format';
import { FiltersType } from '../types/model';

// 상품 필터 관리하는 훅
// 1. 필터 상태 관리
// 2. 필터 추가 / 제거 (토글)
// 3. 필터 변경 시 URL 동기화
// 4. URL → 필터 초기화

export type FiltersStateType = ReturnType<typeof useProductFilters>;

export function useProductFilters(keyword?: string) {
  const router = useRouter();
  const pathname = usePathname();
  const isInitializedRef = useRef(false);

  const [filters, setFilters] = useState<FiltersType>({
    brandIds: [],
    deliveryTypes: [],
    packagingTypes: [],
    excludeSoldOut: false,
    page: 0,
    size: 30,
    sort: 'productId',
    direction: 'DESC',
  });

  // 현재 URL기반 초기화
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete('keyword');
    const initialFilters = queryToObject(params);

    setFilters(initialFilters);
    isInitializedRef.current = true;
  }, []);

  // 필터 변경 시 URL 이동
  useEffect(() => {
    if (!isInitializedRef.current) return;

    const filterQuery = objectToQuery(filters);

    const baseParams = new URLSearchParams();
    if (keyword) baseParams.set('keyword', keyword);

    const baseQuery = baseParams.toString();
    const finalQuery = [baseQuery, filterQuery].filter(Boolean).join('&');

    router.replace(finalQuery ? `${pathname}?${finalQuery}` : pathname);
  }, [filters, pathname, router, keyword]);

  // 브랜드
  const toggleBrand = (brandId: number) => {
    setFilters((prev) => ({
      ...prev,
      brandIds: prev.brandIds.includes(brandId)
        ? prev.brandIds.filter((id) => id !== brandId)
        : [...prev.brandIds, brandId],
      page: 0,
    }));
  };

  // 배송
  const toggleDelivery = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      deliveryTypes: prev.deliveryTypes.includes(type)
        ? prev.deliveryTypes.filter((t) => t !== type)
        : [...prev.deliveryTypes, type],
      page: 0,
    }));
  };

  // 포장
  const togglePackaging = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      packagingTypes: prev.packagingTypes.includes(type)
        ? prev.packagingTypes.filter((t) => t !== type)
        : [...prev.packagingTypes, type],
      page: 0,
    }));
  };

  // 품절 포함
  const setIncludeSoldOut = (exclude: boolean) => {
    setFilters((prev) => ({
      ...prev,
      excludeSoldOut: exclude,
      page: 0,
    }));
  };

  // 페이지 변경
  const setPage = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  // 정렬
  const setSortOption = (sort: string, direction: string) => {
    setFilters((prev) => ({
      ...prev,
      sort,
      direction,
    }));
  };

  // 초기화
  const resetFilters = () => {
    setFilters({
      brandIds: [],
      deliveryTypes: [],
      packagingTypes: [],
      excludeSoldOut: false,
      page: 0,
      size: 30,
      sort: 'productId',
      direction: 'DESC',
    });
  };

  return {
    filters,

    // actions
    toggleBrand,
    toggleDelivery,
    togglePackaging,
    setIncludeSoldOut,
    setPage,
    setSortOption,
    resetFilters,
  };
}
