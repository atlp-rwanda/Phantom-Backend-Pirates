'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Permissions',
      [
        {
          perm_name: 'unassign a driver to bus',
          perm_description: 'user is able to unassgn a driver to a bus',
          createdAt: '2022-05-08T09:01:38.932Z',
          updatedAt: '2022-05-08T09:01:38.932Z',
        },
        {
          perm_name: 'create route',
          perm_description: 'user is able to create a route',
          createdAt: '2022-05-08T09:01:38.932Z',
          updatedAt: '2022-05-08T09:01:38.932Z',
        },
        {
          perm_name: 'update route',
          perm_description: 'user is able to update a route',
          createdAt: '2022-05-08T09:01:38.932Z',
          updatedAt: '2022-05-08T09:01:38.932Z',
        },
        {
          perm_name: 'delete route',
          perm_description: 'user is able to delete a route',
          createdAt: '2022-05-08T09:01:38.932Z',
          updatedAt: '2022-05-08T09:01:38.932Z',
        },
        {
          perm_name: 'create role',
          perm_description: 'user is able to create a role',
          createdAt: '2022-05-08T09:01:38.932Z',
          updatedAt: '2022-05-08T09:01:38.932Z',
        },
        {
          perm_name: 'update role',
          perm_description: 'user is able to update a role',
          createdAt: '2022-05-08T09:01:38.932Z',
          updatedAt: '2022-05-08T09:01:38.932Z',
        },
        {
          perm_name: 'delete role',
          perm_description: 'user is able to delete a role',
          createdAt: '2022-05-08T09:01:38.932Z',
          updatedAt: '2022-05-08T09:01:38.932Z',
        },
        {
          perm_name: 'create company',
          perm_description: 'user is able to create a company',
          createdAt: '2022-05-08T09:01:38.932Z',
          updatedAt: '2022-05-08T09:01:38.932Z',
        },
        {
          perm_name: 'update company',
          perm_description: 'user is able to update a company',
          createdAt: '2022-05-08T09:01:38.932Z',
          updatedAt: '2022-05-08T09:01:38.932Z',
        },
        {
          perm_name: 'delete company',
          perm_description: 'user is able to delete a company',
          createdAt: '2022-05-08T09:01:38.932Z',
          updatedAt: '2022-05-08T09:01:38.932Z',
        },
        {
          perm_name: 'create bus',
          perm_description: 'user is able to create a bus',
          createdAt: '2022-05-08T09:01:38.932Z',
          updatedAt: '2022-05-08T09:01:38.932Z',
        },
        {
          perm_name: 'update bus',
          perm_description: 'user is able to update a bus',
          createdAt: '2022-05-08T09:01:38.932Z',
          updatedAt: '2022-05-08T09:01:38.932Z',
        },
        {
          perm_name: 'delete bus',
          perm_description: 'user is able to delete a bus',
          createdAt: '2022-05-08T09:01:38.932Z',
          updatedAt: '2022-05-08T09:01:38.932Z',
        },
        {
          perm_name: 'assign drive to bus',
          perm_description: 'user is able to assign adriver to a bus',
          createdAt: '2022-05-08T09:01:38.932Z',
          updatedAt: '2022-05-08T09:01:38.932Z',
        },
        {
          perm_name: 'assign bus to route',
          perm_description: 'user is able to assign adriver to a bus',
          createdAt: '2022-05-08T09:01:38.932Z',
          updatedAt: '2022-05-08T09:01:38.932Z',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {});
  },
};
