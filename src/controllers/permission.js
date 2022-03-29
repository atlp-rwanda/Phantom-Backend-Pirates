import model from '../../models';
import Helper from '../utils/helper';

const { Permission } = model;
const helper = new Helper();

class Permissions {
  static createPermission(req, res) {
    const { perm_name, perm_description } = req.body;
    return Permission.create({
      perm_name,
      perm_description,
    })
      .then((permission) =>
        res
          .status(200)
          .json({ message: 'permission created successfully', permission })
      )
      .catch((err) =>
        res.status(400).json({ message: 'could not create permission', err })
      );
  }

  static getAllPermissions(req, res) {
    Permission.findAll().then((permissions) => {
      if (permissions.length === 0)
        res.status(400).json({ message: 'no permissions created yet' });
      else res.status(200).json(permissions);
    });
  }
}
export default Permissions;
