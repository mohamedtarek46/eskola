import Event from "../models/Event.js";
import Booking from "../models/Booking.js";
import ExcelJS from "exceljs";

export const getOrganizerDashboard = async (req, res) => {
  try {
    const organizerId = req.user._id;

    // 1️⃣ Events
    const events = await Event.find({ organizerId }).sort({ createdAt: -1 });

    const totalEvents = events.length;
    const activeEvents = events.filter((e) => e.status === "published").length;

    // 2️⃣ Bookings (through events)
    const eventIds = events.map((e) => e._id);

    const bookings = await Booking.find({
      eventId: { $in: eventIds },
    })
      .populate("userId", "firstName lastName")
      .populate("eventId", "title")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;

    const revenue = bookings.reduce((sum, b) => {
 
      if (b.status === "confirmed" && b.paymentStatus === "paid") {
        return sum + (b.totalAmount || 0);
      } else {
        return sum;
      }
   
    }, 0);

    // 3️⃣ recent bookings
    const recentBookings = bookings.slice(0, 7);

    res.json({
      stats: {
        totalEvents,
        activeEvents,
        totalBookings,
        revenue,
      },
      recentBookings,
      events,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrganizerEvents = async (req, res) => {
  try {
    const organizerId = req.user._id;

    const events = await Event.find({ organizerId })
      .sort({ createdAt: -1 })
      .populate("categoryId", "name slug");

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEventBookings = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, search } = req.query;
    // check event exists
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // owner check
    if (event.organizerId.toString() !== req.user._id) {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }
    // build query
    const query = {
      eventId: id,
    };

    // status filter
    if (status) {
      query.status = status;
    }

    let bookings = await Booking.find(query)
      .populate("userId", "firstName lastName email")
      .populate("eventId", "title availableSeats capacity")
      .sort({ createdAt: -1 });

    // attendee search
    if (search) {
      const searchLower = search.toLowerCase();
      bookings = bookings.filter((booking) => {
        const user = booking.userId;

        return (
          user?.firstName?.toLowerCase().includes(searchLower) ||
          user?.lastName?.toLowerCase().includes(searchLower) ||
          user?.email?.toLowerCase().includes(searchLower)
        );
      });
    }

    return res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const exportEventBookingsExcel = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, search } = req.query;

    // check event exists
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    // owner check
    if (event.organizerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }

    // build query
    const query = {
      eventId: id,
    };

    if (status) {
      query.status = status;
    }

    let bookings = await Booking.find(query)
      .populate("userId", "firstName lastName email")
      .sort({ createdAt: -1 });

    // search filter
    if (search) {
      const searchLower = search.toLowerCase();

      bookings = bookings.filter((booking) => {
        const user = booking.userId;

        return (
          user?.firstName?.toLowerCase().includes(searchLower) ||
          user?.lastName?.toLowerCase().includes(searchLower) ||
          user?.email?.toLowerCase().includes(searchLower)
        );
      });
    }

    // create workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Bookings");

    // columns
    worksheet.columns = [
      { header: "Booking Ref", key: "bookingReference", width: 25 },
      { header: "First Name", key: "firstName", width: 20 },
      { header: "Last Name", key: "lastName", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Seats", key: "numberOfSeats", width: 10 },
      { header: "Total Amount", key: "totalAmount", width: 15 },
      { header: "Status", key: "status", width: 15 },
      { header: "Payment Status", key: "paymentStatus", width: 18 },
      { header: "Booked At", key: "createdAt", width: 25 },
    ];

    // add rows
    bookings.forEach((booking) => {
      worksheet.addRow({
        bookingReference: booking.bookingReference,
        firstName: booking.userId?.firstName,
        lastName: booking.userId?.lastName,
        email: booking.userId?.email,
        numberOfSeats: booking.numberOfSeats,
        totalAmount: booking.totalAmount,
        status: booking.status,
        paymentStatus: booking.paymentStatus,
        createdAt: booking.createdAt.toLocaleString(),
      });
    });

    // style header
    worksheet.getRow(1).font = {
      bold: true,
    };

    // response headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=event-bookings.xlsx`,
    );

    await workbook.xlsx.write(res);

    res.end();
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
