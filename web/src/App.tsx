import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "./components/layouts/RootLayout";
import HomePage from "./components/pages/HomePage";
import Login from "./components/pages/Auth/Login";
import DashboardLayout from "./components/layouts/DashboardLayout";
import OrderList from "./components/pages/tenant/OrderList";
import Reports from "./components/pages/tenant/Reports";
import MyBooking from "./components/pages/MyBooking";
import GuestRoute from "./components/layouts/GuestRoutes";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
