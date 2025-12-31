import axiosInstance from '@/shared/apis';
import { Product } from '../types';

export default function productAPI() {
  const fetchProduct = async (id: string): Promise<Product> => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data.product;
  };

  return {
    fetchProduct,
  };
}
