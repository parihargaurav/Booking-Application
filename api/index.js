const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

// mount routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/places", require("./routes/placeRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server running on", PORT));
