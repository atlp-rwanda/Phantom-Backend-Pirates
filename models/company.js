'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Company.hasMany(models.Bus, {
        foreignKey: 'cid'
      })
    }
  }
  Company.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Company name required'
          }
        },
        unique: { msg: 'name already in use!' }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email-id required'
          },
          isEmail: {
            args: true,
            msg: 'Valid email-id required'
          }
        },
        unique: { msg: 'Email address already in use!' }
      }
    },
    {
      sequelize,
      modelName: 'Company'
    }
  )
  return Company
}
