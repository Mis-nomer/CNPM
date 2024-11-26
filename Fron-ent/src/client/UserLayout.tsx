import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const UserLayout = () => {
  return (
    <div className="min-h-screen relative bg-gray-100">
      <header>
        <Header />
      </header>
      <div className="flex justify-center">
        <div className="hidden xl:block fixed left-0 top-1/2 -translate-y-1/2 z-10">
          <img
            src="https://file.hstatic.net/200000722513/file/bfd_banner-ver_2024_side_web.jpg"
            alt="Left Banner"
            className="w-[120px] hover:scale-105 transition-transform duration-300"
          />
        </div>
        <main className="w-full max-w-7xl mx-auto px-4 xl:px-0">
          <Outlet />
        </main>
        <div className="hidden xl:block fixed right-0 top-1/2 -translate-y-1/2 z-10">
          <img
            src="https://file.hstatic.net/200000722513/file/bfd_banner-ver_2024_side_web.jpg"
            alt="Right Banner"
            className="w-[120px] hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default UserLayout;
