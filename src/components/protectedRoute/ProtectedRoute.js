import React from "react";
import { Navigate } from "react-router-dom";
import { CartState } from "../../context/ContextProvider";

function ProtectedRoute({ children }) {
  const {
    isAuthenticated  // Assuming isLoggedIn is part of your userState
  } = CartState();

  if (!isAuthenticated) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child components
  return children;
}

export default ProtectedRoute;