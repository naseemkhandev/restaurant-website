import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthLayout from "@/layouts/authLayout";
import LoginPage from "@/pages/auth/loginPage";
import RegisterPage from "@/pages/auth/registerPage";
import RootLayout from "./layouts/rootLayout";
import RestaurantPage from "./pages/admin/restaurantPage";
import ForgotPasswordPage from "./pages/auth/forgotPasswordPage";
import ResetPasswordPage from "./pages/auth/resetPasswordPage";
import VerifyEmailPage from "./pages/auth/verifyEmailPage";
import CartPage from "./pages/cartPage";
import HomePage from "./pages/homePage";
import ProfilePage from "./pages/profilePage";
import RestaurantDetailsPage from "./pages/restaurantDetailsPage";
import SearchPage from "./pages/searchPage";

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
    ],
  },

  {
    path: "/admin",
    element: <RootLayout />,
    children: [
      {
        path: "restaurant",
        element: <RestaurantPage />,
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
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
}

export default App;
