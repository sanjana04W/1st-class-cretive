"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Eye, EyeOff, LogIn, Lock } from "lucide-react";
import { adminSignIn } from "@/lib/auth";

import { useAuth } from "@/context/AuthContext";

interface LoginForm {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { loginDemoAdmin } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async ({ email, password }: LoginForm) => {
    setLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      // Configured admin credentials
      if (
        (cleanEmail === "admin@lillyumfragrance.lk" && cleanPassword === "Lillyum@Admin2025") ||
        (cleanEmail === "admin@1stclasscreative.lk" && (cleanPassword === "admin123456" || cleanPassword === "Lillyum@Admin2025"))
      ) {
        loginDemoAdmin(cleanEmail, "Admin Manager");
        toast.success("Welcome back, Administrator!");
        router.replace("/admin/dashboard");
        return;
      }

      await adminSignIn(cleanEmail, cleanPassword);
      toast.success("Welcome back!");
      router.replace("/admin/dashboard");
    } catch {
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-brand-charcoal flex items-center justify-center px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <Image src="/logo.png" alt="1st Class Creative" width={140} height={56} className="h-14 w-auto object-contain mx-auto mb-4" />
            <div className="flex items-center justify-center gap-2 text-brand-gold">
              <Lock className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-widest">Admin Panel</span>
            </div>
            <h1 className="font-heading text-2xl font-bold text-brand-charcoal mt-2">Sign In</h1>
            <p className="text-gray-400 text-sm mt-1">Authorised personnel only</p>
          </div>



          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1.5">Email Address</label>
              <input
                {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })}
                type="email"
                autoComplete="email"
                className="form-input"
                placeholder="admin@example.com"
              />
              {errors.email && <p className="text-brand-rose text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1.5">Password</label>
              <div className="relative">
                <input
                  {...register("password", { required: "Password is required" })}
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  className="form-input pr-11"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-charcoal"
                >
                  {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-brand-rose text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center text-base mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                  </svg>
                  Signing In…
                </span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Sign In
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-8">
            &copy; {new Date().getFullYear()} 1st Class Creative. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
