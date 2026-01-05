'use client';

import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { STORAGE_KEY } from '@/shared/constants/storage';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useSSE = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    const token = Cookies.get(STORAGE_KEY.JWT_TOKEN);
    if (!token) return;

    const controller = new AbortController();

    const connectSSE = async () => {
      try {
        await fetchEventSource(`${process.env.NEXT_PUBLIC_API_URL}/noti/subscribe`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,

          async onopen(response) {
            if (response.ok) {
              return;
            }
            throw new Error(`Connection failed: ${response.status}`);
          },

          onmessage(msg) {
            if (msg.event === 'sse') {
              try {
                const data = JSON.parse(msg.data);
                if (data.message) {
                  toast.success(data.message);
                }
              } catch (e) {}
            } else if (msg.event === 'connect') {
            }
          },

          onerror(err) {
            console.error('SSE 에러:', err);
          },

          onclose() {},
        });
      } catch (err) {
        console.error('SSE 초기 연결 실패', err);
      }
    };

    connectSSE();

    return () => {
      controller.abort();
      console.log('SSE 연결 종료');
    };
  }, [isLoggedIn]);
};
