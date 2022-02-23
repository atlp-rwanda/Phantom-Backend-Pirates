import nodemailer from 'nodemailer'
import 'dotenv/config'
function sendNotification (message, email) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.TRANSPORTER_HOST,
      port: process.env.TRANSPORTER_PORT,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })

    // send mail with defined transport object
    transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'You are assigned a bus!!',
      text: 'You have been assigned a bus?',
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
