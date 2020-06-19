import { Role, User } from '../../models'
import { v4 as uuidv4 } from 'uuid';
// const {v4: uuidv4} = uuidObj;

import * as bcrypt from 'bcryptjs';
import validator from 'validator';
import { sign } from 'jsonwebtoken';

export default {

    user: async ({
      uuid
    }, context, info) => {
      try {
        return await User.findOne({
          where: {
            uuid: uuid,
          },
          include: [{
            model: Role
          }]
        });
      } catch (e) {
        const error = new Error(e) as any;
        error.code = 400;
        throw error;
      }
    },
    users: async (parent, args, context, info) => {
      try {
        return await User.findAll({
          include: [{
            model: Role
          }]
        })
      } catch (e) {
        const error = new Error(e) as any;
        error.code = 400;
        throw error;
      }
    },
    login: async ({email, password}, context, info) => {
      const user = await User.findOne({
        where: {
          email: email,
          status : 1
        },
        include: [{
          model: Role
        }]
      });
  
      if (!user) {
        const error = new Error('User not found.') as any;
        error.code = 401;
        throw error;
      }
  
      const isEqual = bcrypt.compare(password, user.password);
      if (!isEqual) {
        const error = new Error('Password is incorrect.') as any;
        error.code = 401;
        throw error;
      }
      const token = sign({
          userId: user.uuid,
          email: user.email
        },
        'SVP@5T5Y:mT#C>G53YKH5gY&.K3=*RFjRzTjz5x:', {
          expiresIn: '10h'
        }
      );
      return {
        token: token,
        userId: user.uuid,
        role: user.role.name
      };
    },

    createUser: async ({
      userInput
    }, context, info) => {

      try {
        const errors = [];
        if (!validator.isEmail(userInput.email)) {
          errors.push({
            message: 'E-Mail is invalid.'
          });
        }
        if (
          validator.isEmpty(userInput.password) ||
          !validator.isLength(userInput.password, {
            min: 8
          })
        ) {
          errors.push({
            message: 'Password too short!'
          });
        }
        if (errors.length > 0) {
          const error = new Error('Invalid input.') as any;
          error.data = errors;
          error.code = 422;
          throw error;
        }
  
        const existingUser = await User.findOne({
          where: {
            email: userInput.email,
          }
        });
  
        if (existingUser) {
          const error = new Error('User exists already!') as any;
          error.code = 400;
          throw error;
        }
  
        const existingRole = await Role.findOne({
          where: {
            name: "User",
          }
        });
  
        if (!existingRole) {
          const error = new Error("Role not exists!") as any;
          error.code = 400;
          throw error;
        }
  
        const hashedPw = await bcrypt.hash(userInput.password, 12);
        console.log(hashedPw)
        const user = new User({
          fname: userInput.fname,
          lname: userInput.lname,
          email: userInput.email,
          username: userInput.email,
          password: hashedPw,
          role_uuid: existingRole.uuid,
          uuid: uuidv4(),
          status : 1
        });
  
        const createdUser = await user.save();
  
        return await User.findOne({
          where: {
            email: userInput.email,
          }
        });
      } catch (e) {
        const error = new Error(e) as any;
        error.code = 400;
        throw error;
      }
    }
  }