const mongoose = require("mongoose");

/**
 * Connect to the MongoDB database using the Mongoose library
 */
const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});

    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = ConnectDB;
