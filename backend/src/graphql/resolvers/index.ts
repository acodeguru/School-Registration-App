import { mergeResolvers } from 'merge-graphql-schemas';

import roleResolver from './roleResolver.js';
import userResolver from './userResolver.js';
import institutionResolver from './institutionResolver.js';

// import all the defined resolvers here

const resolvers: any[] = [
  roleResolver,
  userResolver,
  institutionResolver

];

export default mergeResolvers(resolvers);