import type { Action, Resource } from "@/lib/auth/roles";

/**
 * Standard shell for dashboard modules not yet implemented. Documents the
 * module's permission scope and the phase in which its tools are built.
 * Pages call requirePermission() before rendering this.
 */
export function AdminModulePage({
  title,
  resource,
  description,
  phase,
  capabilities,
}: {
  title: string;
  resource: Resource;
  description: string;
  phase: string;
  capabilities: Action[];
}) {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0a2558]">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wider text-[#1865db]">Foundation status</p>
        <p className="mt-2 text-sm text-slate-600">
          Access to this module is enforced on the server. Its management tools are scheduled for <strong className="font-semibold text-slate-900">{phase}</strong>.
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Permission resource</dt>
            <dd className="mt-1 font-mono text-sm font-semibold text-slate-800">{resource}</dd>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Actions governed</dt>
            <dd className="mt-1 font-mono text-sm font-semibold text-slate-800">{capabilities.join(", ")}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
