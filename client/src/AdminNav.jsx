import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";

export default function AdminNav() {
  const { pathname } = useLocation();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function linkClasses(path) {
    return "tab-link " + (pathname === path ? "tab-link-active" : "");
  }

  async function logout() {
    await axios.post("/api/auth/logout");
    setUser(null);
    navigate("/admin/login");
  }

  return (
    <nav className="w-full flex flex-wrap items-center justify-between gap-2 mb-8 border-b border-gray-200">
      <div className="flex flex-wrap gap-6">
        <Link className={linkClasses("/admin/places")} to={"/admin/places"}>
          Manage Hotels
        </Link>
        <Link className={linkClasses("/admin/places/new")} to={"/admin/places/new"}>
          Add Hotel
        </Link>
        <Link className={linkClasses("/admin/bookings")} to={"/admin/bookings"}>
          All Bookings
        </Link>
      </div>
      <button
        onClick={logout}
        className="!w-auto py-1.5 px-4 mb-2 rounded-full bg-white border border-gray-300 text-sm font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors"
      >
        Logout {user?.name ? `(${user.name})` : ""}
      </button>
    </nav>
  );
}
