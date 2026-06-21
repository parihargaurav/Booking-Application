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
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/admin/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
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
      <div className="mt-4 flex flex-col gap-4">
        {places.length === 0 && (
          <p className="text-center text-gray-500">No hotels added yet.</p>
        )}
        {places.length > 0 &&
          places.map((place) => (
            <div
              key={place._id}
              className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl items-center"
            >
              <Link
                to={"/admin/places/" + place._id}
                className="flex w-32 h-32 bg-gray-300 grow shrink-0"
              >
                <PlaceImg place={place} />
              </Link>
              <Link to={"/admin/places/" + place._id} className="grow">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.address}</p>
                <p className="text-sm mt-1 text-gray-500">
                  ${place.price} / night &middot; up to {place.maxGuests} guests
                </p>
              </Link>
              <button
                onClick={(ev) => deletePlace(place._id, ev)}
                className="bg-red-500 text-white py-2 px-4 rounded-full shrink-0"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
