import axiosInstance from '@/shared/apis';
import {
  LoginRequestDTO,
  MemberRegisterRequestDTO,
  SellerRegisterRequestDTO,
} from '../types/request';
import { LoginResponseDTO } from '../types/response';

export default function authAPI() {
  const login = async (data: LoginRequestDTO): Promise<LoginResponseDTO> => {
    const response = await axiosInstance.post('/auth', data);
    return response.data;
  };

  const memberRegister = async (data: MemberRegisterRequestDTO) => {
    const response = await axiosInstance.post('/members', data);
    return response.data;
  };

  const sellerRegister = async (data: SellerRegisterRequestDTO) => {
    const response = await axiosInstance.post('/seller/join', data);
    return response.data;
  };

  return {
    login,
    memberRegister,
    sellerRegister,
  };
}
