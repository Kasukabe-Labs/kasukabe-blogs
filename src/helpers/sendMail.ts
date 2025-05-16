import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendMail = async (toEmail: string) => {
  try {
    await transporter.sendMail({
      from: `"Kasukabe CMS" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: "Welcome to Kasukabe Blog CMS",
      text: "Welcome to Kasukabe Blog CMS. Thank you for signing up. We are glad to have you!",
      html: `
    <h1>Welcome to Kasukabe Blog CMS</h1>
    <p>Thank you for signing up. We are glad to have you on board.</p>
    <p>Best regards,</p>
    <p>The Kasukabe Blog CMS Team</p>
  `,
    });

    console.log("✅ Email sent");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
