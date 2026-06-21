import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/api/bookings/").then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="flex flex-col gap-4">
        {bookings?.length === 0 && (
          <p className="text-center text-gray-500 mt-8">You don't have any bookings yet.</p>
        )}
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              key={booking._id}
              to={`/account/bookings/${booking._id}`}
              className="card card-hover flex gap-4 overflow-hidden"
            >
              <div className="w-40 sm:w-48 shrink-0">
                <PlaceImg place={booking.place} className="object-cover w-full h-full" />
              </div>
              <div className="py-3 pr-4 grow">
                <h2 className="text-lg font-semibold text-primary">{booking.place.title}</h2>
                <BookingDates booking={booking} className="mt-2 mb-3" />
                <div className="flex items-center gap-2 text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-secondary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  <span className="font-semibold">Total price: ₹{booking.price}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
