import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/api/places/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <p className="text-gray-500 text-sm">Only administrators can add new places.</p>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {places.length === 0 && (
          <p className="text-center text-gray-500 mt-8">You don't have any accommodations yet.</p>
        )}
        {places.length > 0 &&
          places.map((place) => (
            <Link
              key={place._id}
              to={"/account/places/" + place._id}
              className="card card-hover flex cursor-pointer gap-4 p-3"
            >
              <div className="flex w-32 h-32 bg-gray-200 grow shrink-0 rounded-md overflow-hidden">
                <PlaceImg place={place} className="object-cover w-full h-full" />
              </div>
              <div className="grow-0 shrink py-1">
                <h2 className="text-lg font-semibold text-primary">{place.title}</h2>
                <p className="text-sm mt-1 text-gray-600">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
