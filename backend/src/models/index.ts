import Role from "./role";
import User from "./user";
import Institution from "./institution";

User.belongsTo(Role, {foreignKey: 'roleUUID', targetKey: 'uuid'});
Role.hasMany(User, {foreignKey: 'roleUUID', sourceKey: 'uuid'});

export { 
    Role,
    User,
    Institution
};