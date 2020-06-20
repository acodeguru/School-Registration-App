
import { Institution,User } from '../../models'
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import { Op } from 'sequelize';


export default {
    // fetch single tuple from the table
    // @uuid
    institution: async ({
      uuid
    }, req) => {
      // if (!req.isAuth) {
      //   const error = new Error('Not authenticated!') as any;
      //   error.code = 401;
      //   throw error;
      // }
      try {
        return await Institution.findOne({
          where: {
            uuid: uuid,
          },
          include: [{
            model: User
          }]
        });
      } catch (e) {
        const error = new Error(e) as any;
        error.code = 400;
        throw error;
      }
    },

    // fetch multiple tuples from the table
    institutions: async (args, context, info) => {
      // if (!context.isAuth) {
      //   const error = new Error('Not authenticated!') as any;
      //   error.code = 401;
      //   throw error;
      // }
      try {
        return await Institution.findAll();
      } catch (e) {
        const error = new Error(e) as any;
        error.code = 400;
        throw error;
      }
    },

    // add record to the table
    createInstitution: async ({
      institutionInput
    }, context, info) => {
      // if (!context.isAuth) {
      //   const error = new Error('Not authenticated!') as any;
      //   error.code = 401;
      //   throw error;
      // }

      try {
        const errors = [];

        if (!validator.isEmail(institutionInput.email)) {
          errors.push({
            message: 'Institution Email is invalid.'
          });
        }
  
        const existingInstitution = await Institution.findOne({
          where: {
            [Op.or]: [{name: institutionInput.name}, {email: institutionInput.email}] ,
          }
        });
  
        if (existingInstitution) {
          const error = new Error("Institution exists!") as any;
          error.code = 400;
          throw error;
        }
  
        const institution = new Institution({
          name: institutionInput.name,
          email: institutionInput.email,
          address:institutionInput.address,
          phone: institutionInput.phone,
          nostudents: institutionInput.nostudents,
          uuid: uuidv4()
        });
  
        const createdInstitution = await institution.save();
  
        return await Institution.findOne({
          where: {
            email: institutionInput.email
          }
        });
      } catch (e) {
        const error = new Error(e) as any;
        error.code = 400;
        throw error;
      }
    }
  }