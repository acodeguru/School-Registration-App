import Role from '../../models/role.js'
import User from '../../models/user.js'

import uuidObj from 'uuid';
const {v4: uuidv4} = uuidObj;

import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';

export default {

    user: async ({
      uuid
    }, context, info) => {
      if (!context.isAuth) {
        const error = new Error('Not authenticated!');
        error.code = 401;
        throw error;
      }
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
        const error = new Error(e);
        error.code = 400;
        throw error;
      }
    },
    users: async (parent, context, info) => {
      if (!context.isAuth) {
        const error = new Error('Not authenticated!');
        error.code = 401;
        throw error;
      }
      try {
        return await User.findAll({
          include: [{
            model: Role
          }]
        })
      } catch (e) {
        const error = new Error(e);
        error.code = 400;
        throw error;
      }
    },

    login: async ({email, password}, context, info) => {
      const user = await User.findOne({
        where: {
          username: email,
          status : 1
        },
        include: [{
          model: Role
        }]
      });
  
      if (!user) {
        const error = new Error('Password or email is incorrect.');
        error.code = 401;
        throw error;
      }
  
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        const error = new Error('Password or email is incorrect.');
        error.code = 401;
        throw error;
      }
      const token = jwt.sign({
          userId: user.uuid,
          email: user.email
        },
        'SA4xvrB^V9nw@`rZvh]%QAp]Mq=G.r_H-nSrHF', {
          expiresIn: '2h'
        }
      );
      return {
        token: token,
        userUUID: user.uuid
      };
    },

    createUser: async ({
      userInput
    }, context, info) => {
      console.log(userInput);
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
          const error = new Error('Invalid input.');
          error.data = errors;
          error.code = 422;
          throw error;
        }
  
        const existingUser = await User.findOne({
          where: {
            username: userInput.email,
          }
        });
  
        if (existingUser) {
          const error = new Error('User exists already!');
          error.code = 400;
          throw error;
        }
  
        const existingRole = await Role.findOne({
          where: {
            name: "User",
          }
        });
  
        if (!existingRole) {
          const error = new Error("Role not exists!");
          error.code = 400;
          throw error;
        }
  
        const hashedPw = await bcrypt.hash(userInput.password, 12);
  
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
            username: userInput.email,
          }
        });
      } catch (e) {
        const error = new Error(e);
        error.code = 400;
        throw error;
      }
    }
  }