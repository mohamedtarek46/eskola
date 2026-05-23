import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
    tls: {
    rejectUnauthorized: false, 
  }
});

const sendEmail = async ({ to, eventName, seats, totalPrice }) => {
  const subject = `Booking Confirmed 🎉 - ${eventName}`;

  const text = `
Your booking is confirmed successfully 🎉

Event: ${eventName}


Seats booked: ${seats}
Total price: ${totalPrice} 

Thank you for choosing us ❤️
We hope you enjoy your event!
  `;

  await transporter.sendMail({
    from: `"Event Booking System" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};

export default sendEmail;
