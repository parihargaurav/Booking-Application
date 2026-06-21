import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";
import AuthCard from "../AuthCard.jsx";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={"/admin"} />;
  }

  return (
    <AuthCard
      title="Admin sign in"
      subtitle="Manage hotels, bookings and listings"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      }
    >
      <form onSubmit={handleLoginSubmit}>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Email address</label>
        <input
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <label className="block text-xs font-semibold text-gray-600 mb-1 mt-2">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button className="primary mt-4" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <div className="text-center pt-4 text-sm text-gray-500">
          Need an admin account?{" "}
          <Link className="link" to={"/admin/register"}>
            Register here
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
