import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const token = req.cookies.jwt
  if (!token) {
    return res.status(400).json({
      message: 'Access Denied!, Only Admin can perform this task'
    })
  }

  try {
    const verified = jwt.verify(token, `${process.env.ADMIN_SECRET}`)
    req.user = verified
    next()
  } catch (error) {
    try {
      const verified = jwt.verify(token, `${process.env.OPERATOR_SECRET}`)
      req.user = verified
      next()
    } catch (error) {
      res.status(400).json({
        message: 'Invalid Token'
      })
    }
  }
}
