'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Motion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Motion.belongsToMany(models.Bus, {
        through: models.BusMotion,
        as: 'buses',
        foreignKey: 'motionId'
      })
    }
  }
  Motion.init({
    name: DataTypes.ENUM('move', 'rest', 'stuck')
  }, {
    sequelize,
    modelName: 'Motion'
  })
  return Motion
}
