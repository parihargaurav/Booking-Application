import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="bg-primary sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <Link to={"/"} className="flex items-center gap-2 shrink-0">
          <span className="flex items-center justify-center w-9 h-9 rounded-md bg-white text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.75"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
              />
            </svg>
          </span>
          <span className="font-extrabold text-xl text-white tracking-tight">
            Ticket<span className="text-accent">Easy</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to={"/admin/login"}
            className="hidden sm:inline-block text-sm font-medium text-white/80 hover:text-white transition-colors"
          >
            Admin
          </Link>
          <Link
            to={user ? "/account" : "/login"}
            className="flex items-center gap-2 bg-white hover:bg-gray-100 transition-colors rounded-full py-1.5 pl-1.5 pr-3 sm:pr-4"
          >
            <div className="bg-secondary text-white rounded-full w-7 h-7 flex items-center justify-center overflow-hidden shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 relative top-0.5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold text-primary">
              {user ? user.name : "Sign in"}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
