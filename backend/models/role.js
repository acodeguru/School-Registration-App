import DataType from 'sequelize';
import { sequelize } from '../util/database.js';

const Role = sequelize.define('role', {
  uuid: {
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: sequelize.UUIDV4
  },
  name: DataType.STRING,
  createdAt: DataType.DATE,
  updatedAt :  DataType.DATE,
  });

  export default Role;

