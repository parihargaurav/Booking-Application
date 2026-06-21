import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../Image.jsx";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("/api/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  const filteredPlaces = places.filter((place) => {
    const term = query.trim().toLowerCase();
    if (!term) return true;
    return (
      place.title?.toLowerCase().includes(term) ||
      place.address?.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      {/* Hero / search banner */}
      <section className="-mt-6 -mx-4 sm:-mx-6 lg:-mx-8 bg-primary px-4 sm:px-6 lg:px-8 pt-8 pb-14 mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight">
            Find your next stay
          </h1>
          <p className="text-white/80 mt-2 text-sm sm:text-base">
            Search hotels and stays at the best prices, anywhere you want to go.
          </p>
        </div>
        <div className="max-w-2xl mx-auto mt-6">
          <div className="bg-white rounded-md shadow-card flex items-center gap-2 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 ml-2 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(ev) => setQuery(ev.target.value)}
              placeholder="Search by destination or hotel name"
              className="!my-0 !border-0 focus:!ring-0 !p-1"
            />
            <button className="primary !w-auto px-6 hidden sm:block">Search</button>
          </div>
        </div>
      </section>

      <h2 className="text-xl font-bold text-primary mb-4">
        {query ? `Results for "${query}"` : "Popular hotels"}
      </h2>

      <div className="grid gap-x-5 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredPlaces.length > 0 &&
          filteredPlaces.map((place) => (
            <Link key={place._id} to={"/place/" + place._id} className="group">
              <div className="bg-gray-200 mb-2 rounded-card overflow-hidden aspect-square">
                {place.photos?.[0] && (
                  <Image
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    src={place.photos?.[0]}
                    alt=""
                  />
                )}
              </div>
              <h2 className="font-semibold text-gray-900 leading-snug truncate group-hover:text-secondary transition-colors">
                {place.address}
              </h2>
              <h3 className="text-sm text-gray-500 truncate">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold text-primary">₹{place.price}</span>{" "}
                <span className="text-sm text-gray-500">per night</span>
              </div>
            </Link>
          ))}
      </div>

      {places.length > 0 && filteredPlaces.length === 0 && (
        <p className="text-center text-gray-500 mt-12">
          No hotels match "{query}". Try a different search.
        </p>
      )}
    </div>
  );
}
