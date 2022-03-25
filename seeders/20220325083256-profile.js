'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    [
      {
        id:1,
        telephone:"0781636875",
        firstname: "David",
        lastname: "Niyontwari",
        profilePic:"", 
        address:{
            "district":"Kirehe",
            "sector":"Gahara"
        },
        dateOfBirth:"1995-07-25",
        gender:"Male",
        employeeId:1
    }
    ]
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
