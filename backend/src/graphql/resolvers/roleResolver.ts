import { 
  Role, User
} from '../../models'

import { v4 as uuidv4 } from 'uuid';

export default {

    role: async ({uuid}, context, info) => {
      try {
        return await Role.findOne({
          include: [{
            model: User, 
          }],
          where: {
            uuid: uuid,
          }
        });
      } catch (e) {
        const error = new Error(e) as any;
        error.code = 400;
        throw error;
      }
    },

    roles: async (parent, args, context, info) => {
      try {
          return await Role.findAll({
            include: [{
              model: User,
            }],
          })
      } catch (e) {
          const error = new Error(e) as any;
          error.code = 400;
          throw error;
      }
  },

  createRole: async ({roleInput}, context, info) => {
    
    try {
      const existingRole = await Role.findOne({

        where: {
          name: roleInput.name,
        }
      });

      if (existingRole) {
        const error = new Error("Role exists already!");
        throw error;
      }

      const role = new Role({
        name: roleInput.name,
        uuid: uuidv4()
      });

      const createRole = await role.save();
      return await Role.findOne({
        where: {
          name: roleInput.name,
        }
      });
    } catch (e) {
      const error = new Error(e) as any;
      error.code = 400;
      throw error;
    }
  }
}