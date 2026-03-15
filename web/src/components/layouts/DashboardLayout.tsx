import { Navigate, Outlet } from "react-router";

import { useAuthStore } from "../../stores/auth.store";

import SideBar from "../ui/SideBar";
import FullPageLoader from "../ui/FullPageLoader";
import toast from "react-hot-toast";
import { useEffect } from "react";

function DashboardLayout() {
  const { user, authLoading } = useAuthStore();

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      toast.error("Please login to access this page");
      <Navigate to={`/login`} replace />;
      return;
    }
    if (user?.role !== "TENANT") {
      toast.error("You are not authorized to access this page");
      <Navigate to={`/`} replace />;
      return;
    }
  }, [user, authLoading]);

  if (authLoading) {
    return <FullPageLoader />;
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
