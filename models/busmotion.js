'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class BusMotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  BusMotion.init({
    busId: DataTypes.INTEGER,
    motionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BusMotion'
  })
  return BusMotion
}
