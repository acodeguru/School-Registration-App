import path from 'path';
import mergeGraphqlSchemas from 'merge-graphql-schemas';

const mergeResolvers = mergeGraphqlSchemas.mergeResolvers
const fileLoader = mergeGraphqlSchemas.fileLoader

const __dirname = path.resolve();

const resolversArray = fileLoader(path.join(__dirname, './resolvers'));

export default mergeResolvers(resolversArray);