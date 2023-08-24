const mongoose = require("mongoose");
// Middleware
const db = 'mongodb+srv://Sony:Sony@cluster0.mgn9sky.mongodb.net/?retryWrites=true&w=majority'

// Connect to MongoDB using the conneccdtion string
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Connection successful`);
}).catch((e) => {
  console.log(`No connection: ${e}`);
});

// mongodb://localhost:27017

