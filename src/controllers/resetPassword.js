import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { Employee } from '../../models/'

dotenv.config()

// Reset password controller function
const resetPassword = async (req, res) => {
  const { password, passwordConfirm } = req.body
  const responseMismatchPasswords = req.t('reset_password.mismatchpasswords')
  const responseNoUserAvailable = req.t('reset_password.nouser')
  const responseTokenVerified = req.t('reset_password.token.success')
  const responseTokenNotVerified = req.t('reset_password.token.failure')
  if (password !== passwordConfirm) {
    return res.status(401).json({
      status: 401,
      message: `${responseMismatchPasswords}`
    })
  } else {
    const { email } = await req.body
    const user = await Employee.findOne({
      where: {
        email
      }
    })
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: `${responseNoUserAvailable}`
      })
    } else if (user) {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(req.body.password, salt)
      // save user and the password
      user.save()
      res.status(200).json({
        status: 200,
        message: `${responseTokenVerified}`
      })
    } else {
      res.status(404).json({
        status: 200,
        message: `${responseTokenNotVerified}`
      })
    }
  }
}

export default resetPassword
