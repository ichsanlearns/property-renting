import { resend } from "../../lib/resend.lib.js";

export const sendEmail = async ({ to, subject, html }: { to: string; subject: string; html: string }) => {
  return resend.emails.send({
    from: `SewaHunian <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  });
};
