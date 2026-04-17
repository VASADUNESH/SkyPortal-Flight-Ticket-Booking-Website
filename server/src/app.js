const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = process.env.PORT || 5100;

const models = require("./models/schema");
const { MONGO_URI } = require("./db/connect");

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* -------------------- SWAGGER CONFIG -------------------- */
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Flight Booking API",
      version: "1.0.0",
      description: "API documentation for Flight Booking System",
    },
    servers: [
      {
        url: "http://localhost:5100",
      },
    ],
  },
  apis: ["./src/app.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* -------------------- AUTH ROUTES -------------------- */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstname, lastname, email, password, type]
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [admin, owner, passenger]
 *     responses:
 *       200:
 *         description: Successfully registered
 *       400:
 *         description: User already exists
 */
app.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, type, email, password } = req.body;

    const user = await models.Users.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new models.Users({
      firstname,
      lastname,
      type,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({ message: "Successfully registered" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await models.Users.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  let token;
  if (user.type === "owner") token = jwt.sign({ id: user._id }, "agenttoken");
  if (user.type === "passenger") token = jwt.sign({ id: user._id }, "mysecretkey1");
  if (user.type === "admin") token = jwt.sign({ id: user._id }, "mysecretkey2");

  res.json({ user, token });
});

/* -------------------- AIRLINE ROUTES -------------------- */

/**
 * @swagger
 * /airline-register:
 *   post:
 *     summary: Register an airline
 *     tags: [Airline]
 */
app.post("/airline-register", async (req, res) => {
  try {
    const { airline, email, password } = req.body;

    const exists = await models.Airline.findOne({ airline });
    if (exists) {
      return res.status(400).json({ message: "Airline already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAirline = new models.Airline({
      airline,
      email,
      password: hashedPassword,
    });

    await newAirline.save();
    res.status(200).json({ message: "Airline successfully registered" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /airline-login:
 *   post:
 *     summary: Airline login
 *     tags: [Airline]
 */
app.post("/airline-login", async (req, res) => {
  const { airline, password } = req.body;

  const airlineOwner = await models.Airline.findOne({ airline });
  if (!airlineOwner) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, airlineOwner.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const ownerToken = jwt.sign(
    { airlineOwnerId: airlineOwner._id },
    "agenttoken"
  );

  res.json({ airlineOwner, ownerToken });
});

/* -------------------- USERS -------------------- */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 */
app.get("/users", async (req, res) => {
  const users = await models.Users.find();
  res.json(users);
});

/* -------------------- FLIGHTS -------------------- */

/**
 * @swagger
 * /flights:
 *   post:
 *     summary: Create a flight
 *     tags: [Flights]
 */
app.post("/flights", async (req, res) => {
  const flight = new models.Flight(req.body);
  const savedFlight = await flight.save();
  res.status(201).json(savedFlight);
});

/**
 * @swagger
 * /flights:
 *   get:
 *     summary: Get all flights
 *     tags: [Flights]
 */
app.get("/flights", async (req, res) => {
  const flights = await models.Flight.find();
  res.json(flights);
});

/**
 * @swagger
 * /flights/{id}:
 *   get:
 *     summary: Get flight by ID
 *     tags: [Flights]
 */
app.get("/flights/:id", async (req, res) => {
  const flight = await models.Flight.findById(req.params.id);
  if (!flight) return res.status(404).json({ message: "Flight not found" });
  res.json(flight);
});

/* -------------------- BOOKINGS -------------------- */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a booking
 *     tags: [Bookings]
 */
app.post("/bookings", async (req, res) => {
  const booking = new models.Booking(req.body);
  const flight = await models.Flight.findById(req.body.flight);

  flight.reservedSeats.push(...booking.seatNumbers);
  await flight.save();

  booking.flight = flight._id;
  const savedBooking = await booking.save();

  res.status(201).json(savedBooking);
});

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 */
app.get("/bookings", async (req, res) => {
  const bookings = await models.Booking.find().populate("flight");
  res.json(bookings);
});

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete a booking
 *     tags: [Bookings]
 */
app.delete("/bookings/:id", async (req, res) => {
  const booking = await models.Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  const flight = await models.Flight.findById(booking.flight);
  flight.reservedSeats = flight.reservedSeats.filter(
    seat => !booking.seatNumbers.includes(seat)
  );

  await flight.save();
  await booking.deleteOne();

  res.json({ message: "Booking deleted successfully" });
});

/**
 * @swagger
 * /bookings/{id}/payments:
 *   post:
 *     summary: Mark booking payment as success
 *     tags: [Bookings]
 */
app.post("/bookings/:id/payments", async (req, res) => {
  const booking = await models.Booking.findById(req.params.id);
  booking.paymentstatus = "success";
  const savedBooking = await booking.save();
  res.json(savedBooking);
});

/* -------------------- SERVER -------------------- */
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/api-docs`);
});

module.exports = app;
