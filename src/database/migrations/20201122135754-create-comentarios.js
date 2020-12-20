module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comentarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      comentario: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      autorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'autores',
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
    await queryInterface.dropTable('comentarios');
  },
};
