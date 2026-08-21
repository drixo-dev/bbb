"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen bg-maroon-900 flex items-center justify-center text-gold-champagne font-marcellus">
      Redirecting...
    </div>
  );
}
