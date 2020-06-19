import { mergeTypes } from 'merge-graphql-schemas';
import roleType from './roleType.js';
import userType from './userType.js';
import institutionType from './institutionType.js';

const types: any[]  = [
    roleType,
    userType,
    institutionType,
];

export default mergeTypes(types, { all: true });