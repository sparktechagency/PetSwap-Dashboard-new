// utils/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useCheckTokenQuery } from "../redux/api/ApiSlice";

const PrivateRoutes = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const { data, isLoading, isError } = useCheckTokenQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!token || isError || data?.token_status === false) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoutes;
