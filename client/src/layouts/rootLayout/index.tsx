import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-dvh">
      <Navbar />
      <div className="flex-grow h-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
