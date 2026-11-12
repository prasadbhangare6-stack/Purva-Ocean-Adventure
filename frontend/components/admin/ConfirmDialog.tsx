"use client";

import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";

/**
 * Confirmation before destructive actions. For irreversible actions (delete,
 * archive a published trip, remove a user) the owner must type the item name.
 * The server still enforces permissions; this only prevents accidents.
 */
export function ConfirmDialog({
  open,
  onCancel,
  onConfirm,
  title,
  description,
  confirmLabel = "Delete",
  requireTyping,
  pending = false,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  /** If set, the user must type this exact text to enable confirmation. */
  requireTyping?: string;
  pending?: boolean;
}) {
  const [typed, setTyped] = useState("");
  const canConfirm = !requireTyping || typed.trim() === requireTyping;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-800">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
              <AlertTriangle className="size-4" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#0a2558]">{title}</h3>
          </div>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-700 cursor-pointer">
            <X className="size-5" />
          </button>
        </div>

        <p className="mt-4 text-slate-600 text-sm leading-relaxed">{description}</p>

        {requireTyping && (
          <label className="mt-4 block">
            <span className="block text-xs font-semibold text-slate-500 uppercase">
              Type <strong className="text-rose-600 font-mono">{requireTyping}</strong> to confirm
            </span>
            <input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-800 focus:bg-white focus:border-rose-500 focus:outline-none"
              autoComplete="off"
            />
          </label>
        )}

        <div className="mt-6 flex flex-wrap justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!canConfirm || pending}
            className="inline-flex items-center rounded-xl bg-rose-600 hover:bg-rose-700 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            {pending ? "Working…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
