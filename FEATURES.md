# FEATURES.md

## Completed Features

### Authentication & Authorization
- User registration, login, and logout functionality
- JWT-based authentication
- Role-based access control (User / Organizer)
- Protected routes with automatic redirection for unauthorized users

---

### Event Management
- Full CRUD operations for events (Create, Read, Update, Delete)
- Event image upload using Cloudinary
- Event details page with full information
- Organizer dashboard to manage events

---

### Booking System
- Ticket booking system with seat selection
- Booking history for users
- Booking confirmation page
- Booking validation rules (availability checks)

---

### Search, Filter & Sorting
- Advanced filtering by:
  - City
  - Category
  - Price range
  - Date range
- Search functionality for events
- Debounced search for performance optimization
- Sorting by:
  - Date
  - Price
  - Popularity

---

### User Interface (UI/UX)
- Responsive home page with event showcase
- Events list page with filters and search
- Event detail page with booking form
- User profile page
- Organizer dashboard
- Mobile-responsive design across all pages

---

### State & UX Enhancements
- Loading states for all async operations
- Error handling and fallback UI
- Toast notifications for user actions
- Form validation with user-friendly messages
- Skeleton loaders for better UX

---

### Testing & Quality
- Unit tests implemented (>30% coverage)
- Custom hook tests (`useIsMobile.test.js`)
- Form submission tests (`submitForm.test.js`)
- Proper code structure and reusable components

---

### DevOps & Infrastructure
- Docker + Docker Compose setup for full project
- Backend, frontend, and MongoDB containerized
- Seed script for initial database data

---

## Bonus Features (Advanced / Extra Credit)

- Map integration for event locations (based on address)
- Email notifications for booking confirmations (Nodemailer)
- Export bookings to CSV/Excel (ExcelJS)
- Cloudinary image upload integration
- Database seeding script (`seed.js`) for quick project setup with demo data
---

## Not Implemented

- Admin dashboard (optional feature not included)
- Event reviews & ratings system
- Social sharing functionality