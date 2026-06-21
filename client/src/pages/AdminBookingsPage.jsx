import AdminNav from "../AdminNav";
import { useEffect, useState } from "react";
import axios from "axios";

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("/api/bookings/all")
      .then(({ data }) => {
        setBookings(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = bookings.filter((b) => {
    const term = search.toLowerCase();
    if (!term) return true;
    return (
      b.name?.toLowerCase().includes(term) ||
      b.place?.title?.toLowerCase().includes(term) ||
      b.user?.email?.toLowerCase().includes(term) ||
      b.phone?.toLowerCase().includes(term)
    );
  });

  const totalRevenue = filtered.reduce((sum, b) => sum + (b.price || 0), 0);

  return (
    <div>
      <AdminNav />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-xl font-bold text-primary">All Bookings ({filtered.length})</h1>
        <input
          type="text"
          placeholder="Search by hotel, guest, email or phone"
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          className="!my-0 sm:max-w-xs"
        />
      </div>

      {loading && <p className="text-center text-gray-500 mt-8">Loading bookings...</p>}

      {!loading && filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No bookings found.</p>
      )}

      {!loading && filtered.length > 0 && (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white text-left">
                <th className="p-3 font-semibold rounded-tl-card">Hotel</th>
                <th className="p-3 font-semibold">Guest Name</th>
                <th className="p-3 font-semibold">Guest Email</th>
                <th className="p-3 font-semibold">Phone</th>
                <th className="p-3 font-semibold">Check-in</th>
                <th className="p-3 font-semibold">Check-out</th>
                <th className="p-3 font-semibold rounded-tr-card text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((booking, idx) => (
                <tr
                  key={booking._id}
                  className={"border-b border-gray-100 " + (idx % 2 === 1 ? "bg-gray-50" : "")}
                >
                  <td className="p-3 font-medium text-gray-900">{booking.place?.title || "Deleted hotel"}</td>
                  <td className="p-3">{booking.name}</td>
                  <td className="p-3 text-gray-600">{booking.user?.email || "-"}</td>
                  <td className="p-3 text-gray-600">{booking.phone}</td>
                  <td className="p-3 text-gray-600">{formatDate(booking.checkIn)}</td>
                  <td className="p-3 text-gray-600">{formatDate(booking.checkOut)}</td>
                  <td className="p-3 text-right font-semibold text-primary">₹{booking.price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-semibold">
                <td className="p-3" colSpan={6}>
                  Total
                </td>
                <td className="p-3 text-right text-primary">₹{totalRevenue}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
