import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const adminToken = req.headers.authorization.split(' ')[1];
  if (!adminToken) {
    return res.status(400).json({
      message: 'Access Denied!, Only Admin can perform this task'
    })
  }

  try {
    const verified = jwt.verify(adminToken, `${process.env.ADMIN_SECRET}`)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({
      message: 'Invalid Token'
    })
  }
}
