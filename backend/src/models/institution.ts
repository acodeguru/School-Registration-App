import { DataTypes, Model, BuildOptions } from 'sequelize';
import { sequelize } from '../util/database';

// We need to declare an interface for our model that is basically what our class would be
interface IInstitution extends Model {
  uuid: any;
  name: any;
  address: any;
  phone: any;
  email: any;
  nostudents: any;
  createdAt: any;
  updatedAt: any;
}

// Need to declare the static model so `findOne` etc. use correct types.
type IInstitutionStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): IInstitution;
}


const Institution = <IInstitutionStatic>sequelize.define('institution', {
  uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  name: DataTypes.STRING,
  address: DataTypes.STRING,
  phone:  DataTypes.NUMBER,
  email:  DataTypes.STRING, 
  nostudents:  DataTypes.NUMBER,
  createdAt:  {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt:  DataTypes.STRING
});


export default Institution;
