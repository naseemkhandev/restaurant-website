import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import Navbar from "../rootLayout/navbar";
import Footer from "../rootLayout/footer";

const AdminLayout = () => {
  const { user, isAuthenticated } = useUserStore();

  return !isAuthenticated ? (
    <Navigate to="/auth/login" replace />
  ) : !user?.isVerified ? (
    <Navigate to="/auth/verify-email" replace />
  ) : !user?.isAdmin ? (
    <Navigate to="/" replace />
  ) : (
    <div className="flex flex-col min-h-dvh">
      <div className="bg-white dark:bg-black py-1">
        <Navbar />
      </div>

      <div className="flex-grow h-full flex flex-col container mx-auto px-5 md:px-10">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default AdminLayout;
