// import dotenv from 'dotenv'
// dotenv.config();

import express from 'express';
import graphql from 'graphql';

import typeDefs from './graphql/types/index.js';
import resolvers from './graphql/resolvers/index.js';
import graphqlHttp from 'express-graphql';

import cors from 'cors';
import log4js from 'log4js';
import bodyParser from 'body-parser';
import auth from './middleware/auth.js';

const buildSchema = graphql.buildSchema;
const schemaTypes = buildSchema(typeDefs);
const app = express();

log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    file: {
      type: 'file',
      filename: 'skoolapp.log'
    }
  },
  categories: {
    skoolapp: {
      appenders: ['file'],
      level: 'error'
    },
    default: {
      appenders: ['console'],
      level: 'error'
    }
  }
});

let logger = log4js.getLogger('skoolapp');

app.use(log4js.connectLogger(logger, {
  level: log4js.levels.ERROR,
  format: ':method :url'
}));
app.use(log4js.connectLogger(logger, {
  level: log4js.levels.INFO,
}));

app.use(bodyParser.json());
app.use(cors());
app.use(auth);

app.use((error, req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}).on("error", function (error) {
  logger.error(error);
});

app.use(
  '/graphql', 
  graphqlHttp(function (req, res) {
    return {
        schema: schemaTypes,
        graphiql: true,
        rootValue: resolvers,
        customFormatErrorFn :(error) => {
          logger.error(error);
          if (res.statusCode  == 400) {
            error.message= "Something went wrong from internal network";
          }
          return ({
            message: error.message,
            locations: error.locations,
            stack: error.stack ? error.stack.split('\n') : [],
            path: error.path,
          })
        },
    };
}));


app.listen(8080);