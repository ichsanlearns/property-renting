import { Navigate, Outlet } from "react-router";

import SideBar from "../ui/SideBar";
import { useAuthStore } from "../../stores/auth.store";

function DashboardLayout() {
  const { user } = useAuthStore();

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
