module.exports = (sequelize, DataTypes) => {
  const Boicote = sequelize.define('Boicote', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
    },
    autorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'autores',
        key: 'id',
      },
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Preencha o campo Marca, por favor.',
        },
        len: {
          args: [2, 255],
          msg: 'O campo Marca deve ter entre 2 e 255 caracteres.',
        },
      },
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Preencha o campo Título, por favor.',
        },
        len: {
          args: [5, 255],
          msg: 'O campo Título deve ter entre 5 e 255 caracteres.',
        },
      },
    },
    texto: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      trim: true,
      validate: {
        notNull: {
          msg: 'Preencha o campo Texto, por favor.',
        },
        len: {
          args: [5, 2000],
          msg: 'O campo Texto deve ter entre 5 e 2000 caracteres.',
        },
      },
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Insira ao menos uma tag, por favor.',
        },
        len: {
          args: [0, 50],
          msg: 'Você deve selecionar no máximo 5 Tags.',
        },
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmado: { // PELO LINK ENVIADO NO E-MAIL
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    aprovado: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  }, {
    paranoid: true,
    tableName: 'boicotes',
  });

  Boicote.associate = function (models) {
    Boicote.belongsTo(models.Autor, {
      foreignKey: 'autorId',
      as: 'autor',
    });

    Boicote.hasMany(models.Link, {
      foreignKey: 'boicoteId',
      as: 'links',
    });

    Boicote.hasMany(models.Voto, {
      foreignKey: 'boicoteId',
      as: 'votos',
    });

    Boicote.hasMany(models.Comentario, {
      foreignKey: 'boicoteId',
      as: 'comentarios',
    });

    Boicote.hasMany(models.Denuncia, {
      foreignKey: 'boicoteId',
      as: 'denuncias',
    });
  };

  return Boicote;
};
