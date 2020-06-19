import { DataTypes, Model, BuildOptions } from 'sequelize';
import { sequelize } from '../util/database';

// We need to declare an interface for our model that is basically what our class would be
interface IRole extends Model {
  uuid: any;
  name: any;
}

// Need to declare the static model so `findOne` etc. use correct types.
type IRoleStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): IRole;
}

const Role = <IRoleStatic>sequelize.define('role', {
  uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  }, {
    freezeTableName: true, 
    timestamps: false,
  });

  export default Role;
