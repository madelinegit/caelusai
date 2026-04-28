'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/portal');
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <div className="px-8 py-5">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.15em] text-[#f5f5f3]">
          Caelus AI <span className="text-[#c8ff3e]">_</span>
        </Link>
      </div>
      <div className="mx-auto flex min-h-[calc(100vh-60px)] max-w-3xl items-center justify-center px-6 py-12">
        <div className="w-full rounded-3xl border border-[#3d4352] bg-[#11141a] p-8 shadow-xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[#7a8194]">Client login</p>
            <h1 className="mt-4 text-3xl font-semibold text-white">Sign in to Caelus AI</h1>
          </div>
          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm text-[#7a8194]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-[#3d4352] bg-[#0d0f12] px-4 py-3 text-white placeholder-[#3d4352] focus:border-[#c8ff3e] focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-[#7a8194]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-[#3d4352] bg-[#0d0f12] px-4 py-3 text-white placeholder-[#3d4352] focus:border-[#c8ff3e] focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#c8ff3e] py-3 text-sm font-bold uppercase tracking-[0.1em] text-[#0d0f12] transition hover:bg-[#d9ff6e] disabled:opacity-50"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-[#7a8194]">
            No account?{' '}
            <Link href="/sign-up" className="text-[#c8ff3e] hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
