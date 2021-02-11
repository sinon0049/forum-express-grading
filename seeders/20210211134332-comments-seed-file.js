'use strict';
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Comments',
    Array.from({ length: 20 }).map((d, i) =>
    ({
      text: faker.lorem.sentence(),
      UserId: Math.ceil(Math.random() * 3),
      RestaurantId: Math.ceil(Math.random() * 50),
      createdAt: new Date(),
      updatedAt: new Date()
    })
    ), {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Comments', null, {})
  }
};
