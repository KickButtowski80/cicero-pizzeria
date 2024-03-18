
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
  const info = await transporter.sendMail({
    from:  ` Maddison Foo Koch ${name}👻 <${email}>`, 
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


  
