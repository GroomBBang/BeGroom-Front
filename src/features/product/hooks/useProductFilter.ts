'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FiltersType>({
    brandIds: [],
    deliveryTypes: [],
    packagingTypes: [],
    excludeSoldOut: false,
    sort: 'wishlistCount',
    direction: 'DESC',
    page: 0,
    size: 30,
  });

  // 현재 URL 기반으로 필터 초기화
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete('keyword');

    const initialFilters = queryToObject(params);
    setFilters(initialFilters);
  }, [searchParams]);

  // 필터 변경 시 URL 동기화 (동일하면 replace 하지 않음)
  useEffect(() => {
    const filterQuery = objectToQuery(filters);

    const baseParams = new URLSearchParams();
    if (keyword) baseParams.set('keyword', keyword);

    const baseQuery = baseParams.toString();
    const finalQuery = [baseQuery, filterQuery].filter(Boolean).join('&');

    const currentQuery = window.location.search.slice(1);
    console.log(currentQuery, finalQuery);
    if (currentQuery === finalQuery) return;

    router.push(finalQuery ? `${pathname}?${finalQuery}` : pathname);
  }, [filters, pathname, router, keyword]);

  // 브랜드 필터 토글
  const toggleBrand = (brandId: number) => {
    setFilters((prev) => ({
      ...prev,
      brandIds: prev.brandIds.includes(brandId)
        ? prev.brandIds.filter((id) => id !== brandId)
        : [...prev.brandIds, brandId],
      page: 0,
    }));
  };

  // 배송 필터 토글
  const toggleDelivery = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      deliveryTypes: prev.deliveryTypes.includes(type)
        ? prev.deliveryTypes.filter((t) => t !== type)
        : [...prev.deliveryTypes, type],
      page: 0,
    }));
  };

  // 포장 필터 토글
  const togglePackaging = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      packagingTypes: prev.packagingTypes.includes(type)
        ? prev.packagingTypes.filter((t) => t !== type)
        : [...prev.packagingTypes, type],
      page: 0,
    }));
  };

  // 품절 상품 포함 여부 설정
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

  // 정렬 옵션 변경
  const setSortOption = (sort: string, direction: string) => {
    setFilters((prev) => ({
      ...prev,
      sort,
      direction,
    }));
  };

  // 필터 초기화 (기본값으로 리셋)
  const resetFilters = () => {
    setFilters({
      brandIds: [],
      deliveryTypes: [],
      packagingTypes: [],
      excludeSoldOut: false,
      sort: 'wishlistCount',
      direction: 'DESC',
      page: 0,
      size: 30,
    });
  };

  return {
    filters,
    toggleBrand,
    toggleDelivery,
    togglePackaging,
    setIncludeSoldOut,
    setPage,
    setSortOption,
    resetFilters,
  };
}
