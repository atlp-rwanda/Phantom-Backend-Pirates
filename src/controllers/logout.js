import dotenv from 'dotenv'

dotenv.config()

const token = ''
const logout = (req, res) => {
  // Translation
  const logoutResponse = req.t('logout_success')
  // Generation of an empty string token to expire in a very short period
  res.status(200).json({
    status: 200,
    message: `${logoutResponse}`
  })
}

export default logout
