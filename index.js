const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const imageRoute = require("./routes/image");
const userRoute = require("./routes/user");
const foodRoute = require("./routes/food");
const orderRoute = require("./routes/order");

const app = express();

const cors = require("cors");
const corsOptions = {
  origin: 'https://main--fooddeliveryfe.netlify.app', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // HTTP methods you want to allow
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers you want to allow
  credentials: true, // Allow credentials such as cookies
};

app.use(cors(corsOptions));
app.use(express.json());

dotenv.config();
const port = process.env.PORT || 8000;


app.get("/", (req, res) => {
  res.send("Hello world");
});

//connect db

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("connected");
});
app.use("/api/v1/all", imageRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/food", foodRoute);
app.use("/api/v1/order", orderRoute);

app.use(express.json({ limit: "2mb" }));

app.listen(port, () => {
  connect();
  console.log(`Listening from ${port}`);
});
