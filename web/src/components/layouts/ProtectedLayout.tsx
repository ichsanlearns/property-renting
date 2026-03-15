import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import toast from "react-hot-toast";

import { useAuthStore } from "../../stores/auth.store";
import NavBar from "../ui/NavBar";
import FullPageLoader from "../ui/FullPageLoader";

function ProtectedRoutes() {
  const { user, authLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) {
      return;
    }
    if (!user) {
      toast.error("Please login to access this page");
      navigate("/login", { replace: true });
      return;
    }
    if (user?.role !== "CUSTOMER") {
      toast.error("You are not authorized to access this page");
      if (user?.role === "TENANT") {
        navigate("/tenant/dashboard", {
          replace: true,
        });
        return;
      }
      navigate("/", { replace: true });
    }
  }, [user, authLoading]);

  if (authLoading) {
    return <FullPageLoader />;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default ProtectedRoutes;
