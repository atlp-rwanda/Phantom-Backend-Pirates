import model from '../../models';

const { RolePermission } = model;
const { Permission } = model;

class Helper {
  findPermission(req, res) {}

  checkPermission(roleId, permName) {
    return new Promise((resolve, reject, next) => {
      Permission.findOne({
        where: {
          perm_name: permName,
        },
      })
        .then((perm) => {
          RolePermission.findOne({
            where: {
              role_id: roleId,
              perm_id: perm.id,
            },
          })
            .then((rolePermission) => {
              // console.log(rolePermission);
              if (rolePermission) {
                resolve(rolePermission);
              } else {
                reject({
                  message: `you don't have this privilege, please reach out to admin`,
                });
              }
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch(() => {
          reject({
            message: `you don't have this privilege, please reach out to admin`,
          });
        });
    });
  }
}
export default Helper;
