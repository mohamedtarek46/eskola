
import "../config/enviroment.js";

import mongoose from "mongoose";
// Import models
import Booking from "./models/Booking.js";
import Category from "./models/Category.js";
import Event from "./models/Event.js";
import User from "./models/User.js";

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;
// const MONGODB_URI = "mongodb+srv://mtarekmo21:MxCGg3zHPLaOrFDu@cluster0.xpqyu.mongodb.net/Eskola2?retryWrites=true&w=majority&appName=Cluster0" 

// Helper function to generate random number between min and max
const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Fixed password (hashed "123456")
const FIXED_PASSWORD = "$2b$10$A03IjrP6C5GnrH.8VOIQD.WTlEW/krhj1gUKMej3.r1BmUGc4CpGS";

// Image URL generator
const getRandomImage = () => {
  //https://picsum.photos/600/400?5
  const randomSeed =  randomBetween(1, 10000);
  return `https://picsum.photos/600/400?${randomSeed}}`;
};

// Categories (5 categories)
const categories = [
  { name: "Music", slug: "music" },
  { name: "Business", slug: "business" },
  { name: "Technology", slug: "technology" },
  { name: "Art", slug: "art" },
  { name: "Sports", slug: "sports" },
];

// Users (2 organizers, 2 regular users)
const users = [
  // Organizers
  { firstName: "John", lastName: "Smith", email: "john.smith@events.com", role: "organizer" },
  { firstName: "Sarah", lastName: "Johnson", email: "sarah.johnson@events.com", role: "organizer" },
  
  // Regular users
  { firstName: "Alice", lastName: "Wonder", email: "alice@example.com", role: "user" },
  { firstName: "Bob", lastName: "Marley", email: "bob@example.com", role: "user" },
];

