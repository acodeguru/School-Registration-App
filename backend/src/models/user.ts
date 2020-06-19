import { DataTypes, Model, BuildOptions } from 'sequelize';
import { sequelize } from '../util/database';
import Role from './role';

// We need to declare an interface for our model that is basically what our class would be
interface IUser extends Model {
  uuid: any;
  fname: any;
  lname: any;
  email: any;
  password: any;
  status: any;
  role_uuid: any;
}

// Need to declare the static model so `findOne` etc. use correct types.
type IUserStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): IUser;
}


const User = <IUserStatic>sequelize.define('user', {
  uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  fname: DataTypes.STRING,
  lname: DataTypes.STRING,
  email: DataTypes.STRING,
  username :  DataTypes.STRING,
  password :  DataTypes.STRING,
  dob :  DataTypes.DATEONLY,
  status: DataTypes.BOOLEAN,
  roleUUID: {
    type: DataTypes.UUID,
  },
  createdAt:  {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
},
  updatedAt:  DataTypes.STRING
});

User.belongsTo(Role, {foreignKey: 'role_uuid', targetKey: 'uuid'});

export default User;
