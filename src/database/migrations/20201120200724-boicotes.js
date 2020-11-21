module.exports = { /// //////////// TODO - FAZER TABELA DE VOTOS SEPARADO E RELACIONAR?
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('boicotes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      marca: { // TODO - RELACIONAR COM OUTRA TABELA SÓ COM AS INFOS DOS CNPJS
        type: Sequelize.STRING,
        allowNull: false,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // TODO - REGISTROS C/ DELETE PARANOID CONTAM?
      },
      noticias_links: { // TODO - MIN. 3 LINKS DIFERENTES
        type: Sequelize.JSON,
        allowNull: false,
      },
      texto: { // TODO - INCLUIR LINKS FORMATADOS
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      // Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      // Paranoid
      deletedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('boicotes');
  },
};
