import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { useUserStore } from "@/store/useUserStore";

const RootLayout = () => {
  const { user, isAuthenticated } = useUserStore();

  return !user?.isVerified ? (
    <Navigate to="/auth/verify-email" replace />
  ) : !isAuthenticated ? (
    <Navigate to="/auth/login" replace />
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

export default RootLayout;
