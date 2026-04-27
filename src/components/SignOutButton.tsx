'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="w-full rounded-xl px-4 py-2.5 text-left text-sm text-[#7a8194] transition hover:bg-[#22252e] hover:text-[#f5f5f3]"
    >
      Sign out
    </button>
  );
}
