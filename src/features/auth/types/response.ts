import { ROLE } from './model';

export interface LoginResponseDTO {
  token: string;
  memberId: number;
  email: string;
  name: string;
  role: ROLE;
}
