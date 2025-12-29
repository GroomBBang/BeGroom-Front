// src/shared/components/providers/ToastProvider.tsx
'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      toastOptions={{
        className: '',
        style: {
          border: '1px solid #E2E8F0',
          padding: '16px',
          color: '#333333',
          fontSize: '14px',
          fontWeight: '500',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        },
        success: {
          iconTheme: {
            primary: '#5f0080',
            secondary: '#ffffff',
          },
        },
        error: {
          style: {
            background: '#FEF2F2',
            color: '#B91C1C',
          },
        },
      }}
    />
  );
}
