import { useUserStore } from "@/store/useUserStore";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { user } = useUserStore();

  console.log(user);

  return !user ? (
    <Outlet />
  ) : !user?.isVerified ? (
    <Navigate to="/auth/verify-email" />
  ) : (
    <Navigate to="/" />
  );
};

export default AuthLayout;
