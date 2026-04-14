import { Outlet } from "react-router";

import NavBar from "../ui/NavBar";
import LoaderFullPage from "../ui/LoaderFullPage";

import { useAuthStore } from "../../features/auth/stores/auth.store";

function RootLayout() {
  const { authLoading } = useAuthStore();

  if (authLoading) {
    return <LoaderFullPage />;
  }
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default RootLayout;
