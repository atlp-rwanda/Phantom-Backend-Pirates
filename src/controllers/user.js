import model from '../../server/models'
// import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import authConfig from '../../server/config/auth'

const { User } = model

class Users {
  // Registering a User
  static signUp (req, res) {
    const password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds))
    const { name, telNumber, email } = req.body
    return User
      .create({
        name,
        telNumber,
        email,
        password
      })
      .then(userData => {
        // const token = jwt.sign({ userData: User }, authConfig.secret, {
        //   expiresIn: authConfig.expires
        // })
        // res.cookie('jwt', token, { httpOnly: true, expiresIn: authConfig.expires })
        res.status(201).json({
          message: 'User successfully created',
          userData
        })
      }).catch(err => {
        res.status(500).json({
          success: false,
          message: 'User not created',
          err
        })
      })
  }

  // Getting all Users
  static allUsers (req, res) {
    return User.findAll().then((Users) => res.status(200).json(Users))
  }

  // Getting a single user by id
  static userById (req, res) {
    return User.findByPk(req.params.id).then((name, telNumber, email, password) =>
      res.status(200).json(name, telNumber, email, password)
    )
  }

  // Updating a User by id
  static updateUser (req, res) {
    const { name, telNumber, email, password } = req.body
    return User.findByPk(req.params.id)
      .then((User) => {
        User.update({
          name: name || User.title,
          telNumber: telNumber || User.title,
          email: email || User.title,
          password: password || User.title
        })
          .then((updatedUser) => {
            res.status(200).json({
              message: 'User updated successfully',
              data: {
                name: name || updatedUser.title,
                telNumber: telNumber || updatedUser.title,
                email: email || updatedUser.title,
                password: password || updatedUser.title
              }
            })
          })
          .catch((error) => res.status(400).json(error))
      })
      .catch((error) => res.status(400).json(error))
  }

  // Deleting a user by id
  static deleteUser (req, res) {
    return User.findByPk(req.params.id)
      .then((User) => {
        if (!User) {
          return res.status(400).json({
            message: 'User Not Found'
          })
        }
        return User.destroy()
          .then(() =>
            res.status(200).json({
              message: 'User deleted successfully'
            })
          )
          .catch((error) => res.status(400).json(error))
      })
      .catch((error) => res.status(400).json(error))
  }
}

export default Users
