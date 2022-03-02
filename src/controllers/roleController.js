import model from '../../models'

const { Role } = model

class Roles {
  static createRole (req, res, next) {
    const { role } = req.body

    return Role.findOrCreate({
      where: { role }
    })
      .then(([role, created]) => {
        created
          ? res.json({
            message: 'Role successfully created',
            role
          })
          : res.json({
            message: 'Role exist',
            role
          })
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json({
          message: 'Invalid input'
        })
      })
  }

  static allRoles (req, res) {
    return Role.findAll().then((roles) => {
      res.status(200).json(roles)
    })
  }

  static getSingleRole (req, res) {
    return Role.findByPk(req.params.roleId).then((role) =>
      res.status(200).json(role)
    )
  }

  static update (req, res) {
    const { role } = req.body
    return Role.findByPk(req.params.roleId)
      .then((Role) => {
        Role.update({
          role: role || Role.title
        })
          .then((updatedRole) => {
            res.status(200).json({
              message: 'Role updated successfully',
              data: {
                role: role || updatedRole.title
              }
            })
          })
          .catch((error) => res.status(400).json(error))
      })
      .catch((error) => res.status(400).json(error))
  }

  static delete (req, res) {
    return Role.findByPk(req.params.roleId)
      .then((Role) => {
        if (!Role) {
          return res.status(400).json({
            message: 'Role Not Found'
          })
        }
        return Role.destroy()
          .then(() =>
            res.status(200).json({
              message: 'Role successfully deleted'
            })
          )
          .catch((error) => res.status(400).json(error))
      })
      .catch((error) => res.status(400).json(error))
  }
}

export default Roles
