import * as dotenv from "dotenv";
dotenv.config();

import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { buildSchema } from 'graphql';

import typeDefs from './graphql/types/index';
import resolvers from './graphql/resolvers/index';
import * as graphqlHttp from 'express-graphql';

import * as cors from 'cors';
import * as log4js from 'log4js';
import * as bodyParser from 'body-parser';
import auth from './middleware/auth';


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

const logger = log4js.getLogger('skoolapp');

app.use(log4js.connectLogger(logger, { level: log4js.levels.ERROR.toString(), format: ':method :url' }));
app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO.toString(), format: ':method :url' }));

app.use(bodyParser.json({limit: '50mb'})); 
app.use(cors());

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
  next();
}).on("error", function (error) {
  logger.error(error);
});

app.use(auth);

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