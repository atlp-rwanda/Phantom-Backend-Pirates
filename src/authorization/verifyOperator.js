import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const token = req.header('authorization')
  if (!token) {
    return res
      .status(400)
      .json('Access Denied!, Only Admin and Operator can perform this task')
  }

  try {
    const verified = jwt.verify(token, `${process.env.OPERATOR_SECRET}`)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json('Invalid Token')
  }
}
