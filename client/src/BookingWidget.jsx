import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const [errors, setErrors] = useState({});
  const { user } = useContext(UserContext);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    if (!user) {
      return setRedirect("/login");
    }
    if (user.role === "admin") {
      setErrors({ general: "Admins cannot book. Please signup or login as a regular user to book." });
      return;
    }
    const newErrors = {};

    if (!checkIn) newErrors.checkIn = "Check-in is required";
    if (!checkOut) newErrors.checkOut = "Check-out is required";
    if (!numberOfGuests) newErrors.guests = "Guests count required";
    if (numberOfNights > 0) {
      if (!name) newErrors.name = "Name is required";
      if (!phone) newErrors.phone = "Phone number is required";
    }

    // If any errors → show them
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors → continue booking
    const response = await axios.post("/api/bookings/", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });

    setRedirect(`/account/bookings/${response.data._id}`);
  }

  if (redirect) return <Navigate to={redirect} />;

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ₹{place.price} / per night
      </div>

      <div className="border rounded-2xl mt-4">
        {/* Check-in */}
        <div className="flex">
          <div className="py-3 px-4">
            <label>
              Check in:{" "}
              {errors.checkIn && <span className="text-red-600">*</span>}
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => {
                setCheckIn(ev.target.value);
                setErrors((prev) => ({ ...prev, checkIn: "" })); // remove error
              }}
            />

            {errors.checkIn && (
              <p className="text-red-600 text-sm">{errors.checkIn}</p>
            )}
          </div>

          {/* Check-out */}
          <div className="py-3 px-4 border-l">
            <label>
              Check out:{" "}
              {errors.checkOut && <span className="text-red-600">*</span>}
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => {
                setCheckOut(ev.target.value);
                setErrors((prev) => ({ ...prev, checkOut: "" })); // remove error
              }}
            />

            {errors.checkOut && (
              <p className="text-red-600 text-sm">{errors.checkOut}</p>
            )}
          </div>
        </div>

        {/* Guests */}
        <div className="py-3 px-4 border-t">
          <label>
            Number of guests:{" "}
            {errors.guests && <span className="text-red-600">*</span>}
          </label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => {
              setNumberOfGuests(ev.target.value);
              setErrors((prev) => ({ ...prev, guests: "" }));
            }}
          />

          {errors.guests && (
            <p className="text-red-600 text-sm">{errors.guests}</p>
          )}
        </div>

        {/* Name + Phone */}
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>
              Your full name:{" "}
              {errors.name && <span className="text-red-600">*</span>}
            </label>
            <input
              type="text"
              value={name}
              onChange={(ev) => {
                setName(ev.target.value);
                setErrors((prev) => ({ ...prev, name: "" }));
              }}
            />

            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name}</p>
            )}

            <label>
              Phone number:{" "}
              {errors.phone && <span className="text-red-600">*</span>}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => {
                setPhone(ev.target.value);
                setErrors((prev) => ({ ...prev, phone: "" }));
              }}
            />

            {errors.phone && (
              <p className="text-red-600 text-sm">{errors.phone}</p>
            )}
          </div>
        )}
      </div>

      {errors.general && (
        <p className="text-red-600 mt-2">{errors.general}</p>
      )}

      {isAdmin ? (
        <div className="mt-4 text-center">
          <p className="text-yellow-700">
            You are logged in as an admin and cannot book. Please{' '}
            <Link to="/register" className="underline">
              Sign Up
            </Link>{' '}
            or{' '}
            <Link to="/login" className="underline">
              Sign In
            </Link>{' '}
            as a regular user to book.
          </p>
          <button disabled className="primary mt-4 opacity-50 cursor-not-allowed">
            Book this place{numberOfNights > 0 && <span> ₹{numberOfNights * place.price}</span>}
          </button>
        </div>
      ) : (
        <button onClick={bookThisPlace} className="primary mt-4">
          Book this place
          {numberOfNights > 0 && <span> ₹{numberOfNights * place.price}</span>}
        </button>
      )}
    </div>
  );
}
