'use client';

import { STORAGE_KEY } from '@/shared/constants/storage';
import { useSyncExternalStore } from 'react';
import { IRecentProduct } from '../types/model';

const EVENT_KEY = 'recent-products-change';

let cachedItems: IRecentProduct[] = [];
let cachedJSON: string | null = null;

const SERVER_SNAPSHOT: IRecentProduct[] = [];

const getSnapshot = () => {
  if (typeof window === 'undefined') return [];

  const json = localStorage.getItem(STORAGE_KEY.RECENT_PRODUCTS);

  if (json === cachedJSON) {
    return cachedItems;
  }

  cachedJSON = json;
  try {
    cachedItems = json ? JSON.parse(json) : [];
  } catch (error) {
    console.warn('Failed to parse recent products:', error);
    cachedItems = [];
  }

  return cachedItems;
};

const getServerSnapshot = () => SERVER_SNAPSHOT;

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback);
  window.addEventListener(EVENT_KEY, callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(EVENT_KEY, callback);
  };
};

export const useRecentProducts = () => {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addProduct = (product: IRecentProduct) => {
    if (typeof window === 'undefined') return;

    const currentItems = getSnapshot();

    const filtered = currentItems.filter((item: IRecentProduct) => item.id !== product.id);
    const newItems = [product, ...filtered];

    if (newItems.length > 20) {
      newItems.pop();
    }

    localStorage.setItem(STORAGE_KEY.RECENT_PRODUCTS, JSON.stringify(newItems));

    window.dispatchEvent(new Event(EVENT_KEY));
  };

  return { items, addProduct };
};
