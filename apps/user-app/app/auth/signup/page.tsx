'use client';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import AuthForm from '../../../components/AuthForm';
import toast from "react-hot-toast"

export default function SignUpPage() {
  const router = useRouter();

  const handleSignup = async (phone: string, password: string) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    });

    if (res.ok) {
        toast.success("Account created")

        const login = await signIn('credentials', {
            phone,
            password,
            redirect: false,
        });

        if (login?.ok) {
            toast.success("Logged in successfully")
            router.push('/dashboard');
        } else {
            toast.error("Login failed after signup")
        }
    } else {
        const { error } = await res.json();
        toast.error(error || "Signup failed")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <AuthForm type="signup" onSubmit={handleSignup} />
    </div>
  );
}
