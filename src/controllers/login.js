import { User } from '../../models'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const login = ('/login', (req, res) => {
  const { email, password } = req.body
  User.findOne({
    where: {
      email
    }
  }).then(user => {
    if (!user) {
      res.status(400).json({
        error: 'The email is not registered! Please first register'
      })
    } else {
      const userRole = {
        isAdmin: false,
        isOperator: true,
        isDriver: false
      }
      if ((bcrypt.compareSync(password, user.password)) && userRole.isAdmin) {
        const adminToken = jwt.sign({ user: user }, process.env.ADMIN_SECRET, {
          expiresIn: process.env.AUTH_EXPIRES
        })
        res.cookie('jwt', adminToken, { httpOnly: true, expiresIn: process.env.AUTH_EXPIRES })
        res.status(200).json({
          message: 'Admin successfully logged in',
          admin: [user.name, user.email],
          token: adminToken
        })
      } else if ((bcrypt.compareSync(password, user.password)) && userRole.isOperator) {
        const operatorToken = jwt.sign({ user: user }, process.env.OPERATOR_SECRET, {
          expiresIn: process.env.AUTH_EXPIRES
        })
        res.cookie('jwt', operatorToken, { httpOnly: true, expiresIn: process.env.AUTH_EXPIRES })
        res.status(200).json({
          message: 'Operator successfully logged in',
          operator: [user.name, user.email],
          token: operatorToken
        })
      } else if ((bcrypt.compareSync(password, user.password)) && userRole.isDriver) {
        const driverToken = jwt.sign({ user: user }, process.env.DRIVER_SECRET, {
          expiresIn: process.env.AUTH_EXPIRES
        })
        res.cookie('jwt', driverToken, { httpOnly: true, expiresIn: process.env.AUTH_EXPIRES })
        res.status(200).json({
          message: 'Driver successfully logged in',
          driver: [user.name, user.email],
          token: driverToken
        })
      } else {
        res.status(401).json({
          error: "The passwords entered don't match"
        })
      }
    }
  }).catch(err => { res.status(500).json(err) })
}
)
export default login
