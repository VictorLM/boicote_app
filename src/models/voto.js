module.exports = (sequelize, DataTypes) => {
  const Voto = sequelize.define('Voto', {
    visitanteId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'visitantes',
        key: 'id',
      },
    },
    boicoteId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'boicotes',
        key: 'id',
      },
    },
    cima: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      validate: {
        notNull: {
          msg: 'Informe o tipo do Voto, por favor.',
        },
      },
    },
  }, {
    paranoid: true,
    tableName: 'votos',
  });

  return Voto;
};
