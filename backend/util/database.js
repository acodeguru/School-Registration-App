import Sequelize from 'sequelize';

export const sequelize = new Sequelize('skooldb', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
  define: {
    timestamps: false,
    freezeTableName: true,
  }
});

sequelize.authenticate()