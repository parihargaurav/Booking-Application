import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AuthCard from "../AuthCard.jsx";

export default function AdminRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  async function registerAdmin(ev) {
    ev.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/auth/admin/register", {
        name,
        email,
        password,
        adminSecret,
      });
      alert("Admin account created. You can now log in.");
      setRedirect(true);
    } catch (e) {
      if (e.response?.status === 403) {
        alert("Invalid admin secret key.");
      } else {
        alert("Registration failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={"/admin/login"} />;
  }

  return (
    <AuthCard
      title="Admin registration"
      subtitle="Create an account to manage listings"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      }
    >
      <form onSubmit={registerAdmin}>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Full name</label>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <label className="block text-xs font-semibold text-gray-600 mb-1 mt-2">Email address</label>
        <input
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <label className="block text-xs font-semibold text-gray-600 mb-1 mt-2">Password</label>
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <label className="block text-xs font-semibold text-gray-600 mb-1 mt-2">Admin secret key</label>
        <input
          type="password"
          placeholder="Provided by your organization"
          value={adminSecret}
          onChange={(ev) => setAdminSecret(ev.target.value)}
        />
        <button className="primary mt-4" disabled={loading}>
          {loading ? 'Creating account…' : 'Register'}
        </button>
        <div className="text-center pt-4 text-sm text-gray-500">
          Already have an admin account?{" "}
          <Link className="link" to={"/admin/login"}>
            Login
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
