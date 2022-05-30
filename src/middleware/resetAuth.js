import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const resetAuth = (req, res, next) => {
  // fetching token from req.params
  const resetToken = req.params.token

  // check jwt exists and is verified
  if (!resetToken) {
    res.status(404).json({
      message: 'A valid token is required'
    })
  } else {
    jwt.verify(resetToken, process.env.RESET_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(404).json({
          message: 'Invalid Token'
        })
      } else {
        next()
      }
    })
  }
}

export default resetAuth
