SkyPortal - Flight Ticket Booking System ✈️

SkyPortal is a high-performance, full-stack flight management application. It provides a seamless experience for searching flights, managing seat allocations, and handling secure bookings. Built with the MEAN stack (MongoDB, Express, Angular, Node.js), it utilizes JWT for secure authentication and Swagger for comprehensive API testing.

🚀 Project Overview

RESTful API: Designed and developed backend services for flight scheduling and booking management.

Security: Implemented JWT-based authentication with role-based access for Admins, Owners, and Passengers.

Dynamic UI: Built a responsive Angular interface for real-time seat selection and booking cancellation.

Database: Structured MongoDB schemas optimized for handling concurrent seat reservations.

🛠️ Tech Stack

Frontend: Angular (v14+), CSS3 (Flexbox/Grid), HTML5

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Security: JSON Web Tokens (JWT), Bcrypt.js

Documentation: Swagger / OpenAPI 3.0

📂 Project Structure

Plaintext



├── client/                # Angular Frontend Application

│   ├── src/app            # Components (Home, Booking, Auth, Admin)

│   ├── src/assets         # Images and static files

│   └── ...

├── server/                # Node.js Backend API

│   ├── src/app.js         # Express routes & Swagger configuration

│   ├── src/db/            # MongoDB connection logic

│   ├── src/models/        # Mongoose Schemas (User, Flight, Booking)

│   └── package.json

└── README.md

📑 API Documentation (Swagger)

SkyPortal features an integrated Swagger UI. Once the server is running, you can explore and test all API endpoints interactively.

👉 Swagger URL: http://localhost:5100/api-docs

⚙️ Installation & Setup

Follow these steps to get the application running on your local machine.

1. Prerequisites

Node.js (v18 or higher recommended)

MongoDB (Local instance or MongoDB Atlas)

Angular CLI (npm install -g @angular/cli)

2. Backend Setup (Server)

Bash



cd server

npm install# Ensure your MongoDB URI is correctly configured in src/db/connect.js

npm run dev

The server will start at http://localhost:5100.

3. Frontend Setup (Client)

Bash



cd client

npm install

npm start

The application will open at http://localhost:4200.

🔑 Key API Endpoints

CategoryMethodEndpointDescriptionAuthPOST/registerRegister Admin, Owner, or PassengerAuthPOST/loginAuthenticate & receive JWTFlightsGET/flightsList all scheduled flightsFlightsPOST/flightsCreate a new flight (Owner/Admin)BookingsPOST/bookingsReserve seats and create bookingBookingsDELETE/bookings/:idCancel booking & release seats🛡️ Important Notes

Node Modules: Do not push the node_modules folder to GitHub. Ensure your .gitignore includes node_modules/.

Environment Variables: Secure your MONGO_URI and JWT_SECRET in a .env file.


Developed by VASA DUNESH
