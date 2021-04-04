module.exports = (sequelize, DataTypes) => {
  const Denuncia = sequelize.define('Denuncia', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    texto: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Preencha o campo Texto, por favor.',
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
      allowNull: true,
      defaultValue: null,
      references: {
        model: 'boicotes',
        key: 'id',
      },
    },
    comentarioId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      references: {
        model: 'comentarios',
        key: 'id',
      },
    },
  }, {
    tableName: 'denuncias',
  });

  return Denuncia;
};
