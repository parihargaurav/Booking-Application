import { createContext, useEffect, useState } from "react";
import axios from "axios";


// Disable axios default error logging
axios.defaults.error = false;


export const UserContext = createContext({});


export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);


  useEffect(() => {
    axios
      .get("/api/auth/profile", {
        withCredentials: true,
        validateStatus: () => true,
        // Explicitly disable any internal logging
        transformResponse: [(data) => data],
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        // Prevent any error logging
        if (error?.response?.status !== 401) {
          // Only handle non-401 errors silently
          setUser(null);
        }
      })
      .finally(() => {
        setReady(true);
      });
  }, []);


  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}