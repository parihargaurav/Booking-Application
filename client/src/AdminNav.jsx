import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";

export default function AdminNav() {
  const { pathname } = useLocation();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function linkClasses(path) {
    let classes = "inline-flex gap-1 py-2 px-6 rounded-full";
    if (pathname === path) {
      classes += " bg-primary text-white";
    } else {
      classes += " bg-gray-200";
    }
    return classes;
  }

  async function logout() {
    await axios.post("/api/auth/logout");
    setUser(null);
    navigate("/admin/login");
  }

  return (
    <nav className="w-full flex flex-wrap justify-center mt-8 gap-2 mb-8">
      <Link className={linkClasses("/admin/places")} to={"/admin/places"}>
        Manage Hotels
      </Link>
      <Link className={linkClasses("/admin/places/new")} to={"/admin/places/new"}>
        Add Hotel
      </Link>
      <Link className={linkClasses("/admin/bookings")} to={"/admin/bookings"}>
        All Bookings
      </Link>
      <button onClick={logout} className="py-2 px-6 rounded-full bg-gray-200">
        Logout {user?.name ? `(${user.name})` : ""}
      </button>
    </nav>
  );
}