module.exports = (sequelize, DataTypes) => {
  const Visitante = sequelize.define('Visitante', {
    id: {
      primaryKey: true,
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    IpId: { // TODO - COMO GUARDAR HISTÓRICO DE IPS E CLIENTS?
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ips',
        key: 'id',
      },
    },
    agente: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    banido: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  }, {
    paranoid: true,
    tableName: 'visitantes',
  });

  Visitante.associate = function (models) {
    Visitante.belongsTo(models.IP, {
      foreignKey: {
        name: 'IpId',
      },
    });
  };

  return Visitante;
};
