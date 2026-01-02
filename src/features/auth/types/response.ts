import { CommonApiDto } from '@/shared/types/response';

export interface LoginResponseDTO extends CommonApiDto {
  result: {
    token: string;
    id: number;
    email: string;
    name: string;
    role: string;
  };
}
