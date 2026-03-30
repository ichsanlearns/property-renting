import { useEffect, useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "./shared/layouts/RootLayout";
import DashboardLayout from "./shared/layouts/DashboardLayout";
import GuestRoute from "./shared/layouts/GuestRoutes";

import HomePage from "./features/public/pages/HomePage";
import MyBooking from "./features/public/pages/MyBooking";

import NotFoundPage from "./features/public/pages/NotFoundPage";
import Login from "./features/auth/pages/Login";

import OrderList from "./features/tenant/order-list/pages/OrderList";
import Reports from "./features/tenant/reports/pages/Reports";

import FormProperties from "./features/tenant/property/pages/FormProperties";
import FormRoom from "./features/tenant/property/pages/FormRoom";

import { refreshSession } from "./features/auth/api/auth.service";
import { useAuthStore } from "./features/auth/stores/auth.store";
import Register from "./features/auth/pages/Register";
import CheckEmail from "./features/auth/pages/CheckEmail";
import RegisterLayout from "./shared/layouts/RegisterLayout";
import FillData from "./features/auth/pages/FillData";
import VerifyLayout from "./features/auth/pages/VerifyLayout";
import Password from "./features/auth/pages/Password";

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
        path: "properties/create",
        element: <FormProperties />,
      },
      {
        path: "properties/:propertyId/rooms/create",
        element: <FormRoom />,
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
    element: <GuestRoute />,
    children: [
      {
        path: "/register",
        element: <RegisterLayout />,
        children: [
          {
            index: true,
            element: <Register />,
          },
          {
            path: "verify",
            element: <VerifyLayout />,
            children: [
              {
                index: true,
                element: <CheckEmail />,
              },
              {
                path: "password",
                element: <Password />,
              },
              {
                path: "fill-data",
                element: <FillData />,
              },
            ],
          },
        ],
      },
      {
        path: "/login",
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
  const { setAuthLoading } = useAuthStore();

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    async function initAuth() {
      try {
        const res = await refreshSession();

        const { accessToken, user } = res.data;

        useAuthStore.getState().login({ token: accessToken, user });
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
