'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (data.session) {
      router.push('/portal');
      router.refresh();
    } else {
      setMessage('Check your email to confirm your account.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-24">
        <div className="w-full rounded-3xl border border-[#3d4352] bg-[#11141a] p-8 shadow-xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[#7a8194]">Client signup</p>
            <h1 className="mt-4 text-3xl font-semibold text-white">Create your Caelus AI account</h1>
          </div>
          {message ? (
            <p className="rounded-xl border border-[#c8ff3e] bg-[#c8ff3e10] px-5 py-4 text-sm text-[#c8ff3e]">
              {message}
            </p>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-5">
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
                {loading ? 'Creating account…' : 'Create account'}
              </button>
            </form>
          )}
          <p className="mt-6 text-center text-sm text-[#7a8194]">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-[#c8ff3e] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
