const Sequelize = require('sequelize');
var sequelize = require('../config/db-config-mysql')

const rolePermissioningSchema = {
    role_id: Sequelize.INTEGER,
    permission_id: Sequelize.INTEGER
}
const configs = { paranoid: true, underscored: true, }
const RolesPermissions = sequelize.define('role_permissions', rolePermissioningSchema, configs);

RolesPermissions.sync(
    // { force: true }
)
    .then(() => {
         console.log('role_permissions is ready') 
    })
    .catch((err) => {
        console.log(err)
    })
    ;

module.exports = RolesPermissions