"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldAlert,
  CheckCircle2,
  KeyRound,
  ArrowRight,
  Sparkles,
} from "lucide-react";

type AuthMode = "signin" | "forgot" | "reset";

export default function AdminSignInPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signin");

  // Sign in state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Password reset state
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  // Quick helper to fill demo credentials
  const fillCredentials = (userEmail: string) => {
    setEmail(userEmail);
    setPassword("PurvaOcean@2025");
    setErrorMessage(null);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Failed to sign in. Please verify credentials.");
        setIsLoading(false);
        return;
      }

      setSuccessMessage(`Welcome back, ${data.user.name}! Redirecting to Control Dashboard...`);
      setTimeout(() => {
        window.location.href = "/admin";
      }, 500);
    } catch {
      setErrorMessage("Network error. Please check your connection.");
      setIsLoading(false);
    }
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.resetToken) {
        setGeneratedCode(data.resetToken);
        setResetToken(data.resetToken);
        setSuccessMessage(`Reset code generated: ${data.resetToken}`);
        setMode("reset");
      } else {
        setErrorMessage(data.message || "Could not generate reset code.");
      }
    } catch {
      setErrorMessage("Failed to request reset code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePerformReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: resetToken, newPassword }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Failed to reset password.");
        setIsLoading(false);
        return;
      }

      setSuccessMessage("Password reset successful! Please sign in with your new password.");
      setMode("signin");
      setPassword(newPassword);
      setGeneratedCode(null);
    } catch {
      setErrorMessage("Failed to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-dvh items-center justify-center bg-abyss px-4 py-12 relative overflow-hidden">
      {/* Background radial ocean glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sky/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 flex justify-center">
          <Logo href="/" />
        </div>

        <section aria-labelledby="signin-title" className="rounded-2xl border border-sky/30 bg-navy/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between border-b border-sky/20 pb-4 mb-6">
            <div>
              <p className="label-caps text-gold text-xs">Purva Ocean Adventures</p>
              <h1 id="signin-title" className="mt-1 text-2xl font-bold text-foam tracking-tight">
                {mode === "signin" && "Admin Portal"}
                {mode === "forgot" && "Reset Password"}
                {mode === "reset" && "Set New Password"}
              </h1>
            </div>
            <div className="size-10 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center text-gold">
              <Lock className="size-5" />
            </div>
          </div>

          {/* Alert messages */}
          {errorMessage && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-950/30 p-3.5 text-xs text-red-200">
              <ShieldAlert className="size-4 shrink-0 mt-0.5 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-3.5 text-xs text-emerald-200">
              <CheckCircle2 className="size-4 shrink-0 mt-0.5 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Mode: Sign In */}
          {mode === "signin" && (
            <form onSubmit={handleSignIn} className="grid gap-5">
              <div>
                <label className="block text-xs font-semibold text-foam/80 uppercase mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-foam/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="purvaoceanadventures@gmail.com"
                    autoComplete="username"
                    className="w-full rounded-xl border border-sky/30 bg-abyss/80 pl-10 pr-4 py-3 text-sm text-white placeholder-foam/30 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-foam/80 uppercase">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("forgot");
                      setErrorMessage(null);
                      setSuccessMessage(null);
                    }}
                    className="text-xs text-gold/80 hover:text-gold hover:underline transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-foam/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-sky/30 bg-abyss/80 pl-10 pr-11 py-3 text-sm text-white placeholder-foam/30 focus:border-gold focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foam/50 hover:text-foam transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-1 bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-xl flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>Signing in...</span>
                ) : (
                  <>
                    <span>Enter Control Dashboard</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Mode: Forgot Password */}
          {mode === "forgot" && (
            <form onSubmit={handleRequestReset} className="grid gap-5">
              <p className="text-xs text-foam/70 leading-relaxed">
                Enter your admin email address. A one-time reset code will be generated to allow you to set a new password.
              </p>

              <div>
                <label className="block text-xs font-semibold text-foam/80 uppercase mb-1.5">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-foam/40" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="purvaoceanadventures@gmail.com"
                    className="w-full rounded-xl border border-sky/30 bg-abyss/80 pl-10 pr-4 py-3 text-sm text-white placeholder-foam/30 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setMode("signin")}
                  className="flex-1 py-2.5 rounded-xl text-xs"
                >
                  Back to Sign In
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-2.5 bg-gold text-navy-dark rounded-xl text-xs font-semibold"
                >
                  {isLoading ? "Generating..." : "Get Reset Code"}
                </Button>
              </div>
            </form>
          )}

          {/* Mode: Reset Password */}
          {mode === "reset" && (
            <form onSubmit={handlePerformReset} className="grid gap-5">
              {generatedCode && (
                <div className="rounded-xl border border-gold/40 bg-gold/10 p-3 text-center">
                  <p className="text-[0.65rem] uppercase text-gold/80 font-semibold tracking-wider">Your Reset Code</p>
                  <p className="font-mono text-lg font-bold text-gold tracking-widest mt-0.5">{generatedCode}</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-foam/80 uppercase mb-1.5">
                  Reset Code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-foam/40" />
                  <input
                    type="text"
                    required
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value.toUpperCase())}
                    placeholder="e.g. 4F8A9B"
                    className="w-full uppercase font-mono tracking-wider rounded-xl border border-sky/30 bg-abyss/80 pl-10 pr-4 py-3 text-sm text-white placeholder-foam/30 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foam/80 uppercase mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-foam/40" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full rounded-xl border border-sky/30 bg-abyss/80 pl-10 pr-4 py-3 text-sm text-white placeholder-foam/30 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setMode("signin")}
                  className="flex-1 py-2.5 rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-2.5 bg-gold text-navy-dark rounded-xl text-xs font-semibold"
                >
                  {isLoading ? "Saving..." : "Update Password"}
                </Button>
              </div>
            </form>
          )}

          {/* Quick Demo Credentials Assistant */}
          <div className="mt-8 border-t border-sky/20 pt-6">
            <div className="flex items-center gap-2 mb-3 text-foam/60 text-xs">
              <Sparkles className="size-3.5 text-gold" />
              <span className="font-medium text-foam/80">Owner Quick Login</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillCredentials("purvaoceanadventures@gmail.com")}
                className="text-left rounded-xl border border-gold/40 bg-abyss/40 p-2.5 hover:border-gold transition-colors"
              >
                <p className="font-semibold text-foam">Dr. Purva</p>
                <p className="text-[0.65rem] text-gold uppercase tracking-wider font-bold">Owner (Full Access)</p>
                <p className="text-[0.65rem] text-foam/40 truncate">purvaoceanadventures@gmail.com</p>
              </button>

              <button
                type="button"
                onClick={() => fillCredentials("editor@purvaoceanadventures.com")}
                className="text-left rounded-xl border border-sky/20 bg-abyss/40 p-2.5 hover:border-sky/50 transition-colors"
              >
                <p className="font-semibold text-foam">Content Editor</p>
                <p className="text-[0.65rem] text-sky-400 uppercase tracking-wider">Editor</p>
                <p className="text-[0.65rem] text-foam/40 truncate">editor@purvaoceanadventures.com</p>
              </button>
            </div>
            <p className="text-[0.65rem] text-foam/40 text-center mt-3">
              Initial password: <span className="font-mono text-foam/70">PurvaOcean@2025</span> (can be changed anytime)
            </p>

            <div className="mt-4 pt-3 border-t border-sky/10 text-center">
              <a
                href="/admin"
                className="inline-flex items-center gap-2 text-xs font-semibold text-sky-300 hover:text-gold transition-colors"
              >
                <span>⚡ Direct Access to Dashboard (Dr. Purva - Owner) &rarr;</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
