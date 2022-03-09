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
    await queryInterface.bulkInsert('Routes', [
      {
        source: 'Police',
        destination: 'Kabindi',
        distance: 12300,
        busStop: ['Police', 'Kacyiru', 'kimihurura', 'Kabuga', 'Muhima', 'Kimironko', 'Kabindi'],
        createdAt: '2022-03-14',
        updatedAt: '2022-03-14'
      },
      {
        source: 'Police',
        destination: 'Kinyinya',
        distance: 12300,
        busStop: ['Police', 'Kacyiru', 'kimihurura', 'Kabuga', 'Muhima', 'Kimironko', 'Kinyinya'],
        createdAt: '2022-03-14',
        updatedAt: '2022-03-14'
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Routes', null, {})
  }
}
