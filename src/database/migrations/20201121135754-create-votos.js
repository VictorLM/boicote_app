module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('votos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      visitanteId: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        references: {
          model: 'visitantes',
          key: 'id',
        },
      },
      boicoteId: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        references: {
          model: 'boicotes',
          key: 'id',
        },
      },
      cima: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      // Timestamps
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      // Paranoid
      deletedAt: Sequelize.DATE,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('votos');
  },
};
