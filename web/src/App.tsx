import { useEffect, useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "./components/layouts/RootLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import GuestRoute from "./components/layouts/GuestRoutes";

import HomePage from "./components/pages/HomePage";
import MyBooking from "./components/pages/MyBooking";

import NotFoundPage from "./components/pages/NotFoundPage";
import Login from "./components/pages/auth/Login";

import OrderList from "./components/pages/tenant/OrderList";
import Reports from "./components/pages/tenant/Reports";
import Properties from "./components/pages/tenant/Properties";
import ProtectedLayout from "./components/layouts/ProtectedLayout";

import { refreshSession } from "./api/services/auth.service";
import { useAuthStore } from "./stores/auth.store";
import type { LoginResponse } from "./api/types/auth.type";
import RootFeedbackHandler from "./components/layouts/RootFeedbackHandler";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootFeedbackHandler />,
    children: [
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
            element: <ProtectedLayout />,
            children: [
              {
                index: true,
                element: <MyBooking />,
              },
            ],
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
    ],
  },
]);

function App() {
  const initialized = useRef(false);
  const { setAuthLoading } = useAuthStore();

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    async function initAuth() {
      try {
        const res: LoginResponse = await refreshSession();

        useAuthStore.getState().login(res.data.accessToken, res.data.user);
      } catch {
        useAuthStore.getState().logout();
      } finally {
        setAuthLoading(false);
      }
    }
    initAuth();
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
