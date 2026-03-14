import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../stores/auth.store";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function GuestRoute() {
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      toast.success("You are already logged in");
    }
  }, [user]);

  if (user) {
    return <Navigate to={`/`} replace />;
  }

  return <Outlet />;
}
