const Sequelize = require('sequelize');
var sequelize = require('../config/db-config-mysql');

const roleSchema = {
    name: Sequelize.STRING
}
const configs = { paranoid: true, underscored: true, }
const Roles = sequelize.define('roles', roleSchema, configs);

Roles.sync(
    // { force: true }
)
    .then(() => {
        //  console.log('roles is ready') 
    })
    .catch((err) => {
        console.log(err)
    })
    ;

module.exports = Roles