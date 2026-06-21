import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import axios from "axios";
import { UserContextProvider } from "./UserContext.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PlacesPage from "./pages/PlacesPage.jsx";
import PlacePage from "./pages/PlacePage.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import AdminRegisterPage from "./pages/AdminRegisterPage.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminPlacesPage from "./pages/AdminPlacesPage.jsx";
import AdminPlaceFormPage from "./pages/AdminPlaceFormPage.jsx";
import AdminBookingsPage from "./pages/AdminBookingsPage.jsx";

// Set the default base URL for Axios
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />

          {/* Admin auth (not gated) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/register" element={<AdminRegisterPage />} />

          {/* Admin-only routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPlacesPage />} />
            <Route path="/admin/places" element={<AdminPlacesPage />} />
            <Route path="/admin/places/new" element={<AdminPlaceFormPage />} />
            <Route path="/admin/places/:id" element={<AdminPlaceFormPage />} />
            <Route path="/admin/bookings" element={<AdminBookingsPage />} />
          </Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;