import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "./components/layouts/RootLayout";
import HomePage from "./components/pages/HomePage";
import DashboardLayout from "./components/layouts/DashboardLayout";
import OrderList from "./components/pages/tenant/OrderList";
import Reports from "./components/pages/tenant/Reports";
import MyBooking from "./components/pages/MyBooking";
import GuestRoute from "./components/layouts/GuestRoutes";
import NotFoundPage from "./components/pages/NotFoundPage";
import Login from "./components/pages/auth/Login";
import { useEffect, useRef } from "react";
import { refreshSession } from "./api/services/auth.service";
import { useAuthStore } from "./stores/auth.store";
import Properties from "./components/pages/tenant/Properties";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "mybooking",
        element: <MyBooking />,
      },
    ],
  },
  {
    path: "/tenant/",
    element: <DashboardLayout />,
    children: [
      {
        path: "properties",
        element: <Properties />,
      },
      {
        path: "orderlist",
        element: <OrderList />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
    ],
  },
  {
    path: "/login",
    element: <GuestRoute />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    async function initAuth() {
      try {
        const res = await refreshSession();

        const { accessToken, user } = res.data.data;

        useAuthStore.getState().login(accessToken, user);
      } catch {
        useAuthStore.getState().logout();
      }
    }
    initAuth();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
