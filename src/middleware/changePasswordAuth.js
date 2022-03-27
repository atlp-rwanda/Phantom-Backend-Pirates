import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const changePassword = (req, res, next) => {
  /*********
   * Translations of the messages to be displayes
   * ******/
  const responseChangePswTokenRequired = req.t('changePassword.failure.tokenRequired')
  const responseChangePswInvalidToken = req.t('changePassword.failure.invalidToken')
  // fetching token from req.params
  const changePasswordToken = req.cookies.jwt

  // check jwt exists and is verified
  if (!changePasswordToken) {
    return res.status(404).json({
      message: `${responseChangePswTokenRequired}`
    })
  }
  try {
    const verified = jwt.verify(changePasswordToken, process.env.ADMIN_SECRET)
    req.user = verified
    next()
  } catch (error) {
    try {
      const verified = jwt.verify(changePasswordToken, process.env.OPERATOR_SECRET)
      req.user = verified
      next()
    } catch (error) {
      try {
        const verified = jwt.verify(changePasswordToken, process.env.DRIVER_SECRET)
        req.user = verified
        next()
      } catch (error) {
        res.status(400).json({
          message: `${responseChangePswInvalidToken}`
        })
      }
    }
  }
}
export default changePassword
