require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./src/database/database");
const userRoutes = require("./src/routes/User.route");

const app = express();
connection();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(
  {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  }
));
app.use("/user", userRoutes);

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});