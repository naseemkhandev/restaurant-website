import { useUserStore } from "@/store/useUserStore";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { user } = useUserStore();

  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default AuthLayout;
