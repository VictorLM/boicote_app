module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ip: {
        type: Sequelize.STRING(45), // PARA SUPORTAR IPV6
        allowNull: true,
        unique: true, // TODO - VER SE BUGA C/ PARANOID DELETED
      },
      banido: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
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
    await queryInterface.dropTable('ips');
  },
};
