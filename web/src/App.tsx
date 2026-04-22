import { useEffect, useRef } from "react";
import { createBrowserRouter, redirect, RouterProvider } from "react-router";

import RootLayout from "./shared/layouts/RootLayout";
import DashboardLayout from "./shared/layouts/DashboardLayout";
import GuestRoute from "./shared/layouts/GuestRoutes";

import HomePage from "./features/public/pages/HomePage";
import MyBooking from "./features/public/pages/MyBooking";
import ReviewPage from "./features/public/pages/ReviewPage";

import NotFoundPage from "./features/public/pages/NotFoundPage";
import Login from "./features/auth/pages/Login";

import OrderList from "./features/tenant/order-list/pages/OrderList";
import Reports from "./features/tenant/reports/pages/Reports";
import DashboardTenantPage from "./features/tenant/dashboard-tenant/DashboardTenantPage";
import TenantReviewPage from "./features/tenant/review/pages/TenantReviewPage";
import DetailReviewPage from "./features/tenant/review/pages/DetailReviewPage";
import PaymentPage from "./features/payment/pages/PaymentPage";

import FormProperties from "./features/tenant/property/pages/FormProperties";
import FormRoom from "./features/tenant/property/pages/FormRoom";

import { refreshSession } from "./features/auth/api/auth.service";
import { useAuthStore } from "./features/auth/stores/auth.store";
import Register from "./features/auth/pages/Register";
import CheckEmail from "./features/auth/pages/CheckEmail";
import RegisterLayout from "./shared/layouts/RegisterLayout";
import FillData from "./features/auth/pages/FillData";
import VerifyLayout from "./shared/layouts/VerifyLayout";
import Password from "./features/auth/pages/Password";
import type { User } from "./shared/types/user.type";
import MyProfile from "./features/profile/pages/MyProfile";
import PaymentProof from "./features/tenant/payment-proof/pages/PaymentProof";
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import ResetPassword from "./features/auth/pages/ResetPassword";
import PropertyDetail from "./features/public/pages/PropertyDetail";
import Reservation from "./features/reservations/pages/Reservation";
import SearchPage from "./features/public/pages/SearchPage";
import PeakSeason from "./features/tenant/peak-season/pages/PeakSeason";

function requireOnboarding(user: User | null) {
  if (!user?.fullName && user?.email) {
    return redirect("/fill-data");
  }
  return null;
}

const router = createBrowserRouter([
  {
    loader: () => requireOnboarding(useAuthStore.getState().user),
    children: [
      {
        path: "",
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/search",
            element: <SearchPage />,
          },
          {
            path: "/property/:propertyId",
            element: <PropertyDetail />,
          },
          {
            path: "mybooking",
            element: <MyBooking />,
          },
          {
            path: "review",
            element: <ReviewPage />,
          },
          {
            path: "myprofile",
            element: <MyProfile />,
          },
          {
            path: "/reservations/:reservationCode",
            element: <Reservation />,
          },
          {
            path: "/payment/:reservationCode",
            element: <PaymentPage />,
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
            path: "peak-season",
            element: <PeakSeason />,
          },
          {
            path: "orderlist",
            element: <OrderList />,
          },
          {
            path: "paymentproof/:code",
            element: <PaymentProof />,
          },
          {
            path: "reports",
            element: <Reports />,
          },
          {
            path: "dashboard",
            element: <DashboardTenantPage />,
          },

          {
            path: "review",
            element: <TenantReviewPage />,
          },
          {
            path: "detail-review",
            element: <DetailReviewPage />,
          },
        ],
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
            ],
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },

  {
    path: "/fill-data",
    element: <FillData />,
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
