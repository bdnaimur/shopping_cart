import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CartState } from "../../context/ContextProvider";

function ProtectedRoute({ children }) {
  const {
    isAuthenticated  // Assuming isLoggedIn is part of your userState
  } = CartState();
  const location = useLocation()

  console.log("location", location);
  
  if (!isAuthenticated) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child components
  return children;
}

export default ProtectedRoute;