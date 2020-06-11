require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "./public")));

const db = mongoose.connection;

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.once("open", () => console.log("mongodb is connected 🚀"));
db.on("error", console.error.bind(console, "connection error:"));

app.set("json spaces", 2);

// index routes
app.use("/", require("./routes/index"));
// api routes
app.use("/api", require("./routes/api/index"));
// not found route
app.use("*", require("./controllers/index_controllers").notFound);

app.listen(process.env.PORT, () => {
  console.log(`server is connected at ${process.env.PORT} 🚀`);
});
