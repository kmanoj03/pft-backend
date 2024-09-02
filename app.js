const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

// app.use(
//   cors({
//     origin: [""],
//     methods: ["POST", "GET"],
//   })
// );
// app.options("*", cors());

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

const uRoutes = require("./routes/userRoute.js");

app.use("/user", uRoutes);

app.use((err, req, res, next) => {
  console.log(err);

  if (typeof err == "string") {
    return res.status(400).send({
      message: err,
    });
  }

  return res.status(400).send({
    message: err.message,
  });
});

module.exports = app;
