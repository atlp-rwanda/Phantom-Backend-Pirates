'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Buses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      plate: {
        type: Sequelize.STRING,
        notEmpty: true,
        unique: true
      },
      category: {
        type: Sequelize.STRING,
        notEmpty: true
      },
      seat: {
        type: Sequelize.INTEGER,
        notEmpty: true
      },
      status: {
        type: Sequelize.ENUM('available', 'unvaliable'),
        defaultValue: 'available'
      },
      cid: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Companies',
          key: 'id',
          as: 'cid'
        }
      },
      rout_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Buses')
  }
}
