import { Outlet } from "react-router";

import NavBar from "../ui/NavBar";
import FullPageLoader from "../ui/FullPageLoader";

import { useAuthStore } from "../../stores/auth.store";

function RootLayout() {
  const { authLoading } = useAuthStore();

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

export default RootLayout;
