module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('visitantes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(36),
        defaultValue: Sequelize.UUIDV4,
      },
      IpId: { // TODO - COMO GUARDAR HISTÓRICO DE IPS E VISITANTES?
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ips',
          key: 'id',
        },
      },
      agente: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      banido: {
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
    await queryInterface.dropTable('visitantes');
  },
};
