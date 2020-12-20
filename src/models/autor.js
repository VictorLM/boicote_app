module.exports = (sequelize, DataTypes) => {
  const Autor = sequelize.define('Autor', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Preencha o campo Nome, por favor.',
        },
        len: {
          args: [3, 255],
          msg: 'O campo Nome deve ter entre 3 e 255 caracteres.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Preencha o campo E-mail, por favor.',
        },
        isEmail: {
          msg: 'Insira um E-mail válido.',
        },
      },
    },
    visitanteId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'visitantes',
        key: 'id',
      },
    },
  }, {
    paranoid: true,
    tableName: 'autores',
  });

  Autor.associate = function (models) {
    Autor.belongsTo(models.Visitante, {
      foreignKey: 'visitanteId',
      as: 'visitante',
    });

    Autor.hasMany(models.Comentario, {
      foreignKey: 'autorId',
      as: 'comentarios',
    });
  };

  Autor.encontreOuCrie = async function (nome, email, visitanteId) { // eslint-disable-line
    // TODO - TRY CATCH
    const [autor, criado] = await Autor.findOrCreate({ // eslint-disable-line
      where: {
        nome,
        email,
        visitanteId,
      },
    });
    return autor;
  };

  return Autor;
};
