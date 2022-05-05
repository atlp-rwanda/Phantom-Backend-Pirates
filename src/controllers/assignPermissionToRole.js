import model from '../../models';

const { Permission, RolePermission, Role } = model;

class AssignPermissions {
  static assignPermToRole(req, res) {
    RolePermission.findOne({
      where: {
        role_id: req.params.roleId,
        perm_id: req.params.permId,
      },
    }).then((permission) => {
      !permission
        ? RolePermission.create({
            role_id: req.params.roleId,
            perm_id: req.params.permId,
          }).then((rolepermission) => {
            res.status(200).json({
              message: 'role assigned to a permission successfully',
              rolepermission,
            });
          })
        : res
            .status(200)
            .json({ message: 'permission assigned to role already' });
    });
  }

  static removePermToRole(req, res) {
    RolePermission.findOne({
      where: {
        role_id: req.params.roleId,
        perm_id: req.params.permId,
      },
    }).then((rolepermission) => {
      if (rolepermission) {
        rolepermission
          .destroy()
          .then((Permission) =>
            res
              .status(200)
              .json({ message: 'permission removed to a role successfully' })
          );
      } else
        res
          .status(400)
          .json({ message: 'permission not assigned to this role' });
    });
  }

  static permissionAssignedToRole(req, res) {
    Role.findAll({
      where: { id: req.params.roleId },
      include: {
        model: Permission,
        as: 'permissions',
        attributes: ['perm_name', 'perm_description'],
        through: {
          attributes: ['perm_id', 'role_id'],
        },
      },
    })
      .then((rolepermission) => {
        if (rolepermission) {
          res.status(200).json(rolepermission.map((role) => role.permissions));
        } else
          res.status(400).json({ message: `role doesn't have any permission` });
      })
      .catch((err) => res.status(400).json({ message: err }));
  }
}

export default AssignPermissions;
