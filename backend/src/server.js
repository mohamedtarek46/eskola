import "../config/enviroment.js";
import express from "express";
import cors from "cors";
import connectDB from "../config/db.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import eventRoute from "./routes/eventRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
import organizerRoute from "./routes/organizerRoute.js";

const startServer = async () => {
  await connectDB();
  const app = express();
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://192.168.1.2:3000",
        process.env.FRONTEND_URL,
      ],
      credentials: true,
    }),
  );
  app.use(cookieParser());
  app.use(express.json());
  app.get("/test", (req, res) => {
    res.send("frontend: " + process.env.FRONTEND_URL);
  });

  app.use("/api/auth", userRoute);
  app.use("/api/events", eventRoute);
  app.use("/api/categories", categoryRoute);
  app.use("/api/bookings", bookingRoute);
  app.use("/api/organizer", organizerRoute);
  

  app.listen(process.env.PORT || 5000, () => {
    console.log(`running at ${process.env.PORT || 5000}`);
  });
};

startServer();
