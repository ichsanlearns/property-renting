import { Outlet } from "react-router";

import NavBar from "../ui/NavBar";

function RootLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default RootLayout;
