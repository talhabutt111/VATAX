var RolesPermissions = require('../models/Rolepermission_model');
var Roles = require('../models/Roles_model');

module.exports = function (server) {

    server.post('/addNewRole', (req, res) => {
        let role = { name: req.body.name };
        Roles
            .findOrCreate({ where: { name: req.body.name }, defaults: role })
            .then(([role, created]) => {

                if (created) {
                    res.json({ success: true, data: role, message: 'role: ' + role.name + ' registered successfully.' })
                }
                if (!created) {
                    res.json({ success: false, message: 'role with name: ' + role.name + ' already exists.' })
                }

            })
            .catch((err) => {
                res.json({ success: false, err: err, message: 'something went wrong' })

            })

    })

    server.get('/getAllRoles', (req, res) => {
        Roles.findAll(
        ).then(roles => {

            res.json({ success: true, data: roles })
        })
            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })
    server.delete('/deleteRole', (req, res) => {
        Roles
            .findOne({ where: { id: req.body.value } })
            .then(role => {
                return role.destroy();
            })
            .then(role => {
                deleteRolePermissions(role).then(() => {
                    res.json({ success: true, data: role, message: 'role with name: ' + role.name + ' deleted.' })
                })
            })
            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })
}

function deleteRolePermissions(role) {
    RolesPermissions.destroy({ where: { role_id: role.id } })
        .then((rolePermisions) => {
            // console.log(rolePermisions);
        })
}
