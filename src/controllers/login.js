import { User } from '../../models'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const login =
  ('/',
  (req, res) => {
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
    User.findOne({
      where: {
        email
      }
    })
      .then((user) => {
        if (!user) {
          res.status(400).json({
            error: `${responseUnsuccessNonregistered}`
          })
        } else {
          const userRole = {
            isAdmin: false,
            isOperator: true,
            isDriver: false
          }
          if (bcrypt.compareSync(password, user.password) && userRole.isAdmin) {
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
              admin: [user.name, user.email],
              adminToken
            })
          } else if (
            bcrypt.compareSync(password, user.password) &&
            userRole.isOperator
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
              operator: [user.name, user.email],
              operatorToken
            })
          } else if (
            bcrypt.compareSync(password, user.password) &&
            userRole.isDriver
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
              driver: [user.name, user.email],
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
        res.status(500).json(err)
      })
  })
export default login
