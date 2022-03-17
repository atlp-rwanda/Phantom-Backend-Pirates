'use strict'
const bcrypt = require('bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Employees',
      [
        {
          id: 1,
          firstname: 'David',
          lastname: 'Neza',
          email: 'uid2710@gmail.com',
          password: bcrypt.hashSync('123456', Number.parseInt(process.env.AUTH_ROUNDS)),
          roleId: 1,
          createdAt: '2022-03-14T09:01:38.932Z',
          updatedAt: '2022-03-14T09:01:38.932Z'
        },
        {
          id: 2,
          firstname: 'Kevin',
          lastname: 'Niyintwari',
          email: 'nijohn7@gmail.com',
          password: bcrypt.hashSync('123456', Number.parseInt(process.env.AUTH_ROUNDS)),
          roleId: 2,
          createdAt: '2022-03-14T09:01:38.932Z',
          updatedAt: '2022-03-14T09:01:38.932Z'
        },

        {
          id: 3,
          firstname: 'Jules',
          lastname: 'Himbaza',
          email: 'hijules10@gmail.com',
          password: bcrypt.hashSync('123456', Number.parseInt(process.env.AUTH_ROUNDS)),
          roleId: 2,
          createdAt: '2022-03-14T09:01:38.932Z',
          updatedAt: '2022-03-14T09:01:38.932Z'
        }

      ]
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
