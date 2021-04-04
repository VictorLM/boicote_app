module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('denuncias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      texto: {
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
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'boicotes',
          key: 'id',
        },
      },
      comentarioId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'comentarios',
          key: 'id',
        },
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
    await queryInterface.dropTable('denuncias');
  },
};
