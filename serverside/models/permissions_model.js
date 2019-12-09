const Sequelize = require('sequelize');
var sequelize = require('../config/db-config-mysql')

const permissionSchema = {
    permission: Sequelize.STRING,
    entity: Sequelize.STRING,
    slug: Sequelize.STRING
}
const configs = { paranoid: true, underscored: true, }
const Permissions = sequelize.define('permissions', permissionSchema, configs);

Permissions.sync(
    // { force: true }
)
    .then(() => {
        // console.log('permissions is ready')
    })
    .catch((err) => {
        console.log(err)
    })
    ;

module.exports = Permissions