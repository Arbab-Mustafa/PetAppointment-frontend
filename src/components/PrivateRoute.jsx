/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, admin }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/" />;
  if (admin && user.role !== "admin") return <Navigate to="/dashboard" />;

  return children;
};

export default PrivateRoute;
