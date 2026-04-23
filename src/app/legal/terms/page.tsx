import Link from 'next/link';

export default function Terms() {
  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <div className="mx-auto max-w-4xl px-8 py-20">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#7a8194]">Terms</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Terms of use</h1>
        </div>

        <div className="space-y-6 rounded-3xl border border-[#3d4352] bg-[#11141a] p-8 text-sm leading-7 text-[#d6d6d6]">
          <p>Caelus AI is operated by Ecodev LLC. By using this website, you agree to our standard terms and conditions.</p>
          <p>All content is provided for informational purposes only. We may update these terms at any time.</p>
          <p>Clients using the portal agree to maintain access credentials securely. Unauthorized access is prohibited.</p>
        </div>

        <div className="mt-10 text-sm text-[#7a8194]"><Link href="/" className="text-[#c8ff3e] hover:text-[#a8ff6b]">Return home</Link></div>
      </div>
    </main>
  );
}
