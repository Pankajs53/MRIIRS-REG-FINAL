const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = function () {
    mongoose
      .connect(process.env.MONGOURL)
      .then(() => {
        console.log("DB CONNECTED SUCCESSFULLY");
      })
      .catch((error) => {
        console.log("ISSUE IN DB CONNECTION");
        console.error(error);
        process.exit(1);
      });
};
  
module.exports = { dbConnect };