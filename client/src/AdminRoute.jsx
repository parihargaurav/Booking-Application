import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";

// Wraps admin-only routes. Redirects to /admin/login if the
// logged-in user is missing or not an admin.
export default function AdminRoute() {
  const { user, ready } = useContext(UserContext);

  if (!ready) {
    return "Loading...";
  }

  if (!user || user.role !== "admin") {
    return <Navigate to={"/admin/login"} />;
  }

  return <Outlet />;
}