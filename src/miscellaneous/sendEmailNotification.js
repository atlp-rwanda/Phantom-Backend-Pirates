import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import 'dotenv/config';

dotenv.config();
async function sendNotification(message, email) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.TRANSPORTER_HOST,
    port: process.env.TRANSPORTER_PORT,
    secure: process.env.SECURE, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter
    .sendMail({
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: 'Thank you for registering!!', // Subject line
      text: 'You have been added as an employee?', // plain text body
      html: message, // html body
    })
    .catch(console.error);

  // console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

export default sendNotification;
