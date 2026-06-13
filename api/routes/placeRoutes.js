const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Only admins can create, update, or delete hotel listings
router.post("/", authMiddleware, adminMiddleware, placeController.createPlace);
router.put("/", authMiddleware, adminMiddleware, placeController.updatePlace);
router.delete("/:id", authMiddleware, adminMiddleware, placeController.deletePlace);

router.get("/user-places", authMiddleware, placeController.getUserPlaces);
router.get("/:id", placeController.getPlaceById);
router.get("/", placeController.getAllPlaces);

module.exports = router;