import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";
import AuthCard from "../AuthCard.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
      setUser(data);
      setRedirect(true);
    } catch (e) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <AuthCard
      title="Sign in"
      subtitle="Welcome back — log in to manage your bookings"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
      }
    >
      <form onSubmit={handleLoginSubmit}>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Email address</label>
        <input type="email"
               placeholder="your@email.com"
               value={email}
               onChange={ev => setEmail(ev.target.value)} />
        <label className="block text-xs font-semibold text-gray-600 mb-1 mt-2">Password</label>
        <input type="password"
               placeholder="Enter your password"
               value={password}
               onChange={ev => setPassword(ev.target.value)} />
        <button className="primary mt-4" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <div className="text-center pt-4 text-sm text-gray-500">
          Don't have an account yet? <Link className="link" to={'/register'}>Register now</Link>
        </div>
      </form>
    </AuthCard>
  );
}
