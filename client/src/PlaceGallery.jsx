import { useState } from "react";
import Image from "./Image.jsx";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 z-50 bg-black text-white min-h-screen overflow-y-auto">
        <div className="bg-black p-6 sm:p-8 grid gap-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-between sticky top-0 bg-black py-2">
            <h2 className="text-xl sm:text-2xl font-semibold">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="flex items-center gap-1 py-2 px-4 rounded-md shadow shadow-black bg-white text-primary font-semibold"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
              Close
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo, index) => (
              <div key={index} className="rounded-card overflow-hidden">
                <Image src={photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-card overflow-hidden">
        <div>
          {place.photos?.[0] && (
            <div>
              <Image
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square cursor-pointer object-cover hover:opacity-90 transition-opacity"
                src={place.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid gap-2 grid-rows-2">
          {place.photos?.[1] && (
            <Image
              onClick={() => setShowAllPhotos(true)}
              className="aspect-square cursor-pointer object-cover hover:opacity-90 transition-opacity"
              src={place.photos[1]}
              alt=""
            />
          )}
          {place.photos?.[2] && (
            <Image
              onClick={() => setShowAllPhotos(true)}
              className="aspect-square cursor-pointer object-cover hover:opacity-90 transition-opacity"
              src={place.photos[2]}
              alt=""
            />
          )}
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex items-center gap-1.5 absolute bottom-3 right-3 py-2 px-4 bg-white text-gray-800 font-semibold rounded-md shadow-card hover:shadow-card-hover transition-shadow"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
        </svg>
        Show more photos
      </button>
    </div>
  );
}
