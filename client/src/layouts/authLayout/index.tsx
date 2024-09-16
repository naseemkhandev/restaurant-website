import { useUserStore } from "@/store/useUserStore";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { user, isAuthenticated } = useUserStore();

  return user && isAuthenticated && user?.isVerified ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default AuthLayout;
