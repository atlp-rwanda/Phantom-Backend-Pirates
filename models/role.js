'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Role.hasMany(models.User, {
        foreignKey: 'roleId'
      })
    }
  }
  Role.init(
    {
      role: {
        type: DataTypes.ENUM('admin', 'driver', 'operator'),
        allowNull: {
          args: false,
          error: 'Role should be either admin, driver or operator'
        }
      }
    },
    {
      sequelize,
      modelName: 'Role'
    }
  )
  return Role
}
