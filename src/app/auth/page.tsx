'use client';

import LoginForm from '@/features/auth/components/LoginForm';
import SignupForm from '@/features/auth/components/SignupForm';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function AuthPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get('mode');
  const view = mode === 'signup' ? 'signup' : 'login';

  const handleSwitchToSignup = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('mode', 'signup');
    router.replace(`?${params.toString()}`);
  };

  const handleSwitchToLogin = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('mode', 'login');
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="min-h-screen w-full bg-[#f2f2f2] flex items-center justify-center p-4">
      {view === 'login' ? (
        <LoginForm onSwitch={handleSwitchToSignup} />
      ) : (
        <SignupForm onSwitch={handleSwitchToLogin} />
      )}
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPageContent />
    </Suspense>
  );
}
