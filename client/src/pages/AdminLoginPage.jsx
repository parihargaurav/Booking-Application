import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/auth/admin/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(data);
      setRedirect(true);
    } catch (e) {
      if (e.response?.status === 403) {
        alert("This account does not have admin access.");
      } else {
        alert("Login failed. Check your credentials.");
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/admin"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Admin Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Need an admin account?{" "}
            <Link className="underline text-black" to={"/admin/register"}>
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
