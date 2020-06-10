import DataType from 'sequelize';
import { sequelize } from '../util/database.js';
import Role from './role.js';

const User = sequelize.define('user', {
  uuid: {
    type: DataType.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: sequelize.UUIDV4
  },
  fname: DataType.STRING,
  lname: DataType.STRING,
  email: DataType.STRING,
  username :  DataType.STRING,
  password :  DataType.STRING,
  dob :  DataType.DATEONLY,
  status: DataType.BOOLEAN,
  roleUUID: {
    type: DataType.UUID,
    references: 'role', 
    referencesKey: 'uuid' 
  },
  createdAt:  {
    type: 'TIMESTAMP',
    defaultValue: DataType.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt:  DataType.STRING
});

User.belongsTo(Role, {foreignKey: 'roleUUID', targetKey: 'uuid'});

export default User;

