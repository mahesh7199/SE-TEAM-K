const mongoose = require("mongoose");

const connectDb = async (url) => {
  console.log("connecting");
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDb;
