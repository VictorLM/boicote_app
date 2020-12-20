module.exports = (sequelize, DataTypes) => {
  const Comentario = sequelize.define('Comentario', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Preencha o campo Comentário, por favor.',
        },
        len: {
          args: [3, 255],
          msg: 'O campo Comentário deve ter entre 3 e 255 caracteres.',
        },
      },
    },
    autorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'autores',
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
    confiavel: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  }, {
    paranoid: true,
    tableName: 'comentarios',
  });

  Comentario.associate = function (models) {
    Comentario.belongsTo(models.Autor);
  };

  return Comentario;
};
