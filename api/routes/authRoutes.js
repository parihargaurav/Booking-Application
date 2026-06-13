const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", authMiddleware, authController.profile);
router.post("/logout", authController.logout);

// Admin-only auth endpoints
router.post("/admin/register", authController.registerAdmin);
router.post("/admin/login", authController.loginAdmin);

module.exports = router;