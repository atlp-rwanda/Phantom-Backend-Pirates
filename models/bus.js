'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Bus.belongsTo(models.Company, {
        foreignKey: 'cid',
        onDelete: 'CASCADE'
      })

      Bus.belongsTo(models.Route, {
        foreignKey: 'rout_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Bus.init({
    plate: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          is: /^[R]*[A-Z]{2}[\w ][0-9]{3}[\w ][A-Z]{1}$/i,
          args: false,
          msg: 'Valid Plate number required'
        }
      },
      unique: { msg: 'plate number already in use!' }

    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Company name required'
        }
      }
    },
    seat: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Bus seat required'
        }
      }
    },
    status: {
      type: DataTypes.ENUM('available', 'unvailable'),
      allowNull: {
        args: false,
        error: 'Status should be either available or unvailable'
      }
    },
    cid: DataTypes.INTEGER,
    rout_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bus'
  })
  return Bus
}
