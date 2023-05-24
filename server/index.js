//IMPORT FROM PACKAGES
const express = require("express");
const mongoose = require("mongoose");

//IMPORT FROM OTHER FILES
const authRouter = require("./routes/auth"); //or auth.js -> it is relative importing

// INTIALISATION
const app = express();
const PORT = 3000;
const DB =
  "mongodb+srv://kundu:kundu2000@cluster0.f8fdw05.mongodb.net/?retryWrites=true&w=majority";

// MIDDLEWARE
// CLIENT -> MIDDLEWARE -> SERVER -> CLIENT
app.use(express.json()); // uses json payload
app.use(authRouter);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", function () {
  console.log(`connected at port ${PORT}`);
});
