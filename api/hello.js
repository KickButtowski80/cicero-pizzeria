
const nodemailer = require("nodemailer"); 
require('dotenv').config()
export default (request, response) => {
  if (request.method !== 'POST') {
    return response.status(Status.BAD_REQUEST).send('');
  }
  // const name = request?.body?.name ?? 'world';
  // return response.json({
  //   data: `hello ${name}`,
  // });

const {name, email, subject, message} =  request.body;
console.log(name,email, subject, message)
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
  
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from:  ` Maddison Foo Koch ${name}👻 <${email}>`, // sender address
    to: "pazpaz25@gmail.com", // list of receivers
    subject: `${subject} 😄`, // Subject line
    text: `${message}`, // plain text body
    html: `<b>${message}?</b>`, // html body
  });
 
  console.log("Message sent: %s", info.messageId);
  response.status(200).send(`
  <head>
  <base href="../index.html">
</head>
  <h1>Go back</h1> <a href="src/sections/contact.html">go back</a>`)
 
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

 
}
 
main().catch(console.error);

};


  
