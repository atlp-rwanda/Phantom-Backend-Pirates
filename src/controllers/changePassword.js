import bcrypt from 'bcrypt'
import { Employee } from '../../models/'
import dotenv from 'dotenv'

dotenv.config()

// Change Password Function
const changePassword = (req, res) => {
  /*********
   * Translations of the messages to be displayes
   * ******/
  const responseChangePswSuccessfully = req.t('changePassword.success')
  const responseChangePswNoUser = req.t('changePassword.failure.noUser')
  const responseChangePswMissmatch = req.t('changePassword.failure.pwdMissmatch')
  const responseChangePswIncorrectPassword = req.t('changePassword.failure.wrongPsw')

  /*****
  To change the password a user will be required to provide
  email, old password, new password and confirm new password
  ******/
  const { email, oldPassword, newPassword, passwordConfirm } = req.body
  return Employee.findOne({
    where: {
      email: email
    }
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: `${responseChangePswNoUser}`
        })
      } else if (user) {
        // Compare password and check if the new password matches with the confirm new password
        if ((bcrypt.compareSync(oldPassword, user.password)) && (newPassword === passwordConfirm)) {
          // Changed Hashed Password and user saved
          user.password = bcrypt.hashSync(newPassword, Number.parseInt(process.env.SALT_ROUNDS))
          user.save()
          return res.status(200).json({
            status: 200,
            message: `${responseChangePswSuccessfully}`
          })
          // If new password doesn't match with the confirm password
        } else if ((bcrypt.compareSync(oldPassword, user.password)) && (newPassword !== passwordConfirm)) {
          return res.status(400).json({
            status: 400,
            message: `${responseChangePswMissmatch}`
          })
          // If the old password does not match with the password in the database
        } else if (!(bcrypt.compareSync(oldPassword, user.password))) {
          return res.status(400).json({
            status: 400,
            message: `${responseChangePswIncorrectPassword}`
          })
          // Failure to change password
        }
      }
    })
    .catch((err) => {
      return res.status(404).json(err)
    })
}
export default changePassword
