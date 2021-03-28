const validUrl = require('valid-url');

module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define('Link', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Insira ao menos um Link, por favor.',
        },
        len: {
          args: [5, 255],
          msg: 'Os Links devem ter entre 5 e 255 caracteres.',
        },
        // Eu sei que tem validação pra UEL, mas estava dando pau
        isUri(link) {
          if (!validUrl.isUri(link)) {
            throw new Error(`Link inválido: ${link}`);
          }
        },
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
    confiavel: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  }, {
    paranoid: true,
    tableName: 'links',
  });
  /*
  Link.associate = function (models) {
    Link.belongsTo(models.Boicote, {
      foreignKey: 'boicoteId',
      as: 'boicote',
    });
  };
  */
  // GAMB VIOLENTA PQ NÃO ESTAVA FUNCIONANDO A VALIDAÇÃO PELO SEQUELIZE
  Link.isLinkValid = function (link) { // eslint-disable-line
    return validUrl.isUri(link);
    /*
    if (validUrl.isUri(link)) {
      return true;
    }
    return false;
    */
  };

  return Link;
};
