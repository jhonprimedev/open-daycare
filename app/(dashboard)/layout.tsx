import Sidebar from "@/components/sidebar";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="h-screen min-w-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
