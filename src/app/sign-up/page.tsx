import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-24">
        <div className="w-full rounded-3xl border border-[#3d4352] bg-[#11141a] p-8 shadow-xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-[#7a8194]">Client signup</p>
            <h1 className="mt-4 text-3xl font-semibold text-white">Create your Caelus AI account</h1>
          </div>
          <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
        </div>
      </div>
    </main>
  );
}
