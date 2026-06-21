import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/api/auth/logout');
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="card max-w-md mx-auto p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-secondary text-white flex items-center justify-center mx-auto mb-3 text-xl font-bold">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div className="font-semibold text-lg text-gray-900">{user?.name}</div>
          <div className="text-sm text-gray-500">{user?.email}</div>
          <button onClick={logout} className="primary mt-5">Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  );
}
