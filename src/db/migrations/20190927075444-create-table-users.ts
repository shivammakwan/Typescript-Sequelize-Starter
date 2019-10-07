"use strict";
module.exports = {
  up: (queryInterface: any, Sequelize: any) => {

    return queryInterface.createTable("users",
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                },
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.TEXT,
                status: Sequelize.INTEGER,
                createdAt: Sequelize.DATE,
                updatedAt: Sequelize.DATE,
            });

  },

  down: (queryInterface: any, Sequelize: any) => {

      return queryInterface.dropTable("users");

  },
};
