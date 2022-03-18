'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Route.hasMany(models.Bus, {
        foreignKey: 'rout_id'
      })
    }
  }
  Route.init(
    {
      source: DataTypes.STRING,
      destination: DataTypes.STRING,
      distance: DataTypes.FLOAT,
      busStop: DataTypes.ARRAY(DataTypes.STRING)
    },
    {
      sequelize,
      modelName: 'Route'
    }
  )
  return Route
}
