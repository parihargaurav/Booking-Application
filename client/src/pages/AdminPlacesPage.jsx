import { Link } from "react-router-dom";
import AdminNav from "../AdminNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function AdminPlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    loadPlaces();
  }, []);

  function loadPlaces() {
    axios.get("/api/places").then(({ data }) => {
      setPlaces(data);
    });
  }

  async function deletePlace(id, ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (!window.confirm("Delete this hotel listing?")) return;
    await axios.delete("/api/places/" + id);
    setPlaces((prev) => prev.filter((p) => p._id !== id));
  }

  return (
    <div>
      <AdminNav />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-primary">Hotels ({places.length})</h1>
        <Link
          className="!w-auto inline-flex items-center gap-1.5 bg-secondary hover:bg-secondary-dark text-white text-sm font-semibold py-2 px-4 rounded-md shadow-sm transition-colors"
          to={"/admin/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add new hotel
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {places.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No hotels added yet.</p>
        )}
        {places.length > 0 &&
          places.map((place) => (
            <div
              key={place._id}
              className="card card-hover flex items-center gap-4 p-3"
            >
              <Link
                to={"/admin/places/" + place._id}
                className="flex w-28 h-28 bg-gray-200 grow shrink-0 rounded-md overflow-hidden"
              >
                <PlaceImg place={place} className="object-cover w-full h-full" />
              </Link>
              <Link to={"/admin/places/" + place._id} className="grow">
                <h2 className="text-lg font-semibold text-primary">{place.title}</h2>
                <p className="text-sm mt-1 text-gray-600">{place.address}</p>
                <p className="text-sm mt-1 text-gray-500">
                  <span className="font-semibold text-gray-700">₹{place.price}</span> / night &middot; up to {place.maxGuests} guests
                </p>
              </Link>
              <button
                onClick={(ev) => deletePlace(place._id, ev)}
                className="!w-auto bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-semibold py-2 px-4 rounded-md shrink-0 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
