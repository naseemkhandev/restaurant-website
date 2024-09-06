import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const RootLayout = () => {
  return (
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
