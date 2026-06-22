# Ticket Booking Application

A full-stack ticket and stay booking application built with React, Express, MongoDB, Cloudinary, and Gemini AI.

## What this project does

This project allows users to:

* search available hotels and stays by destination or name
* view place details, images, and pricing
* register and log in
* browse their profile, saved places, and bookings
* create new bookings for selected places
* upload place photos using Cloudinary

Admin users can also:

* register and log in as admin
* create, edit, and manage places
* view all bookings across the platform

## Tech stack

* Frontend: React, React Router, Axios, Tailwind CSS
* Backend: Node.js, Express
* Database: MongoDB
* File uploads: Cloudinary
* AI: Gemini API (via `@google/generative-ai`)
* Authentication: JWT stored in cookies

## Project structure

### Frontend (`client`)

* `src/App.jsx` — app routes and global axios settings
* `src/UserContext.jsx` — current user and auth-ready state
* `src/pages/IndexPage.jsx` — homepage with search and place listing
* `src/pages/LoginPage.jsx` — user login page
* `src/pages/RegisterPage.jsx` — user registration page
* `src/pages/ProfilePage.jsx` — user profile and logout
* `src/pages/PlacesPage.jsx` — user's place listings
* `src/pages/PlacePage.jsx` — single place details and booking widget
* `src/pages/BookingPage.jsx` — booking checkout page
* `src/components/BookingWidget.jsx` — booking form, date selection, guest count

### Backend (`api`)

* `index.js` — Express server setup, middleware, and route mounting
* `controllers/authController.js` — register, login, logout, profile
* `controllers/placeController.js` — place creation and fetching
* `controllers/bookingController.js` — booking creation and retrieval
* `controllers/chatController.js` — chat support and Gemini AI integration
* `controllers/uploadController.js` — Cloudinary image upload
* `middleware/authMiddleware.js` — protects routes with JWT cookie auth
* `models/User.js`, `models/Place.js`, `models/Booking.js` — MongoDB schemas

## API overview

* `POST /api/auth/register` — create a new user account
* `POST /api/auth/login` — user login and cookie-based auth
* `GET /api/auth/profile` — current authenticated user profile
* `POST /api/auth/logout` — clear auth cookie
* `GET /api/places` — list available places
* `GET /api/places/:id` — fetch details for a single place
* `GET /api/places/user-places` — current user place listings
* `POST /api/places` — add a new place (authenticated user)
* `POST /api/bookings` — create a booking (authenticated user)
* `GET /api/bookings` — get current user bookings
* `POST /api/upload/upload` — upload an image to Cloudinary
* `POST /api/chat` — send chat questions to Gemini AI and receive responses

## AI chat assistant

This project includes a chat assistant powered by the Gemini API. The backend sends the current hotel inventory to Gemini along with a strict system prompt so the assistant:

* answers only from TicketEasy listings
* uses real hotel data such as price, address, amenities, and guest limits
* avoids making up fictional hotels or unrelated travel advice
* handles user questions about booking, hotel details, and availability

The chat widget in the frontend sends user messages to `/api/chat`, and the backend builds a context-aware prompt before calling Gemini.

## Getting started

1. Install backend dependencies:
   ```bash
   cd api
   npm install
   ```
2. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```
3. Start the backend server:
   ```bash
   cd ../api
   npm start
   ```
4. Start the frontend app:
   ```bash
   cd ../client
   npm start
   ```

## Environment variables

Create an `.env` file in `api/` with values for:

* `PORT`
* `MONGO_URL`
* `JWT_SECRET`
* `CLIENT_URL`
* `ADMIN_SECRET_KEY`
* `CLOUDINARY_CLOUD_NAME`
* `CLOUDINARY_API_KEY`
* `CLOUDINARY_API_SECRET`
* `GEMINI_API_KEY`

## Notes

* The frontend uses axios with credentials to support cookie-based auth.
* Search on the homepage is performed client-side by filtering loaded places.
* Admin routes are separated from regular user routes and require admin role validation.


