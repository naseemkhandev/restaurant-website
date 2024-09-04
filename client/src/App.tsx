import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthLayout from "@/layouts/authLayout";
import LoginPage from "@/pages/auth/loginPage";

const appRouter = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
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
