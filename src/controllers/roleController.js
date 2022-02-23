import model from '../../models'

const { Role } = model
const { Employee } = model

class Roles {
  static createRole (req, res, next) {
    const roleSuccessResponse = req.t('role_message.created_success')
    const roleExistResponse = req.t('role_message.role_exist')
    const roleFailedResponse = req.t('role_message.creation_failed')
    const { role } = req.body

    return Role.findOrCreate({
      where: { role }
    })
      .then(([role, created]) => {
        created
          ? res.json({
            message: `${roleSuccessResponse}`,
            role
          })
          : res.json({
            message: `${roleExistResponse}`,
            role
          })
      })
      .catch((err) => {
        res.status(400).json({
          message: `${roleFailedResponse}`,
          err
        })
      })
  }

  static allRoles (req, res) {
    return Role.findAll().then((roles) => {
      res.status(200).json(roles)
    })
  }

  static getSingleRole (req, res) {
    const roleNotFoundResponse = req.t('role_message.id_not_found')
    return Role.findByPk(req.params.roleId)
      .then((role) => {
        if (role) {
          res.status(200).json(role)
        } else {
          res.status(400).json({ message: `${roleNotFoundResponse}` })
        }
      })
      .catch((error) => {
        res.status(400).json({ message: error })
      })
  }

  static update (req, res) {
    const roleNotFoundResponse = req.t('role_message.id_not_found')
    const roleUpdatedResponse = req.t('role_message.role_updated')
    const { role } = req.body
    return Role.findByPk(req.params.roleId)
      .then((Role) => {
        if (Role) {
          Role.update({
            role: role || Role.role
          }).then((updatedRole) => {
            res.status(200).json({
              message: `${roleUpdatedResponse}`,
              data: {
                role: role || updatedRole.role
              }
            })
          })
        } else res.status(400).json({ message: `${roleNotFoundResponse}` })
      })
      .catch((error) => res.status(400).json({ message: error }))
  }

  static delete (req, res) {
    const roleNotFoundResponse = req.t('role_message.id_not_found')
    const roleDeletedResponse = req.t('role_message.role_deleted')
    return Role.findByPk(req.params.roleId)
      .then((Role) => {
        if (!Role) {
          return res.status(400).json({
            message: `${roleNotFoundResponse}`
          })
        }
        return Role.destroy().then(() =>
          res.status(200).json({
            message: `${roleDeletedResponse}`
          })
        )
      })
      .catch((error) => res.status(400).json({ message: error }))
  }

  static listEmployeesInRole (req, res) {
    return Role
      .findAll({
        include: [{ model: Employee, attributes: { exclude: ['password'] } }]
      })
      .then(roles => res.status(200).send(roles))
  }

  static listEmployeesInRole (req, res) {
    return Role
      .findAll({
        include: Employee
      })
      .then(roles => res.status(200).send(roles))
  }
}

export default Roles
