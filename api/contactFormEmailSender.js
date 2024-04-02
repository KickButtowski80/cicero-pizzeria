
const nodemailer = require("nodemailer");
require('dotenv').config()
export default (request, response) => {
  // if (request.method !== 'POST') {
  //   return response.status(400).json({
  //     message: 'bad request',
  //     success: false,
  //   });
  // }

  const { name, email, subject, message } = request.body;
  if (!name || !email || !subject || !message) {
    return  response.status(400).json( {data:request.body, 
      message: 'all the fields are required',
      success: false} )
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 586,
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
      response.status(200).json({
        message: `info of ${name} were successfully sent!`,
        success: true
      });
    } catch (error) {
      console.error("Error sending email:", error);
      response.status(504).json({
        message: 'An error occurred while sending the email',
        success: false
      });
    }
  }

  main().catch(console.error);
};

// };



