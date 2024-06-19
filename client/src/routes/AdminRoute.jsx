import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { user } = useSelector((state) => state?.auth?.user);
  return user && user?.user_role === 1 ? <Outlet /> : <Navigate to="/signin" />;
};

export default AdminRoute;
