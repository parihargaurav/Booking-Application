const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  // Prevent admins from creating bookings. They must register/login as regular users.
  if (req.user && req.user.role === "admin") {
    return res.status(403).json({
      message:
        "Admins cannot create bookings. Please sign up or log in as a regular user to book places.",
    });
  }

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