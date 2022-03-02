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
        source: 'remera',
        destination: 'nyabugogo',
        busStop: ['remera', 'chezrando', 'gishushu', 'uok', 'faisal', 'kacyiru', 'kinamba', 'kundagara', 'nyabugogo'],
        createdAt: '2022-02-28',
        updatedAt: '2022-02-28'
      },
      {
        source: 'kimironko',
        destination: 'nyabugogo',
        busStop: ['kimironko', 'stade', 'chezrando', 'gishushu', 'uok', 'faisal', 'kacyiru', 'kinamba', 'kundagara', 'nyabugogo'],
        createdAt: '2022-02-28',
        updatedAt: '2022-02-28'
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
