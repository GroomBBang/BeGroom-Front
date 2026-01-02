'use client';

import { STORAGE_KEY } from '@/shared/constants/storage';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { SSEDto } from '../types/response/SSEDto';

export const useSSE = () => {
  useEffect(() => {
    const token = Cookies.get(STORAGE_KEY.JWT_TOKEN);

    if (!token) return;

    const EventSource = EventSourcePolyfill || NativeEventSource;
    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/noti/subscribe`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      heartbeatTimeout: 86400000,
    });

    eventSource.onopen = () => {};

    eventSource.addEventListener('sse', (e: unknown) => {
      const messageEvent = e as MessageEvent;
      try {
        const data: SSEDto = JSON.parse(messageEvent.data);
        toast.success(data.message);
      } catch (error) {}
    });

    eventSource.onmessage = (e: unknown) => {
      console.log(e);
    };

    eventSource.onerror = (e: unknown) => {
      console.error('SSE 연결 끊김 (에러)', e);
      eventSource.close();
    };

    return () => {
      eventSource.close();
      console.log('SSE 연결 종료');
    };
  }, []);
};
