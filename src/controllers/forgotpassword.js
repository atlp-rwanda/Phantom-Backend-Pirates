import jwt from 'jsonwebtoken'
import { Employee } from '../../models'
import nodemailer from 'nodemailer'

// Setting a transporter
const transporter = nodemailer.createTransport({
  // host and port for MailHog
  host: process.env.TRANSPORTER_HOST,
  port: process.env.TRANSPORTER_PORT
})

// forgotpassword controller function
const forgotpassword = (req, res) => {
  const { email } = req.body
  // Responses for translations
  const responseNoUserAvailable = req.t('forgot_password.failure')
  const responseUserAvailable = req.t('forgot_password.success')
  Employee.findOne({
    where: {
      email: email
    }
  }).then((user) => {
    if (!user) {
      res.status(400).json({
        status: 400,
        message: `${responseNoUserAvailable}`
      })
    } else {
      // Generating Token for resetting password
      const resetToken = jwt.sign({ email: email }, process.env.RESET_SECRET, { expiresIn: process.env.RESET_TOKEN_EXPIRES })
      res.cookie('jwt', resetToken, { httpOnly: true, expiresIn: process.env.RESET_TOKEN_EXPIRES })

      // Reset password url
      const url = `${process.env.BASE_URL}/reset/${resetToken}`

      // Email
      transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Reset your password',
        html: `Click <a href="${url}">here</a> to reset your password. This is your reset token ${resetToken}`
      })
      res.status(200).json({
        status: 200,
        message: `${responseUserAvailable}`

      })
    }
  }).catch((err) => {
    console.log(err)
  })
}

export default forgotpassword
