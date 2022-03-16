'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Profile.belongsTo(models.Employee, {
        foreignKey: 'employeeId',
        onDelete: 'CASCADE'
      })
    }
  }
  Profile.init({
    telephone: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    firstname: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastname: {
      allowNull: false,
      type: DataTypes.STRING
    },
    profilePic: {
      allowNull: false,
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.JSON
    },
    dateOfBirth: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    gender: {
      allowNull: false,
      type: DataTypes.ENUM('Male', 'Female')

    },
    employeeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile'
  })
  return Profile
}
