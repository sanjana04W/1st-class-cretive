"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ShieldAlert } from "lucide-react";
import { useCustomerProfile } from "@/context/CustomerProfileContext";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const message = searchParams.get("message") || "";

  const { loginCustomer } = useCustomerProfile();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    // Simulate a small async delay
    await new Promise((r) => setTimeout(r, 600));
    const err = loginCustomer(email, password);
    setLoading(false);
    if (err) {
      setError(err);
    } else {
      router.push(`/${redirect}`);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel: product image ── */}
      <div className="hidden lg:flex lg:w-5/12 relative bg-brand-charcoal">
        <Image
          src="/542752181_1238639424941969_1583669488507158905_n.jpg"
          alt="1st Class Creative handcrafted products"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
        {/* Brand text */}
        <div className="absolute bottom-10 left-8 right-8">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">
            1st Class Creative
          </p>
          <p className="text-white font-heading text-2xl font-bold leading-snug">
            &ldquo;Handcrafted with love,<br />made to last a lifetime.&rdquo;
          </p>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-[#FCFAF7]">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div>
            <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-widest mb-1">
              WELCOME BACK
            </p>
            <h1 className="font-heading text-4xl font-bold text-[#2C2C2C]">Sign In</h1>
            <p className="text-sm text-gray-500 mt-2">
              Don&apos;t have an account?{" "}
              <Link
                href={`/register?redirect=${encodeURIComponent(redirect)}`}
                className="text-[#C9A84C] font-semibold hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>

          {/* Checkout message banner */}
          {message === "checkout" && (
            <div className="flex items-start gap-3 bg-[#2C2C2C] text-white text-xs font-medium px-4 py-3 rounded-xl shadow-md">
              <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0 text-[#C9A84C]" />
              <span>Please sign in or create an account to complete your order.</span>
            </div>
          )}

          {/* Google button (decorative) */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-xs"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 text-xs text-gray-400">
            <div className="flex-1 h-px bg-gray-200" />
            <span>or sign in with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-5">
            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                {error}
              </p>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A84C] bg-white"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Password</label>
                <button
                  type="button"
                  className="text-xs text-[#C9A84C] hover:underline"
                  onClick={() => setError("Password reset coming soon — contact us via WhatsApp.")}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full pl-10 pr-11 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#C9A84C] bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#C9A84C] hover:bg-[#B3933B] disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              {loading ? "Signing in…" : "Sign In →"}
            </button>

            <p className="text-[10px] text-gray-400 text-center">
              By signing in, you agree to our{" "}
              <span className="underline cursor-pointer">Terms</span> and{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center text-gray-400 text-sm">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
