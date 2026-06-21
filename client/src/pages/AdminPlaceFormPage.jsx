import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../AdminNav";
import { Navigate, useParams } from "react-router-dom";

export default function AdminPlaceFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-lg font-semibold text-primary mt-6 first:mt-0">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm mb-2">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      // update
      await axios.put("/api/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      // new hotel
      await axios.post("/api/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/admin/places"} />;
  }

  return (
    <div>
      <AdminNav />
      <h1 className="text-xl font-bold text-primary mb-4">
        {id ? "Edit hotel" : "Add new hotel"}
      </h1>
      <form onSubmit={savePlace} className="card p-6">
        {preInput(
          "Title",
          "Title for this hotel. Should be short and catchy as in an advertisement"
        )}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: My lovely apt"
        />
        {preInput("Address", "Address of this hotel")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
        />
        {preInput("Photos")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "description of the hotel")}
        <textarea value={description} onChange={(ev) => setDescription(ev.target.value)} />
        {preInput("Perks", "select all the perks of this hotel")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra info", "house rules, etc")}
        <textarea value={extraInfo} onChange={(ev) => setExtraInfo(ev.target.value)} />
        {preInput(
          "Check in & out times",
          "add check in and out times, remember to have some time window for cleaning the room between guests"
        )}
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Check in time</label>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="14"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Check out time</label>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="11"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Max number of guests</label>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Price per night</label>
            <input type="number" value={price} onChange={(ev) => setPrice(ev.target.value)} />
          </div>
        </div>
        <button className="primary mt-6">Save</button>
      </form>
    </div>
  );
}
