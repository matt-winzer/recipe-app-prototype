'use strict'

module.exports = {
  // eslint-disable-next-line
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {})
    */
    return queryInterface.bulkInsert('userRecipes', [
      {
        recipeId: 1,
        userId: 1,
        createdBy: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        recipeId: 1,
        userId: 2,
        createdBy: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  // eslint-disable-next-line
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {})
    */
    return queryInterface.bulkDelete('useRecipes', null, {})
  }
}