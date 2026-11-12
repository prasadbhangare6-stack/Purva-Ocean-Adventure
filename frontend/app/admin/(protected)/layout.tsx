import { requireSession } from "@/lib/auth/guards";
import { allowedResources } from "@/lib/auth/permissions";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

/**
 * Protected admin shell. requireSession() is the server-side gate for every
 * page below this layout.
 */
export default async function ProtectedAdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await requireSession();
  const visible = ["overview" as const, ...allowedResources(session.role)];

  return (
    <div className="min-h-dvh bg-[#f4f7fc] text-slate-900 lg:flex antialiased selection:bg-blue-600 selection:text-white">
      <AdminSidebar allowed={visible} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader session={session} />
        <main id="admin-main" className="flex-1 px-6 py-8 sm:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
