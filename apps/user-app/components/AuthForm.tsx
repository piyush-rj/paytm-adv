'use client';
import { useState } from 'react';

interface AuthFormProps {
  type: 'signin' | 'signup';
  onSubmit: (phone: string, password: string) => void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const title = type === 'signin' ? 'Welcome Back' : 'Create Account';
  const actionText = type === 'signin' ? 'Sign In' : 'Sign Up';

  return (
    <div className="max-w-sm w-full mx-auto p-8 bg-white rounded-2xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">{title}</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          onClick={() => onSubmit(phone, password)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          {actionText}
        </button>
      </div>
    </div>
  );
}
