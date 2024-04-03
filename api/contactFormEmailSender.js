
const nodemailer = require("nodemailer");
require('dotenv').config()
export default (request, response) => {
  if (request.method !== 'POST') {
    return response.status(400).json({
      message: 'bad request',
      success: false,
    });
  }

  const { name, email, subject, message } = request.body;
  if (!name || !email || !subject || !message) {
    return response.status(400).json({
      data: request.body,
      message: 'all the fields are required',
      success: false
    })
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "pazpaz25@gmail.com",
      pass: process.env.GMAIL_PASS,
    },
  });



  async function main() {
    try {
      const info = await transporter.sendMail({
        from: `${name} 🍕 <${email}>`,
        to: "pazpaz25@gmail.com",
        subject: `${subject} 😄`,
        text: `${message}`,
        html: `<b>${message}?</b>`,
      });

      console.log("Message sent: %s", info.messageId);
    //   if (shouldRejectEmail()) {
    //     throw new Error("SMTP server rejected the email");
    // }

      response.status(200).json({
        message: `info of ${name} were successfully sent!`,
        success: true
      });
    } catch (error) {
      console.error("Error sending email:", error);
      response.status(500).json({
        message: 'An error occurred while sending the email',
        error: error.message,
        success: false
    });
    }
  }
  function shouldRejectEmail() {
    // Implement your rejection logic here
    // For example, you could randomly reject emails based on certain criteria
    return Math.random() < 0.5; // Reject 50% of emails
}
  main().catch(console.error);
};





