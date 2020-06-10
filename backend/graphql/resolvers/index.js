import mergeGraphqlSchemas from 'merge-graphql-schemas';

import roleResolver from './roleResolver.js';
import userResolver from './userResolver.js';
import institutionResolver from './institutionResolver.js';

const mergeResolvers = mergeGraphqlSchemas.mergeResolvers

// import all the defined resolvers here

const resolvers = [
  roleResolver,
  userResolver,
  institutionResolver

];

export default mergeResolvers(resolvers);