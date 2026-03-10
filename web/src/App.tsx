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

import { useAuthStore } from "./stores/auth.store";
import FullPageLoader from "./components/ui/FullPageLoader";
import { useEffect, useState } from "react";

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
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setTimeout(() => setHydrated(true), 500);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setTimeout(() => setHydrated(true), 500);
    }

    return unsub;
  }, []);

  if (!hydrated) {
    return <FullPageLoader />;
  }

  return <RouterProvider router={router} />;
}

export default App;
