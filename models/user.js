'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE'
      })
    }
  }
  User.init(
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your first name'
        }
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your last name'
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your email'
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your name'
        }
      },
      roleId: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}
