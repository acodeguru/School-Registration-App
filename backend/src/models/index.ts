import Role from "./role";
import User from "./user";
import Institution from "./institution";

User.belongsTo(Role, {foreignKey: 'role_uuid', targetKey: 'uuid'});
Role.hasMany(User, {foreignKey: 'role_uuid', sourceKey: 'uuid'});

export { 
    Role,
    User,
    Institution
};