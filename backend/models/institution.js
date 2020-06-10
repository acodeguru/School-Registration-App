import DataType from 'sequelize';
import { sequelize } from '../util/database.js';
import User from './user.js';

const Institution = sequelize.define('institution', {
  uuid: {
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: sequelize.UUIDV4
  },
  name: DataType.STRING,
  address: DataType.STRING,
  phone:  DataType.NUMBER,
  email:  DataType.STRING, 
  nostudents:  DataType.NUMBER,
  createdAt:  {
    type: 'TIMESTAMP',
    defaultValue: DataType.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt:  DataType.STRING
});

export default Institution;


