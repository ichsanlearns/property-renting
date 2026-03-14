import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";

import toast from "react-hot-toast";

import { useAuthStore } from "../../stores/auth.store";
import NavBar from "../ui/NavBar";

function ProtectedRoutes() {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      toast.error("Please login to access this page");
    }
  }, [user]);

  if (!user) {
    return (
      <Navigate to={`/login`} state={{ from: location.pathname }} replace />
    );
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default ProtectedRoutes;
