'use strict'

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
    await queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      telNumber: '0781161254',
      email: 'doe@gmail.com',
      password: 'holdon0006',
      updatedAt: '2022-02-25T17:37:19.029Z',
      createdAt: '2022-02-25T17:37:19.029Z'
    }, {
      name: 'Jane Doe',
      telNumber: '0781161254',
      email: 'jane@gmail.com',
      password: 'holdon0006',
      updatedAt: '2022-02-25T17:37:19.029Z',
      createdAt: '2022-02-25T17:37:19.029Z'
    }, {
      name: 'Amber Doe',
      telNumber: '0781161254',
      email: 'amber@gmail.com',
      password: 'holdon0006',
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
