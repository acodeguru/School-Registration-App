import path from 'path';
import mergeGraphqlSchemas from 'merge-graphql-schemas';

const mergeTypes = mergeGraphqlSchemas.mergeTypes
const fileLoader = mergeGraphqlSchemas.fileLoader

const __dirname = path.resolve();

const typesArray = fileLoader(path.join(__dirname, './types'));

export default mergeTypes(typesArray, { all: true });