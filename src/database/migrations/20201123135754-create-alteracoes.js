module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('alteracoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      autorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'autores',
          key: 'id',
        },
      },
      antes: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      depois: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      // Timestamps
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('alteracoes');
  },
};
