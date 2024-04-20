import React from "react";
import { useLocation } from "react-router-dom";
import SideNav from "./SideNav";

const Layout = ({ children }) => {
  const location = useLocation();

  // Check if the current location is the login page
  const isLoginPage = location.pathname === "/";

  // Render the SideNav only if it's not the login page
  return (
    <div className="flex">
      {!isLoginPage && <SideNav />}
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default Layout;
