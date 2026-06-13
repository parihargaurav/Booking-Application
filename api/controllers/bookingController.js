const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  const booking = await Booking.create({
    user: req.user.id,
    ...req.body,
  });

  res.json(booking);
};

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate("place");
  res.json(bookings);
};

// Admin-only: view every booking made on the platform, with hotel and guest details
exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("place")
    .populate("user", "name email")
    .sort({ checkIn: -1 });
  res.json(bookings);
};