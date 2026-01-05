import http from '@/shared/apis/http';
import { LoginRequestDTO, RegisterRequestDTO } from '../types/request';
import { LoginResponseDTO } from '../types/response';

export default function authAPI() {
  const login = async (data: LoginRequestDTO) => {
    const response = await http.post<LoginResponseDTO>('/auth', data);
    return response;
  };

  const register = async (data: RegisterRequestDTO) => {
    const response = await http.post<LoginResponseDTO>('/members', data);
    return response;
  };

  return {
    login,
    register,
  };
}
