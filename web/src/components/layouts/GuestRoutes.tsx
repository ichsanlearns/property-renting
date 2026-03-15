import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../stores/auth.store";

export default function GuestRoute() {
  const { user, isLoggingIn } = useAuthStore();

  if (user) {
    return (
      <Navigate
        to={`/`}
        state={{
          reason: isLoggingIn ? "" : "You are already logged in",
          from: location.pathname,
        }}
        replace
      />
    );
  }

  return <Outlet />;
}
