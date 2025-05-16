import nodemailer from "nodemailer";

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
    transporter.sendMail({
      to: toEmail,
      subject: "Welcome to Kasukabe Blog CMS",
      html: `
        <h1>Welcome to Kasukabe Blog CMS</h1>
        <p>Thank you for signing up. We are glad to have you on board.</p>
        <p>Best regards,</p>
        <p>The Kasukabe Blog CMS Team</p>
        <img src="" alt="Welcome Image" style="width: 100%; height: auto;"/>
        <p style="font-size: 12px; color: #888;">This is an automated message. Please do not reply.</p>`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
