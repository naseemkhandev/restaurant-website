import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthLayout from "@/layouts/authLayout";
import LoginPage from "@/pages/auth/loginPage";
import RegisterPage from "@/pages/auth/registerPage";
import ForgotPasswordPage from "./pages/auth/forgotPasswordPage";
import ResetPasswordPage from "./pages/auth/resetPasswordPage";
import VerifyEmailPage from "./pages/auth/verifyEmailPage";
import RootLayout from "./layouts/rootLayout";
import HomePage from "./pages/homePage";
import ProfilePage from "./pages/profilePage";
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
        path: "search",
        element: <SearchPage />,
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
