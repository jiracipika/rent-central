'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center">
          <span className="text-3xl">📧</span>
        </div>

        <h1 className="text-xl font-semibold text-gray-900 tracking-tight">Check your email</h1>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          We&apos;ve sent a verification link to <span className="font-medium text-gray-700">alex@email.com</span>. Click the link to verify your account.
        </p>

        {!sent ? (
          <button
            onClick={() => setSent(true)}
            className="mt-6 rc-btn-secondary w-full"
          >
            Resend verification email
          </button>
        ) : (
          <div className="mt-6 bg-green-50 rounded-xl p-4">
            <p className="text-sm text-green-700 font-medium">Email sent! Check your inbox.</p>
          </div>
        )}

        <p className="mt-6 text-xs text-gray-400">
          Wrong email? <Link href="/sign-up" className="text-blue-600 hover:underline">Sign up again</Link>
        </p>
      </div>
    </div>
  );
}
