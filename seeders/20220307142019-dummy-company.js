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
    await queryInterface.bulkInsert(
      'Companies',
      [
        {
          name: 'volcano',
          email: 'volcano@gmail.com',
          createdAt: '2022-02-28',
          updatedAt: '2022-02-28'
        },
        {
          name: 'horizon',
          email: 'horizon@gmail.com',
          createdAt: '2022-02-28',
          updatedAt: '2022-02-28'
        }
      ],
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Companies', null, {})
  }
}
