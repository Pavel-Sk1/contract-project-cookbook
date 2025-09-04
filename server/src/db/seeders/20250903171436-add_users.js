"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "John",
          email: "qwer123@yndex.ru",
          password: "Qwerty123@",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Sam",
          email: "Sam@yndex.ru",
          password: "Qwerty123@11",
          createdAt: new Date(),
          updatedAt: new Date(),
        },        
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
