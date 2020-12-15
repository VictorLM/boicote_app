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
    },
  }, {
    paranoid: true,
    tableName: 'votos',
  });
  /*
  Voto.votosCount = async function (boicoteId) { // eslint-disable-line
    const cimaVotos = await Voto.count({
      where: {
        boicoteId,
        cima: true,
      },
    });
    const baixoVotos = await Voto.count({
      where: {
        boicoteId,
        cima: false,
      },
    });
    const votosCount = cimaVotos - baixoVotos;
    return votosCount;
  };
  */
  return Voto;
};
