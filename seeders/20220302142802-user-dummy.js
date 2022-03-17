'use strict'
const bcrypt = require('bcrypt')
require('dotenv').config()
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    //  const password = bcrypt.hashSync(req.body.password, Number.parseInt(process.env.AUTH_ROUNDS))

    await queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      telNumber: '0781161254',
      email: 'doe@gmail.com',
      password: bcrypt.hashSync('holdon0006', Number.parseInt(process.env.AUTH_ROUNDS)),
      updatedAt: '2022-02-25T17:37:19.029Z',
      createdAt: '2022-02-25T17:37:19.029Z'
    }, {
      name: 'Jane Doe',
      telNumber: '0781161254',
      email: 'jane@gmail.com',
      password: bcrypt.hashSync('123456', Number.parseInt(process.env.AUTH_ROUNDS)),
      updatedAt: '2022-02-25T17:37:19.029Z',
      createdAt: '2022-02-25T17:37:19.029Z'
    }, {
      name: 'Amber Doe',
      telNumber: '0781161254',
      email: 'amber@gmail.com',
      password: bcrypt.hashSync('root', Number.parseInt(process.env.AUTH_ROUNDS)),
      updatedAt: '2022-02-25T17:37:19.029Z',
      createdAt: '2022-02-25T17:37:19.029Z'
    }], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
}
