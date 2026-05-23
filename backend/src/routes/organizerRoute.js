import express from "express";
import {
  getOrganizerDashboard,
  getOrganizerEvents,
  getEventBookings,
  exportEventBookingsExcel
} from "../controllers/organizerController.js";

import { organizerAuthRequired } from "../../middleware/auth.js";

const router = express.Router();

router
  .get("/events", organizerAuthRequired, getOrganizerEvents)
  .get("/events/:id/bookings", organizerAuthRequired, getEventBookings)
  .get("/events/:id/bookings/excel", organizerAuthRequired, exportEventBookingsExcel)
  .get("/dashboard", organizerAuthRequired, getOrganizerDashboard);

export default router;
