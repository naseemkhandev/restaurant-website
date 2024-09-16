import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthLayout from "@/layouts/authLayout";
import LoginPage from "@/pages/auth/loginPage";
import RegisterPage from "@/pages/auth/registerPage";
import { Loader } from "lucide-react";
import AdminLayout from "./layouts/adminLayout";
import RootLayout from "./layouts/rootLayout";
import MenuPage from "./pages/admin/menuPage";
import AdminOrdersPage from "./pages/admin/ordersPage";
import RestaurantPage from "./pages/admin/restaurantPage";
import ForgotPasswordPage from "./pages/auth/forgotPasswordPage";
import ResetPasswordPage from "./pages/auth/resetPasswordPage";
import VerifyEmailPage from "./pages/auth/verifyEmailPage";
import CartPage from "./pages/cartPage";
import HomePage from "./pages/homePage";
import NotFoundPage from "./pages/notFountPage";
import OrdersPage from "./pages/ordersPage";
import ProfilePage from "./pages/profilePage";
import RestaurantDetailsPage from "./pages/restaurantDetailsPage";
import SearchPage from "./pages/searchPage";
import SuccessPage from "./pages/successPage";
import { useUserStore } from "./store/useUserStore";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "search/:query",
        element: <SearchPage />,
      },
      {
        path: "restaurant/:id",
        element: <RestaurantDetailsPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "restaurant",
        element: <RestaurantPage />,
      },
      {
        path: "menu",
        element: <MenuPage />,
      },
      {
        path: "orders",
        element: <AdminOrdersPage />,
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "verify-email",
        element: <VerifyEmailPage />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/success",
    element: <SuccessPage />,
  },
]);

function App() {
  const { loading } = useUserStore();

  if (loading) {
    return (
      <div className="bg-black/10 w-full h-dvh flex items-center justify-center pointer-events-none backdrop-blur-md">
        <Loader className="animate-spin size-6" />
      </div>
    );
  }

  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
}

export default App;
