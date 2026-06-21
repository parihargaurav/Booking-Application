import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>

      <div className="mt-4">
        <PlaceGallery place={place} />
      </div>

      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="card p-5">
            <h2 className="font-semibold text-xl text-primary mb-2">About this place</h2>
            <p className="text-gray-700 leading-6 whitespace-pre-line">{place.description}</p>
          </div>

          <div className="card p-5 mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Check-in</div>
                <div className="font-medium text-gray-900">{place.checkIn}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Check-out</div>
                <div className="font-medium text-gray-900">{place.checkOut}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-secondary shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Max guests</div>
                <div className="font-medium text-gray-900">{place.maxGuests}</div>
              </div>
            </div>
          </div>

          <div className="card p-5 mt-5">
            <h2 className="font-semibold text-xl text-primary mb-2">Extra info</h2>
            <p className="text-sm text-gray-700 leading-6 whitespace-pre-line">{place.extraInfo}</p>
          </div>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
    </div>
  );
}
