module.exports = (sequelize, DataTypes) => {
  const IP = sequelize.define('IP', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    ip: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    banido: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    confiavel: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  }, {
    paranoid: true,
    tableName: 'ips',
  });

  IP.upsert = async function (ip) { // eslint-disable-line
    const [ipCadastrado, created] = await IP.findOrCreate({ // eslint-disable-line
      where: { ip },
    });
    return ipCadastrado;
  };

  return IP;
};
