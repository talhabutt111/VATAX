const Sequelize = require('sequelize');
var sequelize = require('../config/db-config-mysql')

const userSchema = {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    cell: Sequelize.STRING,
    address: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    role_id: Sequelize.INTEGER,
    // cnic: { type: Sequelize.BIGINT, allowNull: true },
    // shop_name: Sequelize.STRING,
    // shop_cell: Sequelize.STRING,
    // shop_address: Sequelize.STRING,
    // bank_name: Sequelize.STRING,
    // branch_name: Sequelize.STRING,
    // branch_code: Sequelize.INTEGER,
    // account_id: Sequelize.BIGINT,
    // account_title: Sequelize.STRING,
    // iban_id: Sequelize.BIGINT,
    // cost_price_percent:Sequelize.FLOAT,
    // vendor: Sequelize.STRING,
    // retail_price_percent:Sequelize.FLOAT
}
const configs = { paranoid: true, underscored: true, omitNull: false }
const Users = sequelize.define('users', userSchema, configs);

Users.sync(
    // { force: true }
)
    .then(() => {
        //  console.log('users is ready') 
    })
    .catch((err) => {
        console.log(err)
    })
    ;

module.exports = Users