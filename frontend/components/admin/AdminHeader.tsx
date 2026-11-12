"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bell, LogOut, KeyRound, Link2, X, CheckCircle2, ShieldAlert } from "lucide-react";
import { ROLE_LABELS, type Role } from "@/lib/auth/roles";
import type { AdminSession } from "@/lib/auth/session";

export function AdminHeader({ session }: { session: AdminSession }) {
  const router = useRouter();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/auth/sign-out", { method: "POST" });
      router.push("/admin/sign-in");
      router.refresh();
    } catch {
      router.push("/admin/sign-in");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/admin/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setStatusMessage({ type: "error", text: data.message || "Failed to update password." });
        setIsSubmitting(false);
        return;
      }

      setStatusMessage({ type: "success", text: "Password changed successfully!" });
      setTimeout(() => {
        setIsChangingPassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setStatusMessage(null);
      }, 1500);
    } catch {
      setStatusMessage({ type: "error", text: "Error changing password." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 bg-white px-6 py-3.5 sm:px-10 shadow-sm z-10">
        {/* Left: Branding & Live Status */}
        <div className="flex items-center gap-3">
          <p className="font-extrabold text-[#0a2558] text-xs uppercase tracking-wider">
            Purva Control Center
          </p>
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest">
            Live Engine
          </span>
        </div>

        {/* Right: User Profile & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {session.isDevPreview && (
            <span
              className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[0.65rem] font-bold text-blue-700 hidden md:inline-block"
              title="Dev preview mode active"
            >
              Dev preview
            </span>
          )}

          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-[#0a2558]">{session.name}</p>
            <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider">
              {ROLE_LABELS[session.role as Role]}
            </p>
          </div>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          {/* Quick link to live public site */}
          <Link
            href="/"
            target="_blank"
            title="Open Live Website"
            className="inline-flex size-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <Link2 className="size-3.5" />
          </Link>

          {/* Change password button */}
          <button
            type="button"
            onClick={() => setIsChangingPassword(true)}
            title="Change password"
            className="inline-flex size-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <KeyRound className="size-3.5" />
          </button>

          {/* Notifications bell */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative inline-flex size-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <Bell className="size-3.5" aria-hidden="true" />
          </button>

          {/* Sign out button */}
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isLoggingOut}
            title="Sign out of Admin Portal"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#0c2340] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#133358] shadow-sm disabled:opacity-50"
          >
            <LogOut className="size-3.5" />
            <span className="hidden md:inline">Sign out</span>
          </button>
        </div>
      </header>

      {/* Password Change Modal */}
      {isChangingPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl relative text-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-[#0a2558] flex items-center gap-2">
                <KeyRound className="size-4 text-blue-600" />
                Change Password
              </h3>
              <button
                type="button"
                onClick={() => setIsChangingPassword(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="size-4" />
              </button>
            </div>

            {statusMessage && (
              <div
                className={`mb-4 flex items-start gap-2.5 rounded-xl border p-3 text-xs ${
                  statusMessage.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-rose-200 bg-rose-50 text-rose-800"
                }`}
              >
                {statusMessage.type === "success" ? (
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                ) : (
                  <ShieldAlert className="size-4 text-rose-600 shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl bg-[#0a2346] py-2 text-xs font-semibold text-white hover:bg-[#123363] disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
