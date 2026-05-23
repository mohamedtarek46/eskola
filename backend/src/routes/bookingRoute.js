import express from "express";
import {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
} from "../controllers/bookingController.js";

import { authRequired } from "../../middleware/auth.js";

const router = express.Router();

router
  .get("/", authRequired, getUserBookings)
  .post("/",authRequired, createBooking)
  .get("/:bookingId",authRequired, getBookingById)
  .delete("/:bookingId",authRequired, cancelBooking);


export default router;
