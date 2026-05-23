import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    numberOfSeats: {
      type: Number,
      required: true,
      min: 1,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "refunded"],
      default: "confirmed",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "paid",
    },

    bookingReference: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true },
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
export default Booking;
