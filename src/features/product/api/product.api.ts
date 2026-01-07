import http from '@/shared/apis/http';
import { ProductDetailResponseDTO } from '../types/response';

export default function productAPI() {
  const fetchProduct = async (id: string) => {
    const response = await http.get<ProductDetailResponseDTO>(`/products/${id}`);
    return response.result;
  };

  const addWishList = async (id: number) => {
    const response = await http.post(`/wishlist/toggle`, { productId: id });
    return response.result;
  };

  return {
    fetchProduct,
    addWishList,
  };
}
