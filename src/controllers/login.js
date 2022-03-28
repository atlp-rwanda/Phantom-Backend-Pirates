import { Employee, Role } from '../../models'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const login = (req, res) => {
  const { email, password } = req.body
  // Responses for translations
  const responseAdmin = req.t('login_message.onSuccess.admin')
  const responseOperator = req.t('login_message.onSuccess.operator')
  const responseDriver = req.t('login_message.onSuccess.driver')
  const responseUnsuccessNonregistered = req.t(
    'login_message.onFailure.nonregistered'
  )
  const responseUnsuccessWrongPass = req.t(
    'login_message.onFailure.wrongpassword'
  )
  Employee.findOne({
    where: {
      email: email
    },
    include: {
      model: Role
    }
  })
    .then((user) => {
      if (!user) {
        res.status(400).json({
          error: `${responseUnsuccessNonregistered}`
        })
      } else {
        if (
          bcrypt.compareSync(password, user.password) &&
          user.Role.role === 'admin'
        ) {
          const adminToken = jwt.sign(
            { user: user },
            process.env.ADMIN_SECRET,
            {
              expiresIn: process.env.AUTH_EXPIRES
            }
          )
          res.cookie('jwt', adminToken, {
            httpOnly: true,
            expiresIn: process.env.AUTH_EXPIRES
          })
          res.status(200).json({
            message: `${responseAdmin}`,
            admin: [user.firstname, user.email],
            adminToken
          })
        } else if (
          bcrypt.compareSync(password, user.password) &&
          user.Role.role === 'operator'
        ) {
          const operatorToken = jwt.sign(
            { user: user },
            process.env.OPERATOR_SECRET,
            {
              expiresIn: process.env.AUTH_EXPIRES
            }
          )
          res.cookie('jwt', operatorToken, {
            httpOnly: true,
            expiresIn: process.env.AUTH_EXPIRES
          })
          res.status(200).json({
            message: `${responseOperator}`,
            operator: [user.firstname, user.email],
            operatorToken
          })
        } else if (
          bcrypt.compareSync(password, user.password) &&
          user.Role.role === 'driver'
        ) {
          const driverToken = jwt.sign(
            { user: user },
            process.env.DRIVER_SECRET,
            {
              expiresIn: process.env.AUTH_EXPIRES
            }
          )
          res.cookie('jwt', driverToken, {
            httpOnly: true,
            expiresIn: process.env.AUTH_EXPIRES
          })
          res.status(200).json({
            message: `${responseDriver}`,
            driver: [user.firstname, user.email],
            driverToken
          })
        } else {
          res.status(401).json({
            error: `${responseUnsuccessWrongPass}`
          })
        }
      }
    })
    .catch((err) => {
      res.status(501).json(err)
    })
}
export default login
