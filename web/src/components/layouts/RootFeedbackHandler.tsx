import { useEffect } from "react";
import toast from "react-hot-toast";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function RootFeedbackHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.reason) {
      toast.error(location.state.reason);
    }
    navigate(location.pathname, { replace: true });
  }, [location.state]);

  return <Outlet />;
}
