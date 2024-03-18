
const nodemailer = require("nodemailer");
require('dotenv').config()
export default (request, response) => {
  if (request.method !== 'POST') {
    return response.status(400).send('<h1>Bad Request </h1>');
  }

  const { name, email, subject, message } = request.body;
  if (!name || !email || !subject || !message) {

    return response.status(400).send('<h1>Error</h1> <p>all the fields are required</p><a href="#contact">go back</a>');
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
      const info = await transporter.sendMail({
        from: `${name} 🍕 <${email}>`,
        to: "pazpaz25@gmail.com",
        subject: `${subject} 😄`,
        text: `${message}`,
        html: `<b>${message}?</b>`,
      });

      console.log("Message sent: %s", info.messageId);
      response.status(200).send(`
  <head>
  <base href="../index.html">
</head>
  <h1>Go back</h1> <a href="#contact">go back</a>`)




    }

    main().catch(console.error);

  };



