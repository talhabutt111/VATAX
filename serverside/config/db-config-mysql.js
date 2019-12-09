const Sequelize = require('sequelize');


var dbName = 'vat_tax_db';
var user = 'root';
// var user = 'vansaledbusr';
var password = '';
// var password = '7WPz!39vmnzK'
var config = {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    omitNull: true,
    pool: {
        max: 100,
        min: 0,
        acquire: 1000000,
        idle: 200000
    }
}
const sequelize = new Sequelize(dbName, user, password, config)

//to connect to online database hosting
// var config = {
//     // host: 'localhost',
//     dialect: 'mysql',
//     logging: false,
//     omitNull: true,
//     pool: {
//         max: 100,
//         min: 0,
//         acquire: 1000000,
//         idle: 200000
//     }
// }
// var sequelize = new Sequelize('mysql://vansaledbusr:7WPz!39vmnzK@51.75.74.185:3306/vansale',[config]);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


module.exports = sequelize