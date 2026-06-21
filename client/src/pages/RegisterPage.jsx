import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AuthCard from "../AuthCard.jsx";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function registerUser(ev) {
    ev.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/auth/register', {
        name,
        email,
        password,
      });
      alert('Registration successful. Now you can log in');
    } catch (e) {
      alert('Registration failed. Please try again later');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Create account"
      subtitle="Join us to start booking your next stay"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
        </svg>
      }
    >
      <form onSubmit={registerUser}>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Full name</label>
        <input type="text"
               placeholder="John Doe"
               value={name}
               onChange={ev => setName(ev.target.value)} />
        <label className="block text-xs font-semibold text-gray-600 mb-1 mt-2">Email address</label>
        <input type="email"
               placeholder="your@email.com"
               value={email}
               onChange={ev => setEmail(ev.target.value)} />
        <label className="block text-xs font-semibold text-gray-600 mb-1 mt-2">Password</label>
        <input type="password"
               placeholder="Create a password"
               value={password}
               onChange={ev => setPassword(ev.target.value)} />
        <button className="primary mt-4" disabled={loading}>
          {loading ? 'Creating account…' : 'Register'}
        </button>
        <div className="text-center pt-4 text-sm text-gray-500">
          Already a member? <Link className="link" to={'/login'}>Login</Link>
        </div>
      </form>
    </AuthCard>
  );
}
