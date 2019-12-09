var Users = require('../models/Users_model')
// const checkRoute = require('../../middlewear/index');
// const hashpass = require('bcryptjs')
module.exports = function (app) {


    app.post('/addNewUser', (req, res) => {

        let user = {
            name: req.body.name,
            email: req.body.email,
            cell: req.body.cell,
            address: req.body.address,
            username: req.body.username,
            //to hash password
            // password: hashpass.hashSync(req.body.password, 10),
            password: req.body.password,
            role_id: req.body.roleId,
            // cnic: req.body.cnic,
            // shop_name: req.body.shopName,
            // shop_cell: req.body.shopCell,
            // shop_address: req.body.shopAddress,
            // bank_name: req.body.bankName,
            // branch_name: req.body.branchName,
            // branch_code: req.body.branchCode,
            // account_id: req.body.accountNumber,
            // account_title: req.body.accountTitle,
            // iban_id: req.body.ibanNumber,
            // vendor: req.body.vendor,
            // cost_price_percent: req.body.costPricePercent,
            // retail_price_percent: req.body.retailPricePercent
        }



        Users
            .findOrCreate(
                // req.body.password
                { where: { username: req.body.username }, defaults: user })
            .then(([user, created]) => {

                if (created) {
                    res.json({ success: true, data: user, message: 'Registered successfully.' })
                }
                if (!created) {
                    res.json({ success: false, message: 'This username already exists.' })
                }
            })
            .catch((err) => {
                console.log(err);

                res.json({ success: false, err: err, message: 'something went wrong' })
            })
    })

    app.get('/getAllUsers', (req, res) => {
        Users.findAll(
        ).then(users => {
            res.json({ success: true, data: users })
        })
            .catch((err) => {
                res.json({ success: false, err: err })
            })
    })

    app.delete('/deleteUser', (req, res) => {
        Users
            .findOne({ where: { id: req.body.value } })
            .then(user => {
                return user.destroy();
            })
            .then(user => {
                res.json({ success: true, data: user, message: 'deleted.' })
            })
            .catch((err) => {
                res.json({ success: false, err: err })
            })
    })

    app.put('/updateUser', (req, res) => {
        Users
            .findOne({ where: { username: req.body.username, id: { $not: req.body.id } } })
            .then(user => {
                user
                    ?
                    res.json({ success: false, message: 'This username already exists.' })
                    :
                    Users
                        .findOne({ where: { id: req.body.id } })
                        .then(user => {
                            user
                                .update({
                                    name: req.body.name,
                                    email: req.body.email,
                                    cell: req.body.cell,
                                    address: req.body.address,
                                    username: req.body.username,
                                    password: req.body.password,
                                    role_id: req.body.roleId,
                                    // cnic: req.body.cnic,
                                    // shop_name: req.body.shopName,
                                    // shop_cell: req.body.shopCell,
                                    // shop_address: req.body.shopAddress,
                                    // bank_name: req.body.bankName,
                                    // branch_name: req.body.branchName,
                                    // branch_code: req.body.branchCode,
                                    // account_id: req.body.accountNumber,
                                    // account_title: req.body.accountTitle,
                                    // iban_id: req.body.ibanNumber,
                                    // cost_price_percent: req.body.costPricePercent,
                                    // retail_price_percent: req.body.retailPricePercent
                                })
                                .then((user) => {
                                    res.json({ success: true, data: user, message: ' updated successfully.' })
                                })
                        })
                        .catch((err) => {
                            console.log(err);
                            res.json({ success: false, message: 'Something went wrong.', err: err })
                        })
            })
            .catch(err => {
                console.log(err);
            })
    })

    app.get('/getSpecificUser/:id', (req, res) => {
        Users
            .findOne({ where: { id: req.params.id } })
            .then(user => {
                res.json({ success: true, data: user })
            })
            .catch((err) => {
                res.json({ success: false, err: err })
            })
    })
}





























// var con = require('../configs/db-config-mysql')

// module.exports = function (app) {

//     app.post('/addNewUser', (req, res) => {
//         var user = {
//             name: req.body.name,
//             email: req.body.email,
//             cell: req.body.cell,
//             address: req.body.address,
//             username: req.body.username,
//             password: req.body.password
//         }
//         var sql = `INSERT INTO users (name, email, cell, address, username, password) VALUES ('${user.name}','${user.email}','${user.cell}','${user.address}','${user.username}','${user.password}')`;
//         con.query(sql, function (err, result) {
//             if (err) {
//                 // throw err
//                 return res.json({ success: false, err: err })
//             }
//             res.json({ success: true, data: user, id: result.insertId })
//         }
//         );


//     })
// }