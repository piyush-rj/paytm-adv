'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import AuthForm from '../../../components/AuthForm';

export default function SignInPage() {
  const router = useRouter();

  const handleSignin = async (phone: string, password: string) => {
    const login = await signIn('credentials', {
      phone,
      password,
      redirect: false,
    });

    if (login?.ok) {
      toast.success('Welcome back ');
      router.push('/dashboard');
    } else {
      toast.error('Invalid phone or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <AuthForm type="signin" onSubmit={handleSignin} />
    </div>
  );
}
