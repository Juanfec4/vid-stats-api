//Packages
import express from "express";
import "dotenv/config";
import ip from "ip";
import mongoose from "mongoose";
import logger from "./src/config/morganConfig.js";

//Modules
import CORS from "./src/middlewares/allowCors.js";
import connectDB from "./src/config/dbConnection.js";
import auth from "./src/middlewares/auth.js";
import rateLimit from "./src/middlewares/rateLimit.js";
import register from "./src/routes/register.js";
import video from "./src/routes/video.js";

//Server
const app = express();

//CORS
app.use(CORS);
//Reference
app.use(express.static("static"));

//Middleware
app.use(express.json());
app.use("/", auth);
app.use("/", logger);
// app.use("/api", rateLimit);

//Routes
app.use("/register", register);
app.use("/api/video", video);

//404 Handling
app.use((req, res) => {
  return res.status(404).json({
    message:
      "404: Not Found (the resource you are requesting could not be found on the server) ",
  });
});

//Server information
const PORT = process.env.PORT ? process.env.PORT : 3000;
const HOSTNAME = `http://${ip.address()}:${PORT}`;

//Connect to DB
connectDB();

//Check if DB is connected successfully & start server
mongoose.connection.once("open", () => {
  console.log(`Established connection with Database`);

  //Start server
  app.listen(PORT, () => {
    console.log(`Server running on: ${HOSTNAME}`);
  });
});
