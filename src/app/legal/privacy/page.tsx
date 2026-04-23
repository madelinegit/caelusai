import Link from 'next/link';

export default function Privacy() {
  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <div className="mx-auto max-w-4xl px-8 py-20">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#7a8194]">Privacy</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Privacy policy</h1>
        </div>

        <div className="space-y-6 rounded-3xl border border-[#3d4352] bg-[#11141a] p-8 text-sm leading-7 text-[#d6d6d6]">
          <p>Caelus AI by Ecodev LLC respects your privacy. We collect only the information required to respond to inquiries and manage client access.</p>
          <p>Contact form submissions are used to follow up on requests and are not shared with third parties except as required to deliver services.</p>
          <p>For portal users, credentials and messages are protected through secure authentication and encrypted transport.</p>
        </div>

        <div className="mt-10 text-sm text-[#7a8194]"><Link href="/" className="text-[#c8ff3e] hover:text-[#a8ff6b]">Return home</Link></div>
      </div>
    </main>
  );
}
