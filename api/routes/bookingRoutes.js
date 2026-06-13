const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", authMiddleware, bookingController.createBooking);
router.get("/", authMiddleware, bookingController.getBookings);

// Admin-only: all bookings across the platform
router.get("/all", authMiddleware, adminMiddleware, bookingController.getAllBookings);

module.exports = router;