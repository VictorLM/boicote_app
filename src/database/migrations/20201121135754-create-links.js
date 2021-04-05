module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      boicoteId: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        references: {
          model: 'boicotes',
          key: 'id',
        },
      },
      confiavel: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
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
    await queryInterface.dropTable('links');
  },
};
