export interface LoginRequestDTO {
  email: string;
  password: string;
  role: string;
}

export interface RegisterRequestDTO {
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  role: string;
}
