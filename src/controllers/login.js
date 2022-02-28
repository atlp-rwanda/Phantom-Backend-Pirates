import { User } from '../../server/models'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import authConfig from '../../server/config/auth'

const login = ('/login', (req, res) => {
  const { email, password } = req.body
  User.findOne({
    where: {
      email
    }
  }).then(user => {
    if (!user) {
      res.status(404).json({
        success: false,
        error: 'The email is not registered! Please first register'
      })
    } else {
      const userRole = {
        isAdmin: false,
        isOperator: true,
        isDriver: false
      }
      if ((bcrypt.compareSync(password, user.password)) && userRole.isAdmin) {
        const adminToken = jwt.sign({ user: user }, authConfig.adminSecret, {
          expiresIn: authConfig.expires
        })
        res.cookie('jwt', adminToken, { httpOnly: true, expiresIn: authConfig.expires })
        res.status(200).json({
          message: 'Admin successfully logged in',
          admin: [user.name, user.email],
          token: adminToken
        })
      } else if ((bcrypt.compareSync(password, user.password)) && userRole.isOperator) {
        const operatorToken = jwt.sign({ user: user }, authConfig.operatorSecret, {
          expiresIn: authConfig.expires
        })
        res.cookie('jwt', operatorToken, { httpOnly: true, expiresIn: authConfig.expires })
        res.status(200).json({
          message: 'Operator successfully logged in',
          operator: [user.name, user.email],
          token: operatorToken
        })
      } else if ((bcrypt.compareSync(password, user.password)) && userRole.isDriver) {
        const driverToken = jwt.sign({ user: user }, authConfig.driverSecret, {
          expiresIn: authConfig.expires
        })
        res.cookie('jwt', driverToken, { httpOnly: true, expiresIn: authConfig.expires })
        res.status(200).json({
          message: 'Driver successfully logged in',
          driver: [user.name, user.email],
          token: driverToken
        })
      } else {
        res.status(401).json({
          success: false,
          error: "The passwords entered don't match"
        })
      }
    }
  }).catch(err => { res.status(500).json(err) })
}
)
export default login
