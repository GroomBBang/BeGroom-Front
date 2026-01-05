import axiosInstance from '@/shared/apis';
import { LoginRequestDTO, RegisterRequestDTO } from '../types/request';
import { LoginResponseDTO } from '../types/response';

export default function authAPI() {
  const login = async (data: LoginRequestDTO): Promise<LoginResponseDTO> => {
    const response = await axiosInstance.post('/auth', data);
    return response.data;
  };

  const register = async (data: RegisterRequestDTO) => {
    const response = await axiosInstance.post('/members', data);
    return response.data;
  };

  return {
    login,
    register,
  };
}
