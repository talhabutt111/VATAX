var RolesPermissions = require('../models/Rolepermission_model')

module.exports = function (server) {

    server.post('/addNewRolePermissions', (req, res) => {
        var resArray = [], promises = []
        let rolePermissions = req.body.RolePermissions
        rolePermissions.forEach(rolePermission => {
            let promise = RolesPermissions.findOrCreate({
                where: {
                    role_id: rolePermission.role_id,
                    permission_id: rolePermission.permission_id
                },
                defaults: rolePermission
            })
                .then(([rolePermission, created]) => {
                    if (created) {
                        resArray.push({ success: true, data: rolePermission, message: 'Role successfully be assigned a permission.' })
                    }
                    if (!created) {
                        resArray.push({ success: false, data: rolePermission, message: 'This role already have that permission.' })
                    }
                })
                .catch((err) => {
                    resArray.push({ success: false, err: err, message: 'Something went wrong' })
                })
            promises.push(promise)
        })
        Promise.all(promises).then(() => {
            res.json({ data: resArray })
        })
    })

    server.get('/getAllRolesPermissions', (req, res) => {
        RolesPermissions.findAll()
            .then(rolesPermissions => {
                res.json({ success: true, data: rolesPermissions })
            })
            .catch((err) => {
                res.json({ success: false, err: err })
            })
    })

    server.delete('/deleteRolePermission', (req, res) => {
        RolesPermissions.findOne({ where: { id: req.body.value } })
            .then(rolePermission => {
                return rolePermission.destroy();
            })
            .then(rolePermission => {
                res.json({ success: true, data: rolePermission, message: 'This permission is removed from that role.' })
            })
            .catch((err) => {
                res.json({ success: false, err: err })
            })
    })

    server.delete('/deleteAllRolePermissions', (req, res) => {
        RolesPermissions.destroy({ where: { role_id: req.body.roleId } })
            .then((rolePermisions) => {
                // console.log(rolePermisions);
                res.json({ success: true, data: rolePermisions, message: 'This permission is removed from that role.' })
            })
            .catch((err) => {
                res.json({ success: false, err: err })
            })
    })

}