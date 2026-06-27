import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/requireAdmin";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-cream">
      <AdminSidebar />
      <div className="flex-1 overflow-x-hidden px-8 py-8 lg:px-12">{children}</div>
    </div>
  );
}
