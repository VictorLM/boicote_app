module.exports = (sequelize, DataTypes) => {
  const boicotes = sequelize.define('siteText', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['main', 'p1', 'p2', 'p3', 'p4']], // TODO
          msg: 'O campo Nome deve ser main, p1, p2, p3 ou p4.',
        },
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['about', 'team', 'offices', 'contact', 'blog']], // TODO
          msg: 'O campo Tipo deve ser about, team, offices, contact ou blog.',
        },
      },
    },
    text: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      trim: true,
      validate: {
        len: {
          args: [5, 1000],
          msg: 'O campo Texto precisa ter entre 5 e 1000 caracteres.',
        },
      },
    },
  }, {
    paranoid: true,
    tableName: 'boicotes',
  });

  return boicotes;
};
