// export function GET(request) {
//     console.log(request)
//     return new Response(`Hello from I am really ${process.env.VERCEL_REGION}`);
//   }

const nodemailer = require("nodemailer");

export default (request, response) => {
  // if (request.method !== 'POST') {
  //   return response.status(Status.BAD_REQUEST).send('');
  // }
  // const name = request?.body?.name ?? 'world';
  // return response.json({
  //   data: `hello ${name}`,
  // });

 
const {name, email, subject, message} =  request.body;
 
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "pazpaz25@gmail.com",
    pass: process.env.GOOGLE_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch `${name}`👻" <`${email}>', // sender address
    to: "pazpaz25@gmail.com", // list of receivers
    subject: `${subject} 😄`, // Subject line
    text: `${message}`, // plain text body
    html: `<b>${message}?</b>`, // html body
  });
 
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
 
main().catch(console.error);

};


  
