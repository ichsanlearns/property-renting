import { sendEmail } from "./email/email.service.js";

export const sendBookingConfirmedEmail = async ({ to, name, property, checkIn, checkOut }: any) => {
  await sendEmail({
    to,
    subject: "Booking Confirmed 🎉",
    html: `
      <h2>Hello ${name}</h2>

      <p>Your booking has been confirmed.</p>

      <p><b>Property:</b> ${property}</p>
      <p><b>Check-in:</b> ${new Date(checkIn).toDateString()}</p>
      <p><b>Check-out:</b> ${new Date(checkOut).toDateString()}</p>

      <hr/>

      <p>Please bring valid ID card.</p>
      <p>No smoking inside the room.</p>
      <p>Enjoy your stay ✨</p>
    `,
  });
};

export const sendCheckinReminderEmail = async ({ to, name, property, checkIn }: any) => {
  await sendEmail({
    to,
    subject: "Reminder: Your stay starts tomorrow 🏡",
    html: `
      <h2>Hello ${name}</h2>

      <p>This is a reminder for your upcoming stay.</p>

      <p><b>Property:</b> ${property}</p>
      <p><b>Check-in:</b> ${new Date(checkIn).toDateString()}</p>

      <p>Please arrive on time and prepare your trip.</p>

      <p>See you soon ✨</p>
    `,
  });
};
