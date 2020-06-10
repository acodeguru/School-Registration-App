import Role from '../../models/role.js';
import uuidObj from 'uuid';
const {v4: uuidv4} = uuidObj;

export default {

    role: async ({uuid}, context, info) => {
      if (!context.isAuth) {
        const error = new Error('Not authenticated!');
        error.code = 401;
        throw error;
      }
      try {
        return await Role.findOne({
          where: {
            uuid: uuid,
          }
        });
      } catch (e) {
        const error = new Error(e);
        error.code = 400;
        throw error;
      }
    },

    roles: async (parent, context, info) => {
      if (!context.isAuth) {
        const error = new Error('Not authenticated!');
        error.code = 401;
        throw error;
      }
      try {
          return await Role.findAll()
      } catch (e) {
          const error = new Error(e);
          error.code = 400;
          throw error;
      }
  },

  createRole: async ({roleInput}, context, info) => {
    if (!context.isAuth) {
      const error = new Error('Not authenticated!');
      error.code = 401;
      throw error;
    }
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
      const error = new Error(e);
      error.code = 400;
      throw error;
    }
  }
}