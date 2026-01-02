export interface LoginRequestDTO {
  email: string;
  password: string;
  role: string;
}

export interface MemberRegisterRequestDTO {
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  role: string;
}

export interface SellerRegisterRequestDTO {
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
}
