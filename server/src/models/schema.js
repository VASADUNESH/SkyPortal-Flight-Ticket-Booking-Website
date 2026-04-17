const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  type: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const airlineSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const flightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  flightNumber: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: String, required: true },
  reservedSeats: [{
    seat: { type: String, required: true },
    date: { type: Date, required: true }
  }],
  arrivalTime: { type: String, required: true },
  price: { type: Number, required: true },
  seatsAvailable: { type: Number, required: true }
});

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  passengers: [{ type: String, required: true }],
  totalPrice: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  journeyDate: { type: Date, required: true },
  returnDate: { type: Date },
  seatNumbers: [{
    seat: { type: String, required: true },
    date: { type: Date, required: true }
  }],
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, default: 'pending' }
});

const models = {
  Users: mongoose.model('Users', userSchema),
  Flight: mongoose.model('Flight', flightSchema),
  Booking: mongoose.model('Booking', bookingSchema),
  Airline: mongoose.model('Airline', airlineSchema)
}

module.exports = models;