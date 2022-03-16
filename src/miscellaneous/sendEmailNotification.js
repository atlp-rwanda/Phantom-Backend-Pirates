import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()
import 'dotenv/config'
function sendNotification (message, email) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.TRANSPORTER_HOST,
      port: process.env.TRANSPORTER_PORT, // 587 //465
      secure: false, // milky8175@gmail.com
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })

    // send mail with defined transport object
    transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Thank you for registering!!',
      text: 'You have been added as an employee?',
      html: message // html body
    }, (err, info) => {
      if (err) {
        console.log(err)
        throw new Error('Unable to send Message')
      }
      console.log(info)
    })
  } catch (error) {
    console.log(error)
  }
}
export default sendNotification
