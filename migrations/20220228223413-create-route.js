'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Routes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      source: {
        
        type: Sequelize.STRING,
        allowNull:false
      },
      destination: {
        type: Sequelize.STRING,
        allowNull:false
      },
      distance: {
        type: Sequelize.STRING,
        allowNull:false
      },
      busStop: {
        type:Sequelize.ARRAY(Sequelize.STRING),
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Routes');
  }
};