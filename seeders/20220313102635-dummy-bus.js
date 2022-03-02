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
      'Buses',
      [
        {
          plate: 'RAF122D',
          category: 'yutong',
          seat: '80',
          bus_status: 'rest',
          cid: 1,
          rout_id: 1,
          createdAt: '2022-02-28',
          updatedAt: '2022-02-28'
        },
        {
          plate: 'RAF222D',
          category: 'yutong',
          seat: '80',
          bus_status: 'rest',
          cid: 1,
          rout_id: 1,
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
    await queryInterface.bulkDelete('Buses', null, {})
  }
}
