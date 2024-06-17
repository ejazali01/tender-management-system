import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import FooterComp from "../components/FooterComp";


const Layout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup"];
  const hidenFooterRoutes = ["/login", "/signup", "/profile/dashboard"];
  return (
    <div className="w-full">
      {!hideNavbarRoutes.includes(location.pathname) && <Header />}
      <div className=" max-w-screen-3xl mx-auto px-4 sm:px-5 font-jakarta">
        <main className="w-full">
          <Outlet />
        </main>
        {!hidenFooterRoutes.includes(location.pathname) && <FooterComp />}
      </div>
    </div>
  );
};

export default Layout;