// Generate events (5 events total)
const generateEvents = (organizers, categories) => {
  const events = [];
  
  // Event data with specific dates to ensure past, present, and future events
  const now = new Date();
  const pastDate1 = new Date(now);
  pastDate1.setMonth(now.getMonth() - 9); // 9 months ago
  
  const pastDate2 = new Date(now);
  pastDate2.setMonth(now.getMonth() - 5); // 5 month ago
  
  const presentDate = new Date(now);
  presentDate.setDate(now.getDate() + 10); // 10 days from now
  
  const futureDate1 = new Date(now);
  futureDate1.setMonth(now.getYear() + 2); // 2 Years from now
  
  const futureDate2 = new Date(now);
  futureDate2.setMonth(now.getMonth() + 10); // 10 months from now
  
  const eventData = [
    {
      title: "Summer Music Festival 2024",
      description: "Experience the best live music performances from top artists around the world. Three days of non-stop entertainment, food, and fun!",
      category: "Music",
      organizer: organizers[0], // John Smith
      city: "Los Angeles",
      country: "USA",
      address: "123 Hollywood Blvd",
      startDateTime: pastDate1,
      endDateTime: new Date(pastDate1.getTime() + 3 * 24 * 60 * 60 * 1000),
      price: 150,
      capacity: 200,
      status: "completed",
      currency: "USD",
    },
    {
      title: "Business Leadership Summit",
      description: "Join industry leaders and experts to learn about the latest trends in business management, leadership strategies, and networking opportunities.",
      category: "Business",
      organizer: organizers[1], // Sarah Johnson
      city: "New York",
      country: "USA",
      address: "500 Wall Street",
      startDateTime: pastDate2,
      endDateTime: new Date(pastDate2.getTime() + 2 * 24 * 60 * 60 * 1000),
      price: 299,
      capacity: 150,
      status: "completed",
      currency: "USD",
    },
    {
      title: "Tech Innovation Conference 2024",
      description: "Discover cutting-edge technologies, attend workshops, and network with tech professionals from around the globe.",
      category: "Technology",
      organizer: organizers[0], // John Smith
      city: "San Francisco",
      country: "USA",
      address: "1000 Market Street",
      startDateTime: presentDate,
      endDateTime: new Date(presentDate.getTime() + 2 * 24 * 60 * 60 * 1000),
      price: 399,
      capacity: 300,
      status: "published",
      currency: "USD",
    },
    {
      title: "International Art Exhibition",
      description: "Showcasing contemporary art from emerging and established artists. Paintings, sculptures, and digital art installations.",
      category: "Art",
      organizer: organizers[1], // Sarah Johnson
      city: "Chicago",
      country: "USA",
      address: "750 Michigan Avenue",
      startDateTime: futureDate1,
      endDateTime: new Date(futureDate1.getTime() + 5 * 24 * 60 * 60 * 1000),
      price: 50,
      capacity: 100,
      status: "published",
      currency: "USD",
    },
    {
      title: "World Sports Championship",
      description: "Watch top athletes compete in various sports including basketball, soccer, and tennis.",
      category: "Sports",
      organizer: organizers[0], // John Smith
      city: "Houston",
      country: "USA",
      address: "2000 Stadium Drive",
      startDateTime: futureDate2,
      endDateTime: new Date(futureDate2.getTime() + 4 * 24 * 60 * 60 * 1000),
      price: 85,
      capacity: 500,
      status: "published",
      currency: "USD",
    },
  ];
  
  // Create events with proper category IDs
  for (const data of eventData) {
    const category = categories.find(c => c.name === data.category);
    if (category) {
      events.push({
        title: data.title,
        description: data.description,
        imageUrl: getRandomImage(),
        categoryId: category._id,
        organizerId: data.organizer._id,
        location: {
          city: data.city,
          address: data.address,
          country: data.country,
          coordinates: {
            latitude: (Math.random() * 180 - 90).toFixed(6),
            longitude: (Math.random() * 360 - 180).toFixed(6),
          }
        },
        startDateTime: data.startDateTime,
        endDateTime: data.endDateTime,
        price: data.price,
        capacity: data.capacity,
        availableSeats: data.capacity,
        currency: data.currency,
        status: data.status,
      });
    }
  }
  
  return events;
};

// Generate exactly 10 diverse bookings
const generateBookings = (users, events) => {
  const bookings = [];
  let bookingCounter = 1;
  
  // Define exactly 10 diverse bookings
  const bookingsData = [
    // Event 1: Summer Music Festival (completed event - all confirmed)
    {
      eventIndex: 0,
      userIndex: 0, // Alice
      seats: 2,
      status: "confirmed",
      paymentStatus: "paid"
    },
    {
      eventIndex: 0,
      userIndex: 1, // Bob
      seats: 3,
      status: "confirmed",
      paymentStatus: "paid"
    },
    
    // Event 2: Business Leadership Summit (completed event - all confirmed)
    {
      eventIndex: 1,
      userIndex: 0, // Alice
      seats: 1,
      status: "confirmed",
      paymentStatus: "paid"
    },
    {
      eventIndex: 1,
      userIndex: 1, // Bob
      seats: 2,
      status: "confirmed",
      paymentStatus: "paid"
    },
    
    // Event 3: Tech Innovation Conference (future event - mixed statuses)
    {
      eventIndex: 2,
      userIndex: 0, // Alice
      seats: 2,
      status: "confirmed",
      paymentStatus: "paid"
    },
    {
      eventIndex: 2,
      userIndex: 1, // Bob
      seats: 1,
      status: "cancelled",
      paymentStatus: "paid"
    },
    {
      eventIndex: 2,
      userIndex: 0, // Alice
      seats: 3,
      status: "confirmed",
      paymentStatus: "paid"
    },
    
    // Event 4: International Art Exhibition (future event - mixed statuses)
    {
      eventIndex: 3,
      userIndex: 1, // Bob
      seats: 2,
      status: "confirmed",
      paymentStatus: "paid"
    },
    {
      eventIndex: 3,
      userIndex: 0, // Alice
      seats: 1,
      status: "confirmed",
      paymentStatus: "paid"
    },
    
    // Event 5: World Sports Championship (future event - includes cancelled)
    {
      eventIndex: 4,
      userIndex: 1, // Bob
      seats: 3,
      status: "confirmed",
      paymentStatus: "paid"
    },
    {
      eventIndex: 4,
      userIndex: 0, // Alice
      seats: 2,
      status: "cancelled",
      paymentStatus: "refunded"
    },
  ];
  
  // Create bookings according to the data
  for (const data of bookingsData) {
    const event = events[data.eventIndex];
    const user = users[data.userIndex];
    const totalAmount = event.price * data.seats;
    
    const bookingReference = `BK-${new Date().getFullYear()}-${String(bookingCounter).padStart(6, '0')}`;
    
    bookings.push({
      eventId: event._id,
      userId: user._id,
      numberOfSeats: data.seats,
      totalAmount: totalAmount,
      status: data.status,
      paymentStatus: data.paymentStatus,
      bookingReference: bookingReference,
    });
    
    bookingCounter++;
  }
  
  // Update each event's available seats (only count confirmed bookings)
  for (const event of events) {
    const confirmedBookingsForEvent = bookings.filter(
      b => b.eventId.toString() === event._id.toString() && b.status === "confirmed"
    );
    const totalConfirmedSeats = confirmedBookingsForEvent.reduce((sum, b) => sum + b.numberOfSeats, 0);
    event.availableSeats = event.capacity - totalConfirmedSeats;
  }
  
  return bookings;
};

