import { Navigate, Outlet } from "react-router";

import { useAuthStore } from "../../features/auth/stores/auth.store";

import SideBar from "../ui/SideBar";
import FullPageLoader from "../ui/FullPageLoader";

function DashboardLayout() {
  const { user, authLoading } = useAuthStore();

  if (authLoading) {
    return <FullPageLoader />;
  }

  if (!user || user.role !== "TENANT") {
    return <Navigate to={`/login`} replace />;
  }

  return (
    <>
      <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
        <SideBar />

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
