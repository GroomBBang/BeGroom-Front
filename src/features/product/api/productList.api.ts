import http from '@/shared/apis/http';
import { FiltersType } from '../types/model';
import { ProductSearchResponseDTO } from '../types/response';

export type SearchProductsParams = {
  keyword?: string;
  categoryIds?: number;
} & FiltersType;

export const productListAPI = {
  searchProducts: async (params: SearchProductsParams) => {
    const { page, ...rest } = params;

    const response = await http.get<ProductSearchResponseDTO>('/products/search', {
      params: {
        ...rest,
        page: Math.max(0, page - 1),
      },
    });

    return response.result;
  },
};
