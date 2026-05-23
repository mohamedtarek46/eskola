import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    location: {
      city: String,
      address: String,
      country: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },

    startDateTime: {
      type: Date,
      required: true,
    },

    endDateTime: {
      type: Date,
      required: true,
    },

    price: {
      type: Number,
      default: 0,
    },

    capacity: {
      type: Number,
      required: true,
    },

    availableSeats: {
      type: Number,
      required: true,
    },
    currency:{
      type: String,
    },
    status: {
      type: String,
      enum: ["draft", "published", "cancelled", "completed"],
      default: "active",
    },
  },
  { timestamps: true }
);


const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
export default Event;
