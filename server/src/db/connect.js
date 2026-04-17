const mongoose = require("mongoose");

const db = 'mongodb+srv://duneshvasa:duneshvasa@cluster0.os8o83r.mongodb.net/?appName=Cluster0'
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Connection successful`);
}).catch((e) => {
  console.log(`No connection: ${e}`);
});

// mongodb://localhost:27017

