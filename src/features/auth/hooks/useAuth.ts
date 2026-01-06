'use client';
import { STORAGE_KEY } from '@/shared/constants/storage';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import authAPI from '../apis/auth.api';
import { useAuthStore } from '../stores/useAuthStore';
import { LoginRequestDTO, RegisterRequestDTO, RegisterSellerRequestDTO } from '../types/request';

export const useAuth = () => {
  const router = useRouter();
  const { login: loginStore, logout: logoutStore } = useAuthStore();
  const [isLogin, setIsLogin] = useState(false);
  const [userType, setUserType] = useState<'member' | 'seller'>('member');
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data: LoginRequestDTO) => {
    setIsLoading(true);
    try {
      const response = await authAPI().login(data);
      Cookies.set(STORAGE_KEY.JWT_TOKEN, response.result.token, { expires: 1 });
      setIsLoading(false);
      setIsLogin(true);

      toast.success('로그인 성공');
      router.push('/');

      loginStore(response.result);

      return response;
    } catch (error) {
      setIsLoading(false);
      toast.error('로그인 실패');
      throw error;
    }
  };
  const registerMember = async (data: RegisterRequestDTO) => {
    setIsLoading(true);
    try {
      const response = await authAPI().registerMember(data);
      setIsLoading(false);
      toast.success('회원가입 성공');
      router.push('/auth?mode=login');
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const registerSeller = async (data: RegisterSellerRequestDTO) => {
    setIsLoading(true);
    try {
      const response = await authAPI().registerSeller(data);
      setIsLoading(false);
      toast.success('회원가입 성공');
      router.push('/auth?mode=login');
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove(STORAGE_KEY.JWT_TOKEN);
    setIsLogin(false);
    logoutStore();
    window.location.href = '/';
  };

  return {
    login,
    registerSeller,
    registerMember,
    logout,
    isLogin,
    isLoading,
    setUserType,
  };
};
