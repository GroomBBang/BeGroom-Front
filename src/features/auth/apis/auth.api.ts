import http from '@/shared/apis/http';
import { LoginRequestDTO, RegisterRequestDTO, RegisterSellerRequestDTO } from '../types/request';
import { LoginResponseDTO } from '../types/response';

export default function authAPI() {
  const login = async (data: LoginRequestDTO) => {
    const response = await http.post<LoginResponseDTO>('/auth', data);
    return response;
  };

  const registerMember = async (data: RegisterRequestDTO) => {
    const response = await http.post<LoginResponseDTO>('/members', data);
    return response;
  };

  const registerSeller = async (data: RegisterSellerRequestDTO) => {
    const response = await http.post<LoginResponseDTO>('/seller/join', data);
    return response;
  };

  return {
    login,
    registerMember,
    registerSeller,
  };
}
