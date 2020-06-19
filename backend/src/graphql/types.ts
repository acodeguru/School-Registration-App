import * as path from 'path';
import { mergeTypes, fileLoader } from 'merge-graphql-schemas';

const __dirname = path.resolve();
const typesArray = fileLoader(path.join(__dirname, './types'));

export default mergeTypes(typesArray, { all: true });