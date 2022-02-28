'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Route.init({
    source:{
      type:DataTypes.STRING,
      allowNull:{
        args:false,
        message:"This field has to be entered first"
      }
    } ,
    destination:{
      type:DataTypes.STRING,
      allowNull:{
        args:false,
        message:"This field has to be entered first"
      }
    },
     
    distance: {
      type:DataTypes.STRING,
      allowNull:{
        args:false,
        message:"This field has to be entered first"
      }
    },
  busStop:{
    type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull:{
        args:false,
        message:"This field has to be entered first"
      }

  }
  }
  ,{
    sequelize,
    modelName: 'Route'
  })
  return Route
}