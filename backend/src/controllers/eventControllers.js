import Event from "../models/Event.js";
import Booking from "../models/Booking.js";
import Category from "../models/Category.js";

export const getEvents = async (req, res) => {
  try {
    const {
      search,
      page = 1,
      limit = 9,
      category,
      startDateTime,
      endDateTime,
      city,
      minPrice,
      maxPrice,
      sortBy,
      status,
      order = "asc",
    } = req.query;

    const query = {};

    // ─── Search ─────────────────────────────
    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // ─── Category Name → Category ID ───────
    if (category) {
      query.categoryId = category;
    }

    // ─── City ───────────────────────────────
    if (city) {
      query["location.city"] = {
        $regex: city,
        $options: "i",
      };
    }

    // ─── Date Filters ───────────────────────
    if (startDateTime || endDateTime) {
      query.startDateTime = {};

      if (startDateTime) {
        query.startDateTime.$gte = new Date(startDateTime);
      }

      if (endDateTime) {
        query.startDateTime.$lte = new Date(endDateTime);
      }
    }

    // ─── Price Range ────────────────────────
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    // ─── Status ─────────────────────────────
    if (status) {
      query.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    let events;

    // ─── Popularity Sorting ─────────────────
    if (sortBy === "popularity") {
      events = await Event.aggregate([
        {
          $match: query,
        },

        {
          $addFields: {
            popularity: {
              $subtract: ["$capacity", "$availableSeats"],
            },
          },
        },

        {
          $sort: {
            popularity: order === "asc" ? 1 : -1,
            _id: 1,
          },
        },

        // Populate Category
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "categoryId",
          },
        },

        {
          $unwind: "$categoryId",
        },

        // Populate Organizer
        {
          $lookup: {
            from: "users",
            localField: "organizerId",
            foreignField: "_id",
            as: "organizerId",
          },
        },

        {
          $unwind: "$organizerId",
        },

        {
          $skip: skip,
        },

        {
          $limit: Number(limit),
        },
      ]);
    } else {
      // ─── Normal Sorting ───────────────────
      const sort = {};

      sort[sortBy] = order === "asc" ? 1 : -1;

      events = await Event.find(query)
        .populate("categoryId")
        .populate("organizerId")
        .sort({
          ...sort,
          _id: 1,
        })
        .skip(skip)
        .limit(Number(limit));
    }

    const total = await Event.countDocuments(query);
    return res.status(200).json({
      events,

      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getFeaturedEvents = async (req, res) => {
  try {
    const now = new Date();

    const events = await Event.find({
      endDate: { $gt: now },
      status: "active",
    })
      .sort({ availableSeats: 1 })
      .limit(3)
      .select(
        " +_id +title  +imageUrl   +location +startDateTime +endDateTime +price +status",
      );

    res.status(200).json({
      message: "Featured events fetched successfully",
      events,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const getUpcomingEvents = async (req, res) => {
  try {
    const now = new Date();

    const events = await Event.find({
      startDate: { $gt: now },
      status: "active",
    })
      .sort({ startDate: 1 })
      .limit(2)
      .select(
        " +_id +title  +imageUrl   +location +startDateTime +endDateTime +price +status",
      );

    res.status(200).json({
      message: "Upcoming events fetched successfully",
      events,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id })
      .populate("categoryId")
      .populate("organizerId");
    res.status(200).json({ event });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const organizerId = req.user._id;

    const {
      title,
      description,
      imageUrl,
      categoryId,
      location,
      startDateTime,
      endDateTime,
      price,
      capacity,
      currency,
    } = req.body;

    const event = await Event.create({
      title,
      description,
      imageUrl,
      categoryId,
      organizerId,
      location,
      startDateTime,
      endDateTime,
      price,
      capacity,
      availableSeats: capacity,
      currency,
      status: "published",
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateEvent = async (req, res) => {
  const ALLOWED_FIELDS = [
    "title",
    "description",
    "categoryId",
    "location",
    "startDateTime",
    "endDateTime",
    "price",
    "status",
    "imageUrl",
  ];
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.organizerId.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ message: "you are not authorized to edit this event" });
    }

    //cannot edit event if it is already started
    if (new Date(event.startDateTime) < new Date()) {
      return res.status(400).json({ message: "Past events cannot be edited" });
    }

    // Build update object
    const updates = Object.fromEntries(
      ALLOWED_FIELDS.filter((f) => req.body[f] !== undefined).map((f) => [
        f,
        req.body[f],
      ]),
    );

    // Capacity logic
    if (req.body.capacity !== undefined) {
      const bookingsCount = await Booking.countDocuments({
        eventId: id,
        status: { $ne: "cancelled" },
      });
      const availableSeats = req.body.capacity - bookingsCount;
      if (availableSeats < 0)
        return res
          .status(400)
          .json({ message: "Capacity below existing bookings" });

      updates.capacity = req.body.capacity;
      updates.availableSeats = availableSeats;
    }

    // Cancel cascade
    if (req.body.status === "cancelled" && event.status !== "cancelled") {
      await Booking.updateMany(
        { eventId: id },
        { $set: { status: "cancelled" } },
      );
      updates.availableSeats = 0;
    }
    if (req.body.status === "cancelled" && event.status === "cancelled"){
      return res.status(400).json({ message: "Event already cancelled" });
    } 

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true },
    );
    return res.status(200).json(updatedEvent);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.organizerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "you are not authorized to delete this event" });
    }
    const bookingsCount = await Booking.countDocuments({
      eventId: req.params.id,
      status: {
        $nin: ["cancelled", "refunded"],
      },
    });
    if (bookingsCount > 0) {
      return res
        .status(400)
        .json({ message: "Event has bookings, cannot delete" });
    }
    await Event.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
