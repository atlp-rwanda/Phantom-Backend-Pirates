import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const profileAuth = (req, res, next) => {
  /*********
   * Translations of the messages to be displayes
   * ******/
  const profileAuthTokenRequired = req.t('profileAuth.failure.tokenRequired')
  const profileAuthInvalidToken = req.t('profileAuth.failure.invalidToken')
  // fetching token from req.params
  const profileAuthToken = req.cookies.jwt

  // check jwt exists and is verified
  if (!profileAuthToken) {
    return res.status(404).json({
      message: `${profileAuthTokenRequired}`
    })
  }
  try {
    const verified = jwt.verify(profileAuthToken, process.env.ADMIN_SECRET)
    req.user = verified
    next()
  } catch (error) {
    try {
      const verified = jwt.verify(profileAuthToken, process.env.OPERATOR_SECRET)
      req.user = verified
      next()
    } catch (error) {
      try {
        const verified = jwt.verify(profileAuthToken, process.env.DRIVER_SECRET)
        req.user = verified
        next()
      } catch (error) {
        res.status(400).json({
          message: `${profileAuthInvalidToken}`
        })
      }
    }
  }
}
export default profileAuth
