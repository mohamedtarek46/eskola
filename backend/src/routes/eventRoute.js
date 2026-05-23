import express from "express";
import {
  getEvents,
  getFeaturedEvents,
  getUpcomingEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from "../controllers/eventControllers.js";
import { organizerAuthRequired } from "../../middleware/auth.js";

const router = express.Router();

router
  .get("/", getEvents)
  .get("/featured", getFeaturedEvents)
  .get("/upcoming", getUpcomingEvents)
  .get("/:id", getEventById)
  .put("/:id", organizerAuthRequired, updateEvent)
  .delete("/:id", organizerAuthRequired, deleteEvent)
  .post("/", organizerAuthRequired, createEvent);

export default router;
