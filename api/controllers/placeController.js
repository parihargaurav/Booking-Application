const Place = require("../models/Place");

exports.createPlace = async (req, res) => {
  const {
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
  } = req.body;

  const place = await Place.create({
    owner: req.user.id,
    title,
    address,
    photos: addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  });

  res.json(place);
};

exports.getUserPlaces = async (req, res) => {
  const places = await Place.find({ owner: req.user.id });
  res.json(places);
};

exports.getPlaceById = async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.json(place);
};

exports.updatePlace = async (req, res) => {
  const place = await Place.findById(req.body.id);

  if (!place) return res.status(404).json("Place not found");

  // Admins can edit any place (place ownership is no longer restrictive
  // since only admins can create/manage hotels)
  if (req.user.role !== "admin" && req.user.id !== place.owner.toString())
    return res.status(403).json("Not authorized");

  place.set(req.body);
  await place.save();

  res.json("ok");
};

exports.deletePlace = async (req, res) => {
  const place = await Place.findById(req.params.id);

  if (!place) return res.status(404).json("Place not found");

  await Place.findByIdAndDelete(req.params.id);

  res.json("ok");
};

exports.getAllPlaces = async (req, res) => {
  res.json(await Place.find());
};