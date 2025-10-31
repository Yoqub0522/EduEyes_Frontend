import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 ">
      <div className="container mx-auto max-w-[1170px] flex flex-col justify-center items-center h-screen">
        <Outlet />
      </div>
    </div>
  );
};
export default AuthLayout;
