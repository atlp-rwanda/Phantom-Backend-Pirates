'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles',
      [{
        role: 'admin',
        id: 1,
        createdAt: '2022-03-14T09:01:38.932Z',
        updatedAt: '2022-03-14T09:01:38.932Z'
      },
      {
        role: 'driver',
        id: 2,
        createdAt: '2022-03-14T09:01:38.932Z',
        updatedAt: '2022-03-14T09:01:38.932Z'
      }
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', {}, null)
  }
}
