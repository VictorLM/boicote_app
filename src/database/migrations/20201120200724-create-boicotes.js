module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('boicotes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(36),
        defaultValue: Sequelize.UUIDV4,
      },
      autorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'autores',
          key: 'id',
        },
      },
      marca: { // TODO - RELACIONAR COM OUTRA TABELA SÓ COM AS INFOS DOS CNPJS
        type: Sequelize.STRING,
        allowNull: false,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      texto: { // TODO - AVISAR SOMENTE TEXTO, REFERENCIAR LINKS 1, 2, 3...
        type: Sequelize.STRING(2000),
        allowNull: false,
      },
      tags: { // PARA CATEGORIZAR - TODO - FECHAR OPÇÕES DEPOIS DE UM TEMPO
        type: Sequelize.JSON,
        allowNull: true,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      confirmado: { // PELO LINK ENVIADO NO E-MAIL
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      aprovado: {
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
    await queryInterface.dropTable('boicotes');
  },
};