// Seed the database
async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
    
    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Event.deleteMany({});
    await Booking.deleteMany({});
    console.log("🗑️ Cleared existing data");
    
    // Insert categories
    const insertedCategories = await Category.insertMany(categories);
    console.log(`📁 Inserted ${insertedCategories.length} categories: ${insertedCategories.map(c => c.name).join(", ")}`);
    
    // Insert users
    const usersWithPassword = users.map(user => ({
      ...user,
      password: FIXED_PASSWORD,
    }));
    const insertedUsers = await User.insertMany(usersWithPassword);
    console.log(`👥 Inserted ${insertedUsers.length} users`);
    console.log(`   Organizers: ${insertedUsers.filter(u => u.role === "organizer").map(u => u.firstName + " " + u.lastName).join(", ")}`);
    console.log(`   Regular users: ${insertedUsers.filter(u => u.role === "user").map(u => u.firstName + " " + u.lastName).join(", ")}`);
    
    // Separate organizers and regular users
    const organizers = insertedUsers.filter(user => user.role === "organizer");
    const regularUsers = insertedUsers.filter(user => user.role === "user");
    
    // Generate and insert events
    const generatedEvents = generateEvents(organizers, insertedCategories);
    const insertedEvents = await Event.insertMany(generatedEvents);
    console.log(`🎉 Inserted ${insertedEvents.length} events`);
    
    // Generate and insert bookings (exactly 10)
    const generatedBookings = generateBookings(regularUsers, insertedEvents);
    const insertedBookings = await Booking.insertMany(generatedBookings);
    console.log(`🎟️ Inserted ${insertedBookings.length} bookings`);
    
    // Update events with correct available seats
    for (const event of insertedEvents) {
      await event.save();
    }
    
    // Display detailed statistics
    console.log("\n" + "=".repeat(60));
    console.log("📊 SEEDING COMPLETED SUCCESSFULLY");
    console.log("=".repeat(60));
    
    console.log(`\n📈 STATISTICS:`);
    console.log(`   • Categories: ${insertedCategories.length}`);
    console.log(`   • Users: ${insertedUsers.length} (${organizers.length} organizers, ${regularUsers.length} users)`);
    console.log(`   • Events: ${insertedEvents.length}`);
    console.log(`   • Bookings: ${insertedBookings.length}`);
    
    console.log(`\n📅 EVENT DETAILS:`);
    const now = new Date();
    for (const event of insertedEvents) {
      const confirmedBookings = insertedBookings.filter(
        b => b.eventId.toString() === event._id.toString() && b.status === "confirmed"
      );
      const totalBookedSeats = confirmedBookings.reduce((sum, b) => sum + b.numberOfSeats, 0);
      const isPast = event.startDateTime < now;
      
      console.log(`\n   🎯 "${event.title}"`);
      console.log(`      • Category: ${insertedCategories.find(c => c._id.toString() === event.categoryId.toString())?.name}`);
      console.log(`      • Date: ${event.startDateTime.toLocaleDateString()} - ${event.endDateTime.toLocaleDateString()}`);
      console.log(`      • Location: ${event.location.city}, ${event.location.country}`);
      console.log(`      • Capacity: ${event.capacity} seats`);
      console.log(`      • Booked (confirmed): ${totalBookedSeats} seats (${Math.round(totalBookedSeats/event.capacity*100)}%)`);
      console.log(`      • Available: ${event.availableSeats} seats`);
      console.log(`      • Status: ${event.status} ${isPast ? '(Past Event)' : '(Future Event)'}`);
      console.log(`      • Price: $${event.price}`);
    }
    
    console.log(`\n🎟️ BOOKING DETAILS (${insertedBookings.length} total):`);
    const confirmedBookings = insertedBookings.filter(b => b.status === "confirmed");
    const pendingBookings = insertedBookings.filter(b => b.status === "pending");
    const cancelledBookings = insertedBookings.filter(b => b.status === "cancelled");
    
    console.log(`   • Confirmed: ${confirmedBookings.length} bookings`);
    console.log(`   • Pending: ${pendingBookings.length} bookings`);
    console.log(`   • Cancelled: ${cancelledBookings.length} bookings`);
    
    console.log(`\n   Booking List:`);
    insertedBookings.forEach((booking, index) => {
      const event = insertedEvents.find(e => e._id.toString() === booking.eventId.toString());
      const user = insertedUsers.find(u => u._id.toString() === booking.userId.toString());
      console.log(`   ${index + 1}. ${user.firstName} ${user.lastName} - ${event.title}: ${booking.numberOfSeats} seats (${booking.status}) - $${booking.totalAmount}`);
    });
    
    console.log(`\n💳 PAYMENT SUMMARY:`);
    const paidCount = insertedBookings.filter(b => b.paymentStatus === "paid").length;
    const pendingPaymentCount = insertedBookings.filter(b => b.paymentStatus === "pending").length;
    const refundedCount = insertedBookings.filter(b => b.paymentStatus === "refunded").length;
    
    console.log(`   • Paid: ${paidCount} bookings`);
    console.log(`   • Pending Payment: ${pendingPaymentCount} bookings`);
    console.log(`   • Refunded: ${refundedCount} bookings`);
    
    console.log(`\n📊 SEATS DISTRIBUTION:`);
    let totalConfirmedSeats = 0;
    for (const event of insertedEvents) {
      const confirmedForEvent = insertedBookings.filter(
        b => b.eventId.toString() === event._id.toString() && b.status === "confirmed"
      );
      const seats = confirmedForEvent.reduce((sum, b) => sum + b.numberOfSeats, 0);
      totalConfirmedSeats += seats;
      console.log(`   • ${event.title}: ${seats}/${event.capacity} confirmed seats (${Math.round(seats/event.capacity*100)}% booked)`);
    }
    console.log(`   • TOTAL CONFIRMED SEATS: ${totalConfirmedSeats}`);
    
    console.log(`\n✅ Database seeding completed!`);
    console.log("=".repeat(60));
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from MongoDB");
  }
}

// Run the seed function
seedDatabase();
