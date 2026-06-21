import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function AdminRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function registerAdmin(ev) {
    ev.preventDefault();
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
    }
  }

  if (redirect) {
    return <Navigate to={"/admin/login"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Admin Registration</h1>
        <form className="max-w-md mx-auto" onSubmit={registerAdmin}>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
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
          <input
            type="password"
            placeholder="Admin secret key"
            value={adminSecret}
            onChange={(ev) => setAdminSecret(ev.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already have an admin account?{" "}
            <Link className="underline text-black" to={"/admin/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
