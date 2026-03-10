import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../stores/auth.store";

export default function GuestRoute() {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to={`/`} replace />;
  }

  return <Outlet />;
}
