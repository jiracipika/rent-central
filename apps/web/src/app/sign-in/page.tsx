'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 ios-hero-bg"
      style={{ paddingTop: 'var(--ios-nav)', paddingBottom: 40 }}
    >
      <div className="w-full max-w-[400px]">

        {/* App icon + title */}
        <div className="text-center mb-8">
          <div
            className="w-[68px] h-[68px] rounded-[20px] flex items-center justify-center mx-auto mb-4 ios-gradient-blue ios-shadow-blue"
          >
            <svg viewBox="0 0 20 20" fill="white" className="w-9 h-9">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h3a1 1 0 001-1v-2a1 1 0 011-1 1 1 0 011 1v2a1 1 0 001 1h3a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <h1 className="ios-title1" style={{ fontSize: 28 }}>Welcome Back</h1>
          <p className="ios-subhead mt-1.5" style={{ color: 'var(--ios-label2)' }}>Sign in to Rent Central</p>
        </div>

        {/* Email + Password inputs */}
        <div className="ios-input-group ios-shadow-xs mb-0">
          <div className="ios-input-row">
            <span className="ios-input-label">Email</span>
            <input
              type="email"
              className="ios-input-field"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="ios-input-row">
            <span className="ios-input-label">Password</span>
            <input
              type={showPassword ? 'text' : 'password'}
              className="ios-input-field"
              placeholder="Required"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex-shrink-0 ios-btn-text"
              style={{ fontSize: 14, minWidth: 0, fontWeight: 500 }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end px-1 mt-2 mb-6">
          <button className="ios-btn-text" style={{ fontSize: 14 }}>Forgot Password?</button>
        </div>

        {/* Sign In button */}
        <button
          className="ios-btn ios-btn-blue ios-gradient-blue ios-shadow-blue w-full mb-4"
          style={{ height: 50, borderRadius: 14, fontSize: 17, fontWeight: 600 }}
          disabled={!email || !password}
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1" style={{ height: '0.5px', background: 'var(--ios-sep)' }} />
          <span className="ios-caption1">or continue with</span>
          <div className="flex-1" style={{ height: '0.5px', background: 'var(--ios-sep)' }} />
        </div>

        {/* Google sign-in */}
        <button
          className="ios-btn w-full ios-shadow-xs"
          style={{
            height: 50,
            borderRadius: 14,
            fontSize: 16,
            background: 'var(--ios-grouped-bg2)',
            color: 'var(--ios-label)',
            border: '0.5px solid var(--ios-sep)',
            fontWeight: 500,
          }}
        >
          <svg className="w-5 h-5 mr-2 flex-shrink-0" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Sign up link */}
        <p className="ios-subhead text-center mt-8" style={{ color: 'var(--ios-label2)' }}>
          Don&rsquo;t have an account?{' '}
          <Link href="/sign-up" className="ios-btn-text" style={{ fontSize: 15, fontWeight: 600 }}>
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}
