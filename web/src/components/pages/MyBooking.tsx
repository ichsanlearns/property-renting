import { Navigate } from "react-router";
import { useAuthStore } from "../../stores/auth.store";

function MyBooking() {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to={`/login`} replace />;
  }

  return <div className="text-red-500 text-center">MyBooking</div>;
}

export default MyBooking;
