import sendEmail from "../../config/email.js";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";

// GET /api/bookings
export const getUserBookings = async (req, res) => {
  try {
    const query = {
      userId: req.user._id,
    };

    // filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    const bookings = await Booking.find(query)
      .populate("eventId")
      .populate("userId")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
};

// POST /api/bookings   createBooking
export const createBooking = async (req, res) => {
  try {
    const { eventId, numberOfSeats } = req.body;

    const event = await Event.findById(eventId).populate("organizerId");

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    if (event.organizerId._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot book your own event",
      });
    }

    // event finished
    if (new Date(event.endDateTime) < new Date()) {
      return res.status(400).json({
        message: "you cannot book a finished event",
      });
    }
    // event not available completed or cancelled or draft
    if (event.status !== "published") {
      return res.status(400).json({
        message: `this book is not available for ${event.status} events`,
      });
    }

    // seats validation
    if (event.availableSeats < numberOfSeats) {
      return res.status(400).json({
        message: "Insufficient seats available",
      });
    }

    const totalAmount = event.price * numberOfSeats;

    const booking = await Booking.create({
      eventId,
      userId: req.user._id,
      numberOfSeats,
      totalAmount,

      status: "confirmed",
      paymentStatus: "paid",

      bookingReference: `BK-${Date.now()}-${req.user._id}`,
    });

    // decrease available seats
    event.availableSeats -= numberOfSeats;

    // if no seats left, set event status to completed
    if (event.availableSeats === 0) {
      event.status = "completed";
    }

    await event.save();
    // send email
    try {
      await sendEmail({
        to: req.user.email,
        eventName: event.title,
        seats: numberOfSeats,
        totalPrice: totalAmount,
      });
    } catch (emailErr) {
      console.error("Email failed:", emailErr);
    }

    res.status(201).json(booking);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
};

// GET /api/bookings/:bookingId
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate("eventId")
      .populate("userId");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // owner check
    if (booking.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    res.status(200).json(booking);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err.message,
    });
  }
};

// DELETE /api/bookings/:bookingId
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId).populate("eventId");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    //  check ownership
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }
    const event = booking.eventId;
    const now = new Date();
    const eventDate = new Date(event.startDateTime);
    //  event already started
    if (eventDate < now) {
      return res.status(400).json({
        message: "Cannot cancel past events",
      });
    }
    //  24h rule
    const diffHours = (eventDate - now) / (1000 * 60 * 60);
    if (diffHours < 24) {
      return res.status(400).json({
        message: "Cannot cancel within 24 hours of event",
      });
    }
    //already cancelled
    if (booking.status === "cancelled") {
      return res.status(400).json({
        message: "Booking already cancelled",
      });
    }
    // update booking
    booking.status = "cancelled";
    await booking.save();
    //  return seats
    await Event.findByIdAndUpdate(event._id, {
      $inc: { availableSeats: booking.numberOfSeats },
    });
    return res.json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
